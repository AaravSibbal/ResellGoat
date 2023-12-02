import express from 'express'
import fs from "fs"
import path, { dirname } from 'path'
import {join, resolve} from 'path'
import { fileURLToPath } from 'url'
import { getNikeShoe } from './out/data/nike.js'

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


app.get("/node_modules/axios/index.cjs ", (req, res)=>{
    const filePath = "/node_modules/axios/index.js " 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            console.log(err)
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.get("/index.js", (req, res)=>{
    const filePath = "/out/client/scripts/index.js" 
    res.sendFile(filePath, options, (err)=>{
        if(err){
            next(err)
        }
        else{
            console.log("sent: "+filePath)
        }
    })
})

app.get("/shoe", (req, res)=>{
    const sku = req.query.sku
    console.log("Sku: "+sku)
    // DV0788-001
    const nikeShoe = getNikeShoe(sku)

    res.send(JSON.stringify(nikeShoe))
})
app.listen(3000, ()=>{
    console.log(`listening at port ${3000}: localhost:${3000}`) 
})