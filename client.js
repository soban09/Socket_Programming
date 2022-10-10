const { io } = require("socket.io-client");
const readline = require("readline");
const {createAccount, signIn} = require('./utils/user');

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    // output: process.stdout
});

// create empty user input
let userInput = "";

const sendMsg = () => {
    rl.question("Message : ", function (string) {
        userInput = string;

        socket.emit("message", userInput)
        sendMsg();
    });
}

const socket = io("ws://localhost:3000")
socket.on("connect", () => {
    console.log(`Connected to Server running on ${socket.io.uri}`);
    console.log(socket.id);
    socket.on("message", (msg) => {
        console.log(msg);
    })

    sendMsg();
    socket.emit("join", { id: socket.id, msg: "Hello Server" });
});

