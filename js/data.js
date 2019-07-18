'use strict';

(function () {
  function loadData(ads) {
    window.data = {
      listAds: ads,
      listAdsCopy: ads.map(function (ad, i) {
        return Object.assign({}, ad, {
          id: i,
          show: true
        });
      })
    };
  }

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
