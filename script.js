// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let theme = "black"
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
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
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_op_percent").onclick = function(){
        if (a === '') return
        selectedOperation = '%'
    }
    document.getElementById("btn_op_sign").onclick = function() {
        if (a === '') return
        a = -a
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_back").onclick = function() {
        if (a === '') return
        a = parseInt(a/10)
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (a === '') return
        a = Math.sqrt(a)
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_2grade").onclick = function() {
        if (a === '') return
        a = a ** 2
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_factorial").onclick = function() {
        if (a === '') return
        var rval=1;
        for (var i = 2; i <= a; i++)
            rval = rval * i;
        a = rval
        outputElement.innerHTML = a
    }
    document.getElementById("btn_op_addthousand").onclick = function() {
        if (a === '') return
        a = a * 1000
        outputElement.innerHTML = a
    }

    document.getElementById("switch").onclick = function(){
        if (theme === "black") {
            document.body.style.backgroundColor = "#EFE9F4"
            theme = "white"
        } else {
            document.body.style.backgroundColor = "#4B7F52"
            theme = "black"
        }
    }

    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
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
        
        a = expressionResult
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    };