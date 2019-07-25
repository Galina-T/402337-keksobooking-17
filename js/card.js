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
  *             show: boolean}} ad объект объявления
  */

  var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var titlesRoom = ['комната', 'комнаты', 'комнат'];
  var titlesGuest = ['гостя', 'гостей', 'гостей'];
  /**
  * создает объект с DOM Node блоков карточки объявления
  *
  * @param {HTMLElement} node DOM Node карточки объвления
  * @return {object} объект с блоками
  */
  function createCardBlock(node) {
    return {
      avatar: node.querySelector('.popup__avatar'),
      title: node.querySelector('.popup__title'),
      address: node.querySelector('.popup__text--address'),
      price: node.querySelector('.popup__text--price'),
      type: node.querySelector('.popup__type'),
      capacity: node.querySelector('.popup__text--capacity'),
      time: node.querySelector('.popup__text--time'),
      features: node.querySelector('.popup__features'),
      description: node.querySelector('.popup__description'),
      photos: node.querySelector('.popup__photos'),
    };
  }

  /**
  * Создает объект с DOM Node елементами карточки объявления
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  */
  function setupBlockDisplay(block) {
    block.setAttribute('style', 'display: none');
  }

  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {*} data данные для блока
  */
  function fillBlockAvatar(block, data) {
    if (window.util.isDataMissing(data)) {
      setupBlockDisplay(block);
    } else {
      block.src = data;
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {*} data данные для блока
  */
  function fillBlockTitle(block, data) {
    if (window.util.isDataMissing(data)) {
      setupBlockDisplay(block);
    } else {
      block.textContent = data;
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {*} data данные для блока
  */
  function fillBlockAddress(block, data) {
    if (window.util.isDataMissing(data)) {
      setupBlockDisplay(block);
    } else {
      block.textContent = data;
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {*} data данные для блока
  */
  function fillBlockPrice(block, data) {
    if (window.util.isDataMissing(data)) {
      setupBlockDisplay(block);
    } else {
      block.textContent = data + '₽/ночь';
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {*} data данные для блока
  */
  function fillBlockType(block, data) {
    if (window.util.isDataMissing(data)) {
      setupBlockDisplay(block);
    } else {
      block.textContent = window.constants.TYPES[data].name;
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {object} el объект с данными для блока
  */
  function fillBlockCapacity(block, el) {
    if (window.util.isDataMissing(el.rooms) || window.util.isDataMissing(el.guests)) {
      setupBlockDisplay(block);
    } else {
      block.textContent = el.rooms + ' ' + window.util.declOfNum(el.rooms, titlesRoom)
        + ' для '
        + el.guests + ' ' + window.util.declOfNum(el.guests, titlesGuest);
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {object} el объект с данными для блока
  */
  function fillBlockTime(block, el) {
    if (window.util.isDataMissing(el.checkin) || window.util.isDataMissing(el.checkout)) {
      setupBlockDisplay(block);
    } else {
      block.textContent = 'Заезд после ' + el.checkin + ', выезд до ' + el.checkout;
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {*} data данные для блока
  */
  function fillBlockDescription(block, data) {
    if (window.util.isDataMissing(data)) {
      setupBlockDisplay(block);
    } else {
      block.textContent = data;
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {*} data данные для блока
  */
  function fillBlockFeatures(block, data) {
    if (window.util.isDataMissing(data)) {
      setupBlockDisplay(block);
    } else {
      Array.prototype.forEach.call(block.children, function (feature) {
        feature.setAttribute('style', 'display: none');
      });

      data.forEach(function (feature) {
        var classFeature = block.querySelector('.popup__feature--' + feature);

        if (classFeature) {
          classFeature.removeAttribute('style', 'display: none');
        }
      });
    }
  }
  /**
  *
  * @param {HTMLElement} block DOM Node блока карточки объвления
  * @param {*} data данные для блока
  * @param {HTMLElement} el DOM Node children block
  */
  function fillBlockPhotos(block, data, el) {
    if (window.util.isDataMissing(data)) {
      setupBlockDisplay(block);
    } else {
      data.forEach(function (url, idx) {
        var nodePhoto = block.children[idx];
        if (nodePhoto) {
          nodePhoto.src = url;
        } else {
          var newEl = el.cloneNode(true);
          newEl.src = url;
          block.appendChild(newEl);
        }
      });
    }
  }

  /**
  * Подготавливает DOM Node объект карточки объявления
  *
  * @param {ad} ad объект объявления
  * @return {HTMLElement} DOM Node карточки объвления
  */
  function createCardNode(ad) {
    var cardNode = templateCard.cloneNode(true);
    var cardNodePhoto = cardNode.querySelector('.popup__photo');
    var cardBlock = createCardBlock(cardNode);

    fillBlockAvatar(cardBlock.avatar, ad.author.avatar);
    fillBlockTitle(cardBlock.title, ad.offer.title);
    fillBlockAddress(cardBlock.address, ad.offer.address);
    fillBlockPrice(cardBlock.price, ad.offer.price);
    fillBlockType(cardBlock.type, ad.offer.type);
    fillBlockCapacity(cardBlock.capacity, ad.offer);
    fillBlockTime(cardBlock.time, ad.offer);
    fillBlockDescription(cardBlock.description, ad.offer.description);
    fillBlockFeatures(cardBlock.features, ad.offer.features);
    fillBlockPhotos(cardBlock.photos, ad.offer.photos, cardNodePhoto);

    cardNode.setAttribute('id', 'card-' + ad.id);
    cardNode.setAttribute('style', 'display: none');

    return cardNode;
  }

  window.card = {
    createCardNode: createCardNode
  };
})();
