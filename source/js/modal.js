'use strict';

(function () {
  const modalButton = document.querySelector('.js-modal-button');
  const modal = document.querySelector('.js-modal');
  const modalCloseButton = document.querySelector('.js-close-button');
  const modalInnerSelector = '.js-modal-inner';
  const form = modal.querySelector('.js-form');
  const body = document.querySelector('body');
  const documentWidth = document.documentElement.clientWidth;
  const scrollbarWidth = Math.abs(window.innerWidth - documentWidth);
  let isOpen = false;

  function closeModal() {
    modal.setAttribute('data-state', 'close');
    isOpen = false;
    body.style.overflow = 'visible';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = '';
    }
  }

  modalButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    modal.setAttribute('data-state', 'open');
    isOpen = true;
    form.querySelector('.js-form-fio-input').focus();
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
  });

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
