'use strict';

(function () {
  var cityMap = document.querySelector('.map');

  var mapPinMain = document.querySelector('.map__pin--main');

  var pinMainOffset = {
    left: window.constants.PIN_MAIN_LEFT,
    top: window.constants.PIN_MAIN_TOP,
  };

  function makePageActive() {
    window.cityMap.makeCityMapActive(cityMap);
    window.form.makeFormsActive();
    window.filter.makeFiltersActive();
  }

  function makePageInactive() {
    window.cityMap.makeCityMapInactive(cityMap);
    window.form.makeFormsInactive();
    window.filter.makeFiltersInactive();

    window.form.synchFieldsForm(mapPinMain);
  }

  function initDrag() {
    var onPinDrag = window.pinDrag.makeOnPinDrag(window.form.fillAddressFieldAdForm, startPageWork, cityMap);

    mapPinMain.addEventListener('mousedown', onPinDrag);
  }

  function startPageWork() {
    makePageActive();

    window.form.setupFormValidation();

    window.cityMap.setupRenderAds(window.data.listAdsCopy);

    window.form.addHandlersForm();
    window.filter.addHandlersFilters();
  }

  function stopPageWork() {
    window.dropZone.setDefaultAvatar();
    window.dropZone.cleanPhotosContainer();

    window.cityMap.setupRemoveAds();

    window.form.makeFormDefault();

    window.util.setPosition(mapPinMain, pinMainOffset.left, pinMainOffset.top);

    window.filter.resetFilters(window.data.listAdsCopy);

    makePageInactive();

    window.form.removeHandlersForm();
    window.filter.removeHandlersFilters();
  }

  window.page = {
    stopPageWork: stopPageWork,
    initDrag: initDrag,
    makePageInactive: makePageInactive,
  };
})();
