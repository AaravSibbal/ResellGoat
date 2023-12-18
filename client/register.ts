export function showPassword(passwordInputElem: HTMLInputElement, showPassElem: HTMLInputElement){
    if(showPassElem.checked){
        passwordInputElem.type = "text"
    }
    else{
        passwordInputElem.type = "password"
    }
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

export function inputValidation(inputArr: HTMLInputElement[], 
    passInputElem: HTMLInputElement, 
    passRequirementElem: HTMLParagraphElement, 
    clientFuckupElem: HTMLParagraphElement): boolean
    
    {
    let i=0;
    while(i<inputArr.length){
        if(!validateInputField(inputArr[i])){

            return false
        }
        i++;    
    }
    if(isStrongPassword(passInputElem.value) !== "Good"){
        passRequirementElem.innerText = isStrongPassword(passInputElem.value)
        return false
    }
    else{
        passRequirementElem.innerText = ""
    }

    clientFuckupElem.innerText = ""
    console.log("All Input has things!")
    return true;
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