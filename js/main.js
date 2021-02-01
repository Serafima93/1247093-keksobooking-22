// first function

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

getRandomIntInclusive(10, 111);


// second function


const getRandomArbitrary = function (min, max, n) {
  let randomNumber

  if (min < 0 || max <= min) {
    randomNumber = 'Введите число больше 0! Максимум не может быть меньше минимума!'
  }
  else {
    randomNumber = (Math.random() * (max - min + 1) + min).toFixed(n);
  }
  return randomNumber
}
getRandomArbitrary(9, 10, 2);
