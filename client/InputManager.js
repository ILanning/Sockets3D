var InputManager = (function(){
  var inputManager = {};
  inputManager.currentKeys ={};
  inputManager.pressedJustNow = {};
  inputManager.releasedJustNow = {};

    document.onkeydown = function(event){
      inputManager.currentKeys[event.key] = true;
      inputManager.pressedJustNow[event.key] = true;
      console.log("Key pressed!");
      console.log(event);
    }
    document.onkeyup = function(event){
      inputManager.currentKeys[event.key] = false;
      inputManager.releasedJustNow[event.key] = true;
    }

  inputManager.update = function(){
    inputManager.pressedJustNow = {};
    inputManager.releasedJustNow = {};
  };

  inputManager.isKeyDown = function(key){
    return inputManager.currentKeys[key];
  }
  inputManager.isKeyUp = function(key){
    return inputManager.currentKeys[key];
  }
  inputManager.isKeyTriggered = function(key){
    return inputManager.pressedJustNow[key];
  }
  inputManager.isKeyReleased = function(key){
    return inputManager.releasedJustNow[key];
  }

  return inputManager;
})()
