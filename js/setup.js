'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  // запускает работу страницы
  function startPageWork() {
    window._map.makeMapActive();
    window.form.makeFormsActive();
    window.filter.makeFiltersActive();

    window.filter.resetFilters(window.data.listAdsCopy);

    window.addDom.renderNodes(window.data.listAdsCopy, window.pin.createPinNode, mapPins, window._map.addPinHandlers);
    window.addDom.renderNodes(window.data.listAdsCopy, window.card.createCardNode, mapPins, window._map.addCardHandlers);

    window.form.addHandlersForm();
  }

  window.setup = {
    startPageWork: startPageWork
  };
})();
