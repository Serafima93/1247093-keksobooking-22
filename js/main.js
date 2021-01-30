// Целым +
// Включать ноль +
// Включать максимум +
// Не разрешать минус +
// Минимум меньше максимума +

//Основа функции взята с сайта https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntInclusive = function (min, max) {
  if (min < 0) {
    return 'Введите число больше 0!';
  }
  else if (max <= min) {
    return 'Максимум не может быть меньше минимума!';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntInclusive(0, 10);


// Дробным+
// Включать ноль+
// Включать максимум+
// Не разрешать минус+
// Знаки после запятой+

//Основа функции взята с сайта https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// А также с сайта https://coderoad.ru/50890410/%D0%9F%D0%BE%D0%B4%D1%81%D1%87%D0%B5%D1%82-%D1%87%D0%B8%D1%81%D0%B5%D0%BB-%D0%BF%D0%BE%D1%81%D0%BB%D0%B5-%D0%B7%D0%B0%D0%BF%D1%8F%D1%82%D0%BE%D0%B9-%D0%B2-JavaScript



let randomNumber
let numberComma

const getRandomArbitrary = function (min, max) {
  if (min < 0) {
    return 'Введите число больше 0!';
  }
  else if (max <= min) {
    return 'Максимум не может быть меньше минимума!';
  }
  randomNumber = Math.random() * (max - min + 1) + min;
  {
    const decimalCount = function (number) {
      const numberAsString = number.toString();

      if (numberAsString.includes('.')) {
        return numberAsString.split('.')[1].length;
      }
      return 0;
    }
    numberComma = decimalCount(randomNumber);
  }
  return randomNumber + ' рандомальный номер и его колличество знаков после запятой - ' + numberComma
}
getRandomArbitrary(0, 10);
