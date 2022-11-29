const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const PORT = 3000;
const server = http.createServer(app)
const io = socketio(server)
const chalk = require('chalk')
const warning = chalk.bold.red;
const success = chalk.blue;

function checkSpecialCharacters(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    return specialChars.test(str);
}

function checkAlpha(x){
    let numbers = /[a-zA-Z]/;
    let result = numbers.test(x);
    if(result) {
        return true;
    }
    else {
        return false;
    }
}

function checkNumber(x) {
    let numbers = /[0-9]/;
    let result = numbers.test(x);
    if(result) {
        return true;
    }
    else {
        return false;
    }    
}

function checkFloat(x){
    let point = /[.]/;
    let result = point.test(x);
    if(result) {
        return true;
    }
    else {
        return false;
    }  
}

io.on('connection', (socket) => {

    console.log(success(`New Client connected with ${socket.id}`));
    
    socket.on("join", ({ id, msg }) => {
        console.log(success(`${id} : ${msg}`));
        socket.broadcast.emit("message", `New Client with id ${id} has joined`)
    })

    socket.on("message", (msg) => {

        var msgToBeSend;
        console.log(`Message from Client : ${socket.id} : ${msg}`);
        
        if(checkAlpha(msg) && checkNumber(msg)){
            msgToBeSend = "Its a alpha numeric string";
        }
        else if(checkNumber(msg)){
            if(checkFloat(msg)){
                msgToBeSend = "It is a floating point number";
            }
            else{
                msgToBeSend = "It is a integer value";
            }
        }
        else if(checkAlpha(msg)){
            msgToBeSend = "Its a string!";
        }
        
        if(checkSpecialCharacters(msg)){
            msgToBeSend = msgToBeSend + " It has special characters too";
        }
        
        console.log(`Result : ${msgToBeSend}`);
        socket.emit("message", { id: socket.id, msgToBeSend });
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
