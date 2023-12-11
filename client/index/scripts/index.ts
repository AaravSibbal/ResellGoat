import { Axios } from "axios";

// @ts-ignore
const axios: Axios = window.axios;
// const axios = require('axios');
const submitBtn:HTMLButtonElement|null = document.getElementById("submit-btn") as HTMLButtonElement
const skuText:HTMLTextAreaElement|null = document.getElementById("sku-input") as HTMLTextAreaElement
const result:HTMLParagraphElement|null = document.getElementById("result") as HTMLParagraphElement

submitBtn.addEventListener("click", ()=>{
    submit()
})

document.addEventListener('keypress', (event)=>{
    if(event.key === "Enter"){
        console.log("enter is pressed")
        event.preventDefault()
        submitBtn.click()
    }
})


// function createURL(text: string): URL{
//     let url = new URL("localhost:3000")

//     url.searchParams.set("sku", text)
    
//     return url
// }

function skuCheck(sku: string|undefined): string|null{

    if(sku === undefined){
        result!.innerText = "sku is undefined"
        return null
    }
    if(sku.length < 8){
        result!.innerText = "The length must be more than 8"
        return null
    }
    if(sku.includes(" ")){
        result!.innerText = "The sku must not have a space"
        return null
    }
    return sku
}



async function submit():Promise<void>{
    let sku:string|undefined|null = skuText?.value
    let checkedSKU = skuCheck(sku)
    if(checkedSKU === null){
        return
    }
    
    let data = await axios.get(`/shoe`, {
        params: {
            sku: checkedSKU
        }
    })
    .then(function(response: any){
        // handle success
        return response.data


    })
    .catch(function(error: any){
        result!.innerText = "There is an error with the server, Please try again later"
        console.log(error)
    })

    result!.innerText = `name = ${data.name} \nprice = ${data.price}`
    // console.log("submit button was clicked") 
    // console.log("text field input: "+skuText?.value)
}

async function fetchData() {
    
}

