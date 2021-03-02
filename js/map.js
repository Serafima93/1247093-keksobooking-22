/* global L:readonly */

import { createPopup } from './card.js';
import { getData } from './api.js';

const SIMILAR_ADVERT_COUNT = 5;

const getUrl = 'https://22.javascript.pages.academy/keksobooking/data';
const adressCordinate = document.querySelector('#address');




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




const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
// const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
// const housingGuests = mapFilters.querySelector('#housing-guests');
// const housingFeatures = mapFilters.querySelector('#housing-features');



// получаем карточки
// создаем событие на изменение фильтра у карты
//
// создание рейтинга для карточек
// ранжировать карточки от большего к меньшему
// отображение карточек с наиболее высоким рейтингом

// удаляем старое при клике но новый элемент фильтра
// отрисовывается заново


const setHouseType = (cb) => {
  housingType.addEventListener('change', (evt) => {
    evt.target.value = housingType.value;
    cb();
  });
};

const setRoomsCount = (cb) => {
  housingRooms.addEventListener('change', (event) => {
    event.target.value = housingRooms.value;
    cb();
  });
};



// вес карточки

// Привести к строкам и числам!

const getAdvertRank = (advert) => {

  let rank = 0;
  if (advert.offer.type === housingType.value) {
    rank += 2;
  }
  if (advert.offer.rooms == housingRooms.value) {
    rank += 1;
  }

  return rank;
};


const sortAdverts = (advertA, advertB) => {
  const rankA = getAdvertRank(advertA);
  const rankB = getAdvertRank(advertB);

  return rankB - rankA;
}


const renderSimilarList = (adverts) => {
  // getData(getUrl, (adverts) => {
  adverts
    .slice()
    .sort(sortAdverts)
    .slice(0, SIMILAR_ADVERT_COUNT).forEach((offer) => {

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
      marker2.remove();

      marker2.addTo(map)
        .bindPopup(
          createPopup(offer),
        );
    });
  // });
};





getData(getUrl, (adverts) => {
  renderSimilarList(adverts);
  setHouseType(renderSimilarList(adverts));
  setRoomsCount(renderSimilarList(adverts));
});



adressCordinate.value = `${map._lastCenter.lat} , ${map._lastCenter.lng}`;



marker.on('moveend', (evt) => {
  const move = evt.target.getLatLng();
  const x = move.lng.toFixed(COMMA_NUMBER);
  const y = move.lat.toFixed(COMMA_NUMBER);

  adressCordinate.value = `${x} , ${y}`;
});

const mapValidity = document.querySelector('#map');

mapValidity;








export { marker, map, LAT, LNG };
