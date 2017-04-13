//No mongeese here

var fs = require("fs");
var path = require("path");
var JSON = require("json3");

module.exports = (function(){
  var dataStore = {};
  dataStore.data = fs.readFileSync(path.join(__dirname, "./../data/users.json"));
  dataStore.data = JSON.parse(dataStore.data);
  console.log(dataStore);
  function saveData(){
    var jsonData = JSON.stringify(dataStore.data);
    fs.writeFileSync(path.join(__dirname, "./../data/users.json"), jsonData);
  }

  Cleanup(saveData);
  return dataStore;
}());




//Source:  http://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
function noOp() {};

function Cleanup(callback) {

  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  callback = callback || noOp;
  process.on('cleanup',callback);

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup');
  });

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    console.log('Ctrl-C...');
    process.exit(2);
  });

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
  });
};
