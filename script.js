let display = document.querySelector(".display");
let numButtons = document.querySelectorAll(".num");
let operatorButtons = document.querySelectorAll(".operator");
let clearButton = document.querySelector(".clear");
let resultButton = document.querySelector(".result");


let currentValue = '';
let previousValue = '';
let operation = '';

function updateDisplay(){
    display.textContent = currentValue;
    
}
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        //let num = button.textContent;
        currentValue += button.textContent;
        updateDisplay();
        

    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        previousValue = currentValue;
        operation = button.textContent;
        currentValue += operation
        updateDisplay();
    }
)
});

resultButton.addEventListener('click' , () => {
        currentValue = eval(currentValue);
        updateDisplay();
    })

clearButton.addEventListener('click', () =>{
    currentValue = ""
    updateDisplay();
})
