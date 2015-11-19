var express = require("express"),
    http = require("http"),
    path = require("path"),

    config = require("./config"),
    bcrypt = require("bcrypt"),
    mongodb = require("mongodb"),
    mongoose = require("mongoose"),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require("./models/db"),
    User = require("./models/User"),
    _ = require("underscore"),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index');
    controllers = require('./controllers/index')

    app = express(),
    port = process.env.PORT || config.port;

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  name: 'user-session',
  secret: config.cookieSecret,
  resave: false,
  saveUninitialized: false,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// admin user setup
User.register(new User({ username : "admin" }), config.defaultPass, function(err, user) {
  if (err) {
    console.log(err.message);
    return false;
  }
  else {
    console.log("default admin user created");
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app);

server.listen(port);

console.log(app.get('env'));
console.log('Server started at http://localhost:' + port);
