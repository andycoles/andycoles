var mongoose = require('mongoose');
var User = require('../models/User');
var controllers = {};

controllers.login = function (req, res, next) {

  User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
    if (err) return next(err);
    if (user === false) {
      res.send({
        message: options.message,
        success: false
      });
    } else {
      req.login(user, function (err) {
        res.send({
          success: true,
          user: user
        });
      });
    }
  });

};

controllers.getLogin = function (req, res) {

  console.log(req.user);
  if (req.user) {

    return res.send({
      success: true,
      user: req.user
    });

  } //res.send(500, {status:500, message: 'internal error', type:'internal'}); == deprecated

  res.send({
    success: false,
    message: 'not authorized'
  });

};

module.exports = controllers;
