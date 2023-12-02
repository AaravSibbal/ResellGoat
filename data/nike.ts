/**
 * This will get things from the nike website
 */


/**
 * the way we can check for the size availibility in the nike
 * is that we can see of the class is called class or disabled class inside the grid
 */
import puppeteer from "puppeteer";
import { Shoe } from "./shoe";

export type NikeShoeType = {
    name: string;
    price: string;
}

export async function getNikeShoe(SKU: string){
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()

    await page.goto("https://www.nike.com/ca/")

    /**
     * this types the sku and opens the shoe up now we would need the info
     */
    await page.waitForSelector("#gen-nav-commerce-header-v2 > div.pre-l-header-container > header > div.pre-l-wrapper.mauto-sm.d-sm-flx > div.pre-l-nav-box.flx-gro-sm-1 > div > div > div.d-sm-flx.flx-jc-lg-fe.u-position-rel > div > div > button.pre-search-btn.ripple > svg")
    await page.click("#gen-nav-commerce-header-v2 > div.pre-l-header-container > header > div.pre-l-wrapper.mauto-sm.d-sm-flx > div.pre-l-nav-box.flx-gro-sm-1 > div > div > div.d-sm-flx.flx-jc-lg-fe.u-position-rel > div > div > button.pre-search-btn.ripple > svg")
    // await page.type("#VisualSearchInput", SKU, {delay:120})
    await page.waitForSelector("#VisualSearchInput")
    await page.click("#VisualSearchInput")
    await page.type("#VisualSearchInput", SKU)
    await page.keyboard.press("Enter")
    await page.waitForNavigation()


    const shoeData = await page.evaluate(() => {
        const name = document.querySelector('.product-card__title')?.textContent;
        const price = document.querySelector('.product-price')?.textContent;

        return {
            name: name?.trim() || 'Name not found',
            price: price?.trim() || 'Price not found',
        };
    });

    console.log(JSON.stringify(shoeData, null, 2));
    setTimeout(async ()=>await browser.close(), 5000)
    const newNikeShoe: NikeShoeType = {
        name: shoeData.name,
        price: shoeData.price
    };
    return newNikeShoe;
}

// getNikeShoe("DZ4514-001")





