var db = require('./db');

var me = {};

var model = {
    tableName: "TBL_Notes",
    primaryKey: "NoteID",
    fields: {
        NoteID: 0 ,
        Str_Notes: ''
    }
};

me.get = function (NoteID, cb) {
    var sqlstr = 'Select * From TBL_Notes where NoteID=$NoteID';
    var params = {
        $NoteID: NoteID
    };
    db.select(sqlstr,params,cb);
};

me.all = function (cb) {
    var sqlstr = 'Select * From TBL_Notes';
    var params = {};
    db.select(sqlstr,params,cb);
};


// upsert(inset or update) note (Replace Into is a sqlite special command)
me.replcase = function(NoteID , note , cb){
    var sqlstr = 'Replace Into TBL_Notes (NoteID,Str_Note) Values ($NoteID,$Str_Note)';
    var params = {
        $NoteID : NoteID , 
        $Str_Note : note
    };
    db.run(sqlstr,params,cb);
};

// me.insert = function (data, cb) {
//     db.insert(userModel,data,cb);
// };

// me.update = function (data, cb) {
//     db.update(userModel,data,cb);
// };

// me.delete = function (NoteID, cb) {
//     var data = {NoteID:NoteID};
//     db.delete(userModel,data,cb);
// };

module.exports = me;