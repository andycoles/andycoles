var bcrypt = require('bcrypt');
// var crypto = require('crypto');
var mongoose = require('mongoose');

var userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

/**
 * Password hash middleware.
 */
// userSchema.pre('save', function(next) {
//   var user = this;
//   if (!user.isModified('password')) return next();
//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

/**
 * Helper method for validating user's password.
 */
// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

var User = module.exports = mongoose.model('User', userSchema);

// module.exports.getUserById = function(id, callback) {
//   User.findById(id, callback);
// }

// module.exports.getUserByUsername = function(username, callback) {
//   var query = {username: username};
//   User.findOne(query, callback);
// }
