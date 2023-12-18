const sqlite = require('sqlite3').verbose()
const uuid = require('uuid');
const DB_FILE = 'resell.db'
const hash = require('../auth/hash.cjs')

const DB_ERROR_MESSAGE = "There is a problem with the DB please try again later"
const db = new sqlite.Database(DB_FILE, (err)=>{
    if(err){
        console.error(err)
    }
    else{
        console.log('success on the connection');
    }
})
    
const doesUserExists = (email)=>{
    const query = `SELECT * FROM users WHERE email = ?`
    return new Promise((resolve, reject)=>{

        db.get(query, [email], (err, row)=>{
            if(err){
                console.error(err);
                reject(new Error(DB_ERROR_MESSAGE))
            }
            if(row){
                console.log(`User with the ${row.email} exists`);
                resolve(true)
            }
            resolve(false)
        })
    })
    // db.close()
}

const loginUser = (email, password)=>{
    const query = 'SELECT * FROM users WHERE email = ?'
    console.log("login user is being run")
    let reason = ""
    return new Promise((resolve, reject)=>{

        db.get(query, [email], (err, row)=>{
            if(err){
                reject(new Error(DB_ERROR_MESSAGE))
                
            }
            if(row){
                const isSame = hash.compareHash(password, row.pass)
                if(isSame) {
                    reason+="Good Password"
                    resolve(true)
                }
                else{
                    reason+="Incorect Password"
                    reject(new Error('Incorrect Password'))
                } 
            }   
            else{
                reason += "User does not exist"
                console.log("The user does not exist")
                reject(new Error("The User doesn't Exist"))
            }
        })
    })
}

const signupUser = (firstName, lastName, email, hashedPassword)=>{
    const query = `INSERT INTO users (id, firstName, lastName, email, pass) VALUES (?, ?, ?, ?, ?)`
    const newUUID = uuid.v4()
    
    return new Promise((resolve, reject)=>{

        db.run(query, [newUUID, firstName, lastName, email, hashedPassword], 
        function(err){
            if(err){
                console.log("there was an error from the server")
                reject(new Error(DB_ERROR_MESSAGE))
            }
            else{
                console.log(`User with email: ${email} is signed up`)
                resolve(true)
            }
        });
    });
}



const closeDB = ()=>{
    db.close((err)=>{
        if(err){
            console.error(err)
            console.log('There was an error closing the db')
        }
        else{
            console.log("DB was closed successfully")
        }
    })
}

module.exports = {
    db, closeDB, doesUserExists, signupUser, loginUser
}