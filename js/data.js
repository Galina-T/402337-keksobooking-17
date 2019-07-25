'use strict';

(function () {
  /**
  *
  * @param {object[]} ads массив с данными
  */
  function loadData(ads) {
    window.data = {
      listAds: ads,
      listAdsCopy: ads.reduce(function (acc, ad, i) {
        if (ad.offer) {
          ad = Object.assign({}, ad, {
            id: i,
            show: true
          });
          acc.push(ad);
        }
        return acc;
      }, [])
    };
  }
  /**
  *
  * @param {string} errorMessage сообщение
  */
  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.data = {
    loadData: loadData,
    errorHandler: errorHandler
  };
})();
