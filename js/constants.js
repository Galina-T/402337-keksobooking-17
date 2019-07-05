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
    QUANTITY: 8,
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
