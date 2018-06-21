var db = require('./db');

var me = {};

var userModel = {
    tableName: "TBL_Users",
    primaryKey: "UserID",
    fields: {
        UserID: 0,
        Str_FullName: '',
        Str_UserName: '',
        Str_Password: '',
        Str_Phone: '',
        Str_Email: '',
        Str_ACL: '',
        Bol_IsActive: false
    }
};

me.getAll = function(cb) {
    var sqlstr = 'Select * From TBL_Users';
    var params = {};
    db.select(sqlstr,params,cb);
};

me.get = function (userid, cb) {
    var sqlstr = 'Select * From TBL_Users where UserID=$UserID';
    var params = {
        $UserID: userid
    };
    db.select(sqlstr,params,cb);
};

me.insert = function (data, cb) {
    db.insert(userModel,data,cb);
};

me.update = function (data, cb) {
    db.update(userModel,data,cb);
};

me.delete = function (userid, cb) {
    var data = {UserID:userid};
    db.delete(userModel,data,cb);
};

module.exports = me;