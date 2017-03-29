var Vector2 = function(x, y){
  if(x === undefined){
    x = 0;
  }
  if(y === undefined){
    y = x;
  }
  this.x = x;
  this.y = y;
};
///Adds two vectors together and returns the result vector
Vector2.prototype.add = function(b){
  return new Vector2(this.x + b.x, this.y + b.y);
};
///Subtracts the second vector from the first and returns the result vector
Vector2.prototype.sub = function(b){
  return new Vector2(this.x - b.x, this.y - b.y);
};
///Multiplies two vectors together and returns the result vector
Vector2.prototype.mul = function(b){
  return new Vector2(this.x * b.x, this.y * b.y);
};
///Divides the first vector by the second and returns the result vector
Vector2.prototype.div = function(b){
  return new Vector2(this.x / b.x, this.y / b.y);
};
///Checks to see if the two vectors are equal
Vector2.prototype.equal = function(b){
  return this.x === b.x && this.y === b.y;
};
///Multiplies both the x and the y of a vector by the scalar and returns the result vector
Vector2.prototype.scale = function(scalar){
  return new Vector2(this.x * scalar, this.y * scalar);
};
///Returns the length of this vector, as measured from (0, 0) to (x, y) in a straight line.
Vector2.prototype.magnitude = function(){
  if(this.x === 0 && this.y === 0){
    return 0;
  }
  let magnitudeSquared = (this.x * this.x) + (this.y * this.y);
  return Math.sqrt(magnitudeSquared);
};
///Returns a vector pointing in the same direction, but with a magnitude of one.
Vector2.prototype.normalized = function(){
  let mag = this.magnitude();
  if(mag === 0){
    return new Vector2();
  }
  return new Vector2(this.x / mag, this.y / mag);
};

///Returns a copy of this vector.
Vector2.prototype.duplicate = function(){
  return new Vector2(this.x, this.y);
};
///Returns a string representation of this vector.
Vector2.prototype.toString = function(){
  return `(${this.x}, ${this.y})`;
};

//Check to see if we're in Node or in a browser
if(typeof module !== "undefined" && this.module !== module){
  //In Node
  module.exports = Vector2;
}else{
  //In the browser
  window.Vector2 = Vector2;
}
