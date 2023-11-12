const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".calc-btn");
const themeSwitcher = document.querySelector("i");
const specialChars = ["%", "×", "/", "-", "+", "=", "÷"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "=", "+", "*", "-", ".", "/", "%"];
const themeChanger = document.querySelector(".theme-changer");
let output = "";
let theme = "dark";

function calculate(btnValue){
     if(btnValue === "=" && output !== ""){
          output = eval(output.replace("%", "/100").replace("×", "*").replace("÷", "/"));
          display.style.color = "#e69f51";
     }else if(btnValue === "AC"){
          output = "";
          display.style.color = (theme == "dark") ? "#ddd" : "#333";
     }else if(btnValue === "DEL"){
          output = output.toString().slice(0,-1);
          display.style.color = (theme == "dark") ? "#ddd" : "#333";
     }else{
          if(output === "" && specialChars.includes(btnValue)){return}
          if(btnValue == "*"){btnValue = "×"}
          if(btnValue == "/"){btnValue = "÷"}
          display.style.color = (theme == "dark") ? "#ddd" : "#333";
          output += btnValue;
     }

     display.value = output;
}

buttons.forEach(button => {
     button.addEventListener("click", e => {
          calculate(e.target.dataset.value);
     });
});

document.addEventListener('keydown', e => { 
     e.preventDefault();
     if(numbers.includes(e.key)){
          numbers.forEach(num => {
               if (e.key.toLowerCase() == num) {
                    calculate(e.key)
               }
          });
     }else if(e.key == "Enter"){
          calculate("=");
     }else if(e.key === "Backspace"){
          calculate("DEL");
     }
     else if(e.key === "Delete"){
          calculate("AC");
     }
});

themeSwitcher.addEventListener("click", () => {
     if(theme == "dark"){
          theme = "light";
          themeChanger.setAttribute("href", "");
     }else{
          theme = "dark";
          themeChanger.setAttribute("href", "theme.css");
     }
});