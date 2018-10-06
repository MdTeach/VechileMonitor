var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var socket = require('socket.io');

var Vehicle = require('./models/vehicle');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/transport',{ useNewUrlParser: true });

server.listen(80,'192.168.1.109',()=>{
    console.log("Listenig at 80");
});
// server.listen(80,()=>{
//     console.log("Listenig at 80");
// });



//DB connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database connection sucessfull");
});

// use sessions for tracking logins
app.use(session({
  secret: 'Defiant Coders',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);


var io = socket(server);
io.on('connection', function (socket) {
    console.log("socket connected sucessfully");
    socket.on('data', (data)=>{
      console.log(data);
      io.emit("server_data",data=data);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


