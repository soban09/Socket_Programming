const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const PORT = 5000;
const server = http.createServer(app)
const io = socketio(server)
const chalk = require('chalk')
const warning = chalk.bold.red;
const yellow = chalk.yellow;
const cyan = chalk.cyan;
const magenta = chalk.magentaBright;
const readline = require("readline");

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output : process.stdout
});

io.on('connection', (socket) => {

    console.log(yellow(`New Client connected with ${socket.id}`));

    const sendMsg = () => {
        rl.question(magenta("You : "), function (string) {
            socket.emit("message", { id: socket.id, string });
            sendMsg();
        });
    }
    
    socket.on("join", ({ id, msg }) => {
        console.log(yellow(`${id} : ${msg}`));
        socket.broadcast.emit("message", `New Client with id ${id} has joined`)
    })

    socket.on("message", (msg) => {
        console.log(" - ");
        console.log(cyan(`Client : ${msg}`));
        sendMsg();
    })

    socket.on("disconnect", () => {
        const msg = `Client with id ${socket.id} disconnected`
        console.log(warning(msg))
        socket.broadcast.emit("message", msg)
    })
})

app.get('/', (req, res) => {
    res.json({"message": "Server Started"})
})
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})
