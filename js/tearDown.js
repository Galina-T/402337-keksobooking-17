'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  var typeSelect = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');

  // останавливает работу страницы
  function stopPageWork() {
    window.util.makeMapInactive();
    window.util.makeFormsInactive();
    window.util.makeFiltersInactive();

    window.validationForm.fillAddressFieldAdForm(mapPinMain);

    window.validationForm.setupMinPriceForField('placeholder');

    window.validationForm.setupMinPriceValidation(typeSelect);

    window.validationForm.setupValidationForRoom(roomNumber.value);
    window.validationForm.setupValueCapacity();

    window.validationForm.removeHandlersForm();
  }

  window.tearDown = {
    stopPageWork: stopPageWork,
  };
})();
