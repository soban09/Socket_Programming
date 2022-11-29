var a = "-1"
var b = 10+parseInt(a);
// console.log(b);

var lowerCaseMap = new Map();
for(var i=97; i<=122; i++){
    lowerCaseMap.set(i,i-97);
}

var upperCaseMap = new Map();
    for(var i=65; i<=90; i++){
        upperCaseMap.set(i,i-65);
    }

// console.log(lowerCaseMap);

function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
}

var encryptedText = "";
var msg = "JapaN iS couTry"
var key=1;
    for(var i=0; i<msg.length; i++){
        if(msg[i]==" "){
            encryptedText += " ";
        }
        else if(lowerCaseMap.has(msg.charCodeAt(i))){
            const newCharCode = (lowerCaseMap.get(msg.charCodeAt(i))+key)%26;
            console.log(msg.charCodeAt(i), key, newCharCode);
            encryptedText += String.fromCharCode(getByValue(lowerCaseMap, newCharCode));
        }
        else if(upperCaseMap.has(msg.charCodeAt(i))){
            const newCharCode = (upperCaseMap.get(msg.charCodeAt(i))+key)%26;
            console.log(msg.charCodeAt(i), key, newCharCode);
            encryptedText += String.fromCharCode(getByValue(upperCaseMap, newCharCode));
        }
    }
    console.log(encryptedText);