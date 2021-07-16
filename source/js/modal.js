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
