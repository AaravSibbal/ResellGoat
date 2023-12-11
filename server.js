import express from 'express'
import fs from "fs"
import path, { dirname } from 'path'
import {join, resolve} from 'path'
import { fileURLToPath } from 'url'
import { getNikeShoe } from './out/data/nike.js'
import pkg from 'body-parser';
const { bodyParser} = pkg;
const PORT = 3000

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl)
const currentDir = resolve(dirname(currentFilePath))

const app = express();

const options = {
    root: join(currentDir)
}

app.use(express.static("node_modules"))
app.use(express.static("out"))




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

app.post("/signup", (req, res)=>{
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