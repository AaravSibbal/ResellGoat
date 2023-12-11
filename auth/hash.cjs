const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

exports.generateHash = function (password){
    const hash  = bcrypt.hashSync(password, 10)
    return hash;
}