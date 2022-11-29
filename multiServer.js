const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const PORT = 3000;
const server = http.createServer(app)
const io = socketio(server)
const chalk = require('chalk')
const warning = chalk.bold.red;
const yellow = chalk.yellow;
const cyan = chalk.cyan;
const magenta = chalk.magentaBright;
const readline = require("readline");

var people = new Map();

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output : process.stdout
});

io.on('connection', (socket) => {

    console.log(yellow(`New Client connected with ${socket.id}`));
    
    const sendMsg = () => {
        rl.question(magenta("You : "), function (msg) {
            socket.broadcast.emit("message", {name:'Server', msg});
            sendMsg();
        });
    }
    
    socket.on("join", ({ id, name, msg }) => {
        console.log(" - ");
        console.log(yellow(`${name} : ${msg}`));
        people.set(socket.id, name);
        socket.broadcast.emit("message", {name:'Server', msg: `${name} has joined`});
    })

    socket.on("message", ({id, msg}) => {
        console.log(" - ");
        console.log(cyan(`${people.get(id)} : ${msg}`));
        socket.broadcast.emit("message", {name:people.get(id), msg});
        sendMsg();
    })

    socket.on("disconnect", () => {
        const msg = `${people.get(socket.id)} disconnected`
        console.log(warning(msg))
        socket.broadcast.emit("message", {name:'Server', msg})
    })
})

app.get('/', (req, res) => {
    res.json({"message": "Server Started"})
})
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})
