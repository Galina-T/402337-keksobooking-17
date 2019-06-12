'use strict';

var mapPins = document.querySelector('.map__pins');

var PIN_X_MIN = mapPins.clientLeft;
var PIN_X_MAX = mapPins.clientWidth;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var QUANTITY = 8;

var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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
  for (var i = arr.length - 1; i > 0; i--) {
    var num = getRandomNumber(0, i);
    var temp = arr[num];
    arr[num] = arr[i];
    arr[i] = temp;
  }
  return arr;
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
* @return {object} обьект, описывающий объявление.
*/
function getAd(num) {
  return {
    author: {
      avatar: 'img/avatars/user' + num + '.png'
    },
    offer: {
      type: TYPES[getRandomNumber(0, TYPES.length - 1)]
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
* @param {object} obj объект метки, сгенерированной `getPin`
* @return {object} DOM Node метки объвления
*/
function renderPin(obj) {
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
* @param {number} renderFn функция подготовки DOM Node объекта
* @param {number} attachNode узел прикрепления DOM Node объекта
*/
function showNodes(arr, renderFn, attachNode) {
  var fragment = document.createDocumentFragment();

  arr.forEach(function (el) {
    fragment.appendChild(renderFn(el));
  });
  attachNode.appendChild(fragment);
}

/**
* Удаляет класс у DOM элемента
*
* @param {object} root родительский DOM элемент
* @param {string} el селектор элемента, у которого удаляется класс
* @param {string} className имя класса, который необходимо удалить
*/
function removeClassName(root, el, className) {
  root.querySelector(el).classList.remove(className);
}

showNodes(getAds(QUANTITY), renderPin, mapPins);
removeClassName(document, '.map', 'map--faded');
