'use strict'

const PROPERTY_TYPE = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
}

const templateFragment = document.querySelector('#card')
  .content
  .querySelector('article');


const createPopup = (offer) => {

  const cardElement = templateFragment.cloneNode(true);

  const titlePopup = cardElement.querySelector('.popup__title');
  titlePopup.textContent = offer.offer.title;
  if (!offer.offer.title) {
    titlePopup.remove();
  }

  const adressPopup = cardElement.querySelector('.popup__text--address');
  adressPopup.textContent = `${offer.offer.address.lat} это X ${offer.offer.address.lng} это Y`;
  if (!offer.offer.address.lat || !offer.offer.address.lng) {
    adressPopup.remove();
  }

  const pricePopup = cardElement.querySelector('.popup__text--price');
  pricePopup.textContent = `${offer.offer.price} ₽/ночь`;
  if (!offer.offer.price) {
    pricePopup.remove();
  }

  const typePopup = cardElement.querySelector('.popup__type');
  typePopup.textContent = PROPERTY_TYPE[offer.offer.type];

  if (!offer.offer.type) {
    typePopup.remove();
  }

  const capacityPopup = cardElement.querySelector('.popup__text--capacity');
  capacityPopup.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  if (!offer.offer.rooms || !offer.offer.guests) {
    capacityPopup.remove();
  }

  const timePopup = cardElement.querySelector('.popup__text--time');
  timePopup.textContent = `Заезд после ${offer.offer.checkin}  выезд до ${offer.offer.checkout}`;
  if (!offer.offer.checkin || !offer.offer.checkout) {
    timePopup.remove();
  }

  const featuresPopup = cardElement.querySelector('.popup__features');
  featuresPopup.innerHTML = '';
  const featuresArray = offer.offer.features;

  for (let i = 0; i <= featuresArray.length - 1; i++) {
    const ad = featuresArray[i];
    const newElement = document.createElement('li');
    newElement.classList.add('popup__feature', `popup__feature--${ad}`);
    featuresPopup.append(newElement);
  }

  if (!offer.offer.features) {
    featuresPopup.remove();
  }

  const descriptionPopup = cardElement.querySelector('.popup__description');
  descriptionPopup.textContent = offer.offer.description;
  if (!offer.offer.description) {
    descriptionPopup.remove();
  }

  const photosPopup = cardElement.querySelector('.popup__photos');
  const photoPopup = cardElement.querySelector('.popup__photo');

  photosPopup.innerHTML = '';
  const photosArray = offer.offer.photos;

  for (let i = 0; i <= photosArray.length - 1; i++) {
    const ad = photosArray[i];
    const newElement = photoPopup.cloneNode(true);
    newElement.src = ad;
    photosPopup.append(newElement);
  }
  if (!offer.offer.photos) {
    photosPopup.remove();
  }

  const avatarPopup = cardElement.querySelector('.popup__avatar');
  avatarPopup.src = offer.author.avatar;
  if (!offer.author.avatar) {
    avatarPopup.remove();
  }
  return cardElement;
};

export { createPopup };
