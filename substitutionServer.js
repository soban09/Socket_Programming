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

const getByValue = (map, searchValue) => {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
}

const decrypt = (msg, k) => {
    var key = parseInt(k);
    key = key%26;
    key = 26-key;

    var lowerCaseMap = new Map();
    for(var i=97; i<=122; i++){
        lowerCaseMap.set(i,i-97);
    }

    var upperCaseMap = new Map();
    for(var i=65; i<=90; i++){
        upperCaseMap.set(i,i-65);
    }

    var decryptedText = "";
    for(var i=0; i<msg.length; i++){
        if(msg[i]==" "){
            decryptedText += " ";
        }
        else if(lowerCaseMap.has(msg.charCodeAt(i))){
            const newCharCode = (lowerCaseMap.get(msg.charCodeAt(i))+key)%26;
            decryptedText += String.fromCharCode(getByValue(lowerCaseMap, newCharCode));
        }
        else if(upperCaseMap.has(msg.charCodeAt(i))){
            const newCharCode = (upperCaseMap.get(msg.charCodeAt(i))+key)%26;
            decryptedText += String.fromCharCode(getByValue(upperCaseMap, newCharCode));
        }
    }
    return decryptedText;
}

const getInput = (userInput)=>{
    var Text = "";
    const n = userInput.length;
    for(var i=0; i<n-1; i++){
        Text += (userInput[i] + " ");
    }
    return {encryptedText:Text, key:userInput[n-1]};
}

io.on('connection', (socket) => {

    console.log(success(`New Client connected with ${socket.id}`));
    socket.on("join", ({ id, msg }) => {
        console.log(success(`${id} : ${msg}`));
        socket.broadcast.emit("message", `New Client with id ${id} has joined`)
    })

    socket.on("message", (string) => {
        
        var userInput = string.split(" ");
        // var encryptedText = userInput[0];
        // var key = userInput[1];

        var {encryptedText, key} = getInput(userInput);
 
        console.log(`Encrypted Text from Client ${socket.id} : ${encryptedText}`);
        console.log(`Key : ${key}`);

        var decryptedText = decrypt(encryptedText, key);
        console.log(`Decrypted Text : ${decryptedText}`);

        socket.emit("message", { id: socket.id, decryptedText });
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
