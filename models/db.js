var mongoose = require('mongoose');
var connStr = 'mongodb://localhost/andypiDB';
mongoose.connect(connStr, function(err) {
  if (err) throw err;
  console.log("Successfully connected to MongoDB");
});
