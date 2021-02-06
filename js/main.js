const SIMILAR_ADVERT_COUNT = 10;

// константы локации
const RANDOM_X_FIRST = 35.65000;
const RANDOM_X_SECOND = 35.70000;
const FLOW_POINT = 5;
const RANDOM_Y_FIRST = 139.70000;
const RANDOM_Y_SECOND = 139.80000;

// константы автора
const AUTHOR_FIRST = 1;
const AUTHOR_SECOND = 8;

//Константы объявления. Я сделала одну для всех. Если не подходит можно добавить для кажого. В задание просто не указано сколько должно быть минимум и максимум
const MIN_NUMBER = 1;
const MAX_NUMBER = 10;

const OFFER = {
  title: ['Город Вызима', 'Химринг', 'Аббатсво В.Баскервильского'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['– Хорошо, хорошо. Не будешь княгиней. Станешь хомячком и будешь жить в норке.', 'Если бы больше людей ценили свой дом превыше золота, мир был бы лучше', 'Существует аббатство дневное и аббатство ночное. И ночное, как это ни прискорбно, намного интереснее'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  checkin: ['12: 00', '13: 00', '14: 00'],
  type: ['palace', 'flat', 'house', 'bungalow'],
};

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


// создание локации.
const createLocation = () => {
  return {
    x: getRandomArbitrary(RANDOM_X_FIRST, RANDOM_X_SECOND, FLOW_POINT),
    y: getRandomArbitrary(RANDOM_Y_FIRST, RANDOM_Y_SECOND, FLOW_POINT),
  };
};


// создание автора
const createAuthor = () => {
  return {
    avatar: 'img/avatars/user' + 0 + getRandomIntInclusive(AUTHOR_FIRST, AUTHOR_SECOND) + '.png',
  };
};

// создание рекламного текста
const createAdvertDescription = () => {
  return {
    title: getRandomArrayElement(OFFER.title),
    price: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
    features: OFFER.features.slice(getRandomIntInclusive(0, OFFER.features.length - 1)),
    description: getRandomArrayElement(OFFER.description),
    photos: getRandomArrayElement(OFFER.photos),
    rooms: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
    guests: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
    checkin: getRandomArrayElement(OFFER.checkin),
    checkout: getRandomArrayElement(OFFER.checkin),
    type: getRandomArrayElement(OFFER.type),
    adress: createLocation(),
  };
};

// создание рекламного объявления
const createAdvert = () => {
  return {
    author: createAuthor(),
    offer: createAdvertDescription(),
    location: createLocation(),
  };
};

//создание массива объявлений
const randomAdvert = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());
randomAdvert;

//Eslint требует чтобы функция хоть где-то использовалась.
// Пр. - randomAdvert' is assigned a value but never used
