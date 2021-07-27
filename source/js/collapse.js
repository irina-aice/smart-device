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
