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
  * @param {HTMLElement} pinActive выбранная метка
  */
  function openCard(pinActive) {
    var idPin = pinActive.attributes.id.textContent;
    var idCard = idPin.replace('pin', 'card');

    var card = document.querySelector('#' + idCard);

    pinActive.classList.add('map__pin--active');

    card.removeAttribute('style', 'display: none');
    card.addEventListener('keydown', onCardEnterPress);
  }

  /**
  * @param {HTMLElement} cardActive активная карточка
  */
  function closeCard(cardActive) {
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');

    cardActive.setAttribute('style', 'display: none');
    cardActive.removeEventListener('keydown', onCardEnterPress);
  }

  /**
  * @param {MouseEvent} evt
  */
  function onPinClick(evt) {
    var pinActive = document.querySelector('.map__pin--active');

    if (pinActive) {
      var idPinActive = pinActive.attributes.id.textContent;
      var idCardActive = idPinActive.replace('pin', 'card');
      closeCard(document.querySelector('#' + idCardActive));
    }
    openCard(evt.currentTarget);
  }
  /**
  * @param {KeyboardEvent} evt
  */
  function onPinEnterPress(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      var pinActive = document.querySelector('.map__pin--active');

      if (pinActive) {
        var idPinActive = pinActive.attributes.id.textContent;
        var idCardActive = idPinActive.replace('pin', 'card');
        closeCard(document.querySelector('#' + idCardActive));
      }
      openCard(evt.currentTarget);
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

  function addCardHandlers(el) {
    el.addEventListener('click', onCardClick);
    el.addEventListener('keydown', onCardEnterPress);
  }

  function addPinHandlers(el) {
    el.addEventListener('click', onPinClick);
    el.addEventListener('keydown', onPinEnterPress);
  }


  window.cityMap = {
    addCardHandlers: addCardHandlers,
    addPinHandlers: addPinHandlers,
    makeCityMapActive: makeCityMapActive,
    makeCityMapInactive: makeCityMapInactive
  };
})();
