/*
Needed functionality:
  Circle-cirle Collision
  Circle-line Collision
  Circle-circle displacement
  circle-line displacement

*/

//Include this *after* Vector2

var Vector2;
//Check to see if we're in Node or in a browser
if(typeof module !== "undefined" && this.module !== module){
  //In Node
  Vector2 = require("./../Vector2.js");
}else{
  //In the browser
  Vector2 = window.Vector2;
}

var Circle = function(x, y, radius){
  this.position = new Vector2(x, y);
  this.radius = radius;
}
Circle.prototype.kind = "Circle";

Circle.prototype.isColliding = function(collider){
  if collider.
}

if(typeof module !== "undefined" && this.module !== module){
  //In Node
  Vector2 = require("./../Vector2.js");
}else{
  //In the browser
  window.Circle = Circle;
}
