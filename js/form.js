const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;
const prorertyType = document.querySelector('#type');
const propertyPrice = document.querySelector('#price');


prorertyType.addEventListener('change', (event) => {

  if (event.target.value === 'bungalow') {
    propertyPrice.placeholder = BUNGALOW_MIN_PRICE;
    propertyPrice.min = BUNGALOW_MIN_PRICE;
  }

  if (event.target.value === 'flat') {
    propertyPrice.placeholder = FLAT_MIN_PRICE;
    propertyPrice.min = FLAT_MIN_PRICE;
  }
  if (event.target.value === 'house') {
    propertyPrice.placeholder = HOUSE_MIN_PRICE;
    propertyPrice.min = HOUSE_MIN_PRICE;
  }
  if (event.target.value === 'palace') {
    propertyPrice.placeholder = PALACE_MIN_PRICE;
    propertyPrice.min = PALACE_MIN_PRICE;
  }

});



// Выбор времени регистрации

const registrationTime = document.querySelector('.ad-form__element--time');
const CheckIn = document.querySelector('#timein');
const CheckOut = document.querySelector('#timeout');

const makeSameValue = function (first, second) {
  second.value = first.value;
};

registrationTime.addEventListener('change', () => {
  makeSameValue(CheckIn, CheckOut);
});

