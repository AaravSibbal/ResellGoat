
import { Axios } from "axios";
// @ts-ignore
const axios: Axios = window.axios;


const firstNameInput = document.getElementById("first-name") as HTMLInputElement
const lastNameInput = document.getElementById("last-name") as HTMLInputElement
const emailInput = document.getElementById("email") as HTMLInputElement
const passwordInput = document.getElementById("password") as HTMLInputElement
const signupSubmitBtn = document.getElementById("signup-submit") as HTMLButtonElement
const clientFuckUps = document.getElementById('client-fuckups') as HTMLParagraphElement
const passRequirements = document.getElementById('pass-requirements') as HTMLParagraphElement
const showPasswordElem = document.getElementById('show-password') as HTMLInputElement
const inputArr: HTMLInputElement[] = [firstNameInput, lastNameInput, emailInput, passwordInput]


signupSubmitBtn.addEventListener("click", ()=>{
    signupSubmit()
})

showPasswordElem.addEventListener('click', ()=>{
    showPassword()
})

function showPassword(){
    if(showPasswordElem.checked){
        passwordInput.type = "text"
    }
    else{
        passwordInput.type = "password"
    }
}

function something(){
    const signupInfo = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

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
    if(inputValidation()){
        console.log("this works")
        something()
    }
    else{
        console.log("failed input")
        clientFuckUps.innerText = "Please make sure that all inputs are filled out"
    }    
}

function validateInputField(inputField: HTMLInputElement){
    let inputText = inputField.value;
    if(inputText === undefined){
        return false;
    }
    inputText = inputText.trim()
    if(inputText === ""){
        return false;
    }
    return true;
}


function isStrongPassword(password: string): string {
    // Implement your password complexity criteria
    const lowerCaseRegex = /(?=.*[a-z])/;
    const upperCaseRegex = /(?=.*[A-Z])/;
    const digitRegex = /(?=.*\d)/;
    const specialCharRegex = /(?=.*[@$!%*?&])/;
    const lengthRegex = /^.{8,}$/;
    const setRegex = /[A-Za-z\d@$!%*?&]+/
    if(!lowerCaseRegex.test(password)){
        return "At least one letter should be lowercase"
    }
    else if(!upperCaseRegex.test(password)){
        return "At least one letter should be uppercase"
    }
    else if(!digitRegex.test(password)){
        return "The should be at least one digit in the password"
    }
    else if(!specialCharRegex.test(password)){
        return "There should be at least one of special charecters in the password (?=.*[@$!%*?&])"
    }
    else if(!lengthRegex.test(password)){
        return "The password should have a length more than 8"
    }
    return "Good"
}

function inputValidation(): boolean{
    let i=0;
    while(i<inputArr.length){
        if(!validateInputField(inputArr[i])){

            return false
        }
        i++;    
    }
    if(isStrongPassword(passwordInput.value) !== "Good"){
        passRequirements.innerText = isStrongPassword(passwordInput.value)
        return false
    }
    else{
        passRequirements.innerText = ""
    }

    clientFuckUps.innerText = ""
    console.log("All Input has things!")
    return true;
}
