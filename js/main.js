'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFilters = map.querySelector('.map__filters');

var notice = document.querySelector('.notice');
var adForm = notice.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('#address');

var PIN_X_MIN = mapPins.clientLeft;
var PIN_X_MAX = mapPins.clientWidth;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var QUANTITY = TITLE.length;

var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var templateCard = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var mapPinsCollection = map.getElementsByClassName('map__pin');
var mapCardsCollection = map.getElementsByClassName('map__card');

/**
* Возвращает целое случайное число в диапазоне [min; max]
*
* @param {number} min минимальное значение
* @param {number} max максимальное значение
* @return {number} случайное число.
*/
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Сортирует элементы внутри массива случайным образом
*
* @param {object} arr массив, который необходимо отсортировать
* @return {object} отсортированный массив.
*/
function shuffleArr(arr) {
  var newArr = arr.slice(0);
  for (var i = newArr.length - 1; i > 0; i--) {
    var num = getRandomNumber(0, i);
    var temp = newArr[num];
    newArr[num] = newArr[i];
    newArr[i] = temp;
  }
  return newArr;
}

/**
* Генерирует массив с номерами для адресов изображений
*
* @param {number} n количество адресов изображений
* @return {object} массив с номером для каждого адреса.
*/
function getNumsImgs(n) {
  var arr = [];
  for (var i = 1; i < n + 1; i++) {
    i = i < 10 ? '0' + i : i;
    arr.push(i);
  }
  return arr;
}

/**
* Генерирует объект, описывающий объявление
*
* @param {number} num номер адреса изображения метки объявления в общем массиве
* @param {number} idx индекс заголовка объявления
* @return {object} обьект, описывающий объявление.
*/
function getAd(num, idx) {
  var coordX = getRandomNumber(PIN_X_MIN, PIN_X_MAX);
  var coordY = getRandomNumber(PIN_Y_MIN, PIN_Y_MAX);
  return {
    author: {
      avatar: 'img/avatars/user' + num + '.png'
    },
    offer: {
      title: TITLE[idx],
      address: coordX + ', ' + coordY,
      price: getRandomNumber(0, 1000000),
      type: Object.keys(TYPES)[getRandomNumber(0, Object.keys(TYPES).length - 1)],
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(2, 10),
      checkin: CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      features: FEATURES.slice(getRandomNumber(0, FEATURES.length)),
      description: '',
      photos: shuffleArr(PHOTOS)
    },
    location: {
      x: coordX,
      y: coordY
    }
  };
}

/**
* Генерирует массив с объявлениями
*
* @param {number} n количество объявлений для генерации
* @return {object} массив из n сгенерированных объектов, описывающих похожие объявления неподалёку.
*/
function getAds(n) {
  var arr = shuffleArr(getNumsImgs(n));
  return arr.map(getAd);
}

/**
* Подготавливает DOM Node объект метки объявления
*
* @param {object} obj объект метки, сгенерированной `getAd`
* @return {object} DOM Node метки объвления
*/
function createPinNode(obj) {
  var pinNode = templatePin.cloneNode(true);

  pinNode.style.left = obj.location.x - PIN_WIDTH / 2 + 'px';
  pinNode.style.top = obj.location.y - PIN_HEIGHT + 'px';
  pinNode.querySelector('img').src = obj.author.avatar;
  pinNode.querySelector('img').alt = 'заголовок объявления';

  return pinNode;
}

/**
* Подготавливает DOM Node объект карточки объявления
*
* @param {object} obj объект карточки, сгенерированной `getAd`
* @return {object} DOM Node карточки объвления
*/
function createCardNode(obj) {
  var cardNode = templateCard.cloneNode(true);
  var cardNodePhotoPopup = cardNode.querySelector('.popup__photos');
  var cardNodePhoto = cardNode.querySelector('.popup__photo');

  var popupFeatures = cardNode.querySelector('.popup__features');

  cardNode.setAttribute('style', 'display: none');
  cardNode.querySelector('.popup__avatar').src = obj.author.avatar;
  cardNode.querySelector('.popup__title').textContent = obj.offer.title;
  cardNode.querySelector('.popup__text--address').textContent = obj.offer.address;
  cardNode.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  cardNode.querySelector('.popup__type').textContent = TYPES[obj.offer.type];
  cardNode.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  cardNode.querySelector('.popup__description').textContent = obj.offer.description;

  Array.prototype.forEach.call(popupFeatures.children, function (el) {
    el.setAttribute('style', 'display: none');
  });

  obj.offer.features.forEach(function (el) {
    var classFeature = popupFeatures.querySelector('.popup__feature--' + el);
    if (classFeature) {
      classFeature.removeAttribute('style', 'display: none');
    }
  });

  obj.offer.photos.forEach(function (el, idx) {
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

/**
* Отрисовывает DOM Node объект
*
* @param {number} arr объект, в котором содержатся данные для отрисовки
* @param {number} createFn функция подготовки DOM Node объекта
* @param {number} attachNode узел прикрепления DOM Node объекта
*/
function renderNodes(arr, createFn, attachNode) {
  var fragment = document.createDocumentFragment();

  arr.forEach(function (el) {
    fragment.appendChild(createFn(el));
  });
  attachNode.appendChild(fragment);
}

/**
* Приводит карту в активное состояние
*
*/
function getActiveMap() {
  map.classList.remove('map--faded');
}

/**
* Приводит карту в неактивное состояние
*
*/
function getInactiveMap() {
  map.classList.add('map--faded');
}

/**
* Приводит форму подачи заявления в активное состояние
*
*/
function getActiveForms() {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach(function (el) {
    el.removeAttribute('disabled');
  });
}

/**
* Блокирует форму подачи заявления
*
*/
function getInactiveForms() {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });
}

/**
* Приводит фильтры в активное состояние
*
*/
function getActiveFilters() {
  mapFilters.querySelectorAll('select').forEach(function (el) {
    el.removeAttribute('disabled');
  });
  mapFilters.querySelectorAll('fieldset').forEach(function (el) {
    el.removeAttribute('disabled');
  });
}

/**
* Блокирует фильтры
*
*/
function getInactiveFilters() {
  mapFilters.querySelectorAll('select').forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });
  mapFilters.querySelectorAll('fieldset').forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });
}

