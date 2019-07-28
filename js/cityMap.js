'use strict';

(function () {
  var cityMap = document.querySelector('.map');

  function makeCityMapActive() {
    cityMap.classList.remove('map--faded');
  }

  function makeCityMapInactive() {
    cityMap.classList.add('map--faded');
  }
  /**
  * @param {HTMLElement} pin метка
  * @return {HTMLElement} карточка
  */
  function getCard(pin) {
    var idPin = pin.attributes.id.textContent;
    var idCard = idPin.replace('pin', 'card');
    return document.querySelector('#' + idCard);
  }

  /**
  * @param {HTMLElement} pinActive выбранная метка
  */
  function openCard(pinActive) {
    var card = getCard(pinActive);

    pinActive.classList.add('map__pin--active');

    card.removeAttribute('style', 'display: none');
    card.addEventListener('keydown', onCardEnterPress);
    card.addEventListener('click', onCardClick);

    document.addEventListener('keydown', onCardEscPress);
  }

  /**
  * @param {HTMLElement} cardActive активная карточка
  */
  function closeCard(cardActive) {
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');

    cardActive.setAttribute('style', 'display: none');
    cardActive.removeEventListener('keydown', onCardEnterPress);
    cardActive.removeEventListener('click', onCardClick);

    document.removeEventListener('keydown', onCardEscPress);
  }

  /**
  * @param {MouseEvent} evt
  */
  function onPinClick(evt) {
    var pinActive = document.querySelector('.map__pin--active');

    if (pinActive) {
      var cardActive = getCard(pinActive);
      closeCard(cardActive);
    }
    openCard(evt.currentTarget);
  }
  /**
  * @param {KeyboardEvent} evt
  */
  function onPinEnterPress(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      onPinClick(evt);
    }
  }

  /**
  * @param {MouseEvent} evt
  */
  function onCardClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
      closeCard(evt.currentTarget);
    }
  }
  /**
  *
  * @param {KeyboardEvent} evt
  */
  function onCardEnterPress(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE && evt.target.classList.contains('popup__close')) {
      closeCard(evt.currentTarget);
    }
  }
  /**
  *
  * @param {KeyboardEvent} evt
  */
  function onCardEscPress(evt) {
    var pinActive = document.querySelector('.map__pin--active');

    if (evt.keyCode === window.constants.ESC_KEYCODE && pinActive) {
      var cardActive = getCard(pinActive);
      closeCard(cardActive);
    }
  }

  function addPinHandlers(el) {
    el.addEventListener('click', onPinClick);
    el.addEventListener('keydown', onPinEnterPress);
  }


  window.cityMap = {
    addPinHandlers: addPinHandlers,
    makeCityMapActive: makeCityMapActive,
    makeCityMapInactive: makeCityMapInactive
  };
})();
