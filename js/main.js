'use strict';

(function () {
  const mql = window.matchMedia('(max-width: 768px)');

  if (!mql.matches) {
    return false;
  }
  const collapsibleTitles = document.querySelectorAll('.js-collapsible-title');
  const collapsibleContent = document.querySelectorAll('.js-collapsible-content');

  collapsibleContent.forEach((content) => {
    content.hidden = true;
  });

  collapsibleTitles.forEach((title) => {
    const content = title.nextElementSibling;

    title.addEventListener('click', () => {
      const expanded = title.getAttribute('aria-expanded') === 'true' || false;

      title.setAttribute('aria-expanded', !expanded);
      content.hidden = expanded;

      //hide others
      collapsibleTitles.forEach((colTitle) => {
        if (title.isEqualNode(colTitle)) {
          return true;
        }

        const colContent = colTitle.nextElementSibling;

        colTitle.setAttribute('aria-expanded', 'false');
        colContent.hidden = true;
      });
    });
  });
})();

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

        if (char === '('
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

'use strict';

(function () {
  window.MicroModal.init({
    openClass: 'modal--open',
    disableScroll: true,
  });
})();

'use strict';

(function (){
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (anchor.getAttribute('href') === '#') {
      return false;
    }

    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });
})();
