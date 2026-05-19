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
    if (num2 == 0) {
        isError = true;
    }
    else {
        return Math.round(num1 / num2 * 100) / 100;
    }
};

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            num1 = Number(num1);
            num2 = Number(num2);
            return add(num1, num2);
        case "-":
            num1 = Number(num1);
            num2 = Number(num2);
            return subtract(num1, num2);
        case "*":
            num1 = Number(num1);
            num2 = Number(num2);
            return multiply(num1, num2);
        case "/":
            num1 = Number(num1);
            num2 = Number(num2);
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
let isOperatorClicked = false;
let isError = false;

numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (isError) {
            firstNum = "";
            secondNum = "";
            operator = "";
            result = "";
            isOperatorClicked = false;
            isError = false; 
        }
        if (isOperatorClicked) {
            secondNum += button.textContent;
            display.textContent = secondNum;
        }
        else{
            firstNum += button.textContent;
            display.textContent = firstNum;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (isError) {
            return;
        }
        if (secondNum) {
            result = operate(operator, firstNum, secondNum);
            firstNum = result;
            secondNum = "";
            display.textContent = result;
        }
        isOperatorClicked = true;
        operator = button.textContent;
    });
});

equals.addEventListener("click", () => {
    if (isError) {
        return;
    }
    result = operate(operator, firstNum, secondNum);
    firstNum = result;
    secondNum = "";
    display.textContent = result;
    isOperatorClicked = false;
});

clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNum = "";
    secondNum = "";
    operator = "";
    result = "";
    isOperatorClicked = false;
    isError = false;
});