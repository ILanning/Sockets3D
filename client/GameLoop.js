gameLoop(){
  setTimeout(15, gameLoop);
}

handleMovement(){
  var movement = new Vector2();
  if (InputManager.isKeyDown("LeftArrow")){
    movement.x--;
  }
  if (InputManager.isKeyDown("RightArrow")){
    movement.x++;
  }
  if (InputManager.isKeyDown("UpArrow")){
    movement.y--;
  }
  if (InputManager.isKeyDown("DownArrow")){
    movement.y++;
  }
  if(!movement.equals(new Vector2())){
    socket.emit("log_movement", { movement : movement })
  }
}