// запускает работу карты
function setup() {
  var ads = getAds(QUANTITY);
  getActiveMap();
  getActiveForms();
  getActiveFilters();
  renderNodes(ads, createPinNode, mapPins);
  renderNodes(ads, createCardNode, map);

  Array.prototype.forEach.call(mapPinsCollection, function (obj) {
    obj.addEventListener('click', onPinClick);
  });
  Array.prototype.forEach.call(mapPinsCollection, function (obj) {
    obj.addEventListener('keydown', onPinEnterPress);
  });

  Array.prototype.forEach.call(mapPinsCollection, function (obj) {
    obj.addEventListener('mousedown', onPinDrag);
  });

  Array.prototype.forEach.call(mapCardsCollection, function (obj) {
    obj.addEventListener('click', onPopupClick);
  });
  Array.prototype.forEach.call(mapCardsCollection, function (obj) {
    obj.addEventListener('click', onPinEnterPress);
  });
}

// останавливает работу карты
function deSetup() {
  getInactiveMap();
  getInactiveForms();
  getInactiveFilters();
  getAddressAdForm(mapPinMain);
}

// адресс в поле
function getAddressAdForm(el) {
  if (el.classList.contains('map__pin--main')) {
    adFormAddress.placeholder = (el.offsetLeft + el.clientWidth / 2) + ', ' + (el.offsetTop + el.scrollHeight);
  } else {
    adFormAddress.placeholder = (el.offsetLeft + el.clientWidth / 2) + ', ' + (el.offsetTop + el.clientHeight);
  }
}

// открываем попап
function openPopup(el) {
  el.removeAttribute('style', 'display: none');
  el.addEventListener('keydown', onPopupEnterPress);
}

// закрываем попап
function closePopup(el) {
  el.setAttribute('style', 'display: none');
  el.removeEventListener('keydown', onPopupEnterPress);
}

// перетаскивание
function onPinDrag(evt) {
  evt.preventDefault();

  var pin = evt.currentTarget;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pin.style.left = (pin.offsetLeft - shift.x) + 'px';
    pin.style.top = (pin.offsetTop - shift.y) + 'px';

    getAddressAdForm(pin);
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      pin.removeEventListener('click', onPinClick);

      if (pin.classList.contains('map__pin--main') && map.classList.contains('map--faded')) {
        setup();
      }
    }
  }

  pin.addEventListener('click', onPinClick);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

// обработчик открытия попапа
function onPinClick(evt) {
  if (!evt.currentTarget.classList.contains('map__pin--main')) {
    var srcAvatarPin = evt.currentTarget.querySelector('img').attributes.src.textContent;
    var srcAvatarsCollection = [].map.call(mapCardsCollection, function (obj) {
      return obj.querySelector('img').attributes.src.textContent;
    });
    openPopup(mapCardsCollection[srcAvatarsCollection.indexOf(srcAvatarPin)]);
  }
}
function onPinEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    var srcAvatarPin = evt.currentTarget.querySelector('img').attributes.src.textContent;
    var srcAvatarsCollection = [].map.call(mapCardsCollection, function (obj) {
      return obj.querySelector('img').attributes.src.textContent;
    });
    openPopup(mapCardsCollection[srcAvatarsCollection.indexOf(srcAvatarPin)]);
  }
}

// обработчики закрытия попапа
function onPopupClick(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
}
function onPopupEnterPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(evt.currentTarget);
  }
}

deSetup();

mapPinMain.addEventListener('mousedown', onPinDrag);
