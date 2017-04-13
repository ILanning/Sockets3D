//Include this *after* Vector2

var Collision = {};
var Vector2;
//Check to see if we're in Node or in a browser
if(typeof module !== "undefined" && this.module !== module){
  //In Node
  module.exports = Collision;
  Vector2 = require("")
}else{
  //In the browser
  window.Collision = Collision;
  Vector2 = window.Vector2;
}

Collision.
