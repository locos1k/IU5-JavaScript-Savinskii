window.onload = function () {
  let a = '';                  
  let b = '';                  
  let expressionResult = '';    
  let selectedOperation = null; 

  const outputElement = document.getElementById('result');

  function resultToHexColor(value) { // функиция перевода в шестнадцатеричную систему
    let number = Math.abs(Math.round(value)); 
    let hex = number.toString(16);            

    // делаем ровно 6 символов
    if (hex.length < 6) {
      hex = hex.padStart(6, '0');
    } else if (hex.length > 6) {
      hex = hex.slice(-6);
    }

    return '#' + hex;
  }

  const exploreBtn = document.getElementById('explore-btn');
  const exploreMenu = document.getElementById('explore-menu');
  const arrow = document.querySelector('.arrow');

  if (exploreBtn && exploreMenu) {
    exploreBtn.onclick = function () {
      exploreMenu.classList.toggle('show');
      if (arrow) arrow.classList.toggle('rotate');
    };

    document.addEventListener('click', function (event) {
      if (!exploreBtn.contains(event.target) && !exploreMenu.contains(event.target)) {
        exploreMenu.classList.remove('show');
        if (arrow) arrow.classList.remove('rotate');
      }
    });
  }

  if (!outputElement) return;

  const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

  function onDigitButtonClicked(digit) {
    outputElement.style.color = 'white'; // если начинаем вводить, то возвращаем белый цвет
    if (!selectedOperation) {
      if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
        a += digit;
      }
      outputElement.innerHTML = a === '' ? '0' : a;
    } else {
      if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
        b += digit;
      }
      outputElement.innerHTML = b === '' ? '0' : b;
    }
  }

  digitButtons.forEach((button) => {
    button.onclick = function () {
      const digitValue = button.innerHTML; 
      onDigitButtonClicked(digitValue);
    };
  });

  document.getElementById('btn_op_mult').onclick = function () {
    if (a === '') return;
    selectedOperation = 'x';
  };

  document.getElementById('btn_op_plus').onclick = function () {
    if (a === '') return;
    selectedOperation = '+';
  };

  document.getElementById('btn_op_minus').onclick = function () {
    if (a === '') return;
    selectedOperation = '-';
  };

  document.getElementById('btn_op_div').onclick = function () {
    if (a === '') return;
    selectedOperation = '/';
  };

  document.getElementById('btn_op_clear').onclick = function () {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    outputElement.innerHTML = '0';
    outputElement.style.color = 'white';
  };

  document.getElementById('btn_op_sign').onclick = function () {
    if (!selectedOperation) {
      if (a === '' || a === '0') return;
      a = (-Number(a)).toString();
      outputElement.innerHTML = a;
    } else {
      if (b === '' || b === '0') return;
      b = (-Number(b)).toString();
      outputElement.innerHTML = b;
    }
  };

  document.getElementById('btn_op_percent').onclick = function () {
    if (!selectedOperation) {
      if (a === '') return;
      a = (Number(a) / 100).toString();
      outputElement.innerHTML = a;
    } else {
      if (b === '') return;
      b = (Number(b) / 100).toString();
      outputElement.innerHTML = b;
    }
  };

  document.getElementById('btn_op_equal').onclick = function () {
    if (a === '' || b === '' || !selectedOperation) return;

    switch (selectedOperation) {
      case 'x':
        expressionResult = Number(a) * Number(b);
        break;
      case '+':
        expressionResult = Number(a) + Number(b);
        break;
      case '-':
        expressionResult = Number(a) - Number(b);
        break;
      case '/':
        expressionResult = Number(a) / Number(b);
        break;
      default:
        return;
    }

    a = expressionResult.toString();
    b = '';
    selectedOperation = null;

    // переводим результат в hex-цвет
    const hexColor = resultToHexColor(expressionResult);

    // красим текст результата
    outputElement.style.color = hexColor;

    // выводим сам результат
    outputElement.innerHTML = a;
  };
};


