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

var frameData = [];
var frameCount = 0;
var nextID = 0;
var playerSpeed = 0.06;
var lastFrame = Date.now();
var frameLengthsIter = 0;
var frameLengths = Array(70);
var prevSecond = Math.floor(lastFrame / 1000);
var startSecond = prevSecond;

///Calls the function found at this path with the argument "io"
require(path.join(__dirname, "server/socketRoutes.js"))(io);

var handleMovements = function(){
  for (let i = 0; i < frameData.length; i++){
    frameData[i].movement = frameData[i].movement.normalized();
    frameData[i].movement.scale(playerSpeed);
  }
};

var handleTiming = function(){
  var currFrame = Date.now();
  frameLengths[frameLengthsIter] = currFrame - lastFrame;
  frameLengthsIter = (frameLengthsIter + 1) % frameLengths.length;
  var currSecond = Math.floor(currFrame / 1000);
  if(currSecond > prevSecond){
    prevSecond = currSecond;
    let average = 0;
    for(let i = 0; i < frameLengths.length; i++){
      average += frameLengths[i];
    }
    average /= frameLengths.length;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Second: ${currSecond - startSecond}  Frame Rate: ${Math.round(average * 1000) / 1000}`);
  }
  lastFrame = currFrame;
};

var serverLoop = function(){
  handleMovements();
  handleTiming();
  io.emit("frame_update", frameData);
  frameCount++;
  frameData = [];
  setTimeout(serverLoop, 15);
}

setTimeout(serverLoop, 15);
