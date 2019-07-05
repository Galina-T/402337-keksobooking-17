'use strict';

(function () {
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

  window.addDom = {
    renderNodes: renderNodes,
  };
})();
