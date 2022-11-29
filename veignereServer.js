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

const decrypt = (encryptedTextCap, k) => {
    var arr=[];
    var st = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var s = st.toLowerCase();
    var encryptedText = encryptedTextCap.toLowerCase();
    var key = k.toLowerCase();

    for(var i=0;i<26;i++){
        if(i==0){
            arr.push(s);
            continue;
        }
        var st=s.substring(0,i);
        var en=s.substring(i,s.length);
        var final=en+st;
        arr.push(final);
    }

    var newKey = "";
    var encryptL=encryptedText.length;
    var keyL=key.length;
    var k=0;

    for(var i=0; i<encryptL; i++){
        newKey += key.charAt(k);
        k=(k+1)%keyL;
    }

    var decryptedText="";

    for(var i=0; i<encryptL; i++){
        var row = arr[newKey.charCodeAt(i)-97];
        var idx = row.indexOf(encryptedText.charAt(i));
        decryptedText += s[idx];
    }

    console.log(decryptedText);
    return decryptedText;
}

io.on('connection', (socket) => {

    console.log(success(`New Client connected with ${socket.id}`));
    socket.on("join", ({ id, msg }) => {
        console.log(success(`${id} : ${msg}`));
        socket.broadcast.emit("message", `New Client with id ${id} has joined`)
    })

    socket.on("message", (string) => {

        var userInput = string.split(" ");
        var encryptedText = userInput[0];
        var key = userInput[1];

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
    res.json({"message": "Server Started"})
})
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})
