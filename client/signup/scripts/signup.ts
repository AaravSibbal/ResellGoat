import { showPassword, inputValidation } from "../../register";

import { Axios } from "axios";
// @ts-ignore
const axios: Axios = window.axios;


const signupFirstNameInput = document.getElementById("first-name") as HTMLInputElement
const signupLastNameInput = document.getElementById("last-name") as HTMLInputElement
const signupEmailInput = document.getElementById("email") as HTMLInputElement
const signupPasswordInput = document.getElementById("password") as HTMLInputElement
const signupSubmitBtn = document.getElementById("signup-submit") as HTMLButtonElement
const signupClientFuckUps = document.getElementById('client-fuckups') as HTMLParagraphElement
const signupPassRequirements = document.getElementById('pass-requirements') as HTMLParagraphElement
const signupShowPasswordElem = document.getElementById('show-password') as HTMLInputElement
const inputArr: HTMLInputElement[] = [signupFirstNameInput, signupFirstNameInput, signupFirstNameInput, signupPasswordInput]


signupSubmitBtn.addEventListener("click", ()=>{
    signupSubmit()
})

signupShowPasswordElem.addEventListener('click', ()=>{
    showPassword(signupPasswordInput, signupShowPasswordElem)
})



function signupPost(){
    const signupInfo = {
        firstName: signupFirstNameInput.value,
        lastName: signupLastNameInput.value,
        email: signupEmailInput.value,
        password: signupPasswordInput.value
    }
    console.log("This is the signup info before the post req: "+signupInfo)
    axios.post('/signup', signupInfo)
    .then(function (response: any){
        console.log("response: "+response.data)
        console.log('succeess')
    })
    .catch(function (error: any){
        console.log(error)
    })


}


function signupSubmit(){
    if(inputValidation(inputArr, signupPasswordInput, signupPassRequirements, signupClientFuckUps)){
        console.log("this works")
        signupPost()
    }
    else{
        console.log("failed input")
        signupClientFuckUps.innerText = "Please make sure that all inputs are filled out"
    }    
}



