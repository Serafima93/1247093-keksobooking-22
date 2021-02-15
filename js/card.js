import { createAdvert } from './data.js';


const cardList = document.querySelector('#map-canvas');

const templateFragment = document.querySelector('#card')
  .content // Находим фрагмент с содержимым темплейта
  .querySelector('article'); // В фрагменте находим нужный элемент



// Функция создания рандомного колличества карточек
const randomCard = new Array(1).fill(null).map(() => createAdvert());
const similarCards = randomCard;





similarCards.forEach((offer) => {
  const cardElement = templateFragment.cloneNode(true);

  let titlePopup = cardElement.querySelector('.popup__title');
  titlePopup.textContent = offer.offer.title;
  if (offer.offer.title === undefined) {
    titlePopup.classList.remove();
  }

  let adressPopup = cardElement.querySelector('.popup__text--address');
  adressPopup.textContent = `${offer.offer.address.x} это X ${offer.offer.address.y} это Y`;
  if (offer.offer.address.x === undefined || offer.offer.address.y === undefined) {
    adressPopup.classList.remove();
  }

  let pricePopup = cardElement.querySelector('.popup__text--price');
  pricePopup.textContent = `${offer.offer.price} ₽/ночь`;
  if (offer.offer.price === undefined) {
    pricePopup.classList.remove();
  }

  let typePopup = cardElement.querySelector('.popup__type');
  typePopup.textContent = offer.offer.type;
  if (offer.offer.type === undefined) {
    typePopup.classList.remove();
  }

  let capacityPopup = cardElement.querySelector('.popup__text--capacity');
  capacityPopup.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  if (offer.offer.rooms === undefined || offer.offer.guests === undefined) {
    capacityPopup.classList.remove();
  }

  let timePopup = cardElement.querySelector('.popup__text--time');
  timePopup.textContent = `Заезд после ${offer.offer.checkin}  выезд до ${offer.offer.checkout}`;
  if (offer.offer.checkin === undefined || offer.offer.checkout === undefined) {
    timePopup.classList.remove();
  }



  let featuresPopup = cardElement.querySelector('.popup__features');// ищем родительскй элемент
  featuresPopup.innerHTML = ''; //очищаем его
  let featuresArray = offer.offer.features; //ищем массив данных

  for (let i = 0; i <= featuresArray.length - 1; i++) {
    let ad = featuresArray[i];

    let newElement = document.createElement('li'); // создаем новый элемент
    newElement.classList.add('popup__feature'); //добавляем ему класс первый
    newElement.classList.add('popup__feature--'+ad); //добавляем ему класс первый

    featuresPopup.append(newElement); // добавляем его в список



  }




  if (offer.offer.features === undefined) {
    featuresPopup.classList.remove();
  }


  let descriptionPopup = cardElement.querySelector('.popup__description');
  descriptionPopup.textContent = offer.offer.description;
  if (offer.offer.description === undefined) {
    descriptionPopup.classList.remove();
  }

  let photosPopup = cardElement.querySelector('.popup__photos');
  let parentElemet = photosPopup.children
  parentElemet[0].src = offer.offer.photos;
  if (offer.offer.photos === undefined) {
    photosPopup.classList.remove();
  }

  let avatarPopup = cardElement.querySelector('.popup__avatar');
  avatarPopup.src = offer.author.avatar;
  if (offer.author.avatar === undefined) {
    avatarPopup.classList.remove();
  }
  cardList.appendChild(cardElement);
});



