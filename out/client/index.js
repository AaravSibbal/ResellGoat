var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const submitBtn = document.getElementById("submit-btn");
const skuText = document.getElementById("sku-input");
const result = document.getElementById("result");
submitBtn.addEventListener("click", () => {
    submit();
});
document.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        console.log("enter is pressed");
        event.preventDefault();
        submitBtn.click();
    }
});
function createURL(text) {
    let url = new URL("localhost:3000");
    url.searchParams.set("sku", text);
    return url;
}
function skuCheck(sku) {
    if (sku === undefined) {
        result.innerText = "sku is undefined";
        return null;
    }
    if (sku.length < 8) {
        result.innerText = "The length must be more than 8";
        return null;
    }
    if (sku.includes(" ")) {
        result.innerText = "The sku must not have a space";
        return null;
    }
    return sku;
}
function submit() {
    return __awaiter(this, void 0, void 0, function* () {
        let sku = skuText === null || skuText === void 0 ? void 0 : skuText.value;
        let checkedSKU = skuCheck(sku);
        if (checkedSKU === null) {
            return;
        }
        let url = createURL(checkedSKU);
        yield axios.get(`/shoe`, {
            params: {
                sku: checkedSKU
            }
        })
            .then(function (response) {
            // handle success
            console.log(response);
        })
            .catch(function (error) {
            result.innerText = "There is an error with the server, Please try again later";
            console.log(error);
        });
        console.log("submit button was clicked");
        console.log("text field input: " + (skuText === null || skuText === void 0 ? void 0 : skuText.value));
    });
}
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
