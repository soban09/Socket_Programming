const { io } = require("socket.io-client");
const readline = require("readline");

// interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
});

const encrypt = (m, k) => {
    var arr=[];
    var st = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var s = st.toLowerCase();
    var msg = m.toLowerCase();
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
    var msgL=msg.length;
    var keyL=key.length;
    var k=0;

    for(var i=0; i<msgL; i++){
        newKey += key.charAt(k);
        k=(k+1)%keyL;
    }

    var encryptedText = "";
    var encryptedText="";
    for(var i=0; i<msgL; i++){
        encryptedText += arr[newKey.charCodeAt(i)-97][msg.charCodeAt(i)-97];
    }

    return encryptedText;
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

