export class Shoe {
    constructor(ISKU) {
        this.SKU = ISKU;
        this.name = null;
        this.priceAtNike = null;
        this.priceAtStockX = null;
        this.priceAtAlias = null;
    }
    getName() {
        return this.name;
    }
    getPriceAtNike() {
        return this.priceAtNike;
    }
    getPriceAtStockX() {
        return this.priceAtStockX;
    }
    getPriceAtAlias() {
        return this.priceAtAlias;
    }
    getSKU() {
        return this.SKU;
    }
    setName(newName) {
        this.name = newName;
    }
    setPriceForNike(newPrice) {
        this.priceAtNike = newPrice;
    }
    setPriceForStockX(newPrice) {
        this.priceAtStockX = newPrice;
    }
    setPriceForAlias(newPrice) {
        this.priceAtAlias = newPrice;
    }
}
//# sourceMappingURL=shoe.js.map