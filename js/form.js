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

  prorertyDescription.setCustomValidity('');

  if (valueLength < MIN_TITLE_LENGTH) {
    prorertyDescription.setCustomValidity('Поле должно состоять минимум из 30 символов');
  }
  if (valueLength > MAX_TITLE_LENGTH) {
    prorertyDescription.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  }

  prorertyDescription.reportValidity();
});

// Поле комнат

const roomNumber = document.querySelector('#room_number');
const guestNumber = document.querySelector('#capacity');


guestNumber.addEventListener('change', (event) => {
  const userChoice = event.target.value;

  guestNumber.setCustomValidity('');

  if (!roomCapacity[roomNumber.value].includes(userChoice)) {
    guestNumber.setCustomValidity('Количество гостей не может быть больше количества комнат. Количество комнат ограничено!');
  }
  guestNumber.reportValidity();
});


roomNumber.addEventListener('change', (event) => {
  const userChoice = event.target.value;

  roomNumber.setCustomValidity('');

  if (!roomCapacity[userChoice].includes(guestNumber.value)) {
    roomNumber.setCustomValidity('Количество гостей не может быть больше количества комнат. Количество комнат ограничено!');
  }
  roomNumber.reportValidity();
});


// форма



const templateFormSuccess = document.querySelector('#success')
  .content // Находим фрагмент с содержимым темплейта
  .querySelector('div'); // В фрагменте находим нужный элемент

templateFormSuccess;

//const errorButton = document.querySelector('.error__button');

const templateFormError = document.querySelector('#error')
  .content // Находим фрагмент с содержимым темплейта
  .querySelector('div'); // В фрагменте находим нужный элемент


const showAler = (message) => {
  templateFormError.textContent = message;

  document.body.append(templateFormError);

  setTimeout(() => {
    templateFormError.remove();
  }, 10000);
}


const userForm = document.querySelector('.ad-form');

userForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    'https://22.javpt.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .catch(() => {
      showAler();
    });
});
