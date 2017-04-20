var express = require("express");
var bp = require("body-parser");
var path = require("path");
var fs = require("fs");
var JSON = require("json3");
var port = 8000;
var app = express();
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./node_modules")));
app.use(express.static(path.join(__dirname, "./custom_libs")));
app.use(bp.json());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.render("index");
});

var server = app.listen(port, function(){ console.log("Listening on " + port) });
var io = require("socket.io").listen(server);

var frameData = {};
var nextID = 0;
var playerSpeed = 0.06;
var timingMonitor = require("./server/timing.js");
///Calls the function found at this path with the argument "io"
require("./server/socketRoutes.js")(io);
var dataStore = require("./server/models/users.js");
var handleMovements = function(){
  for (var key in frameData){
    frameData[key].movement = frameData[key].movement.normalized();
    frameData[key].movement.scale(playerSpeed);
  }
};

var serverLoop = function(){
  timingMonitor.update();
  handleMovements();
  io.emit("frame_update", frameData);
  frameData = {};
  timingMonitor.log();
  setTimeout(serverLoop, 15);
}

setTimeout(serverLoop, 15);
