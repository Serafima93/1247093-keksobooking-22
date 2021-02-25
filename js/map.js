/* global L:readonly */

import { createPopup } from './card.js';
import { showAlert } from './utils.js';


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

// Мадам знает толк в извращениях...я не придумала ничего лучше чем запихнуть карту в промис,
// ибо у меня не функция как в демке, а константа
// а ее возвращать у меня из промисса не вышло


fetch('https://22.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((adverts) => {

    adverts.forEach((offer) => {

      const iconUsual = L.icon({
        iconUrl: USAUAL_ICON_DATA.iconUrl,
        iconSize: USAUAL_ICON_DATA.iconSize,
        iconAnchor: USAUAL_ICON_DATA.iconAnchor,
      });

      const marker = L.marker(
        {
          lat: offer.location.lat,
          lng: offer.location.lng,
        },
        {
          iconUsual,
        },
      );
      marker.addTo(map)
        .bindPopup(
          createPopup(offer),
        );
    });
  })
  .catch(() => {
    showAlert('Ошибка подключения. Попробуйте ещё раз');
  });


const adressCordinate = document.querySelector('#address');
adressCordinate.value = `${map._lastCenter.lat} , ${map._lastCenter.lng}`;

marker.on('moveend', (evt) => {
  const move = evt.target.getLatLng();
  const x = move.lng.toFixed(COMMA_NUMBER);
  const y = move.lat.toFixed(COMMA_NUMBER);

  adressCordinate.value = `${x} , ${y}`;
});

const mapValidity = document.querySelector('#map');

mapValidity;
