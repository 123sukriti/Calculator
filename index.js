document.addEventListener('DOMContentLoaded', function() {
    const calculatorScreen = document.querySelector('.calculator-screen');
    const keys = document.querySelector('.calculator-keys');
    const historyList = document.getElementById('history-list');
    const clearHistoryButton = document.querySelector('.clear-history');
    let currentValue = '';
    let operator = '';
    let previousValue = '';
    let expression = '';
    let history = [];

    keys.addEventListener('click', function(event) {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) {
            return;
        }

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case 'sqrt':
            case 'pow':
            case 'sin':
            case 'cos':
            case 'tan':
                handleOperator(value);
                break;
            case '=':
                handleEquals();
                break;
            case '.':
                handleDecimal();
                break;
            case 'all-clear':
                handleClear();
                break;
            default:
                handleNumber(value);
                break;
        }

        updateScreen();
    });

    clearHistoryButton.addEventListener('click', function() {
        history = [];
        updateHistory();
    });

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentValue);

        if (operator && previousValue && currentValue) {
            handleEquals();
        } else {
            previousValue = inputValue;
        }

        operator = nextOperator;
        expression += `${currentValue} ${operator} `;
        currentValue = '';
    }

    function handleEquals() {
        const inputValue = parseFloat(currentValue);
        let result;

        switch (operator) {
            case '+':
                result = previousValue + inputValue;
                break;
            case '-':
                result = previousValue - inputValue;
                break;
            case '*':
                result = previousValue * inputValue;
                break;
            case '/':
                result = previousValue / inputValue;
                break;
            case 'sqrt':
                result = Math.sqrt(previousValue);
                break;
            case 'pow':
                result = Math.pow(previousValue, inputValue);
                break;
            case 'sin':
                result = Math.sin(previousValue * (Math.PI / 180));
                break;
            case 'cos':
                result = Math.cos(previousValue * (Math.PI / 180));
                break;
            case 'tan':
                result = Math.tan(previousValue * (Math.PI / 180));
                break;
            default:
                return;
        }

        expression += `${currentValue} = ${result}`;
        history.push(expression);

        currentValue = String(result);
        operator = '';
        previousValue = '';
        expression = '';

        updateHistory();
    }

    function handleNumber(number) {
        currentValue = currentValue === '' ? number : currentValue + number;
    }

    function handleDecimal() {
        if (!currentValue.includes('.')) {
            currentValue += '.';
        }
    }

    function handleClear() {
        currentValue = '';
        operator = '';
        previousValue = '';
        expression = '';
    }

    function updateScreen() {
        calculatorScreen.value = expression + currentValue;
    }

    function updateHistory() {
        historyList.innerHTML = history.map(entry => `<li>${entry}</li>`).join('');
    }
});
