'use strict'

import { startRendering, resetMarkerPosition } from './map.js';
import { sendData } from './api.js';
import { avatarPreview, previewflatPhoto } from './avatar.js';
import { mapFilters } from './filter.js';
import { successMessage, errorMessage } from './popups.js';



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

const userForm = document.querySelector('.ad-form');
const prorertyType = userForm.querySelector('#type');
const propertyPrice = userForm.querySelector('#price');
const checkIn = userForm.querySelector('#timein');
const checkOut = userForm.querySelector('#timeout');
const prorertyDescription = userForm.querySelector('#title');
const roomNumber = userForm.querySelector('#room_number');
const guestNumber = userForm.querySelector('#capacity');
const resetButtonSuccess = userForm.querySelector('.ad-form__reset');
const capacityOptions = guestNumber.querySelectorAll('option');




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



const createCapacity = (clientsAmount) => {

  capacityOptions.forEach((reservation) => {
    reservation.disabled = true;
  });

  roomCapacity[clientsAmount].forEach((placesAmount) => {
    capacityOptions.forEach((reservation) => {
      if (reservation.value === placesAmount) {
        reservation.disabled = false;
        reservation.selected = true;
      }
    });
  });
};

roomNumber.addEventListener('change', () => {
  createCapacity(roomNumber.value);
});

guestNumber.addEventListener('focus', () => {
  createCapacity(roomNumber.value);
});


const resetFunction = function () {
  userForm.reset();
  propertyPrice.placeholder = '1000';
  mapFilters.reset();
  resetMarkerPosition();
  startRendering();
  avatarPreview.src = 'img/muffin-grey.svg';
  const newChild = previewflatPhoto.querySelector('.ad-form__photo img');
  if (previewflatPhoto.childNodes.length > 0) { previewflatPhoto.removeChild(newChild); }
};



resetButtonSuccess.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFunction();
});


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


