// custom attribute ko [] mai put karta hai 
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay =  document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
//yeah variable sara ka sara check boxes ko darsata hai sara ka sara list banka allcheck box mai ajainga
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let symbol = ' ~`!@#$%^&*()-_=+[{}]|\:;"<,>./?';


//starting mai password empty para hai
let password = "";

//starting mai password ki length 10 ka equal hai
let passwordLength = 10;

//starting mai ek check box tick rahta hai
let checkCount = 0;

//starting mai strenght ka ka jo indicator hai wo grey rahega

handleSlider();

//slider aga picha karta hai uska according value ko set kar dega
//handleslider ka kaam itna hi hai yeah password length ko UI pe reflect karwata hai
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}

// indecator set karna hai means color set kar rha 
function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRandomInteger(max,min){
   return Math.floor(Math.random()*(max-min)) + min;

}

function generateNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    //String.fromCharCode yeah convert karega number ko char mai
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    //String.fromCharCode yeah convert karega number ko char mai
    return String.fromCharCode(getRandomInteger(65,90));        
}

function generateSymbol(){
    const randomNum = getRandomInteger(0,symbol.length);
    return symbol.charAt(randomNum);
}

function calculateStrength(){
    let upperCheck = false;
    let lowerCheck = false;
    let numCheck = false;
    let symCheck = false;

    //agr iska checkbox checked hai tho true mark karna hai
    if(uppercaseCheck.checked) upperCheck = true;
    if(lowercaseCheck.checked) lowerCheck = true;
    if(numberCheck.checked) numCheck = true;
    if(symbolCheck.checked) symCheck = true;

    if(upperCheck && lowerCheck && (numCheck||symCheck) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((upperCheck || lowerCheck) && (numCheck || symCheck) && password >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    //writeText ka help sa hum copy kar painga clipboard 
    //mai and write text promise return karega jab promise
    // resolve hoga tab managenga humna chiza successfully copy kar li hai
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText("failed");
    }

    //is line sa copied button pe click karna sa wo ek copied likha hua ata hai
    //wo visible hojaiga span
    copyMsg.classList.add("active");

    //2sec baad invisible karna hai timeout sa kar skta hai
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

function shufflePassword(array){
    //fisher yates method
    for(let i = array.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        //swap
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str+=el) );
    return str;
}




//yaha hum event listner lagainga qki hum hum slider ka thumb ko aga picha 
//karenga tho data-length(password length) change hoga
//e.target slider ka value ko hi darsata hai jab hum left ya right move karta hai
 inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
 })


 //agr passwordDisplay mai koi value parri hai tab yeah copy karega
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

// function handleCheckBoxChange(){
//     checkCount = 0;
//     allCheckBox.forEach((checkbox)=>{
//         if(checkbox.checked)
//             checkCount++;
//     });

//     //edgecase agr password ki length less than check count hai password ki length ko equal kar dena hai check count mai
//     if(passwordLength < checkCount){
//         passwordLength = checkCount;
//     }
// }

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

//yaha hum loop ka dwara ek ek karka checkbox utha raha and usma event listner apply kar rha
// check boxes ka upr listner lagana hoga qki track rakh paai
// kitna checkbox ticked hai and change tick bhi ho skta hai untick bhi

// allCheckBox.forEach( (checkbox) => {
//     checkbox.addEventListener('change', handleCheckBoxChange);
// })

// generateBtn.addEventListener('click',() => {
//     //agr koi bhi check box ticked nai hai tho hum password generate nai kar sakta hai
//     if(checkCount == 0){
//         return;
//     }

//     //agr password ka length 1 hai and checkcount hai 4 tho hum check count ka barabar kar denga password length ko
//     if(passwordLength < checkCount){
//         passwordLength = checkCount;
//         //display bhi karana hai value
//         handleSlider();
//     }

//     //let's start the journey of new password

//     //remove old password
//     password = "";

//     //check box ka andar jo mangi gai hai wo sari chiza daal denga
//     // if(uppercaseCheck.checked){
//     //     password += generateUpperCase();
//     // }

//     // if(lowercaseCheck.checked){
//     //     password += generateLowerCase();
//     // }

//     // if(symbolCheck.checked){
//     //     password += generateSymbol();
//     // }

//     // if(numberCheck.checked){
//     //     password += generateNumber();
//     // }

//     let funcArr = [];

//     if(uppercaseCheck.checked)
//         funcArr.push(generateUpperCase);
    
//     if(lowercaseCheck.checked)
//         funcArr.push(generateLowerCase);

//     if(numberCheck.checked)
//         funcArr.push(generateNumber);

//     if(symbolCheck.checked)
//         funcArr.push(symbolCheck);

//     //compulsory addition
//     for(let i=0;i<funcArr.length;i++){
//         password += funcArr[i]();
//     } 

//     //remaining addition
//     for(let i=0;i<passwordLength-funcArr.length;i++){
//         let randIndex = getRandomInteger(0,funcArr.length);
//         password += funcArr[randIndex]();
//     }

//     //suffle the password 
//     //and password ko array ki form mai bhej raha hai
//     password = shufflePassword(Array.from(password));


//     //show in UI
//     passwordDisplay.value = password;
//     //caculate strength
//     calculateStrength();
// })

console.log('addevent listner mai jaao');
generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numberCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRandomInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calculateStrength();
});
// function generatePassword












