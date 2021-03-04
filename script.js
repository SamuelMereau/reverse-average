class Calculation {
  constructor(average, quantity) {
    this.average = average;
    this.quantity = quantity;
  }
}

(function () {
  const submitButton = document.querySelector('#submit');
  submitButton.addEventListener('click', function () {
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const queriedAverage = document.querySelector('#average').value;
    const queriedQuantity = document.querySelector('#quantity').value;
    const currentCalculation = new Calculation(queriedAverage, queriedQuantity);
    for (let i = 0; i < 10; i++) {
      const equation = document.createElement('p');
      const dataSet = calculate(currentCalculation);
      const sum = dataSet.reduce((a, b) => a + b, 0);
      equation.innerHTML = `<div id="equation"><table id="equation-formula"><tr><td>${dataSet
        .join()
        .replace(/[,]/g, ' + ')}</td></tr> <tr><td>${
        currentCalculation.quantity
      }</td></tr></table><p>= ${sum / currentCalculation.quantity}</div>`;
      output.appendChild(equation);
    }
  });
})();

function calculate(object) {
  const average = object.average;
  const quantity = object.quantity;
  let hasCalculated = false;
  let i = 0;
  while (hasCalculated == false) {
    if (i >= 5000) {
      //Input with no solution or just absolutely bonkers will be stopped (hopefully) before it eats all your RAM.
      hasCalculated = true;
      const form = document.querySelector('#form');
      if (document.querySelector('#error-message') !== null) {
        const errorMessage = document.querySelector('#error-message');
        form.removeChild(errorMessage);
      }
      const errorMessage = document.createElement('p');
      errorMessage.textContent =
        'This combination of numbers are either too large or impossible to achieve.';
      errorMessage.id = 'error-message';
      form.appendChild(errorMessage);
      return;
    }
    //Average is sum/quantity = average. Multiply by reciprocal to equal sum = average * quantity
    //In this case, we want i + x = manipulatedAverage
    const manipulatedAverage = average * quantity;
    const x = i - manipulatedAverage;
    //Now our equation looks like i + x = manipulatedAverage
    const formula = i + x;
    if (formula == manipulatedAverage) {
      //We have a match!
      hasCalculated = true;
      const form = document.querySelector('#form');
      if (document.querySelector('#error-message') !== null) {
        const errorMessage = document.querySelector('#error-message');
        form.removeChild(errorMessage);
      }
      return estimateDataSet(formula, object);
    } else {
      i += 1;
    }
  }
}

function estimateDataSet(num, object) {
  const average = object.average;
  const quantity = object.quantity;
  //If we don't have a high, low, or median, assume a dataset
  let makeRandomInt = Math.round(num - 0 * quantity);
  let output = [];
  for (let i = 0; i < quantity; i++) {
    output.push(Math.random());
  }

  let mult =
    makeRandomInt /
    output.reduce(function (a, b) {
      return a + b;
    });
  return output.map(function (el) {
    return Math.round(el * mult + 0);
  });
}
