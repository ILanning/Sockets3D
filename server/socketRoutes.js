"use strict";
var Vector2 = require("./../custom_libs/Vector2.js");

//By assigning the function to module.exports, we make it so that when require() is called on this path, this function is returned.
module.exports = function(io){
  //The socket object represents the server's connection to a particular client.
  io.sockets.on("connection", function(socket){
      console.log("New connection!   ID: " + socket.id);
      //                              --Example events--

      //When the server receives a "button_clicked" event from this client, run this function.
      //The data is a javascript object that the client gave us when it fired this event.
      socket.on("emit_back", function(data){
        console.log(socket.id + " requested an emit with this data: " + data.toString());
        data.response = "Emit Response";

        //This sends a response back to the client that fired the event, and that client alone
        socket.emit("print_data", data);
      });

      socket.on("broadcast", function(data){
        console.log(socket.id + " requested a broadcast with this data: " + data.toString());
        data.response = "Broadcast Response";

        //This sends a response to every client *but* the one that fired the event
        socket.broadcast.emit("print_data", data);
      });

      socket.on("full_broadcast", function(data){
        console.log(socket.id + " requested a full broadcast with this data: " + data.toString());
        data.response = "Full Broadcast Response";

        //This sends a response to every client, without exception
        io.emit("print_data", data);
      });
      //                               --End Examples--


      socket.on("log_movement", function(data){
        console.log(`Client ${socket.id}: Movement registered.\n    Vector: (X:${data.movement.x}, Y:${data.movement.y})`);
        var movement = new Vector2(data.movement.x, data.movement.y);
        frameData.push({ id : socket.id, movement : movement });
      });
  });
};
