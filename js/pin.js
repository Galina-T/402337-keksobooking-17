'use strict';

(function () {
  var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  /**
  * Подготавливает DOM Node объект метки объявления
  *
  * @param {object} ad объект объявления, полученный с сервера
  * @return {HTMLElement} DOM Node метки объвления
  */
  function createPinNode(ad) {
    var pinNode = templatePin.cloneNode(true);

    pinNode.setAttribute('id', 'pin-' + ad.id);

    pinNode.style.left = ad.location.x - window.constants.PIN_WIDTH / 2 + 'px';
    pinNode.style.top = ad.location.y - window.constants.PIN_HEIGHT + 'px';
    pinNode.querySelector('img').src = ad.author.avatar;
    pinNode.querySelector('img').alt = 'заголовок объявления';

    return pinNode;
  }

  window.pin = {
    createPinNode: createPinNode
  };
})();
