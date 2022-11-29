const { io } = require("socket.io-client");
const readline = require("readline");
const { send } = require("process");
const chalk = require('chalk')
const red = chalk.red;
const cyan = chalk.cyan;
const yellow = chalk.yellow;
const magenta = chalk.magentaBright;

var name;

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output : process.stdout
});



const socket = io("ws://localhost:3000")
socket.on("connect", () => {
    console.log(`Connected to Server running on ${socket.io.uri}`);
    console.log(socket.id);

    const sendMsg = () => {
        rl.question(cyan("You : "), function (msg) {
            socket.emit("message", {id:socket.id, msg});
            sendMsg();
        });
    }

    rl.question(yellow("Whats Your Name ? : "), function(n){
        name = n;
        socket.on("message", ({name, msg}) => {
            console.log(" - ");
            if(name==="Server"){
                console.log(red(`${name} : ${msg}`));
            } else{
                console.log(magenta(`${name} : ${msg}`));
            }
            sendMsg();
        })
    
        sendMsg();
        socket.emit("join", { id: socket.id, name, msg: "Hello Server" });
    })
});

