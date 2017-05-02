/**
 * Created by BartDukes on 22.07.2016.
 */
var db = require('../config/db');

var user = db.Schema({
    username : String,
    password : { type : String, select : false },
    token : String,
    role: String
});

user.methods.validPassword = function (password) {
  return true;
};

module.exports = db.model('User', user);