var express = require('express');
var passport = require('passport');
var router = express.Router();
var controllers = require('../controllers/index');

// check to see if the user is already logged in
router.get('/', controllers.getLogin);

router.get('/api/auth/', function (req, res) {
  res.redirect('/', { user : req.user });
});

router.get('/api/auth/login', controllers.getLogin);
router.post('/api/auth/login', controllers.login);

router.get('/api/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;
