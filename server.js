var express = require("express");
var bp = require("body-parser");
var path = require("path");

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
var frameCount = 0;
var nextID = 0;
var playerSpeed = 0.06;
var lastFrame = Date.now();
var frameLengthsIter = 0;
var frameLengths = Array(70);
var prevSecond = Math.floor(lastFrame / 1000);
var startSecond = prevSecond;
var spike = 0;

///Calls the function found at this path with the argument "io"
require(path.join(__dirname, "server/socketRoutes.js"))(io);

var handleMovements = function(){
  for (var key in frameData){
    frameData[key].movement = frameData[key].movement.normalized();
    frameData[key].movement.scale(playerSpeed);
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
  }
  lastFrame = currFrame;
};

var serverLoop = function(){
  handleMovements();
  handleTiming();
  io.emit("frame_update", frameData);
  frameCount++;
  frameData = {};
  setTimeout(serverLoop, 15);
}

setTimeout(serverLoop, 15);
