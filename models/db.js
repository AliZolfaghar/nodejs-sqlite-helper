var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// setup database

var sqlite3 = require('sqlite3').verbose();
var dbPath = './database/' + config.DB_Filename ;

var db = new sqlite3.Database(dbPath,'sqlite3.OPEN_CREATE',function (err) {
    if(err){
        console.log(err);
    }
    else{
        console.log('Database : OK!');
    }
});

// 
var generator = {} ; 
// for test only , 
// TODO : REMOVE AFTER FINAL TESTS
generator.test = function(model,data){    
    console.log(generate_update(model,data));
}; 

/**
 * model    : db-model 
 * data     : json object 
 * cb       : callback function as function(result)
 * result   : {success:true , lastID} or {success:false , error}  
 */
module.exports.insert = function (model,data,cb) {
    var command = generate_insert(model,data);
    run(command.sqlstr,command.params,cb);
};

/**
 * model    : db-model 
 * data     : json object 
 * cb       : callback function as function(result)
 */
module.exports.update = function (model,data,cb) {
    var command = generate_update(model,data);
    run(command.sqlstr,command.params,cb);
};

/**
 * model    : db-model 
 * data     : json object 
 * cb       : callback function as function(result)
 */
module.exports.delete = function (model,data,cb) {
    var command = generate_delete(model,data);
    run(command.sqlstr,command.params,cb);
};

/**
 * sqlstr   : a standard and valid sql select command 
 * params   : json object 
 * cb       : callback function as function(result)
 * result   : {success : true , data : rows} or {success : false , error : error-message}
 */
module.exports.select = function (sqlstr,params,cb) {
    var result = {success: false};
    db.all(sqlstr, params, function (err, rows) {
        if (err) {
            console.log('db error : ', err);
            result.error = err.message;
            cb(result);
        } else {
            if (rows) {
                // console.log(rows)
                result.success = true;
                result.data = rows;
                cb(result);
            } else {
                cb(result);
            }
        }
    });
};

/**
 * sqlstr   : a standard and valid sql command 
 * params   : json object
 * cb       : callback function as () 
 * @param {*} sqlstr 
 * @param {*} params 
 * @param {*} cb(result) 
 */
function run(sqlstr,params,cb){
    var result = {success: false};    
    db.run(sqlstr , params , function (err) {
        if (err) {
            console.log('db error : ', err.message);
            cb(result.error = err.message);
        } else {
            result.success = true;
            result.lastID = this.lastID;
            cb(result);
        }
    });
}

module.exports.run = run;

//=================================//
// insert update delete generators // 
//=================================//
function generate_insert(model, data) {
    var sqlstr = 'Insert Into @tableName ( @fieldPart ) Values ( @valuePart )';
    var fieldPart = '' ; 
    var valuePart = '' ; 
    var params = {}; // hold params 
    // loop in model and if found match with data , fill nessassery arrays
    for(var field in model.fields){
        if(data[field]){ //if field is in data 
            if(field !== model.primaryKey){ // if field is not primary key 
                fieldPart += ' ' + field + ' ,'; // add to field part 
                valuePart += ' $' + field + ' ,'; // add to param part 
                params['$' + field] = data[field];                
            }
        }
    }
    // remove last ',' from fieldPart and parampart 
    fieldPart = fieldPart.substring(0,fieldPart.length-1);
    valuePart = valuePart.substring(0,valuePart.length-1);
    //build sqlstr
    sqlstr = sqlstr.replace('@tableName',model.tableName).replace('@fieldPart' , fieldPart).replace('@valuePart',valuePart);
    return({sqlstr : sqlstr , params : params});     
}

function generate_update(model, data) {
    var sqlstr = 'Update @tableName Set @setPart Where @wherePart';
    var setPart = '' ; 
    var wherePart = '' ; 
    var params = {}; // hold params 
    // loop in model and if found match with data , fill nessassery arrays
    for(var field in model.fields){
        if(data[field]){ //if field is in data 
            if(field == model.primaryKey){ // if field is primary key 
                wherePart = field + '=$' + field; // build where clause
            }
            else{
                setPart += ' ' + field + '=$' + field +  ' ,';// add to set part 
            }
            params['$' + field] = data[field]; // add to params 
        }
    }
    // remove last ',' from setPart and parampart 
    setPart = setPart.substring(0,setPart.length-1);
    // build sqlstr
    sqlstr = sqlstr.replace('@tableName',model.tableName).replace('@setPart' , setPart).replace('@wherePart',wherePart);
    return({sqlstr : sqlstr , params : params});     
}

function generate_delete(model, data) {
    var sqlstr = 'Delete From @tableName Where @wherePart';
    var wherePart = '' ; 
    var params = {}; // hold params 
    // loop in model and if found match with data , fill nessassery arrays
    for(var field in model.fields){
        if(data[field]){ //if field is in data 
            if(field == model.primaryKey){ // if field is primary key 
                wherePart = field + '=$' + field; // build where clause
                params['$' + field] = data[field]; // add to params 
            }
        }
    }
    // build sqlstr
    sqlstr = sqlstr.replace('@tableName',model.tableName).replace('@wherePart',wherePart);
    return({sqlstr : sqlstr , params : params});     
}

module.exports.generator = generator ; 
