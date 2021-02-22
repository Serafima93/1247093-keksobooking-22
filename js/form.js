const PROPERTY_MIN_PRICE =
{
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const prorertyType = document.querySelector('#type');
const propertyPrice = document.querySelector('#price');


prorertyType.addEventListener('change', (event) => {

  event.target.value === prorertyType.value;
  propertyPrice.placeholder = PROPERTY_MIN_PRICE[prorertyType.value];
  propertyPrice.min = PROPERTY_MIN_PRICE[prorertyType.value];

});


// Выбор времени регистрации

const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');

const makeSameValue = function (first, second) {
  second.value = first.value;
};

checkOut.addEventListener('change', () => {
  makeSameValue(checkOut, checkIn);
});

checkIn.addEventListener('change', () => {
  makeSameValue(checkIn, checkOut);
});

// Поле описания
const prorertyDescription = document.querySelector('#title');

prorertyDescription.addEventListener('input', () => {
  const valueLength = prorertyDescription.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    prorertyDescription.setCustomValidity('Поле должно состоять минимум из 30 символов');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    prorertyDescription.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    prorertyDescription.setCustomValidity('');
  }

  prorertyDescription.reportValidity();
});

// Поле комнат

const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');


roomNumber.addEventListener('change', (event) => {
  event.target.value === roomNumber.value;
  const roomsValue = parseInt(roomNumber.value);
  const guestValue = parseInt(guestNumber.value);

  if (roomsValue === 1 && guestValue >= 2) {
    guestNumber.setCustomValidity('Слишком много гостей!');
  }
  else if (roomsValue === 2 && guestValue > 2) {
    guestNumber.setCustomValidity('Слишком много гостей!');
  }
  else if (roomsValue === 3 && guestValue > 3) {
    guestNumber.setCustomValidity('Слишком много гостей!');
  }
  else if (roomsValue === 100 && guestValue !== 0) {
    guestNumber.setCustomValidity('Слишком много гостей!');
  }
  else {
    guestNumber.setCustomValidity('');
  }
  guestNumber.reportValidity();
});
