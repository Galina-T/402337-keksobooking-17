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

  var roomTitles = ['комната', 'комнаты', 'комнат'];
  var guestTitles = ['гостя', 'гостей', 'гостей'];
  /**
  * создает объект с DOM Node елементами карточки объявления
  * @param {HTMLElement} node DOM Node карточки объвления
  * @return {object} объект с блоками
  */
  function getCardElements(node) {
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
  * Скрывает DOM Node елемент карточки объявления
  * @param {HTMLElement} el DOM Node елемент карточки объвления
  */
  function hideElement(el) {
    el.setAttribute('style', 'display: none');
  }
  /**
  * @param {ad} ad объект объявления
  * @return {string} url аватара
  */
  function getDataAvatar(ad) {
    return ad.author.avatar;
  }
  /**
  * @param {ad} ad объект объявления
  * @return {string} заголовок объявления
  */
  function getDataTitle(ad) {
    return ad.offer.title;
  }
  /**
  * @param {ad} ad объект объявления
  * @return {string} адрес
  */
  function getDataAddress(ad) {
    return ad.offer.address;
  }
  /**
  * @param {ad} ad объект объявления
  * @return {number} цена
  */
  function getDataPrice(ad) {
    return ad.offer.price + '₽/ночь';
  }
  /**
  * @param {ad} ad объект объявления
  * @return {string} тип жилья
  */
  function getDataType(ad) {
    return window.constants.TYPES[ad.offer.type].name;
  }
  /**
  * @param {ad} ad объект объявления
  * @return {string} описание
  */
  function getDataDescription(ad) {
    return ad.offer.description;
  }
  /**
  * @param {HTMLElement} el DOM Node блока карточки объвления
  * @param {string} elField поле, в которое записываются данные
  * @param {ad} ad объект объявления
  * @param {Function} getData функция для получения данных
  */
  function fillElement(el, elField, ad, getData) {
    var data = getData(ad);
    if (window.util.isDataMissing(data)) {
      hideElement(el);
    } else {
      el[elField] = data;
    }
  }
  /**
  * @param {HTMLElement} el DOM Node блока карточки объвления
  * @param {object} data объект с данными для блока
  */
  function fillElementCapacity(el, data) {
    if (window.util.isDataMissing(data.rooms) || window.util.isDataMissing(data.guests)) {
      hideElement(el);
    } else {
      el.textContent = data.rooms + ' ' + window.util.getDeclinationForm(data.rooms, roomTitles)
          + ' для '
          + data.guests + ' ' + window.util.getDeclinationForm(data.guests, guestTitles);
    }
  }
  /**
  * @param {HTMLElement} el DOM Node блока карточки объвления
  * @param {object} data объект с данными для блока
  */
  function fillElementTime(el, data) {
    if (window.util.isDataMissing(el.checkin) || window.util.isDataMissing(el.checkout)) {
      hideElement(el);
    } else {
      el.textContent = 'Заезд после ' + data.checkin + ', выезд до ' + data.checkout;
    }
  }
  /**
  * @param {HTMLElement} el DOM Node блока карточки объвления
  * @param {*} data данные для блока
  */
  function fillElementFeatures(el, data) {
    if (window.util.isDataMissing(data)) {
      hideElement(el);
    } else {
      Array.prototype.forEach.call(el.children, hideElement);

      data.forEach(function (feature) {
        var classFeature = el.querySelector('.popup__feature--' + feature);

        if (classFeature) {
          classFeature.removeAttribute('style', 'display: none');
        }
      });
    }
  }
  /**
  * @param {HTMLElement} el DOM Node блока карточки объвления
  * @param {*} data данные для блока
  * @param {HTMLElement} img DOM Node children el
  */
  function fillElementPhotos(el, data, img) {
    if (window.util.isDataMissing(data)) {
      hideElement(el);
    } else {
      data.forEach(function (url, idx) {
        var nodePhoto = el.children[idx];
        if (nodePhoto) {
          nodePhoto.src = url;
        } else {
          var newImg = img.cloneNode(true);
          newImg.src = url;
          el.appendChild(newImg);
        }
      });
    }
  }
  /**
  * Подготавливает DOM Node объект карточки объявления
  * @param {ad} ad объект объявления
  * @return {HTMLElement} DOM Node карточки объвления
  */
  function createCardNode(ad) {
    var cardNode = templateCard.cloneNode(true);
    var cardNodePhoto = cardNode.querySelector('.popup__photo');
    var cardNodeElement = getCardElements(cardNode);

    fillElement(cardNodeElement.avatar, 'src', ad, getDataAvatar);
    fillElement(cardNodeElement.title, 'textContent', ad, getDataTitle);
    fillElement(cardNodeElement.address, 'textContent', ad, getDataAddress);
    fillElement(cardNodeElement.price, 'textContent', ad, getDataPrice);
    fillElement(cardNodeElement.type, 'textContent', ad, getDataType);
    fillElement(cardNodeElement.description, 'textContent', ad, getDataDescription);

    fillElementCapacity(cardNodeElement.capacity, ad.offer);
    fillElementTime(cardNodeElement.time, ad.offer);
    fillElementFeatures(cardNodeElement.features, ad.offer.features);
    fillElementPhotos(cardNodeElement.photos, ad.offer.photos, cardNodePhoto);

    cardNode.setAttribute('id', 'card-' + ad.id);
    cardNode.setAttribute('style', 'display: none');

    return cardNode;
  }

  window.card = {
    createCardNode: createCardNode
  };
})();
