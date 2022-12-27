const calculatorScreen = document.querySelector(".calculator-screen");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".calculator-equals-key");
const operatorButtons = document.querySelectorAll(".calculator-operator-key");
const numberKeys = document.querySelectorAll(".calculator-number-key");

let operatorPressed = false;
let firstNum = null;
let currentOperator = null;
let firstKeyPressed = false;

function add(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1 + num2;
}

function subtract(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1 - num2;
}

function multiply(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1 * num2;
}

function divide(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (num2 == 0) {
        clearCalculator();
        alert("you knew better than to try that...")
    } else {
        return num1 / num2;
    }
}

function operate(operator, num1, num2) {
    if (operator == "+") {
        return add(num1, num2);
    } else if (operator == "-") {
        return subtract(num1, num2);
    } else if (operator == "X") {
        return multiply(num1, num2);
    } else if (operator == "÷") {
        return divide(num1, num2);
    }
}

numberKeys.forEach(key => {
    key.addEventListener("click", () => {
        updateCalculatorScreen(key.innerText);
    })
})

clearButton.addEventListener("click", () => clearCalculator());

equalsButton.addEventListener("click", () => calculate(currentOperator))

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        makeOperation(button.innerText);
    })
})

function makeOperation(operator) {
    if (operatorPressed && firstNum != null) {
        let calculationResult = operate(currentOperator, firstNum, calculatorScreen.innerText)
        firstNum = calculationResult;
        calculatorScreen.innerText = calculationResult;
        currentOperator = operator;
        firstKeyPressed = false;
    } else if (!operatorPressed && firstNum == null) {
        operatorPressed = true;
        currentOperator = operator;
        firstNum = calculatorScreen.innerText;
        firstKeyPressed = false;
    } else if (firstNum != null && !operatorPressed) {
        currentOperator = operator;
        operatorPressed = true;
    }
}

function calculate() {
    if (operatorPressed) {
        let calculationResult = operate(currentOperator, firstNum, calculatorScreen.innerText)
        calculatorScreen.innerText = calculationResult;
        firstNum = calculationResult;
        operatorPressed = false;
        currentOperator = null;
        firstKeyPressed = false;
        console.log("working tree, your first number is: " + firstNum + " Working with an operator of: " + currentOperator)
    }
}

function updateCalculatorScreen(numberKey) {
    if (!firstKeyPressed) {
        calculatorScreen.innerText = "" + numberKey
        firstKeyPressed = true;
    } else {
        calculatorScreen.innerText = calculatorScreen.innerText + numberKey
    }
}

function clearCalculator() {
    calculatorScreen.innerText = 0;
    currentOperator = null;
    firstNum = null;
    operatorPressed = false;
    firstKeyPressed = false;
}
