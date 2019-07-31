'use strict';

window.constants = (function () {
  var cityMap = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  return {
    PIN_MAIN_LEFT: mapPinMain.offsetLeft,
    PIN_MAIN_TOP: mapPinMain.offsetTop,
    PIN_X_MIN: cityMap.clientLeft,
    PIN_X_MAX: cityMap.clientWidth,
    PIN_Y_MIN: 130,
    PIN_Y_MAX: 630,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    CLASS_NAME_MAP_INACTIVE: 'map--faded',
    QUANTITY: 5,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    SUCCESS_COD: 200,
    TIMEOUT: 10000,
    DEBOUNCE_INTERVAL: 500,
    TYPES: {
      palace: {
        name: 'Дворец',
        priceMin: 10000
      },
      flat: {
        name: 'Квартира',
        priceMin: 1000
      },
      house: {
        name: 'Дом',
        priceMin: 5000
      },
      bungalo: {
        name: 'Бунгало',
        priceMin: 0
      }
    },
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    DROP_EVENTS: ['dragenter', 'dragover', 'dragleave', 'drop'],
  };
})();
