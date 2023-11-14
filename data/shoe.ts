export class Shoe{
    SKU: string;
    name: string|null;
    priceAtNike: string|null;
    priceAtStockX: string|null;
    priceAtAlias: string|null
    
    constructor(ISKU: string){
        this.SKU = ISKU;
        this.name = null;
        this.priceAtNike = null;
        this.priceAtStockX = null;
        this.priceAtAlias = null
    }

    getName():string|null{
        return this.name
    }

    getPriceAtNike():string|null{
        return this.priceAtNike;
    }
    getPriceAtStockX():string|null{
        return this.priceAtStockX
    }
    getPriceAtAlias():string|null{
        return this.priceAtAlias
    }
    getSKU():string{
        return this.SKU;
    }
    setName(newName:string):void{
        this.name = newName
    }
    setPriceForNike(newPrice:string):void{
        this.priceAtNike = newPrice
    }
    setPriceForStockX(newPrice:string):void{
        this.priceAtStockX = newPrice;
    }
    setPriceForAlias(newPrice:string):void{
        this.priceAtAlias = newPrice;
    }




}