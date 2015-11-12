var express = require("express"),
    http = require("http"),
    path = require("path"),

    config = require("./config"),
    bcrypt = require("bcrypt"),
    mongodb = require("mongodb"),
    mongoose = require("mongoose"),
    db = require("./models/db"),
    User = require("./models/User"),
    _ = require("underscore"),

    app = express(),
    port = process.env.PORT || config.port;

    var adminUser = new User({
      username: "admin",
      password: "blamo!.."
    });

    adminUser.save();

    var server = http.createServer(app);

    app.get('/',function(req,res){
      res.sendFile(path.join(__dirname+'/public/index.html'));
      app.use(express.static(__dirname + '/public'));
    });

    server.listen(port);

console.log('Server started at http://localhost:' + port);
