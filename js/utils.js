'use strict';

window.util = (function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');

  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');

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
    * Приводит карту в активное состояние
    *
    */
    makeMapActive: function () {
      map.classList.remove('map--faded');
    },
    /**
    * Приводит карту в неактивное состояние
    *
    */
    makeMapInactive: function () {
      map.classList.add('map--faded');
    },
    /**
    * Приводит форму подачи заявления в активное состояние
    *
    */
    makeFormsActive: function () {
      adForm.classList.remove('ad-form--disabled');
      adForm.querySelectorAll('fieldset').forEach(function (el) {
        el.removeAttribute('disabled');
      });
    },
    /**
    * Блокирует форму подачи заявления
    *
    */
    makeFormsInactive: function () {
      adForm.classList.add('ad-form--disabled');
      adForm.querySelectorAll('fieldset').forEach(function (el) {
        el.setAttribute('disabled', 'disabled');
      });
    },
    /**
    * Приводит фильтры в активное состояние
    *
    */
    makeFiltersActive: function () {
      mapFilters.querySelectorAll('select').forEach(function (el) {
        el.removeAttribute('disabled');
      });
      mapFilters.querySelectorAll('fieldset').forEach(function (el) {
        el.removeAttribute('disabled');
      });
    },
    /**
    * Блокирует фильтры
    *
    */
    makeFiltersInactive: function () {
      mapFilters.querySelectorAll('select').forEach(function (el) {
        el.setAttribute('disabled', 'disabled');
      });
      mapFilters.querySelectorAll('fieldset').forEach(function (el) {
        el.setAttribute('disabled', 'disabled');
      });
    },
  };
})();
