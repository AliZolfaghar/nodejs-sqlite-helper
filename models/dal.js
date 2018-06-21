// DATA ACCESS LAYER
var dal = {};

// you can use db to access directly to its functions if you need 
// var db = require('./db');

dal.sections    = require('./sectionsModel');
dal.users       = require('./usersModel');
dal.city        = require('./cityModel');
dal.note        = require('./notesModel');

module.exports = dal;