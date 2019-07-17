'use strict';

window.constants = (function () {
  var mapPins = document.querySelector('.map__pins');

  return {
    PIN_X_MIN: mapPins.clientLeft,
    PIN_X_MAX: mapPins.clientWidth,
    PIN_Y_MIN: 130,
    PIN_Y_MAX: 630,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    PIN_MAIN_LEFT: 570,
    PIN_MAIN_TOP: 375,
    QUANTITY: 8,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
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
  };
})();
