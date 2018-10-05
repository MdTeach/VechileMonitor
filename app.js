var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require('socket.io');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat',{ useNewUrlParser: true });

server.listen(80,'192.168.10.67',()=>{
    console.log("Listenig at 80");
});
//DB connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected");
});

// serve static files from /public
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.sendFile('/index.html');
});


var io = socket(server);
io.on('connection', function (socket) {
    console.log("socket connected sucessfully");
    socket.on('msg', (data)=>{
      console.log(data.msg);
  });
});


