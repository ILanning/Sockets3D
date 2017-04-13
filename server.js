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
<<<<<<< HEAD
var nextID = 0;
var playerSpeed = 0.06;
var timingMonitor = require("./server/timing.js");
=======
var frameCount = 0;
var nextID = 0;
var playerSpeed = 0.06;
var lastFrame = Date.now();
var frameLengthsIter = 0;
var frameLengths = Array(70);
var prevSecond = Math.floor(lastFrame / 1000);
var startSecond = prevSecond;
var spike = 0;

>>>>>>> a0aaa3b57c8141010c259108357710dda57ab1e1
///Calls the function found at this path with the argument "io"
require("./server/socketRoutes.js")(io);
var dataStore = require("./server/models/users.js");
var handleMovements = function(){
  for (var key in frameData){
    frameData[key].movement = frameData[key].movement.normalized();
    frameData[key].movement.scale(playerSpeed);
<<<<<<< HEAD
=======
  }
};

var handleTiming = function(){
  var currFrame = Date.now();
  frameLengths[frameLengthsIter] = currFrame - lastFrame;
  if (frameLengths[frameLengthsIter] > spike){
    spike = frameLengths[frameLengthsIter];
  }
  frameLengthsIter = (frameLengthsIter + 1) % frameLengths.length;
  var currSecond = Math.floor(currFrame / 1000);
  // if(process.stdout.clearLine){
  //   process.stdout.clearLine();
  // }
  // process.stdout.cursorTo(0);
  // process.stdout.write(`${frameLengths[frameLengthsIter]}`);
  if(currSecond > prevSecond){
    prevSecond = currSecond;
    var average = 0;
    for(var i = 0; i < frameLengths.length; i++){
      average += frameLengths[i];
    }
    average /= frameLengths.length;
    if(process.stdout.clearLine){
      process.stdout.clearLine();
    }
    process.stdout.cursorTo(0);
    process.stdout.write(`Second: ${currSecond - startSecond}  Frame Rate: ${Math.round(average * 1000) / 1000}  Greatest Spike ${spike}`);
>>>>>>> a0aaa3b57c8141010c259108357710dda57ab1e1
  }
};

var serverLoop = function(){
  timingMonitor.update();
  handleMovements();
  io.emit("frame_update", frameData);
<<<<<<< HEAD
  frameData = {};
  timingMonitor.log();
=======
  frameCount++;
  frameData = {};
>>>>>>> a0aaa3b57c8141010c259108357710dda57ab1e1
  setTimeout(serverLoop, 15);
}

setTimeout(serverLoop, 15);
