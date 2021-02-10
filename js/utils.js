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

// Создание рандомного эллемента массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};


export { getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement };
