/* По мне этот вариант красивее

const getRandomIntInclusive = function (min, max) {
  let result
  if (min < 0) {
    return 'Введите число больше 0!';
  }
  if (max <= min) {
    return 'Максимум не может быть меньше минимума!';
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result
}

getRandomIntInclusive(0, 10); */



const getRandomIntInclusive = function (min, max) {
  let result
  let mistake
  if (min < 0) {
    result = min;
    mistake = result;
  }
  if (max <= min) {
    result = max;
    mistake = result;
  }
  if (mistake) {
    return 'Введите число больше 0! Максимум не может быть меньше минимума!'
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  result = Math.floor(Math.random() * (max - min + 1)) + min;

  return result
}

getRandomIntInclusive(0, 10);


/*  Этот вариант мне также кажется более красивым

const getRandomArbitrary = function (min, max, n) {
  let randomNumber

  if (min < 0) {
    return 'Введите число больше 0!';
  }
  if (max <= min) {
    return 'Максимум не может быть меньше минимума!';
  }
  randomNumber = Math.random() * (max - min + 1) + min;

  return randomNumber.toFixed(n)
}
getRandomArbitrary(0, 10, 2);
*/

const getRandomArbitrary = function (min, max, n) {
  let randomNumber

  let mistake
  if (min < 0) {
    randomNumber = min;
    mistake = randomNumber;
  }
  if (max <= min) {
    randomNumber = max;
    mistake = randomNumber;
  }
  if (mistake) {
    return 'Введите число больше 0! Максимум не может быть меньше минимума!'
  }
  randomNumber = Math.random() * (max - min + 1) + min;
  return randomNumber.toFixed(n)
}
getRandomArbitrary(0, 10, 2);
