// load users
const loadUsers = () => {
    try {
        const dataBuffer = fs.readFileSync('users.json')
        const JSONdata = dataBuffer.toString()
        return JSON.parse(JSONdata)
    } catch (error) {
        return []
    }
}
const saveUsers = (users) => {
    const JSONdata = JSON.stringify(users)
    fs.writeFileSync('users.json', JSONdata)
}
const signIn = (username, password) => {
    const users = loadUsers();
    const user = users.filter(user => user.username === username)
    if (!user)
        throw new Error('User Not Found !')
    else {
        console.log("Sign in Successfully")
        return user;
    }
}


const createAccount = (username, password, confirmPassword) => {
    const users = loadUsers();
    const duplicate = users.filter(user => user.username === username);
    if (duplicate)
        throw new Error('Username is already in use!')
    else {
        if(password !== confirmPassword) 
            throw new Error("Password do not match.");
        users.push({ username, password });
        saveUsers(users);
        console.log("Account created successfully please login to chat.")
    }
}

module.exports = {
    createAccount,
    signIn   
}