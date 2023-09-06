const express = require('express');
const path = require("path");
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config();
const PORT = process.env.PORT || 5000;
var cors = require('cors');
app.use(cors());
const io = require("socket.io")(server, { cors: { origin: "*" } });


io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    console.log("connection")

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        console.log("callUser")
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        console.log("answerCall")
        io.to(data.to).emit("callAccepted", data.signal)
    });
});


app.use(express.static(path.join(__dirname, "./client/build")));

server.listen(PORT, () => {
  console.log('listening on *:5000');
});