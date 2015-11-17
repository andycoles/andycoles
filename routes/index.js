var express = require('express');
var passport = require('passport');
var router = express.Router();

var router = express.Router();

router.get('/api/auth/', function (req, res) {
  res.redirect('/', { user : req.user });
});

router.get('/api/auth/login', function(req, res) {
  res.redirect('/', { user : req.user });
});

router.post('/api/auth/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({success:true, message:"Login successful.", user:user});
    });
  })(req, res, next);
});

router.get('/api/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;
