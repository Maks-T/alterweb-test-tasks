const inputNumber = document.querySelector('#input-number');
const inputN = document.querySelector('#input-N');
const inputM = document.querySelector('#input-M');

const btnStart = document.querySelector('#btnStart');
const container = document.querySelector('.container-right');

btnStart.addEventListener('click', () => {
  container.innerHTML = '';

  const numValue = +inputNumber.value;
  const N = +inputN.value;
  const M = +inputM.value;

  for (let i = 1; i <= numValue; i++) {
    if (i % N === 0 && i % M === 0) {
      container.innerHTML += '<div>alterweb</div>';
    } else if (i % N === 0) {
      container.innerHTML += '<div>alter</div>';
    } else if (i % M === 0) {
      container.innerHTML += '<div>web</div>';
    }
  }
});
