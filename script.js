const display = document.querySelector(".display");
const numButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".operator");
const actionButtons = document.querySelectorAll(".action");
const clearButton = document.querySelector(".clear");
const resultButton = document.querySelector(".result");

let currentValue = "";

function updateDisplay() {
    display.textContent = currentValue || "0";
}

function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
}

function evaluateExpression() {
    if (!currentValue) {
        return 0;
    }

    const normalizedValue = currentValue.replace(/\s+/g, "");

    if (!/^[0-9+\-*/.]+$/.test(normalizedValue)) {
        throw new Error("Invalid expression");
    }

    return Function(`"use strict"; return (${normalizedValue})`)();
}

function setError() {
    currentValue = "Error";
    updateDisplay();
}

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentValue === "Error") {
            currentValue = "";
        }

        currentValue += button.textContent;
        updateDisplay();
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const operator = button.textContent;

        if (currentValue === "Error") {
            return;
        }

        if (!currentValue && operator !== "-") {
            return;
        }

        if (isOperator(currentValue.slice(-1))) {
            currentValue = currentValue.slice(0, -1) + operator;
        } else {
            currentValue += operator;
        }

        updateDisplay();
    });
});

actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        try {
            if (action === "random") {
                currentValue = Math.random().toFixed(6);
                updateDisplay();
                return;
            }

            const value = evaluateExpression();

            if (action === "round") {
                currentValue = String(Math.round(value));
            }

            if (action === "sqrt") {
                if (value < 0) {
                    throw new Error("Negative root");
                }

                currentValue = String(Math.sqrt(value));
            }

            if (action === "square") {
                currentValue = String(value ** 2);
            }

            if (action === "abs") {
                currentValue = String(Math.abs(value));
            }

            updateDisplay();
        } catch (error) {
            setError();
        }
    });
});

resultButton.addEventListener("click", () => {
    try {
        currentValue = String(evaluateExpression());
        updateDisplay();
    } catch (error) {
        setError();
    }
});

clearButton.addEventListener("click", () => {
    currentValue = "";
    updateDisplay();
});
