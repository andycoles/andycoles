var bcrypt = require('bcrypt');
// var crypto = require('crypto');
var mongoose = require('mongoose');
var config = require("../config");
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose, {
  incorrectPasswordError: "Incorrect password provided",
  incorrectUsernameError: "Credentials do not match our records.",
  missingUsernameError: "Username must be provided.",
  missingPasswordError: "Password must be provided."
});

module.exports = mongoose.model('User', userSchema);
