'use strict';

(function () {
  var map = document.querySelector('.map');

  /**
   * Проверяет вышла ли метка за границы карты
   *
   * @param {{left: number, top: number}} style объект с координатами метки
   * @param {HTMLElement} pin метка
   * @return {boolean} true
   */
  function isPinOutside(style, pin) {
    return (style.left < (window.constants.PIN_X_MIN - pin.scrollWidth / 2) || style.left > (window.constants.PIN_X_MAX - pin.scrollWidth / 2))
    || (style.top < (window.constants.PIN_Y_MIN - pin.scrollHeight) || style.top > window.constants.PIN_Y_MAX);
  }

  /**
   * создает функцию-обработчик для движения мыши
   * @param {{dragged: boolean, startCoords: {x: number, y: number}}} config
   * @param {HTMLElement} pin метка, которую перемещаем
   * @return {Function} onMouseMove функция-обработчик движения мыши
   */
  function makeOnMouseMove(config, pin) {
    return function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      config.dragged = true;

      var shift = {
        x: config.startCoords.x - moveEvt.clientX,
        y: config.startCoords.y - moveEvt.clientY,
      };

      config.startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var newStyle = {
        left: pin.offsetLeft - shift.x,
        top: pin.offsetTop - shift.y,
      };

      if (isPinOutside(newStyle, pin)) {
        return;
      } else {
        pin.style.left = newStyle.left + 'px';
        pin.style.top = newStyle.top + 'px';
      }
      window.validationForm.fillAddressFieldAdForm(pin);
    };
  }

  /**
   * создает функцию-обработчик остановки движения мыши при ненажатой кнопке мыши
   * @param {{dragged: boolean, startCoords: {x: number, y: number}}} config
   * @param {Function} onMouseMove функция-обработчик движения мыши
   * @return {Function} onMouseUp функция-обработчик остановки движения мыши при ненажатой кнопке мыши
   */
  function makeOnMouseUp(config, onMouseMove) {
    return function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (config.dragged) {
        if (map.classList.contains('map--faded')) {
          window.setup.startPageWork();
        }
      }
    };
  }

  function onPinDrag(evt) {
    evt.preventDefault();

    var pin = evt.currentTarget;

    var config = {
      dragged: false,
      startCoords: {
        x: evt.clientX,
        y: evt.clientY
      }
    };

    var onMouseMove = makeOnMouseMove(config, pin);
    var onMouseUp = makeOnMouseUp(config, onMouseMove);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  window.pinDrag = {
    onPinDrag: onPinDrag,
  };
})();
