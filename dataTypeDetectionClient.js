const { io } = require("socket.io-client");
const readline = require("readline");

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
});

const sendMsg = () => {
    rl.question("Message : ", function (string) {
        console.log(`Input : ${string}`);
        socket.emit("message", string);
        sendMsg();
    });
}

const socket = io("ws://localhost:3000")
socket.on("connect", () => {
    console.log(`Connected to Server running on ${socket.io.uri}`);
    console.log(socket.id);
    socket.on("message", (msg) => {
        console.log(`Response from Server : ${msg.msgToBeSend}`);
    })

    sendMsg();
    socket.emit("join", { id: socket.id, msg: "Hello Server" });
});

