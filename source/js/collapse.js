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
    const collapsibleButton = title.querySelector('button');
    const content = title.nextElementSibling;

    collapsibleButton.addEventListener('click', () => {
      const expanded = collapsibleButton.getAttribute('aria-expanded') === 'true' || false;

      collapsibleButton.setAttribute('aria-expanded', !expanded);
      content.hidden = expanded;

      //hide others
      collapsibleTitles.forEach((colTitle) => {
        if (title.isEqualNode(colTitle)) {
          return true;
        }

        const colBtn = colTitle.querySelector('button');
        const colContent = colTitle.nextElementSibling;

        colBtn.setAttribute('aria-expanded', 'false');
        colContent.hidden = true;
      });
    });
  });
})();
