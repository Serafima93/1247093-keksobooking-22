'use strict'
import { pins } from './map.js';

const ANY = 'any';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingPrice = mapFilters.querySelector('#housing-price');

const priceValues = {
  START: 10000,
  FINAL: 50000,
};

const createFeaturesArray = function () {
  const housingFeaturesChecked = mapFilters.querySelectorAll('.map__features input[name="features"]:checked');
  const checkedFeatures = Array.from(housingFeaturesChecked);
  const featuresCheckedArray = [];
  for (let i = 0; i <= checkedFeatures.length - 1; i++) {
    const ad = checkedFeatures[i].value;
    featuresCheckedArray.push(ad);
  }
  return featuresCheckedArray
};

const setFeatures = (cb) => {
  mapFilters.addEventListener('change', () => {
    pins.clearLayers();
    cb();
  });
};

const filterAdData = function (el) {
  let isType = true;
  let isPrice = true;
  let isGuest = true;
  let isRooms = true;
  let isFeature = true;
  const priceLimit = {
    middle: el.offer.price >= priceValues.START && el.offer.price <= priceValues.FINAL,
    low: el.offer.price < priceValues.START,
    high: el.offer.price >= priceValues.FINAL,
  };
  const checkedList = createFeaturesArray();

  if (housingType.value !== ANY) {
    isType = el.offer.type === housingType.value;
  }
  if (housingRooms.value !== ANY) {
    isRooms = el.offer.rooms.toString() === housingRooms.value;
  }
  if (housingGuests.value !== ANY) {
    isGuest = el.offer.guests.toString() === housingGuests.value;
  }
  if (housingPrice.value !== ANY) {
    isPrice = el.offer.price === priceLimit[housingPrice.value];
    isPrice = priceLimit[housingPrice.value];
  }
  if (housingGuests.value !== ANY) {
    isGuest = el.offer.guests.toString() === housingGuests.value;
  }
  if (checkedList.length > 0) {
    let i = 0;
    while (isFeature && i < checkedList.length) {
      isFeature = el.offer.features.includes(checkedList[i]);
      i++;
    }
  }
  return isType && isRooms && isGuest && isFeature && isPrice
};




export { setFeatures, filterAdData };
