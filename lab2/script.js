window.onload = function () {

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    outputElement = document.getElementById("result")

    digitButtons = document.querySelectorAll('[id ^= "btn-digit-"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
                outputElement.innerHTML = b
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    document.getElementById("btn-op-mult").onclick = function () {
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn-op-plus").onclick = function () {
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn-op-minus").onclick = function () {
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn-op-div").onclick = function () {
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn-op-percent").onclick = function () {
        if (a === '') return
        selectedOperation = '%'
    }
    document.getElementById("btn-op-sign").onclick = function () {
        if (a === '') return
        a = -a
        outputElement.innerHTML = a.toString();
    }
    document.getElementById("btn-op-back").onclick = function () {
        a.toString()
        if (a === '') return;
        a = a.slice(0, -1);
        if (a === '')
            a = '0';
        outputElement.innerHTML = a.toString();
    }
    document.getElementById("btn-op-sqrt").onclick = function () {
        if (a === '') return
        a = Math.sqrt(a)
        outputElement.innerHTML = a.toString()
    }
    document.getElementById("btn-op-2grade").onclick = function () {
        if (a === '') return
        a = a ** 2
        outputElement.innerHTML = a.toString();
    }
    document.getElementById("btn-op-factorial").onclick = function () {
        if (a === '') return
        let rval = 1;
        for (let i = 2; i <= a; i++)
            rval = rval * i;
        a = rval
        outputElement.innerHTML = a.toString();
    }
    document.getElementById("btn-op-addthousand").onclick = function () {
        if (a === '') return
        a = a * 1000
        outputElement.innerHTML = a.toString();
    }

    document.getElementById("btn-op-clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    document.getElementById("btn-op-equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a) % (+b)
                break;
        }

        a = expressionResult.toString()

        outputElement.innerHTML = a;
    }

    document.getElementById("blur").style.display = "none";

    function showLogin() {
        document.getElementById("blur").style.display = "flex";
        document.getElementById("email").focus();
    }

    function hideLogin() {
        document.getElementById("blur").style.display = "none";
    }

    document.getElementById("btn-login").addEventListener("click", showLogin);

    document.getElementById("blur").addEventListener("click", hideLogin);

    document.getElementById("login-popup").addEventListener("click", function (e) {
        e.stopPropagation();
    });
};