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
const OFFER = {
  title: 'Пример',
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: 'Описание помещения',
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  checkin: '12: 00' || '13: 00' || '14: 00',
  checkout: '12: 00' || '13: 00' || '14: 00',
  type: 'palace' || 'flat' || 'house' || 'bungalow',
};
const SIMILAR_ADVERT_COUNT = 10;

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};



// создание локации
const createLocation = () => {
  return {
    x: getRandomArbitrary(35.65000, 35.70000, 5),
    y: getRandomArbitrary(139.70000, 139.80000, 5),
  };
};
createLocation();

// создание автора
const createAuthor = () => {
  return {
    avatar: 'img/avatars/user' + 0 + getRandomIntInclusive(1, 8) + '.png',
  };
};
createAuthor();

// создание рекламного текста
const createAdvertDescription = () => {
  return {
    title: OFFER.title,
    price: getRandomIntInclusive(0, 100),
    features: getRandomArrayElement(OFFER.features), //Значения не должны повторяться  массив случайной длины
    description: OFFER.description,
    photos: getRandomArrayElement(OFFER.photos),
    rooms: getRandomIntInclusive(1, 10),
    guests: getRandomIntInclusive(1, 8),
    checkin: OFFER.checkin, //как перебирать строки? создать массив или что?
    checkout: OFFER.checkout,
    type: OFFER.type,
    location: createLocation(),
  };
};
createAdvertDescription();

// создание рекламного объявления
const createAdvert = () => {
  return {
    author: createAuthor(),
    offer: createAdvertDescription(),
    location: createLocation(),
  };
};
createAdvert();

//создание массива объявлений

const randomAdvert = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());
randomAdvert

//Глобальная функция с ретерном?
