'use strict'

const mainPart = document.querySelector('main');

const templateFormSuccess = document.querySelector('#success')
  .content
  .querySelector('div');


const successMessage = () => {
  const cardElement = templateFormSuccess.cloneNode(true);

  mainPart.append(cardElement);

  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      cardElement.remove();
    }
  });
  document.addEventListener('click', () => {
    cardElement.remove();
  });
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};


const templateFormError = document.querySelector('#error')
  .content
  .querySelector('div');


const errorMessage = () => {
  const cardElement = templateFormError.cloneNode(true);
  mainPart.append(cardElement);
  const errorButton = cardElement.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    cardElement.remove();
  });
  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      cardElement.remove();
    }
  });
  document.addEventListener('click', () => {
    cardElement.remove();
  });
}

export { successMessage, errorMessage };
