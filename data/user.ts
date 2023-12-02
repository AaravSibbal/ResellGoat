import { Shoe } from "./shoe";
import { getNikeShoe, NikeShoeType } from "./nike";


interface KeyValue{
    [sku:string]: any
}

class user{
    firstName:string;
    lastName:string;
    email:string
    shoeListBySKU: KeyValue
    constructor(IfirstName: string, IlastName:string, Iemail: string){
        this.firstName = IfirstName;
        this.lastName = IlastName;
        this.email = Iemail;
        this.shoeListBySKU = {};
    }
    async addShoeBySKU(SKU:string):Promise<void>{
        let shoe = new Shoe(SKU)
        
        let nikeShoe: NikeShoeType = await getNikeShoe(SKU)
        shoe.setPriceForNike(nikeShoe.price)
        shoe.setName(nikeShoe.name)
        
        console.log("b")
        // TODO: function that gets stockx shoe price  
        // TODO: function that gets alias shoe price
        this.shoeListBySKU.set(SKU, shoe)
        console.log("this is shoelist by sku")
        console.log(this.shoeListBySKU)
    }
    removeShoeBySKU(SKU: string):boolean|null{
        if(this.shoeListBySKU.has(SKU)){
            this.shoeListBySKU.delete(SKU)
            return true;
        }
        return null;
    }
}