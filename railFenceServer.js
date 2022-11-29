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

function decrypt(encryptedText, k){
    var key=parseInt(k);
    var n = encryptedText.length;
    var rail = [];

    for(var i=0; i<key; i++){
        rail[i] = [];
        for(var j=0; j<n; j++){
            rail[i].push('@');
        }   
    }

    var goDown;
    var row = 0, col = 0;

    for (var i=0; i < n; i++){
        if (row == 0)
            goDown = true;
        if (row == key-1)
            goDown = false;
 
        rail[row][col] = '*';
        col++; 
        goDown?row++ : row--;
    }
 
    var index = 0;
    for (var i=0; i<key; i++){
        for (var j=0; j<n; j++){
            if (rail[i][j] == '*' && index<encryptedText.length)
                rail[i][j] = encryptedText[index++];
        }
    }

    var decryptedText="";
 
    row = 0, col = 0;
    for (var i=0; i< n; i++){
        if (row == 0)
            goDown = true;
        if (row == key-1)
            goDown = false; 
        if (rail[row][col] != '*')
            decryptedText += rail[row][col++]; 
        goDown?row++: row--;
    }

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
    res.json({
        "message": "Server Started"
    })
})
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})
