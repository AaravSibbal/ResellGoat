/**
 * This will get things from the nike website
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * the way we can check for the size availibility in the nike
 * is that we can see of the class is called class or disabled class inside the grid
 */
import puppeteer from "puppeteer";
export function getNikeShoe(SKU) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer.launch({ headless: 'new' });
        const page = yield browser.newPage();
        yield page.goto("https://www.nike.com/ca/");
        /**
         * this types the sku and opens the shoe up now we would need the info
         */
        yield page.waitForSelector("#gen-nav-commerce-header-v2 > div.pre-l-header-container > header > div.pre-l-wrapper.mauto-sm.d-sm-flx > div.pre-l-nav-box.flx-gro-sm-1 > div > div > div.d-sm-flx.flx-jc-lg-fe.u-position-rel > div > div > button.pre-search-btn.ripple > svg");
        yield page.click("#gen-nav-commerce-header-v2 > div.pre-l-header-container > header > div.pre-l-wrapper.mauto-sm.d-sm-flx > div.pre-l-nav-box.flx-gro-sm-1 > div > div > div.d-sm-flx.flx-jc-lg-fe.u-position-rel > div > div > button.pre-search-btn.ripple > svg");
        // await page.type("#VisualSearchInput", SKU, {delay:120})
        yield page.waitForSelector("#VisualSearchInput");
        yield page.click("#VisualSearchInput");
        yield page.type("#VisualSearchInput", SKU);
        yield page.keyboard.press("Enter");
        yield page.waitForNavigation();
        const shoeData = yield page.evaluate(() => {
            var _a, _b;
            const name = (_a = document.querySelector('.product-card__title')) === null || _a === void 0 ? void 0 : _a.textContent;
            const price = (_b = document.querySelector('.product-price')) === null || _b === void 0 ? void 0 : _b.textContent;
            return {
                name: (name === null || name === void 0 ? void 0 : name.trim()) || 'Name not found',
                price: (price === null || price === void 0 ? void 0 : price.trim()) || 'Price not found',
            };
        });
        console.log(JSON.stringify(shoeData, null, 2));
        setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield browser.close(); }), 5000);
        const newNikeShoe = {
            name: shoeData.name,
            price: shoeData.price
        };
        return newNikeShoe;
    });
}
// getNikeShoe("DZ4514-001")
//# sourceMappingURL=nike.js.map