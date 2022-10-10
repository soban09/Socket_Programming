const express = require('express');
const fs = require('fs');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const PORT = 3000;
const server = http.createServer(app)
const io = socketio(server)
const chalk = require('chalk')
const warning = chalk.bold.red;
const success = chalk.blue;
const profanity = require('profanity-hindi');
io.on('connection', (socket) => {
    console.log(success(`New Client connected with ${socket.id}`));
    socket.on("join", ({ id, msg }) => {
        console.log(success(`${id} : ${msg}`));
        socket.broadcast.emit("message", `New Client with id ${id} has joined`)
    })
    socket.on("message", (msg) => {
        const censoredText = profanity.maskBadWords(msg);
        console.log(success(`New message from ${socket.id} : ${censoredText}`));
        socket.broadcast.emit("message", { id: socket.id, censoredText });
    })
    socket.on("disconnect", () => {
        const msg = `Client with id ${socket.id} disconnected`
        console.log(warning(msg))
        socket.broadcast.emit("message", msg)
    })
})


app.get('/', (req, res) => {
    res.json({
        "message": "Server Started"
    })
})
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})
