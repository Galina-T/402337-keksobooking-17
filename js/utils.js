'use strict';

window.util = (function () {
  return {
    /**
    * Возвращает целое случайное число в диапазоне [min; max]
    *
    * @param {number} min минимальное значение
    * @param {number} max максимальное значение
    * @return {number} случайное число.
    */
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
    * Перемешивает элементы внутри массива случайным образом
    *
    * @param {*[]} arr массив, который необходимо перемешать
    * @return {*[]} перемешанный массив.
    */
    shuffleArr: function (arr) {
      var newArr = arr.slice(0);
      for (var i = newArr.length - 1; i > 0; i--) {
        var num = this.getRandomNumber(0, i);
        var temp = newArr[num];
        newArr[num] = newArr[i];
        newArr[i] = temp;
      }
      return newArr;
    },
    /**
    * Генерирует массив с номерами для адресов изображений
    *
    * @param {number} amountOfImages количество адресов изображений
    * @return {number[]} массив с номером для каждого адреса.
    */
    getNumsImgs: function (amountOfImages) {
      var arr = [];
      for (var i = 1; i < amountOfImages + 1; i++) {
        i = i < 10 ? '0' + i : i;
        arr.push(i);
      }
      return arr;
    },
    /**
    * Удаляет объявления из DOM
    *
    * @param {HTMLElement[]} arr массив элементов, которые хотим удалить
    */
    removeAds: function (arr) {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].classList.contains('map__pin--main')) {
          return;
        }
        var child = arr[i];

        child.parentElement.removeChild(child);
      }
    },
    /**
    * Устанавливает полю исходное значение
    *
    * @param {HTMLElement} field поле формы
    */
    setupSelectedDefault: function (field) {
      field.querySelectorAll('option').forEach(function (el) {
        if (el.hasAttribute('selected')) {
          field.value = el.value;
        }
      });
    },
    setupCheckedDefault: function (field) {
      field.querySelectorAll('input').forEach(function (el) {
        el.checked = el.hasAttribute('checked') ? true : false;
      });
    }
  };
})();
