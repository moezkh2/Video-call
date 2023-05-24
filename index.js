const express = require('express')
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config()
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// const PORT = process.env.PORT || 5000;

/* app.get('/', (req, res) => {
    res.send('Running');
}); */

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
});

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static('./client/build'))
//     app.get('/*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
//     })
// }

// server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("server is running on http://localhost:5000")
    }
});
module.exports = app;
