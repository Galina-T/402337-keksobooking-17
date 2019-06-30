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

var typeSelect = document.querySelector('#type');
var priceInput = document.querySelector('#price');

var timeOfArrival = adForm.querySelector('#timein');
var checkOutTime = adForm.querySelector('#timeout');

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
* @param {*[]} arr массив, который необходимо перемешать
* @return {*[]} отсортированный массив.
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
* @param {number} amountOfImages количество адресов изображений
* @return {number[]} массив с номером для каждого адреса.
*/
function getNumsImgs(amountOfImages) {
  var arr = [];
  for (var i = 1; i < amountOfImages + 1; i++) {
    i = i < 10 ? '0' + i : i;
    arr.push(i);
  }
  return arr;
}

/**
* Генерирует объект, описывающий объявление
*
* @param {number} numImg номер адреса изображения метки объявления в общем массиве
* @return {object} обьект, описывающий объявление.
*/
function generateAd(numImg) {
  return {
    author: {
      avatar: 'img/avatars/user' + numImg + '.png'
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
* @return {object[]} массив из n сгенерированных объектов, описывающих похожие объявления неподалёку.
*/
function generateAds(n) {
  var arr = shuffleArr(getNumsImgs(n));
  return arr.map(generateAd);
}

/**
* Подготавливает DOM Node объект метки объявления
*
* @param {object} ad объект метки, сгенерированной `generateAd`
* @return {HTMLElement} DOM Node метки объвления
*/
function createPinNode(ad) {
  var pinNode = templatePin.cloneNode(true);

  pinNode.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinNode.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinNode.querySelector('img').src = ad.author.avatar;
  pinNode.querySelector('img').alt = 'заголовок объявления';

  return pinNode;
}

/**
* Отрисовывает DOM Node объект
*
* @param {object[]} arr массив, в котором содержатся данные для отрисовки
* @param {Function} createFn функция подготовки DOM Node объекта
* @param {HTMLElement} attachNode узел прикрепления DOM Node объекта
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
function makeMapActive() {
  map.classList.remove('map--faded');
}

/**
* Приводит карту в неактивное состояние
*
*/
function makeMapInactive() {
  map.classList.add('map--faded');
}

/**
* Приводит форму подачи заявления в активное состояние
*
*/
function makeFormsActive() {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach(function (el) {
    el.removeAttribute('disabled');
  });
}

/**
* Блокирует форму подачи заявления
*
*/
function makeFormsInactive() {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });
}

/**
* Приводит фильтры в активное состояние
*
*/
function makeFiltersActive() {
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
function makeFiltersInactive() {
  mapFilters.querySelectorAll('select').forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });
  mapFilters.querySelectorAll('fieldset').forEach(function (el) {
    el.setAttribute('disabled', 'disabled');
  });
}

/**
* Заполняет поле адреса координатами метки
* @param {HTMLElement} el метка, для которой заполняется адрес
*/
function fillAddressFieldAdForm(el) {
  adFormAddress.value = (el.offsetLeft + el.scrollWidth / 2) + ', ' + (el.offsetTop + el.scrollHeight);
}

// запускает работу страницы
function setup() {
  var ads = generateAds(QUANTITY);
  makeMapActive();
  makeFormsActive();
  makeFiltersActive();
  renderNodes(ads, createPinNode, mapPins);

  typeSelect.addEventListener('input', function (evt) {
    setupMinPriceForField('placeholder');
    setupMinPriceValidation(evt.target);
  });

  priceInput.addEventListener('input', function (evt) {
    setupMinPriceValidation(evt.target);
  });

  timeOfArrival.addEventListener('input', function (evt) {
    checkOutTime.value = evt.target.value;
  });

  checkOutTime.addEventListener('input', function (evt) {
    timeOfArrival.value = evt.target.value;
  });
}

// останавливает работу страницы
function tearDown() {
  makeMapInactive();
  makeFormsInactive();
  makeFiltersInactive();
  fillAddressFieldAdForm(mapPinMain);

  setupMinPriceForField('placeholder');

  setupMinPriceValidation(typeSelect);

  typeSelect.removeEventListener('input', function (evt) {
    setupMinPriceForField(typeSelect, 'placeholder');
    setupMinPriceValidation(evt.target);
  });

  timeOfArrival.removeEventListener('input', function (evt) {
    checkOutTime.value = evt.target.value;
  });

  checkOutTime.removeEventListener('input', function (evt) {
    timeOfArrival.value = evt.target.value;
  });
}

/**
* Настраивает валидацию минимальной цены определенного типа жилья
* @param {HTMLElement} field поле валидации
*/
function setupMinPriceValidation(field) {
  if (field === typeSelect) {
    setupMinPriceForField('min');
  }

  var valueNumber = Number(priceInput.value);
  var minNumber = Number(priceInput.min);

  if (valueNumber < minNumber) {
    priceInput.setCustomValidity('минимальная цена за ночь ' + minNumber);
  } else {
    priceInput.setCustomValidity('');
  }
}

/**
* Записывает значение минимальной цены, выбранного типа жилья, в необходимое свойство
* @param {string} property свойство, в которое записывается минимальная цена
*/
function setupMinPriceForField(property) {
  priceInput[property] = TYPES[typeSelect.value].priceMin;
}

/**
 * Проверяет вышла ли метка за границы карты
 *
 * @param {{left: number, top: number}} style объект с координатами метки
 * @param {HTMLElement} pin метка
 * @return {boolean} true
 */
function isPinOutside(style, pin) {
  return (style.left < (PIN_X_MIN - pin.scrollWidth / 2) || style.left > (PIN_X_MAX - pin.scrollWidth / 2))
  || (style.top < (PIN_Y_MIN - pin.scrollHeight) || style.top > PIN_Y_MAX);
}

/**
 * создает функцию-обработчик для движения мыши
 * @param {{dragged: boolean, startCoords: {x: number, y: number}}} config
 * @param {HTMLElement} pin метка, которую перемещаем
 * @return {Function} onMouseMove функцию-обработчик движения мыши
 */
function makeOnMouseMove(config, pin) {
  return function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    config.dragged = true;

    var shift = {
      x: config.startCoords.x - moveEvt.clientX,
      y: config.startCoords.y - moveEvt.clientY,
    };

    config.startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    var newStyle = {
      left: pin.offsetLeft - shift.x,
      top: pin.offsetTop - shift.y,
    };

    if (isPinOutside(newStyle, pin)) {
      return;
    } else {
      pin.style.left = newStyle.left + 'px';
      pin.style.top = newStyle.top + 'px';
    }
    fillAddressFieldAdForm(pin);
  };
}

/**
 * создает функцию-обработчик для движения мыши
 * @param {{dragged: boolean, startCoords: {x: number, y: number}}} config
 * @param {Function} onMouseMove функцию-обработчик движения мыши
 * @return {Function} onMouseUp функцию-обработчик остановки движения мыши при ненажатой кнопке мыши
 */
function makeOnMouseUp(config, onMouseMove) {
  return function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (config.dragged) {
      if (map.classList.contains('map--faded')) {
        setup();
      }
    }
  };
}

function onPinDrag(evt) {
  evt.preventDefault();

  var pin = evt.currentTarget;

  var config = {
    dragged: false,
    startCoords: {
      x: evt.clientX,
      y: evt.clientY
    }
  };

  var onMouseMove = makeOnMouseMove(config, pin);
  var onMouseUp = makeOnMouseUp(config, onMouseMove);

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

tearDown();

mapPinMain.addEventListener('mousedown', onPinDrag);
