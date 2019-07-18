'use strict';

(function () {
  var map = document.querySelector('.map');

  /**
  * Приводит карту в активное состояние
  *
  */
  function makeMapActive() {
    map.classList.remove('map--faded');
  }
  /**
  * Приводит карту в неактивное состояние
  *
  */
  function makeMapInactive() {
    map.classList.add('map--faded');
  }


  /**
  * Открывает карточку объявления
  *
  * @param {HTMLElement} pinActive выбранная метка
  */
  function openPopup(pinActive) {
    var idPin = pinActive.attributes.id.textContent;
    var idCard = idPin.replace('pin', 'card');

    var card = document.querySelector('#' + idCard);

    pinActive.classList.add('map__pin--active');

    card.removeAttribute('style', 'display: none');
    card.addEventListener('keydown', onPopupEnterPress);
  }

  /**
  * Закрывает карточку объявления
  *
  * @param {HTMLElement} cardActive активная карточка
  */
  function closePopup(cardActive) {
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');

    cardActive.setAttribute('style', 'display: none');
    cardActive.removeEventListener('keydown', onPopupEnterPress);
  }

  /**
  * Функция-обработчик при клике на метку мышкой
  *
  * @param {HTMLElement} evt
  */
  function onPinClick(evt) {
    var pinActive = document.querySelector('.map__pin--active');

    if (pinActive) {
      var idPinActive = pinActive.attributes.id.textContent;
      var idCardActive = idPinActive.replace('pin', 'card');
      closePopup(document.querySelector('#' + idCardActive));
    }
    openPopup(evt.currentTarget);
  }
  /**
  * Функция-обработчик при нажатии на метку Enter
  *
  * @param {HTMLElement} evt
  */
  function onPinEnterPress(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      var pinActive = document.querySelector('.map__pin--active');

      if (pinActive) {
        var idPinActive = pinActive.attributes.id.textContent;
        var idCardActive = idPinActive.replace('pin', 'card');
        closePopup(document.querySelector('#' + idCardActive));
      }
      openPopup(evt.currentTarget);
    }
  }

  /**
  * Функция-обработчик при клике на объявление мышкой
  *
  * @param {HTMLElement} evt
  */
  function onPopupClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(evt.currentTarget);
    }
  }
  /**
  * Функция-обработчик при нажатии на объявление Enter
  *
  * @param {HTMLElement} evt
  */
  function onPopupEnterPress(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE && evt.target.classList.contains('popup__close')) {
      closePopup(evt.currentTarget);
    }
  }

  function addCardHandlers(el) {
    el.addEventListener('click', onPopupClick);
    el.addEventListener('keydown', onPopupEnterPress);
  }

  function addPinHandlers(el) {
    el.addEventListener('click', onPinClick);
    el.addEventListener('keydown', onPinEnterPress);
  }


  window._map = {
    addCardHandlers: addCardHandlers,
    addPinHandlers: addPinHandlers,
    makeMapActive: makeMapActive,
    makeMapInactive: makeMapInactive
  };
})();
