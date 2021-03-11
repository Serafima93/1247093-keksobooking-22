'use strict'

/* global L:readonly */
/* global _:readonly */

import { createPopup } from './card.js';
import { getData } from './api.js';

const ANY = 'any';
const SIMILAR_ADVERT_COUNT = 10;
const RERENDER_DELAY = 500;
const ZOOM = 12;
const LAT = 35.65;
const LNG = 139.78;
const MAIN_ICON_DATA = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const USAUAL_ICON_DATA = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const COMMA_NUMBER = 5;


const priceValues = {
  START: 10000,
  FINAL: 50000,
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingFeatures = mapFilters.querySelector('#housing-features');

const getUrl = 'https://22.javascript.pages.academy/keksobooking/data';
const adressCordinate = document.querySelector('#address');

// находим форму и добавляем неактивность
const userForm = document.querySelector('.ad-form');
const fieldsetForm = userForm.querySelectorAll('fieldset');
// находим форму карты и добавляем неактивность.
const mapFilter = document.querySelector('.map__filters');
const mapIcons = mapFilter.querySelector('fieldset');
const mapForms = mapFilter.querySelectorAll('select');



const makeFormDisabled = function () {
  userForm.classList.add('ad-form--disabled');
  fieldsetForm.forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
  mapFilter.classList.add('ad-form--disabled');
  mapIcons.setAttribute('disabled', 'disabled');
  mapForms.forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });

};

makeFormDisabled();

const makeFormActive = function () {
  userForm.classList.remove('ad-form--disabled');
  fieldsetForm.forEach((value) => {
    value.removeAttribute('disabled', 'disabled');
  });

  mapFilter.classList.remove('ad-form--disabled');
  mapIcons.removeAttribute('disabled', 'disabled');
  mapForms.forEach((value) => {
    value.removeAttribute('disabled', 'disabled');
  });
};




// работа с картой

const map = L.map('map')
  .on('load', () => {
    //Карта инициализирована. Возвращение атрибутов

    makeFormActive();

  })
  .setView([LAT, LNG], ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: MAIN_ICON_DATA.iconUrl,
  iconSize: MAIN_ICON_DATA.iconSize,
  iconAnchor: MAIN_ICON_DATA.iconAnchor,
});

const marker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
marker.addTo(map);


// создаем группу слоев - пока пустую
const pins = L.layerGroup([]);
pins // добавляем его на карту
  .addTo(map);


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



const setHouseType = (cb) => {
  housingType.addEventListener('change', (evt) => {
    evt.target.value = housingType.value;
    pins.clearLayers();

    cb();
  });
};

const setRoomsCount = (cb) => {
  housingRooms.addEventListener('change', (evt) => {
    evt.target.value = housingRooms.value;
    pins.clearLayers();

    cb();
  });
};

const setGuestsCount = (cb) => {
  housingGuests.addEventListener('change', (evt) => {
    evt.target.value = housingGuests.value;
    pins.clearLayers();

    cb();
  });
};

const setPriceCount = (cb) => {
  housingPrice.addEventListener('change', (evt) => {
    evt.target.value = housingPrice.value;
    pins.clearLayers();

    cb();
  });
};





const setFeatures = (cb) => {

  housingFeatures.addEventListener('change', () => {

    pins.clearLayers();
    cb();
  });
};


const renderSimilarList = (adverts) => {

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
    const checkedList = createFeaturesArray(); // получаем массив выделеных фичей

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


  let ads = adverts.filter(filterAdData);


  ads
    .slice(0, SIMILAR_ADVERT_COUNT)
    .forEach((offer) => {

      const iconUsual = L.icon({
        iconUrl: USAUAL_ICON_DATA.iconUrl,
        iconSize: USAUAL_ICON_DATA.iconSize,
        iconAnchor: USAUAL_ICON_DATA.iconAnchor,
      });

      const marker2 = L.marker(
        {
          lat: offer.location.lat,
          lng: offer.location.lng,
        },
        {
          iconUsual,
        },
      );

      marker2.bindPopup(
        createPopup(offer),
      );

      pins.addLayer(marker2);
    });
};



getData(getUrl, (adverts) => {
  renderSimilarList(adverts);

  let setFiter = _.debounce(() => {
    setHouseType(() => renderSimilarList(adverts));
    setRoomsCount(() => renderSimilarList(adverts));
    setGuestsCount(() => renderSimilarList(adverts));
    setPriceCount(() => renderSimilarList(adverts));
    setFeatures(() => renderSimilarList(adverts));
  }, RERENDER_DELAY);
  setFiter();
});

adressCordinate.value = `${map._lastCenter.lat} , ${map._lastCenter.lng}`;

marker.on('moveend', (evt) => {
  const move = evt.target.getLatLng();
  const x = move.lng.toFixed(COMMA_NUMBER);
  const y = move.lat.toFixed(COMMA_NUMBER);
  adressCordinate.value = `${x} , ${y}`;
});



export { marker, map, mapFilter, LAT, LNG, pins };
