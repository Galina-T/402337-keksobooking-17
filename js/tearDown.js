'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsCollection = map.getElementsByClassName('map__pin');
  var mapCardsCollection = document.getElementsByClassName('map__card');

  var titleAd = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var description = document.querySelector('#description');
  var typeSelect = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var timeOfArrival = document.querySelector('#timein');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  // останавливает работу страницы
  function stopPageWork() {
    window.util.removeAds(mapPinsCollection);
    window.util.removeAds(mapCardsCollection);

    window._map.makeMapInactive();
    window.form.makeFormsInactive();
    window.filter.makeFiltersInactive();

    window.form.eraseValueField(titleAd);
    window.form.eraseValueField(priceInput);
    window.form.eraseValueField(description);

    window.util.setupSelectedDefault(typeSelect);
    window.util.setupSelectedDefault(timeOfArrival);
    window.util.setupSelectedDefault(roomNumber);

    window.form.setupValueFieldTime(timeOfArrival);

    mapPinMain.style.left = window.constants.PIN_MAIN_LEFT + 'px';
    mapPinMain.style.top = window.constants.PIN_MAIN_TOP + 'px';

    window.form.fillAddressFieldAdForm(mapPinMain);

    window.form.setupMinPriceForField('placeholder');
    window.form.setupMinPriceValidation(typeSelect);

    window.form.setupGuestForRoomValidation(roomNumber.value);
    window.form.setupValueCapacity();

    window.form.removeHandlersForm();

    window.util.setupSelectedDefault(housingType);
    window.util.setupSelectedDefault(housingPrice);
    window.util.setupSelectedDefault(housingRooms);
    window.util.setupSelectedDefault(housingGuests);
    window.util.setupCheckedDefault(housingFeatures);
  }

  window.tearDown = {
    stopPageWork: stopPageWork
  };
})();
