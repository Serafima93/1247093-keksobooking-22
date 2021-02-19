/* global L:readonly */

import { createPopup, renderCards } from './card.js';

// находим форму и добавляем неактивность

const userForm = document.querySelector('.ad-form');
userForm.classList.add('ad-form--disabled');

const fieldsetForm = userForm.querySelectorAll('fieldset');

fieldsetForm.forEach((value) => {
  value.setAttribute('disabled', 'disabled');
});

// находим форму карты и добавляем неактивность. Я знаю что fieldset из этой части можно вынести в первый, но я делю по смыслу
const mapFilter = document.querySelector('.map__filters');
mapFilter.classList.add('ad-form--disabled');

const mapIcons = mapFilter.querySelector('fieldset');
mapIcons.setAttribute('disabled', 'disabled');

const mapForms = mapFilter.querySelectorAll('select');

mapForms.forEach((value) => {
  value.setAttribute('disabled', 'disabled');
});

// работа с картой


const map = L.map('map')
  .on('load', () => {
    //Карта инициализирована. Возвращение атрибутов

    userForm.classList.remove('ad-form--disabled');
    fieldsetForm.forEach((value) => {
      value.removeAttribute('disabled', 'disabled');
    });

    mapFilter.classList.remove('ad-form--disabled');
    mapIcons.removeAttribute('disabled', 'disabled');
    mapForms.forEach((value) => {
      value.removeAttribute('disabled', 'disabled');
    });

  })
  .setView([35.65, 139.78], 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const marker = L.marker(
  {
    lat: 35.65,
    lng: 139.78,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
marker.addTo(map);





renderCards.forEach((offer) => {

  const iconUsual = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
adressCordinate.value = `${map._lastCenter.lat} и ${map._lastCenter.lng}`;

marker.on('moveend', (evt) => {
  const move = evt.target.getLatLng();
  let x = move.lng.toFixed(5);
  let y = move.lat.toFixed(5);

  adressCordinate.value = `${x} и ${y}`;
});

const mapValidity = document.querySelector('#map');

mapValidity;
