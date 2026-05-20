const add = function(num1, num2) {
    return parseFloat((num1 + num2).toFixed(4));
};

const subtract = function(num1, num2) {
    return parseFloat((num1 - num2).toFixed(4));
};

const multiply = function(num1, num2) {
    return parseFloat((num1 * num2).toFixed(4));
};

const divide = function(num1, num2) {
    if (num2 == 0) {
        isError = true;
    }
    else {
        return parseFloat((num1 / num2).toFixed(4));
    }
};

const powerCalc = function(num1, num2) {
    return parseFloat((Math.pow(num1, num2)).toFixed(4));
}

function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        case "x2":
            return powerCalc(num1, num2);
    }
}

const display = document.querySelector(".display");
const numButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const backspace = document.querySelector(".backspace");
const decimal = document.querySelector(".decimal");
const sign = document.querySelector(".sign");
const power = document.querySelector(".power");

let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";
let isOperatorClicked = false;
let isError = false;
let afterEquals = false;

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
        if (afterEquals) {
            firstNum = "";
            secondNum = "";
            operator = "";
            isOperatorClicked = false;
            afterEquals = false;
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
        afterEquals = false;
    });
});

equals.addEventListener("click", () => {
    if (isError) {
        return;
    }
    if (!secondNum) {
        display.textContent = firstNum;
        return;
    } else {
        result = operate(operator, firstNum, secondNum);
        firstNum = String(result);
        secondNum = "";
        display.textContent = firstNum;
    }
    isOperatorClicked = false;
    operator = "";
    afterEquals = true;
});

clear.addEventListener("click", () => {
    display.textContent = "0";
    firstNum = "";
    secondNum = "";
    operator = "";
    result = "";
    isOperatorClicked = false;
    isError = false;
    afterEquals = false;
});

backspace.addEventListener("click", () => {
    if (isError) {
        return;
    }
    if (isOperatorClicked) {
        secondNum = secondNum.slice(0, -1);
        display.textContent = secondNum;
    } else {
        firstNum = firstNum.slice(0, -1);
        display.textContent = firstNum;
    }
    afterEquals = false;
});

decimal.addEventListener("click", () => {
    if (isError) {
        return;
    }
    if (isOperatorClicked) {
        if (!secondNum.includes(".")) {
            secondNum += ".";
            display.textContent = secondNum;
        }
    } else {
        if (!firstNum.includes(".")) {
            firstNum += ".";
            display.textContent = firstNum;
        }
    }
});

sign.addEventListener("click", () => {
    if (isError) {
        return;
    }
});
