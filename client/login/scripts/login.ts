import { showPassword, inputValidation } from "../../register";

import { Axios } from "axios";
// @ts-ignore
const axios: Axios = window.axios;


const loginEmailInput = document.getElementById("email") as HTMLInputElement
const loginPasswordInput = document.getElementById("password") as HTMLInputElement
const loginSubmitBtn = document.getElementById("login-submit") as HTMLButtonElement
const loginClientFuckUps = document.getElementById('client-fuckups') as HTMLParagraphElement
const loginPassRequirements = document.getElementById('pass-requirements') as HTMLParagraphElement
const loginShowPasswordElem = document.getElementById('show-password') as HTMLInputElement
const inputArr: HTMLInputElement[] = [loginEmailInput, loginPasswordInput]


loginSubmitBtn.addEventListener("click", ()=>{
    loginSubmit()
})

loginShowPasswordElem.addEventListener('click', ()=>{
    showPassword(loginPasswordInput, loginShowPasswordElem)
})


function loginPost(){
    const loginInfo = {
        email: loginEmailInput.value,
        password: loginPasswordInput.value
    }
    console.log("This is the login info before the post req: "+loginInfo)
    axios.post('/login', loginInfo)
    .then(function (response: any){
        console.log("response: "+response.data)
        console.log('succeess')
    })
    .catch(function (error: any){
        console.log(error)
    })


}


function loginSubmit(){
    if(inputValidation(inputArr, loginPasswordInput, loginPassRequirements, loginClientFuckUps)){
        console.log("this works")
        loginPost()
    }
    else{
        console.log("failed input")
        loginClientFuckUps.innerText = "Please make sure that all inputs are filled out"
    }    
}