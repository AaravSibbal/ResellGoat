import express from 'express'
import fs from "fs"
import path, { dirname } from 'path'
import {join, resolve} from 'path'
import { fileURLToPath } from 'url'
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

app.get("/", (req, res)=>{
    const filePath = "client/index.html" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.get("/out/client/index.js", (req, res)=>{
    const filePath = "/out/client/index.js" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.get("/shoe/:sku", (req, res)=>{
    let sku = req.params.sku
    console.log("Sku: "+sku)
    res.send({data: "something"})
})
app.listen(3000, ()=>{
    console.log(`listening at port ${3000}: localhost:${3000}`) 
})