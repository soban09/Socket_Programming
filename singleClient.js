const { io } = require("socket.io-client");
const readline = require("readline");
const { send } = require("process");
const chalk = require('chalk')
const cyan = chalk.cyan;
const magenta = chalk.magentaBright;

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output : process.stdout
});

const sendMsg = () => {
    rl.question(cyan("You : "), function (string) {
        socket.emit("message", string);
        sendMsg();
    });
}

const socket = io("ws://localhost:5000")
socket.on("connect", () => {
    console.log(`Connected to Server running on ${socket.io.uri}`);
    console.log(socket.id);
    socket.on("message", (msg) => {
        console.log(" - ");
        console.log(magenta(`Server : ${msg.string}`));
        sendMsg();
    })

    sendMsg();
    socket.emit("join", { id: socket.id, msg: "Hello Server" });
});

