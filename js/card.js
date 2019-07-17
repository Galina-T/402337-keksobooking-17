'use strict';

(function () {
  var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  /**
  * Подготавливает DOM Node объект карточки объявления
  *
  * @param {object} ad объект объявления, полученный с сервера
  * @return {HTMLElement} DOM Node карточки объвления
  */
  function createCardNode(ad) {
    var cardNode = templateCard.cloneNode(true);

    var popupFeatures = cardNode.querySelector('.popup__features');

    var cardNodePhotoPopup = cardNode.querySelector('.popup__photos');
    var cardNodePhoto = cardNode.querySelector('.popup__photo');

    cardNode.setAttribute('id', 'card-' + ad.id);
    cardNode.setAttribute('style', 'display: none');
    cardNode.querySelector('.popup__avatar').src = ad.author.avatar;
    cardNode.querySelector('.popup__title').textContent = ad.offer.title;
    cardNode.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardNode.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardNode.querySelector('.popup__type').textContent = window.constants.TYPES[ad.offer.type].name;
    cardNode.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    cardNode.querySelector('.popup__description').textContent = ad.offer.description;

    Array.prototype.forEach.call(popupFeatures.children, function (el) {
      el.setAttribute('style', 'display: none');
    });
    ad.offer.features.forEach(function (el) {
      var classFeature = popupFeatures.querySelector('.popup__feature--' + el);

      if (classFeature) {
        classFeature.removeAttribute('style', 'display: none');
      }
    });

    ad.offer.photos.forEach(function (el, idx) {
      var nodePhoto = cardNodePhotoPopup.children[idx];
      if (nodePhoto) {
        nodePhoto.src = el;
      } else {
        var newEl = cardNodePhoto.cloneNode(true);
        newEl.src = el;
        cardNodePhotoPopup.appendChild(newEl);
      }
    });

    return cardNode;
  }

  window.card = {
    createCardNode: createCardNode
  };
})();
