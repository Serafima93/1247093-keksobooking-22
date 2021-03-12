'use strict'

const ALERT_SHOW_TIME = 10000;

const getRandomIntInclusive = function (min, max) {
  let randomNumber

  if (min < 0 || max <= min) {
    randomNumber = 'Введите число больше 0! Максимум не может быть меньше минимума!'
  }
  else {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return randomNumber
}
const getRandomArbitrary = function (min, max, n) {
  let randomNumber

  if (min < 0 || max <= min) {
    randomNumber = 'Введите число больше 0! Максимум не может быть меньше минимума!'
  }
  else {
    randomNumber = (Math.random() * (max - min) + min).toFixed(n);
  }
  return randomNumber
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1001;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '300px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export { getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement, showAlert };
