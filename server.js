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

    app = express(),
    port = process.env.PORT || config.port;

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

User.register(new User({ username : "admin" }), config.defaultPass, function(err, user) {
  if (err) {
    console.log(err.message);
    return false;
  }
  else {
    console.log("default admin user created");
  }
});

var server = http.createServer(app);

server.listen(port);

console.log('Server started at http://localhost:' + port);
