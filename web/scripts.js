const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".calc-btn");
const specialChars = ["%", "×", "/", "-", "+", "=", "÷"]
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "=", "+", "*", "-", ".", "/", "%"]
let output = "";

function calculate(btnValue){
     if(btnValue === "=" && output !== ""){
          output = eval(output.replace("%", "/100").replace("×", "*").replace("÷", "/"));
          display.style.color = "#e69f51";
     }else if(btnValue === "AC"){
          output = "";
          display.style.color = "#333";
     }else if(btnValue === "DEL"){
          output = output.toString().slice(0,-1);
          display.style.color = "#333";
     }else{
          if(output === "" && specialChars.includes(btnValue)){return}
          if(btnValue == "*"){btnValue = "×"}
          if(btnValue == "/"){btnValue = "÷"}
          display.style.color = "#333";
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
     console.log(e.key)
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