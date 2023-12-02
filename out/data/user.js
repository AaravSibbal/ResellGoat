var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Shoe } from "./shoe";
import { getNikeShoe } from "./nike";
class user {
    constructor(IfirstName, IlastName, Iemail) {
        this.firstName = IfirstName;
        this.lastName = IlastName;
        this.email = Iemail;
        this.shoeListBySKU = {};
    }
    addShoeBySKU(SKU) {
        return __awaiter(this, void 0, void 0, function* () {
            let shoe = new Shoe(SKU);
            let nikeShoe = yield getNikeShoe(SKU);
            shoe.setPriceForNike(nikeShoe.price);
            shoe.setName(nikeShoe.name);
            console.log("b");
            // TODO: function that gets stockx shoe price  
            // TODO: function that gets alias shoe price
            this.shoeListBySKU.set(SKU, shoe);
            console.log("this is shoelist by sku");
            console.log(this.shoeListBySKU);
        });
    }
    removeShoeBySKU(SKU) {
        if (this.shoeListBySKU.has(SKU)) {
            this.shoeListBySKU.delete(SKU);
            return true;
        }
        return null;
    }
}
//# sourceMappingURL=user.js.map