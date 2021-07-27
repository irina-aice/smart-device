'use strict';

(function () {
  const fioFields = document.querySelectorAll('.js-form-fio-input');
  const phoneFieldSelector = '.js-form-phone-input';
  const forms = document.querySelectorAll('.js-form');

  forms.forEach((form) => {
    const fioInput = form.querySelector('.js-form-fio-input');
    const phoneInput = form.querySelector('.js-form-phone-input');
    const textField = form.querySelector('.js-form-text-input');

    if (localStorage.getItem(fioInput.getAttribute('id'))) {
      fioInput.value = localStorage.getItem(fioInput.getAttribute('id'));
    }

    if (localStorage.getItem(phoneInput.getAttribute('id'))) {
      phoneInput.value = localStorage.getItem(phoneInput.getAttribute('id'));
    }
    if (localStorage.getItem(textField.getAttribute('id'))) {
      textField.value = localStorage.getItem(textField.getAttribute('id'));
    }
  });

  function addName() {
    fioFields.forEach((fioField) => {
      const oldValue = fioField.value;
      let newValue = '';

      for (let i = 0; i < oldValue.length; i++) {
        const char = oldValue[i];

        if (
          (char >= '0' && char <= '9')
          || char === '('
          || char === ')'
          || char === '+'
          || char === '_'
          || char === '.'
          || char === ','
        ) {
          continue;
        }
        newValue += char;
      }

      fioField.value = newValue;
    });
  }

  fioFields.forEach((fioField) => {
    fioField.addEventListener('input', () => {
      addName();
    });
  });

  window.maskPhone(phoneFieldSelector, '+7(___) ___-__-__');

  forms.forEach((form) => {
    form.addEventListener('submit', () => {
      const fioInput = form.querySelector('.js-form-fio-input');
      const phoneInput = form.querySelector('.js-form-phone-input');
      const textField = form.querySelector('.js-form-text-input');

      localStorage.setItem(fioInput.getAttribute('id'), fioInput.value);
      localStorage.setItem(phoneInput.getAttribute('id'), phoneInput.value);
      localStorage.setItem(textField.getAttribute('id'), textField.value);
    });
  });
})();
