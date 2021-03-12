'use strict'

import { marker, map, mapFilter, LAT, LNG, pins} from './map.js';
import { sendData} from './api.js';
import { avatarPreview, previewflatPhoto } from './avatar.js';

const PROPERTY_MIN_PRICE =
{
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const roomCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
const sendUrl = 'https://22.javascript.pages.academy/keksobooking';

const prorertyType = document.querySelector('#type');
const propertyPrice = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const prorertyDescription = document.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');
const userForm = document.querySelector('.ad-form');
const mainPart = document.querySelector('main');
const resetButtonSuccess = document.querySelector('.ad-form__reset');




prorertyType.addEventListener('change', (evt) => {

  evt.target.value === prorertyType.value;
  propertyPrice.placeholder = PROPERTY_MIN_PRICE[prorertyType.value];
  propertyPrice.min = PROPERTY_MIN_PRICE[prorertyType.value];

});

const makeSameValue = function (first, second) {
  second.value = first.value;
};

checkOut.addEventListener('change', () => {
  makeSameValue(checkOut, checkIn);
});

checkIn.addEventListener('change', () => {
  makeSameValue(checkIn, checkOut);
});



prorertyDescription.addEventListener('input', () => {
  const valueLength = prorertyDescription.value.length;

  prorertyDescription.setCustomValidity('');

  if (valueLength < MIN_TITLE_LENGTH) {
    prorertyDescription.setCustomValidity('Поле должно состоять минимум из 30 символов');
  }
  if (valueLength > MAX_TITLE_LENGTH) {
    prorertyDescription.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  }

  prorertyDescription.reportValidity();
});


guestNumber.addEventListener('change', (evt) => {
  const userChoice = evt.target.value;

  guestNumber.setCustomValidity('');

  if (!roomCapacity[roomNumber.value].includes(userChoice)) {
    guestNumber.setCustomValidity('Количество гостей не может быть больше количества комнат. Количество комнат ограничено!');
  }
  guestNumber.reportValidity();
});


roomNumber.addEventListener('change', (evt) => {
  const userChoice = evt.target.value;

  roomNumber.setCustomValidity('');

  if (!roomCapacity[userChoice].includes(guestNumber.value)) {
    roomNumber.setCustomValidity('Количество гостей не может быть больше количества комнат. Количество комнат ограничено!');
  }
  roomNumber.reportValidity();
});



const templateFormSuccess = document.querySelector('#success')
  .content
  .querySelector('div');

const successMessage = () => {
  const cardElement = templateFormSuccess.cloneNode(true);

  mainPart.append(cardElement);

  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      cardElement.remove();
    }
  });
  document.addEventListener('click', () => {
    cardElement.remove();
  });
}


const resetFunction = function () {
  userForm.reset();
  mapFilter.reset();
  marker.setLatLng({ lat: LAT, lng: LNG });
  map.closePopup();
  pins.clearLayers();
  avatarPreview.src = 'img/muffin-grey.svg';
  const newChild = previewflatPhoto.querySelector('.ad-form__photo img');
  if (previewflatPhoto.childNodes.length > 0) { previewflatPhoto.removeChild(newChild); }
};


resetButtonSuccess.addEventListener('click', () => {
  resetFunction();
});



const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const templateFormError = document.querySelector('#error')
  .content
  .querySelector('div');

const errorMessage = () => {
  const cardElement = templateFormError.cloneNode(true);
  mainPart.append(cardElement);
  const errorButton = cardElement.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    cardElement.remove();
  });
  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      cardElement.remove();
    }
  });
  document.addEventListener('click', () => {
    cardElement.remove();
  });
}




const setUserFormSubmit = (onSuccess, onFail) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      sendUrl,
      () => onSuccess(resetFunction()),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit(successMessage, errorMessage);


export { resetFunction };
