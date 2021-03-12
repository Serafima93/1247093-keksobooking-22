'use strict'

import { showAlert } from './utils.js';

const getData = (URL, onSuccess) => {
  fetch(URL)
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      showAlert('Ошибка подключения. Попробуйте ещё раз');
    });
};


const sendData = (URL, onSuccess, onFail, body) => {
  fetch(
    URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
