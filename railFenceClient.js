const { io } = require("socket.io-client");
const readline = require("readline");

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
});

const encrypt = (msg, k)=>{
    var key = parseInt(k);
    var arr = []
    var n = msg.length;

    for(var i=0; i<key; i++){
        arr[i] = [];
        for(var j=0; j<n; j++){
            arr[i].push('@');
        }   
    }

    var row=0, col=0;
    var goDown=1;

    for(let i=0; i<n; i++){
        arr[row][col] = msg.charAt(i);

        if(goDown){
            row++;
        }
        else{
            row--;
        }
        col++

        if(row==3){
            goDown=false;
            row=1;
        }
        if(row==-1){
            goDown=true;
            row=1;
        }
    }

    var encrypted = "";
    for(var i=0; i<key; i++){
        for(var j=0; j<n; j++){
            if(arr[i][j]!='@'){
                encrypted += arr[i][j];
            }
        }
    }

    return encrypted;
}

const sendMsg = () => {
    rl.question("Message : ", function (string) {
        userInput = string.split(" ");
        var Text = userInput[0];
        var key = userInput[1];

        console.log(`Text : ${Text}`);
        console.log(`Key : ${key}`);
        var encryptedText = encrypt(Text, key);
        console.log(`Encrypted Text : ${encryptedText}`);

        var toBeSend = encryptedText + " " + key;
        socket.emit("message", toBeSend);
        sendMsg();
    });
}

const socket = io("ws://localhost:3000")
socket.on("connect", () => {
    console.log(`Connected to Server running on ${socket.io.uri}`);
    console.log(socket.id);
    socket.on("message", (msg) => {
        console.log(`Decrypted text from Server : ${msg.decryptedText}`);
    })

    sendMsg();
    socket.emit("join", { id: socket.id, msg: "Hello Server" });
});

