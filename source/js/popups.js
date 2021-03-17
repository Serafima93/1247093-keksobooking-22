'use strict'

const mainPart = document.querySelector('main');

const removeModalPopUp = (element, deleteFunction) => {
  element.remove();
  document.removeEventListener('keydown', deleteFunction);
  document.removeEventListener('click', deleteFunction);
};


const templateFormSuccess = document.querySelector('#success')
  .content
  .querySelector('div');


const showSuccessMessage = () => {
  const cardElement = templateFormSuccess.cloneNode(true);

  mainPart.append(cardElement);

  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      removeModalPopUp(cardElement, showSuccessMessage);
    }
  });
  document.addEventListener('click', () => {
    removeModalPopUp(cardElement, showSuccessMessage);
  });
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};


const templateFormError = document.querySelector('#error')
  .content
  .querySelector('div');


const showErrorMessage = () => {
  const cardElement = templateFormError.cloneNode(true);
  mainPart.append(cardElement);
  const errorButton = cardElement.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    removeModalPopUp(cardElement, showErrorMessage);

  });
  document.addEventListener('keydown', () => {
    if (isEscEvent) {
      removeModalPopUp(cardElement, showErrorMessage);

    }
  });
  document.addEventListener('click', () => {
    removeModalPopUp(cardElement, showErrorMessage);

  });
}



export { showSuccessMessage, showErrorMessage };
