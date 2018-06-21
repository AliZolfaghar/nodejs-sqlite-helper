var db = require('./db');

var me = {};

var model = {
    tableName: "city",
    primaryKey: "id",
    fields: {
        id: 0 ,
        province_id : 0 , 
        county_id : 0 , 
        cname : ''
    }
};


me.get = function (searchValue , limit , offset , cb) {
    var sqlstr = "Select * From city where cname like '%" + searchValue + "%' Limit " + limit + " Offset " + offset ;
    // var sqlstr = "Select cname From city where cname like '%$sv%'";
    var params = {
        // "sv": searchValue
    };
    db.select('Select Count(*) as cntr from city',{},function(result){
        var total = result.data[0].cntr;
        db.select(sqlstr,params,function(result){
            result.total = total;
            cb(result);
        });
    });
    // db.select(sqlstr,params,cb);
};

me.all = function (cb) {
    var sqlstr = "Select * From city ";
    var params = {};
    db.select(sqlstr,params,cb);
};

module.exports = me ;