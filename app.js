var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require('socket.io');

var Vehicle = require('./models/vehicle');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/transport',{ useNewUrlParser: true });

server.listen(80,()=>{
    console.log("Listenig at 80");
});
//DB connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connection sucessfull");
});

// serve static files from /public
app.use(express.static(__dirname + '/public'));



// include routes
var routes = require('./routes/index');
app.use('/', routes);


var io = socket(server);
io.on('connection', function (socket) {
    console.log("socket connected sucessfully");
    socket.on('msg', (data)=>{
  });
});


