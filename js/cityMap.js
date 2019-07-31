'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  var htmlCollection = {
    pins: document.getElementsByClassName('map__pin'),
    cards: document.getElementsByClassName('map__card'),
  };

  /**
  * @param {HTMLElement} cityMap карта города
  */
  function makeCityMapActive(cityMap) {
    cityMap.classList.remove(window.constants.CLASS_NAME_MAP_INACTIVE);
  }
  /**
  * @param {HTMLElement} cityMap карта города
  */
  function makeCityMapInactive(cityMap) {
    cityMap.classList.add(window.constants.CLASS_NAME_MAP_INACTIVE);
  }
  /**
  * @param {object[]} data объект с данными
  */
  function setupRenderAds(data) {
    var listAdsShow = window.util.generateArrayOfObjectsToRender(data, window.constants.QUANTITY);

    window.render.renderNodes(listAdsShow, window.pin.createPinNode, mapPins, addPinHandlers);
    window.render.renderNodes(listAdsShow, window.card.createCardNode, mapPins);
  }

  function setupRemoveAds() {
    return window.util.applyToTheWholeObject(window.util.removeElements, htmlCollection);
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
  * @param {KeyboardEvent} evt
  */
  function onCardEnterPress(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE && evt.target.classList.contains('popup__close')) {
      closeCard(evt.currentTarget);
    }
  }
  /**
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
    makeCityMapActive: makeCityMapActive,
    makeCityMapInactive: makeCityMapInactive,
    setupRenderAds: setupRenderAds,
    setupRemoveAds: setupRemoveAds,
  };
})();
