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

var TYPES = {
  palace: {
    name: 'Дворец',
    priceMin: 10000
  },
  flat: {
    name: 'Квартира',
    priceMin: 1000
  },
  house: {
    name: 'Дом',
    priceMin: 5000
  },
  bungalo: {
    name: 'Бунгало',
    priceMin: 0
  }
};

var QUANTITY = 8;

var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var mapPinsCollection = map.getElementsByClassName('map__pin');

var typeSelect = document.querySelector('#type');
var priceInput = document.querySelector('#price');

var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');

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
function getAd(num) {
  return {
    author: {
      avatar: 'img/avatars/user' + num + '.png'
    },
    offer: {
      type: Object.keys(TYPES)[getRandomNumber(0, Object.keys(TYPES).length - 1)].name,
    },
    location: {
      x: getRandomNumber(PIN_X_MIN, PIN_X_MAX),
      y: getRandomNumber(PIN_Y_MIN, PIN_Y_MAX)
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

  Array.prototype.forEach.call(mapPinsCollection, function (obj) {
    obj.addEventListener('mousedown', onPinDrag);
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

    var newStyle = {
      left: pin.offsetLeft - shift.x,
      top: pin.offsetTop - shift.y
    };

    if (
      (newStyle.left < (PIN_X_MIN - PIN_WIDTH / 2) || newStyle.left > (PIN_X_MAX - PIN_WIDTH / 2))
      || (newStyle.top < (PIN_Y_MIN - PIN_HEIGHT) || newStyle.top > PIN_Y_MAX)
    ) {
      return;
    } else {
      pin.style.left = newStyle.left + 'px';
      pin.style.top = newStyle.top + 'px';
    }
    getAddressAdForm(pin);
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      if (pin.classList.contains('map__pin--main') && map.classList.contains('map--faded')) {
        setup();
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

deSetup();

priceInput.min = TYPES[typeSelect.value].priceMin; // не придумала еще куда примкнуть

mapPinMain.addEventListener('mousedown', onPinDrag);

// Валидация
typeSelect.addEventListener('input', function (evt) {
  priceInput.min = TYPES[evt.target.value].priceMin;

  var valueNumber = Number(priceInput.value);
  var minNumber = Number(priceInput.min);

  if (valueNumber < minNumber) {
    priceInput.setCustomValidity('минимальная цена за ночь ' + minNumber);
  } else {
    priceInput.setCustomValidity('');
  }
});

// Изменение placeholder
priceInput.addEventListener('input', function (evt) {
  evt.target.placeholder = evt.target.value;
});

// выбор времени заезда
timein.addEventListener('input', function (evt) {
  timeout.value = evt.target.value;
});

// выбор времени выезда
timeout.addEventListener('input', function (evt) {
  timein.value = evt.target.value;
});
