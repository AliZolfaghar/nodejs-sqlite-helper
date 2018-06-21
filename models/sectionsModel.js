var db = require('./db');

var me = {};

var model = {
    tableName: "TBL_Sections",
    primaryKey: "SecID",
    fields: {
        SecID: 0,
        Str_SectName: '',        
        Str_UserName: '',
        Int_ShowOrder: ''
    }
};

me.getAll = function(cb) {
    var sqlstr = 'Select * From TBL_Sections';
    var params = {};
    db.select(sqlstr,params,cb);
};

me.get = function (secid, cb) {
    var sqlstr = 'Select * From TBL_Sections where SecID=$SecID';    
    var params = {
        $SecID: secid
    };
    db.select(sqlstr,params,cb);
};

me.insert = function (data, cb) {
    db.insert(model,data,cb);
};

me.update = function (data, cb) {
    db.update(model,data,cb);
};

me.delete = function (secid, cb) {
    var data = {SecID:secid};
    db.delete(model,data,cb);
};

module.exports = me;