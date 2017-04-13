module.exports = (function(){
  var timingMonitor = {};
  var lastFrame = Date.now();
  var frameLengthsIter = 0;
  var frameLengths = Array(70);
  var prevSecond = Math.floor(lastFrame / 1000);
  var startSecond = prevSecond;
  var spike = 0;
  var frameCount = 0;

  timingMonitor.update = function(){
    frameCount++;
    var currFrame = Date.now();
    frameLengths[frameLengthsIter] = currFrame - lastFrame;
    if (frameLengths[frameLengthsIter] > spike){
      spike = frameLengths[frameLengthsIter];
    }
    frameLengthsIter = (frameLengthsIter + 1) % frameLengths.length;
    lastFrame = currFrame;
  };

  timingMonitor.log = function(){
    var currSecond = Math.floor(lastFrame / 1000);
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
  };
  return timingMonitor;
}());
