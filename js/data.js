
// удалю перед защитой



// import { getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement } from './utils.js';

// const SIMILAR_ADVERT_COUNT = 10;

// // константы локации
// const RANDOM_X_FIRST = 35.65000;
// const RANDOM_X_SECOND = 35.70000;
// const FLOW_POINT = 5;
// const RANDOM_Y_FIRST = 139.70000;
// const RANDOM_Y_SECOND = 139.80000;

// // константы автора
// const AUTHOR_FIRST = 1;
// const AUTHOR_SECOND = 8;

// //Константы объявления. Я сделала одну для всех. Если не подходит можно добавить для кажого. В задание просто не указано сколько должно быть минимум и максимум
// const MIN_NUMBER = 1;
// const MAX_NUMBER = 10;

// const OFFER = {
//   title: ['Город Вызима', 'Химринг', 'Аббатсво В.Баскервильского'],
//   features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
//   description: ['– Хорошо, хорошо. Не будешь княгиней. Станешь хомячком и будешь жить в норке.', 'Если бы больше людей ценили свой дом превыше золота, мир был бы лучше', 'Существует аббатство дневное и аббатство ночное. И ночное, как это ни прискорбно, намного интереснее'],
//   photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
//   checkin: ['12: 00', '13: 00', '14: 00'],
// };

// Создание соотношея ключ-значение
// const PROPERTY_TYPE = {
//   'palace': 'Дворец',
//   'flat': 'Квартира',
//   'house': 'Дом',
//   'bungalo': 'Бунгало',
// }


// // создание рекламного объявления
// const createAdvert = () => {
//   const LAT = getRandomArbitrary(RANDOM_X_FIRST, RANDOM_X_SECOND, FLOW_POINT);
//   const LNG = getRandomArbitrary(RANDOM_Y_FIRST, RANDOM_Y_SECOND, FLOW_POINT);

//   return {
//     author: { avatar: 'img/avatars/user' + 0 + getRandomIntInclusive(AUTHOR_FIRST, AUTHOR_SECOND) + '.png' },
//     offer: {
//       title: getRandomArrayElement(OFFER.title),
//       price: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
//       features: OFFER.features.slice(getRandomIntInclusive(0, OFFER.features.length - 1)),
//       description: getRandomArrayElement(OFFER.description),
//       photos: getRandomArrayElement(OFFER.photos),
//       rooms: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
//       guests: getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER),
//       checkin: getRandomArrayElement(OFFER.checkin),
//       checkout: getRandomArrayElement(OFFER.checkin),
//       type: getRandomArrayElement(Object.values(PROPERTY_TYPE)),
//       address: {
//         lat: LAT,
//         lng: LNG,
//       },
//     },
//     location: {
//       lat: LAT,
//       lng: LNG,
//     },
//   };
// };



// //создание массива объявлений

// const randomAdvert = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());

// вес карточки

// const getAdvertRank = (advert) => {

//   let rank = 0;
//   if (advert.offer.type === housingType.value) {
//     rank += 1;
// .slice()
// .sort(sortAdverts)
//   }

//   if (advert.offer.rooms === Number(housingRooms.value)) {
//     rank += 1;
//   }
//   if (advert.offer.guests === Number(housingGuests.value)) {
//     rank += 1;
//   }
//   let result;

//   // нужна помощь тут  ибо решение частичное, и мне кажется извращенное

//   if (housingPrice.value === 'low') {
//     result = advert.offer.price <= priceValues.START;
//     advert.offer.price === housingPrice.value;
//     rank += 1;
//     return result

//   }
//   if (housingPrice.value === 'middle') {
//     result = advert.offer.price >= priceValues.START && advert.offer.price <= priceValues.FINAL;
//     advert.offer.price === housingPrice.value;
//     rank += 1;
//   }
//   if (housingPrice.value === 'high') {
//     result = advert.offer.price >= priceValues.FINAL;
//     advert.offer.price === housingPrice.value;
//     rank += 1;
//   }

//   if (advert.offer.features.includes(newArray)) {
//     rank += 1;
//   }
//   return rank;
// };

// расположение рейтинга

// const sortAdverts = (advertA, advertB) => {
//   const rankA = getAdvertRank(advertA);
//   const rankB = getAdvertRank(advertB);

//   return rankB - rankA;
// }

// начинаем фильтрацию и отрисовку

// const samePropertyType = adverts.filter((ad) => {
//   if (ad.offer.type.includes(housingType.value)) {
//     return ad
//   }
//   if (housingType.value === 'any') {
//     return adverts
//   }
// }).filter((ad) => {
//   if (ad.offer.guests.toString().includes(housingGuests.value)) {
//     return ad
//   }
// }).filter((ad) => {
//   if (ad.offer.guests.toString().includes(housingGuests.value)) {
//     return ad
//   }
// }).filter((ad) => {
//   if (ad.offer.rooms.toString().includes(housingRooms.value)) {
//     return ad
//   }
// });
