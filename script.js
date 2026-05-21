const display = document.querySelector("#displayValue");
const numButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const backspace = document.querySelector(".backspace");
const decimal = document.querySelector(".decimal");
const sign = document.querySelector(".sign");
const power = document.querySelector(".power");
const numButtonsArray = [...numButtons];
const operatorButtonsArray = [...operatorButtons];

let firstNum = "";
let secondNum = "";
let operator = "";
let result = "";
let isOperatorClicked = false;
let isError = false;
let afterEquals = false;

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
        display.textContent = "Error";
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

numButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (isError) {
            resetState(); 
        }
        if (afterEquals) {
            resetState();
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
        if (!firstNum) {
            firstNum = "0";
            display.textContent = firstNum;
        }
        if (secondNum) {
            result = operate(operator, firstNum, secondNum);
            if (isError) {
                return;
            }
            firstNum = String(result);
            secondNum = "";
            display.textContent = firstNum;
        }
        isOperatorClicked = true;
        operator = button.textContent;
        afterEquals = false;
    });
});

equals.addEventListener("click", () => {
    if (!secondNum) {
        display.textContent = firstNum;
        return;
    } else {
        result = operate(operator, firstNum, secondNum);
        if (isError) {
            return;
        }
        firstNum = String(result);
        secondNum = "";
        display.textContent = firstNum;
    }
    isOperatorClicked = false;
    operator = "";
    afterEquals = true;
});

clear.addEventListener("click", () => {
    resetState();
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
    if (isOperatorClicked) {
        secondNum = secondNum.startsWith("-") ? secondNum.slice(1) : `-${secondNum}`;
        display.textContent = secondNum;
    } else {
        firstNum = firstNum.startsWith("-") ? firstNum.slice(1) : `-${firstNum}`;
        display.textContent = firstNum;
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        numButtonsArray.find(btn => btn.textContent === e.key)?.click();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
        e.preventDefault();
        operatorButtonsArray.find(btn => btn.textContent === e.key)?.click();
    } else if (e.key === "Enter" || e.key === "=") {
        equals.click();
    } else if (e.key === "Backspace") {
        backspace.click();
    } else if (e.key === "Escape") {
        clear.click();
    } else if (e.key === ".") {
        decimal.click();
    }
});

function resetState() {
    firstNum = "";
    secondNum = "";
    operator = "";
    result = "";
    isOperatorClicked = false;
    isError = false;
    afterEquals = false;
    display.textContent = "0";
}