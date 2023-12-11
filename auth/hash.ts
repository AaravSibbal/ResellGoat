import { hashSync, compareSync } from "bcrypt";
const SALT_ROUNDS = 10
let pass = "Aarav1514"



export function generateHash(password: string): string{
    const hash  = hashSync(password, 10)
    return hash;
}
const hash = generateHash(pass)



console.log(compareSync(pass, hash))