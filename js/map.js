'use strict'

/* global L:readonly */
/* global _:readonly */

import { createPopup } from './card.js';
import { getData } from './api.js';
import { setFeatures, filterAdData, mapFilters } from './filter.js';

const SIMILAR_ADVERT_COUNT = 10;
const RERENDER_DELAY = 500;
const ZOOM = 9;
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

const getUrl = 'https://22.javascript.pages.academy/keksobooking/data';
const adressCordinate = document.querySelector('#address');

const userForm = document.querySelector('.ad-form');
const fieldsetForm = userForm.querySelectorAll('fieldset');

const mapIcons = mapFilters.querySelector('fieldset');
const mapForms = mapFilters.querySelectorAll('select');



const makeFormDisabled = function () {
  userForm.classList.add('ad-form--disabled');
  fieldsetForm.forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
  mapFilters.classList.add('ad-form--disabled');
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

  mapFilters.classList.remove('ad-form--disabled');
  mapIcons.removeAttribute('disabled', 'disabled');
  mapForms.forEach((value) => {
    value.removeAttribute('disabled', 'disabled');
  });
};



const map = L.map('map')
  .on('load', () => {
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


const pins = L.layerGroup([]);
pins
  .addTo(map);


const renderSimilarList = (adverts) => {

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

const startRendering = () => {
  getData(getUrl, (adverts) => {
    renderSimilarList(adverts);
    let setFiter = _.debounce(() => {
      setFeatures(() => renderSimilarList(adverts));
    }, RERENDER_DELAY);
    setFiter();
  })
};

startRendering();


adressCordinate.value = `${map._lastCenter.lat} , ${map._lastCenter.lng}`;


marker.on('moveend', (evt) => {
  const move = evt.target.getLatLng();
  const x = move.lng.toFixed(COMMA_NUMBER);
  const y = move.lat.toFixed(COMMA_NUMBER);
  adressCordinate.value = `${x} , ${y}`;
});



const resetMarkerPosition = () => {
  map.setView([LAT, LNG], ZOOM);
  map.closePopup();
  pins.clearLayers();
  marker.setLatLng({ lat: LAT, lng: LNG });
  adressCordinate.value = `${LAT}, ${LNG}`;
}

export { pins, startRendering, resetMarkerPosition };
