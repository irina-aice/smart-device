'use strict';

(function () {
  let mql = window.matchMedia('(max-width: 768px)');

  if (!mql.matches) {
    return false;
  }
  const collapsibleTitles = document.querySelectorAll('.js-collapsible-title');
  const collapsibleContent = document.querySelectorAll('.js-collapsible-content');

  collapsibleContent.forEach((content) => {
    content.hidden = true;
  });

  collapsibleTitles.forEach((title) => {
    let collapsibleButton = title.querySelector('button');
    let content = title.nextElementSibling;

    collapsibleButton.addEventListener('click', () => {
      let expanded = collapsibleButton.getAttribute('aria-expanded') === 'true' || false;

      collapsibleButton.setAttribute('aria-expanded', !expanded)
      content.hidden = expanded;

      //hide others
      collapsibleTitles.forEach((colTitle) => {
        if (title.isEqualNode(colTitle)) {
          return true;
        }

        let colBtn = colTitle.querySelector('button');
        let colContent = colTitle.nextElementSibling;

        colBtn.setAttribute('aria-expanded', 'false');
        colContent.hidden = true;
      });
    });
  })
})();

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

'use strict';

(function () {
  const modalButton = document.querySelector('.js-modal-button');
  const modal = document.querySelector('.js-modal');
  const modalCloseButton = document.querySelector('.js-close-button');
  const modalInnerSelector = '.js-modal-inner';
  const form = modal.querySelector('.js-form');
  let isOpen = false;

  modalButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    modal.setAttribute('data-state', 'open');
    isOpen = true;
    form.querySelector('[name="fio"]').focus();
  });

  function closeModal() {
    modal.setAttribute('data-state', 'close');
    isOpen = false;
  }

  modalCloseButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    closeModal();
  });

  window.addEventListener('keydown', (evt) => {
    if (!isOpen || evt.code !== 'Escape') {
      return false;
    }
    closeModal();
  });

  document.addEventListener('click', (evt) => {
    if (!isOpen || evt.target.closest(modalInnerSelector)) {
      return false;
    }
    closeModal();
  });

})();

'use strict';

(function (){
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
})();
