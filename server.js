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

app.get('/', function (req, res) {
    res.render("index");
})

var server = app.listen(port, function () { console.log("Listening on " + port) });

var io = require("socket.io").listen(server);

io.sockets.on("connection", function (socket) {
    console.log("Sockets!");
    console.log(socket.id);
    socket.on("button_clicked", function (data) {
        console.log('Someone clicked a button!  Reason: ' + data);
        socket.emit('server_response', data );
    })
});
