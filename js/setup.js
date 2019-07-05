'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  // запускает работу страницы
  function startPageWork() {
    var ads = window.generate.generateAds(window.constants.QUANTITY);

    window.util.makeMapActive();
    window.util.makeFormsActive();
    window.util.makeFiltersActive();

    window.addDom.renderNodes(ads, window.createNode.createPinNode, mapPins);

    window.validationForm.addHandlersForm();
  }

  window.setup = {
    startPageWork: startPageWork,
  };
})();
