import { getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement } from './utils.js';

const SIMILAR_ADVERT_COUNT = 5;

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
};

// Создание соотношея ключ-значение
const PROPERTYTYPE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
}


// создание рекламного объявления
const createAdvert = () => {
  const X = getRandomArbitrary(RANDOM_X_FIRST, RANDOM_X_SECOND, FLOW_POINT);
  const Y = getRandomArbitrary(RANDOM_Y_FIRST, RANDOM_Y_SECOND, FLOW_POINT);

  return {
    author: { avatar: 'img/avatars/user' + 0 + getRandomIntInclusive(AUTHOR_FIRST, AUTHOR_SECOND) + '.png' },
    offer: {
      title: getRandomArrayElement(OFFER.title),
      price: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
      features: OFFER.features.slice(getRandomIntInclusive(0, OFFER.features.length - 1)),
      description: getRandomArrayElement(OFFER.description),
      photos: getRandomArrayElement(OFFER.photos),
      rooms: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
      guests: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
      checkin: getRandomArrayElement(OFFER.checkin),
      checkout: getRandomArrayElement(OFFER.checkin),
      type: getRandomArrayElement(Object.values(PROPERTYTYPE)),
      address: {
        x: X,
        y: Y,
      },
    },
    location: {
      x: X,
      y: Y,
    },
  };
};

//создание массива объявлений
const randomAdvert = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());
randomAdvert;

export { randomAdvert };
