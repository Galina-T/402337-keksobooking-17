'use strict';

(function () {
  /**
  * @typedef   {{author: {avatar: string},
  *              offer: {title: string,
  *                     address: string,
  *                     price: number,
  *                     type: string,
  *                     rooms: number,
  *                     guests: number,
  *                     checkin: string,
  *                     checkout: string,
  *                     features: string[],
  *                     description: string,
  *                     photos: string[]},
  *             location: {x: number,
  *                        y: number},
  *             show: boolean}} ad
  */

  var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  /**
  * Подготавливает DOM Node объект метки объявления
  *
  * @param {ad} ad объект объявления
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
