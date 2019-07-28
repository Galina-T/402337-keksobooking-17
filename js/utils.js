'use strict';

window.util = (function () {
  return {
    /**
    * Склонение
    * @param {number} number
    * @param {string[]} titles
    * @return {string} title
    */
    getDeclinationForm: function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      var index;

      if (number % 100 > 4 && number % 100 < 20) {
        index = 2;
      } else {
        index = cases[(number % 10 < 5) ? number % 10 : 5];
      }

      return titles[index];
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
    * Устанавливает исходное значение
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
    /**
    * Устанавливает исходное значение
    *
    * @param {HTMLElement} field поле формы
    */
    setupCheckedDefault: function (field) {
      field.querySelectorAll('input').forEach(function (el) {
        el.checked = el.hasAttribute('checked') ? true : false;
      });
    },
    /**
    * Применяет функцию для всех параметров объекта
    *
    * @param {Function} fun функция, которую необходимо применить
    * @param {object} obj нужный объект
    */
    applyToTheWholeObject: function (fun, obj) {
      for (var key in obj) {
        if (!obj.hasOwnProperty(obj[key])) {
          fun(obj[key]);
        }
      }
    },
    /**
    * Записывает параметры в свойство style
    *
    * @param {HTMLElement} el элемент, который хотим спозиционировать
    * @param {number} left отступ слева
    * @param {number} top отступ сверху
    */
    setPosition: function (el, left, top) {
      el.style.left = left + 'px';
      el.style.top = top + 'px';
    },
    /**
    * Изменяет значение у show
    *
    * @param {object[]} arr массив, в котором содержатся данные
    * @param {Function} cb
    */
    changeValueShow: function (arr, cb) {
      arr.forEach(function (ad) {
        if (cb(ad)) {
          ad.show = true;
        } else {
          ad.show = false;
        }
      });
    },
    /**
    * Создает массив данных нужной длины, для отрисовки
    *
    * @param {object[]} arr массив, в котором содержатся данные
    * @param {number} length необходимая длина
    * @return {object[]} массив нужной длины
    */
    getShowObjectSpecificLength: function (arr, length) {
      var showObject = arr.filter(function (ad) {
        return ad.show === true;
      });
      return showObject.slice(0, length);
    },
    /**
    *
    * @param {*} data данные
    * @return {boolean} boolean
    */
    isDataMissing: function (data) {
      if (data === null || data === undefined) {
        return true;
      }
      if (typeof data === 'object') {
        return Object.keys(data).length === 0;
      }
      return data === '';
    }
  };
})();
