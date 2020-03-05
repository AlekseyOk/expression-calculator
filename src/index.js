function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    
    let expression;

    for (let elem of expr) {
        if (elem != ' ') {
            expression += elem;
        } 
    }

    let leftBracketsCount = 0;
    let rightBracketsCount = 0;

    for (let elem of expression.split('')) {
        if (elem === '(') leftBracketsCount++;
        if (elem === ')') rightBracketsCount++;
    }

    if (leftBracketsCount != rightBracketsCount) throw new Error('ExpressionError: Brackets must be paired');

    let arr = [];

    if (expr.includes(' ')) {
        arr = expr.split(' ');
    } else arr = expr.split('');

    const precedency = {
        '+': 0,
        '-': 0,
        '/': 1,
        '*': 1
    }

    const calc = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '/': (a, b) => a / b,
        '*': (a, b) => a * b
    }

    let numbers = [];
    let symbols = [];

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] === '' || arr[i] === ' ') continue;

        if (arr[i] === '0' && arr[i - 1] === '/') throw new Error('TypeError: Division by zero.');

        if (arr[i] != '+' && arr[i] != '*' && arr[i] != '-' && arr[i] != '' && arr[i] != '(' && arr[i] != ')' && arr[i] != '/') {

            numbers.push(arr[i]);

        } else if (symbols.length === 0) {

            symbols.push(arr[i]);

        } else if (precedency[arr[i]] > precedency[symbols[symbols.length - 1]] || arr[i] == '(' || symbols[symbols.length - 1] == '(' && arr[i] != ')') {

            symbols.push(arr[i]);

        } else if (precedency[arr[i]] <= precedency[symbols[symbols.length - 1]]) {

            let result = calc[symbols.pop()](+numbers[numbers.length - 2], +numbers[numbers.length - 1]);
            numbers.splice(numbers.length - 2, 2, result);
            i--;

        } else if (arr[i] == ')' && symbols[symbols.length - 1] != '(') {

            let result = calc[symbols.pop()](+numbers[numbers.length - 2], +numbers[numbers.length - 1]);
            numbers.splice(numbers.length - 2, 2, result);
            i--;

        } else if (arr[i] == ')' && symbols[symbols.length - 1] == '(') {

            symbols.splice(symbols.length - 1, 1);

        }
    }

    for (let i = 0; i < symbols.length; i++) {
        let result = calc[symbols.pop()](+numbers[numbers.length - 2], +numbers[numbers.length - 1]);
        numbers.splice(numbers.length - 2, 2, result);
        i--;
    }
    return numbers[0];
}

module.exports = {
    expressionCalculator
}