'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var formSelect = {
    typeSelect: adForm.querySelector('#type'),
    timeOfArrival: adForm.querySelector('#timein'),
    roomNumber: adForm.querySelector('#room_number'),
  };

  var inputText = {
    titleAd: adForm.querySelector('#title'),
    priceInput: adForm.querySelector('#price'),
    description: adForm.querySelector('#description'),
  };

  var filterSelect = {
    housingType: document.querySelector('#housing-type'),
    housingPrice: document.querySelector('#housing-price'),
    housingRooms: document.querySelector('#housing-rooms'),
    housingGuests: document.querySelector('#housing-guests'),
  };

  var htmlCollection = {
    pins: document.getElementsByClassName('map__pin'),
    cards: document.getElementsByClassName('map__card'),
  };

  var featuresInput = {
    filterFeatures: document.querySelector('#housing-features'),
    formFeatures: adForm.querySelector('.features'),
  };

  var pinMainOffset = {
    left: window.constants.PIN_MAIN_LEFT,
    top: window.constants.PIN_MAIN_TOP,
  };

  function makePageActive() {
    window.cityMap.makeCityMapActive();
    window.form.makeFormsActive();
    window.filter.makeFiltersActive();
  }

  function makePageInactive() {
    window.cityMap.makeCityMapInactive();
    window.form.makeFormsInactive();
    window.filter.makeFiltersInactive();
  }

  function initDrag() {
    var onPinDrag = window.pinDrag.makeOnPinDrag(window.form.fillAddressFieldAdForm, startPageWork);

    mapPinMain.addEventListener('mousedown', onPinDrag);
  }

  function startPageWork() {
    var listAdsShow = window.util.getShowObjectSpecificLength(window.data.listAdsCopy, window.constants.QUANTITY);

    makePageActive();

    window.form.setupFormValidation();

    window.render.renderNodes(listAdsShow, window.pin.createPinNode, mapPins, window.cityMap.addPinHandlers);
    window.render.renderNodes(listAdsShow, window.card.createCardNode, mapPins);

    window.form.addHandlersForm();
    window.filter.addHandlersFilters();
  }

  function stopPageWork() {
    window.dropZone.setDefaultAvatar();
    window.dropZone.cleanPhotosContainer();

    window.util.applyToTheWholeObject(window.util.removeAds, htmlCollection);
    window.util.applyToTheWholeObject(window.form.eraseValueField, inputText);
    window.util.applyToTheWholeObject(window.util.setupSelectedDefault, formSelect);
    window.util.applyToTheWholeObject(window.util.setupSelectedDefault, filterSelect);
    window.util.applyToTheWholeObject(window.util.setupCheckedDefault, featuresInput);

    window.util.setPosition(mapPinMain, pinMainOffset.left, pinMainOffset.top);

    window.filter.resetFilters(window.data.listAdsCopy);

    makePageInactive();

    window.form.synchFieldsForm();

    window.form.removeHandlersForm();
    window.filter.removeHandlersFilters();
  }

  window.page = {
    startPageWork: startPageWork,
    stopPageWork: stopPageWork,
    initDrag: initDrag,
    makePageInactive: makePageInactive,
  };
})();
