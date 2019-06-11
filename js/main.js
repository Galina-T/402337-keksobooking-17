'use strict';

var mapPins = document.querySelector('.map__pins');

var PIN_X_MIN = mapPins.clientLeft;
var PIN_X_MAX = mapPins.clientWidth;
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var quantity = 8;
var urlsImgs = shuffledArr(getNumsImgs(quantity));

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
function shuffledArr(arr) {
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
* Генерирует объект, описывающий метку объявления
*
* @param {number} i индекс метки объявления в общем массиве
* @return {object} обьект, описывающий метку.
*/
function getPin(i) {
  var obj = {};
  obj.author = {
    avatar: 'img/avatars/user' + urlsImgs[i] + '.png'
  };
  obj.offer = {
    type: TYPES[getRandomNumber(0, TYPES.length - 1)]
  };
  obj.location = {
    x: getRandomNumber(PIN_X_MIN, PIN_X_MAX),
    y: getRandomNumber(PIN_Y_MIN, PIN_Y_MAX)
  };
  return obj;
}

/**
* Генерирует массив с объявлениями
*
* @param {number} n количество объявлений для генерации
* @return {object} массив из n сгенерированных объектов, описывающих похожие объявления неподалёку.
*/
function getNotices(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(getPin(i));
  }
  return arr;
}

/**
* Подготавливает DOM Node объект метки объявления
*
* @param {object} obj объект метки, сгенерированной `getPin`
* @return {object} DOM Node метки объвления
*/
function renderPin(obj) {
  var pinNode = templatePin.cloneNode(true);

  pinNode.style.left = obj.location.x - pinNode.clientWidth / 2 + 'px';
  pinNode.style.top = obj.location.y - pinNode.clientHeight / 2 + 'px';
  pinNode.querySelector('img').src = obj.author.avatar;
  pinNode.querySelector('img').alt = 'заголовок объявления';

  return pinNode;
}

/**
* Отрисовывает объявления на карте
*
* @param {number} n количество объявлений для отрисовки
*/
function showNodes(n) {
  var notices = getNotices(n);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < notices.length; i++) {
    fragment.appendChild(renderPin(notices[i]));
  }
  mapPins.appendChild(fragment);
}

/**
* Удаляет класс у DOM элемента
*
* @param {object} root родительский DOM элемент
* @param {string} el селектор элемента, у которого удаляется класс
* @param {string} className имя класса, который необходимо удалить
*/
function setup(root, el, className) {
  root.querySelector(el).classList.remove(className);
}

showNodes(quantity);
setup(document, '.map', 'map--faded');
