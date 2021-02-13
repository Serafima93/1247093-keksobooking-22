import { randomAdvert } from './data.js';


const cardList = document.querySelector('#map-canvas');

const templateFragment = document.querySelector('#card')
  .content // Находим фрагмент с содержимым темплейта
  .querySelector('article'); // В фрагменте находим нужный элемент


const similarCards = randomAdvert;

similarCards.forEach((offer) => {
  const cardElement = templateFragment.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.offer.address.x + ' это X ' + offer.offer.address.y + ' это Y';
  cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offer.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = offer.offer.features; //- картинка?
  cardElement.querySelector('.popup__description').textContent = offer.offer.description;
  let ParentElemet = cardElement.querySelector('.popup__photos').children
  ParentElemet[0].src = offer.offer.photos;

  cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

  // Я понимаю что можно это как то сократить, но не догоняю как...
  if (offer.offer.title === undefined) {
    cardElement.querySelector('.popup__title').classList.remove('.popup__title');
  }
  if (offer.offer.address.x === undefined || offer.offer.address.y === undefined) {
    cardElement.querySelector('.popup__text--address').classList.remove('.popup__text--address');
  }
  if (offer.offer.price === undefined) {
    cardElement.querySelector('.popup__text--price').classList.remove('.popup__text--price');
  }
  if (offer.offer.type === undefined) {
    cardElement.querySelector('.popup__type').classList.remove('.popup__type');
  }
  if (offer.offer.rooms === undefined || offer.offer.guests === undefined) {
    cardElement.querySelector('.popup__text--capacity').classList.remove('.popup__text--capacity');
  }
  if (offer.offer.checkin === undefined || offer.offer.checkout === undefined) {
    cardElement.querySelector('.popup__text--time').classList.remove('.popup__text--time');
  }
  if (offer.offer.features === undefined) {
    cardElement.querySelector('.popup__feature').classList.remove('.popup__feature');
  }
  if (offer.offer.description === undefined) {
    cardElement.querySelector('.popup__description').classList.remove('.popup__description');
  }
  if (offer.offer.photos === undefined) {
    cardElement.querySelector('.popup__photos').classList.remove('.popup__photos');
  }
  if (offer.author.avatar === undefined) {
    cardElement.querySelector('.popup__avatar').classList.remove('.popup__avatar');
  }
  cardList.appendChild(cardElement);
});

