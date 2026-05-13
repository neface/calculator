const add = function(num1, num2) {
    return num1 + num2;
};

const subtract = function(num1, num2) {
    return num1 - num2;
};

const multiply = function(num1, num2) {
    return num1 * num2;
};

const divide = function(num1, num2) {
    if (num2 === 0) {
        return "Error: Number can't be divided by zero!";
    }
    return Math.round(num1 / num2 * 100) / 100;
};

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

const display = document.querySelector(".display");
const numButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");

let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";
let operatorClicked = false;

numButtons.forEach(button => {
    button.addEventListener("click", () => {
        firstNum += button.textContent;
        display.textContent = firstNum;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        firstNum = display.textContent;
        operator = button.textContent;
        display.textContent = operator;
        operatorClicked = true;
    });
});

equals.addEventListener("click", () => {
    secondNum = display.textContent;
    result = operate(operator, firstNum, secondNum);
    display.textContent = result;
});

clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNum = "";
    secondNum = "";
    operator = "";
    result = "";
    operatorClicked = false;
});