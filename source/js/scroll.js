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
