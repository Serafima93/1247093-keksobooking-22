/* global L:readonly */

import { createPopup, renderCards } from './card.js';

const ZOOM = 12;
const LAT = 35.65;
const LNG = 139.78;
const MAINICONDATA = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const USAUALICONDATA = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const COMMANUMBER = 5;

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
  iconUrl: MAINICONDATA.iconUrl,
  iconSize: MAINICONDATA.iconSize,
  iconAnchor: MAINICONDATA.iconAnchor,
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





renderCards.forEach((offer) => {

  const iconUsual = L.icon({
    iconUrl: USAUALICONDATA.iconUrl,
    iconSize: USAUALICONDATA.iconSize,
    iconAnchor: USAUALICONDATA.iconAnchor,
  });

  const markerUsual = L.marker(
    {
      lat: offer.offer.address.lat,
      lng: offer.offer.address.lng,
    },
    {
      iconUsual,
    },
  );

  markerUsual
    .addTo(map)
    .bindPopup(
      createPopup(offer),
    );
});






// начало адреса.


const adressCordinate = document.querySelector('#address');
adressCordinate.value = `${map._lastCenter.lat} , ${map._lastCenter.lng}`;

marker.on('moveend', (evt) => {
  const move = evt.target.getLatLng();
  const x = move.lng.toFixed(COMMANUMBER);
  const y = move.lat.toFixed(COMMANUMBER);

  adressCordinate.value = `${x} , ${y}`;
});

const mapValidity = document.querySelector('#map');

mapValidity;
