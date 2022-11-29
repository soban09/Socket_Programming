const { io } = require("socket.io-client");
const readline = require("readline");

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
});

const getByValue = (map, searchValue) => {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
}

const encrypt = (msg, k)=>{
    var key = parseInt(k);
    key = key%26;

    var lowerCaseMap = new Map();
    for(var i=97; i<=122; i++){
        lowerCaseMap.set(i,i-97);
    }

    var upperCaseMap = new Map();
    for(var i=65; i<=90; i++){
        upperCaseMap.set(i,i-65);
    }

    var encryptedText = "";
    for(var i=0; i<msg.length; i++){
        if(msg[i]==" "){
            encryptedText += " ";
        }
        else if(lowerCaseMap.has(msg.charCodeAt(i))){
            const newCharCode = (lowerCaseMap.get(msg.charCodeAt(i))+key)%26;
            encryptedText += String.fromCharCode(getByValue(lowerCaseMap, newCharCode));
        }
        else if(upperCaseMap.has(msg.charCodeAt(i))){
            const newCharCode = (upperCaseMap.get(msg.charCodeAt(i))+key)%26;
            encryptedText += String.fromCharCode(getByValue(upperCaseMap, newCharCode));
        }
    }
    return encryptedText;
}

const getInput = (userInput)=>{
    var Text = "";
    const n = userInput.length;
    for(var i=0; i<n-1; i++){
        Text += (userInput[i] + " ");
    }
    return {Text:Text, key:userInput[n-1]};
}

const sendMsg = () => {
    rl.question("Message : ", function (string) {
        userInput = string.split(" ");
        // var Text = userInput[0];
        // var key = userInput[1];

        var {Text, key} = getInput(userInput);

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

