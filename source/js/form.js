'use strict';

(function () {
  const fioFields = document.querySelectorAll('input[name="fio"]');
  const phoneFields = document.querySelectorAll('input[name="phone"]');
  const forms = document.querySelectorAll('.js-form');

  forms.forEach((form) => {
    const fioInput = form.querySelector('input[name="fio"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const textField = form.querySelector('textarea[name="text"]');

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
    })
  }

  fioFields.forEach((fioField) => {
    fioField.addEventListener('input', (evt) => {
      addName();
    });
  });

  phoneFields.forEach((phoneField) => {
    const cleave = new Cleave(phoneField, {
      prefix: '+7(',
      noImmediatePrefix: true,
      numericOnly: true,
      blocks: [6, 3, 2, 2],
      delimiters: [') ', ' ', ' ']
    });
  });

  forms.forEach((form) => {
    form.addEventListener('submit', () => {
      const fioInput = form.querySelector('input[name="fio"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const textField = form.querySelector('textarea[name="text"]');

      localStorage.setItem(fioInput.getAttribute('id'), fioInput.value);
      localStorage.setItem(phoneInput.getAttribute('id'), phoneInput.value);
      localStorage.setItem(textField.getAttribute('id'), textField.value);
    })
  })
})();
