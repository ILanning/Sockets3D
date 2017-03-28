var express = require("express");
var bp = require("body-parser");
var path = require("path");

var port = 8000;
var app = express();
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./node_modules")));
app.use(bp.json());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.render("index");
});

var nextID = 0;

var server = app.listen(port, function(){ console.log("Listening on " + port) });

var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket){
    console.log("Sockets!");
    console.log(socket.id);
    socket.on("button_clicked", function(data){
        console.log('Someone clicked a button!  Reason: ' + data);
        socket.emit('server_response', data );
    });

    socket.on("emit_back", function(data){
      console.log(socket.id + "requested an emit with this data: " + data.toString());
      data.response = "Emit Response";
      socket.emit("print_data", data);
    });

    socket.on("broadcast", function(data){
      console.log(socket.id + "requested a broadcast with this data: " + data.toString());
      data.response = "Broadcast Response";
      socket.broadcast.emit("print_data", data);
    });

    socket.on("full_broadcast", function(data){
      console.log(socket.id + "requested a full broadcast with this data: " + data.toString());
      data.response = "Full Broadcast Response";
      io.emit("print_data", data);
    });
});
