const fs = require('fs')
const hash = require('./auth/hash.cjs')
const bodyParser = require('body-parser')
const express = require('express')
const PORT = 3000
const path = require('path')



const currentFilePath = path.resolve(__filename);
const currentDir = path.resolve(__dirname);

const app = express();

const options = {
    root: path.join(currentDir)
}

app.use(express.static("node_modules"))
app.use(express.static("out"))
app.use(bodyParser.json())




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
    // DV0788-001
    const nikeShoe = await  getNikeShoe(sku)

    console.log("Sent Shoe: ")
    console.log(nikeShoe)
    res.send(JSON.stringify(nikeShoe))
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

app.post("/signup", bodyParser.json(),(req, res)=>{
    //TODO: please fix this so that req.body is no longer undefined
    const postData = req.body;
    
    console.log("Requested data: "+postData)
    res.send("success")
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
app.listen(3000, ()=>{
    console.log(`listening at port ${3000}: localhost:${3000}`) 
})