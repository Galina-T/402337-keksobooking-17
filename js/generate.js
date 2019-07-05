'use strict';

(function () {

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
        type: Object.keys(window.constants.TYPES)[window.util.getRandomNumber(0, Object.keys(window.constants.TYPES).length - 1)].name,
      },
      location: {
        x: window.util.getRandomNumber(window.constants.PIN_X_MIN, window.constants.PIN_X_MAX),
        y: window.util.getRandomNumber(window.constants.PIN_Y_MIN, window.constants.PIN_Y_MAX)
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
    var arr = window.util.shuffleArr(window.util.getNumsImgs(n));
    return arr.map(generateAd);
  }

  window.generate = {
    generateAd: generateAd,
    generateAds: generateAds,
  };
})();
