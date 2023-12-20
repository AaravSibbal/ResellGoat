// import { Shoe } from "./shoe.cjs";
// import { getNikeShoe } from "./nike.cjs";
const getNikeShoe = require('./nike.cjs')
const Shoe = require('./shoe.cjs')


class user{
    firstName;
    lastName;
    email
    shoeListBySKU
    constructor(IfirstName, IlastName, Iemail){
        this.firstName = IfirstName;
        this.lastName = IlastName;
        this.email = Iemail;
        this.shoeListBySKU = {};
    }
    async addShoeBySKU(SKU){
        let shoe = new Shoe(SKU)
        
        let nikeShoe = await getNikeShoe(SKU)
        shoe.setPriceForNike(nikeShoe.price)
        shoe.setName(nikeShoe.name)
        
        console.log("b")
        // TODO: function that gets stockx shoe price  
        // TODO: function that gets alias shoe price
        this.shoeListBySKU.set(SKU, shoe)
        console.log("this is shoelist by sku")
        console.log(this.shoeListBySKU)
    }
    removeShoeBySKU(SKU){
        if(this.shoeListBySKU.has(SKU)){
            this.shoeListBySKU.delete(SKU)
            return true;
        }
        return null;
    }
}