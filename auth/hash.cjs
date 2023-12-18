const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

exports.generateHash = function (password){
    const hash  = bcrypt.hashSync(password, SALT_ROUNDS)
    return hash;
}

exports.compareHash = function(password, hashedPassword){
    
    const isSame = bcrypt.compareSync(password, hashedPassword)
    console.log("matching the passwords: "+isSame)
    return isSame
}