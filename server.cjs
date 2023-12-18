const fs = require('fs')
const hash = require('./auth/hash.cjs')
const bodyParser = require('body-parser')
const express = require('express')
const PORT = 3000
const path = require('path')
const {db, closeDB, doesUserExists, signupUser, loginUser} = require('./routes/connection.cjs')

const SERVER_ERROR_MESSAGE = "There is a problem with the server please try again later"

const currentFilePath = path.resolve(__filename);
const currentDir = path.resolve(__dirname);

const app = express();

const options = {
    root: path.join (currentDir)
}

app.use(express.static("node_modules"))
app.use(express.static("out"))
app.use(bodyParser.json())

const onDbConnected = ()=>{
    console.log('Database is Connected')
    // closeDB()
}


app.get("/auth/hash", (req, res)=>{
    const filePath = "out/auth/hash.js" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.get("/", (req, res)=>{
    const filePath = "client/index/index.html" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.get("/index.js", (req, res)=>{
    const filePath = "/out/client/index/scripts/index.js" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.get("/shoe", async (req, res)=>{
    const sku = req.query.sku
    console.log("Sku: "+sku)
    let nikeShoe
    // DV0788-001
    try {
        nikeShoe = await getNikeShoe(sku)
        res.status(200).send(JSON.stringify(nikeShoe))
    } catch (error) {
        res.status(500).send(error)
    }
    

    console.log("Sent Shoe: ")
    console.log(nikeShoe)
})

app.get("/register", (req, res)=>{
    const filePath = "out/client/register.js" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})
app.get("/signup.js", (req, res)=>{
    const filePath = "out/client/signup/scripts/signup.js" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})
app.get("/signup", (req, res)=>{
    const filePath = "client/signup/signup.html" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.post("/signup", bodyParser.json(),async(req, res)=>{
    const postData = req.body;
    const firstName = postData.firstName;
    const lastName = postData.lastName;
    const email = postData.email;
    const password = hash.generateHash(postData.password)
    let doesExist;
    console.log(`first name: ${firstName}\n last name: ${lastName} \nemail: ${email} \npassword: ${password}`)
    try {
        doesExist = await doesUserExists(email)
    } catch (error) {
        res.status(502).send(err)
    }
    
    if(doesExist){
        try {
            res.status(201).send(await signupUser(firstName, lastName, email, password))
        } catch (error) {
            res.status(502).send(err)
        }
    }
    else{
        res.status(409).send("The user already exsists")
        console.log("The user already exists")
    }
})

app.get("/login.js", (req, res)=>{
    const filePath = "out/client/login/scripts/login.js" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})
app.get("/login", (req, res)=>{
    const filePath = "client/login/login.html" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.post("/login", bodyParser.json(), async(req, res)=>{
    const postData = req.body;
    const email = postData.email;
    const password = postData.password
    
    try {
        const isValid = await loginUser(email, password)
        res.status(201).send()
    } catch (error) {
        if(error.message === "Incorrect Password"){
            res.status(401).send(error)   
        }
        else if(error.message === "The User doesn't Exist"){
            res.status(401).send(error)
        }
        else{
            res.status(502).send(new Error(DB_ERROR_MESSAGE))
        }
    }
    // console.log(`email: ${email} \npassword: ${password}`)
})

require("./routes/connection.cjs").onDbConnected = onDbConnected();
// closeDB()
app.listen(3000, ()=>{
    console.log(`listening at port ${3000}: localhost:${3000}`) 
})