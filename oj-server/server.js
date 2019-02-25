var express = require("express");
var app = express()
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require('path');
var http = require('http');  // for socket connection, establish our own https

var socket_io = require('socket.io');
var io = socket_io(); // singleton
var socketService = require('./services/socketService.js')(io); // pass the singleton into the service


mongoose.connect("mongodb://myl:1234qwer@ds213715.mlab.com:13715/onlinejudgesystem", { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, '../public')));

const port = 3000

app.use('/', indexRouter);
app.use("/api/v1", restRouter);

app.use(function(req, res) {
  // send index.html to start client side
  res.sendFile("index.html", { root: path.join(__dirname, '../public/') });
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// create a new server for websocket
var server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  throw error;
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr == 'string'
      ? 'pipe' + address
      : 'port' + addr.port;

  console.log('Listening on ' + bind);
}
