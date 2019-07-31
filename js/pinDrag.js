'use strict';

(function () {

  /**
   * @param {HTMLElement} map карта, по которой перемещается пин
   * @return {boolean} boolean
   */
  function isCityMapInactive(map) {
    return map.classList.contains(window.constants.CLASS_NAME_MAP_INACTIVE);
  }
  /**
   * @param {{left: number, top: number}} style объект с координатами метки
   * @param {HTMLElement} pin метка
   * @return {boolean} boolean
   */
  function isPinBigOutside(style, pin) {
    return (style.left < (window.constants.PIN_X_MIN - pin.clientWidth / 2) || style.left > (window.constants.PIN_X_MAX - pin.clientWidth / 2))
    || (style.top < (window.constants.PIN_Y_MIN - pin.clientHeight / 2) || style.top > (window.constants.PIN_Y_MAX - pin.clientHeight));

  }
  /**
   * @param {{left: number, top: number}} style объект с координатами метки
   * @param {HTMLElement} pin метка
   * @return {boolean} boolean
   */
  function isPinSmallOutside(style, pin) {
    return (style.left < (window.constants.PIN_X_MIN - pin.scrollWidth / 2) || style.left > (window.constants.PIN_X_MAX - pin.scrollWidth / 2))
    || (style.top < (window.constants.PIN_Y_MIN - pin.scrollHeight) || style.top > (window.constants.PIN_Y_MAX - pin.scrollHeight));
  }
  /**
   * Проверяет вышла ли метка за границы карты
   * @param {HTMLElement} map карта, по которой перемещается пин
   * @param {{left: number, top: number}} style объект с координатами метки
   * @param {HTMLElement} pin метка
   * @return {boolean} boolean
   */
  function isPinOutside(map, style, pin) {
    return isCityMapInactive(map) ? isPinBigOutside(style, pin) : isPinSmallOutside(style, pin);
  }

  /**
   * @param {{dragged: boolean, startCoords: {x: number, y: number}}} config объект, описывающий параметры перемещения
   * @param {HTMLElement} pin метка, которую перемещаем
   * @param {Function} cb функция-callback, запускаемая при движении мыши
   * @return {Function} onMouseMove функция-обработчик движения мыши
   */
  function makeOnMouseMove(config, pin, cb) {
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

      if (isPinOutside(config.cityMap, newStyle, pin)) {
        return;
      } else {
        pin.style.left = newStyle.left + 'px';
        pin.style.top = newStyle.top + 'px';
      }
      cb(pin);
    };
  }

  /**
   * @param {{dragged: boolean, startCoords: {x: number, y: number}}} config объект, описывающий параметры перемещения
   * @param {Function} onMouseMove функция-обработчик движения мыши
   * @param {Function} cb функция-callback, запускаемая при mouseUp
   * @return {Function} onMouseUp функция-обработчик остановки движения мыши при ненажатой кнопке мыши
   */
  function makeOnMouseUp(config, onMouseMove, cb) {
    return function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (config.dragged && isCityMapInactive(config.cityMap)) {
        cb();
      }
    };
  }

  /**
   * @param {Function} cbMouseMove функция-callback, запускаемая при mouseUp
   * @param {Function} cbMouseUp функция-callback, запускаемая при mouseMove
   * @param {HTMLElement} map карта, по которой перемещается пин
   * @return {Function} onPinDrag функция-обработчик перемещения метки
   */
  function makeOnPinDrag(cbMouseMove, cbMouseUp, map) {
    return function onPinDrag(evt) {
      evt.preventDefault();
      var pin = evt.currentTarget;
      var config = {
        dragged: false,
        startCoords: {
          x: evt.clientX,
          y: evt.clientY
        },
        cityMap: map,
      };

      var onMouseMove = makeOnMouseMove(config, pin, cbMouseMove);
      var onMouseUp = makeOnMouseUp(config, onMouseMove, cbMouseUp);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
  }

  window.pinDrag = {
    makeOnPinDrag: makeOnPinDrag,
  };
})();
