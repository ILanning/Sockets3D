var assert = require("chai").assert;
var Vector2 = require("./../custom_libs/Vector2.js");

describe("Vector2", function(){
  context("can be initialized with two values", function(){
    it("assigns x to x and y to y", function(){
      var result = new Vector2(3, 4);
      assert.equal(3, result.x);
      assert.equal(4, result.y);
    });
  });
  context("when passed only one value", function(){
    it("assigns both x and y to equal that value", function(){
      var result = new Vector2(3);
      assert.equal(3, result.x);
      assert.equal(3, result.y);
    });
  });
  context("or none", function(){
    it("assigns both to zero", function(){
      var result = new Vector2();
      assert.equal(0, result.x);
      assert.equal(0, result.y);
    });
  });
  context("basic operations:", function(){
    describe("#equal(Vector2 b)", function(){
      it("checks the equality of the two vectors", function(){
        assert.isTrue(new Vector2(2, 7).equal(new Vector2(2, 7)));
        assert.isFalse(new Vector2(2, 7).equal(new Vector2(2, 8)));
        assert.isFalse(new Vector2(3, 7).equal(new Vector2(2, 7)));
        assert.isTrue(new Vector2().equal(new Vector2()));
      });
    });
    describe("#add(Vector2 b)", function(){
      it("combines both vectors", function(){
        var v1 = new Vector2(3, 4);
        var v2 = new Vector2(10, 30);
        var r1 = new Vector2(13, 34);
        assert.isTrue(v2.add(v1).equal(r1));
        assert.isTrue(v1.add(v2).equal(r1));
        var r2 = v1.add(v2);
        assert.notEqual(v1, r2);
      });
    });
    describe("#sub(Vector2 b)", function(){
      it("subtracts the second vector from the first", function(){
        var v1 = new Vector2(3, 4);
        var v2 = new Vector2(10, 30);
        var r1 = new Vector2(-7, -26);
        var r2 = new Vector2(7, 26);
        assert.isTrue(v1.sub(v2).equal(r1));
        assert.isTrue(v2.sub(v1).equal(r2));
        var r3 = v1.sub(v2);
        assert.notEqual(v1, r3);
      });
    });
    describe("#mul(Vector2 b)", function(){
      it("multiplies both vectors by eachother", function(){
        var v1 = new Vector2(3, 4);
        var v2 = new Vector2(10, 30);
        var r1 = new Vector2(30, 120);
        assert.isTrue(v2.mul(v1).equal(r1));
        assert.isTrue(v1.mul(v2).equal(r1));
        var r2 = v1.mul(v2);
        assert.notEqual(v1, r2);
      });
    });
    describe("#div(Vector2 b)", function(){
      it("divides the first vector by the second", function(){
        var v1 = new Vector2(3, 4);
        var v2 = new Vector2(12, 40);
        var r1 = new Vector2(0.25, 0.1);
        var r2 = new Vector2(4, 10);
        assert.isTrue(v1.div(v2).equal(r1));
        assert.isTrue(v2.div(v1).equal(r2));
        var r3 = v1.div(v2);
        assert.notEqual(v1, r3);
      });
    });
  });
  context("vector-specific operations:", function(){
    describe("#scale(Number b)", function(){
      it("multiplies both values in the vector by the scalar", function(){
        var v1 = new Vector2(3, 4);
        var result = v1.scale(5);
        assert.isTrue(result.equal(new Vector2(15, 20)));
        assert.notEqual(v1, result);
      });
    });
    describe("#magnitude()", function(){
      it("returns the magnitude of the vector", function(){
        var v1 = new Vector2(2, 2);
        var result = v1.magnitude();
        assert.equal(result, Math.sqrt(8));
        assert.notEqual(v1, result);
      });
    });
    describe("#normalized()", function(){
      it("returns a vector pointing in the same direction, but with a magnitude of one", function(){
        var v1 = new Vector2(3, 0);
        var result = v1.normalized();
        assert.isTrue(result.equal(new Vector2(1, 0)));
        assert.notEqual(v1, result);
      });
    });
  });
  context("various helpers:", function(){
    describe("#duplicate()", function(){
      it("returns a duplicate of the vector", function(){
        var v1 = new Vector2(3, 0);
        var result = v1.duplicate();
        assert.isTrue(v1.equal(result));
        assert.notEqual(v1, result);
      });
    });
  });
});
