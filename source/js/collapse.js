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
