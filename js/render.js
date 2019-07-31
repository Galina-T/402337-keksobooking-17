'use strict';

(function () {
  /**
  * Отрисовывает DOM Node объект
  * @param {object[]} data массив, в котором содержатся данные для отрисовки
  * @param {Function} createFn функция подготовки DOM Node объекта
  * @param {HTMLElement} attachNode узел прикрепления DOM Node объекта
  * @param {Function} addHandlers навешивает функции-обработчики
  */
  function renderNodes(data, createFn, attachNode, addHandlers) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (el) {
      var node = createFn(el);
      if (addHandlers) {
        addHandlers(node);
      }
      fragment.appendChild(node);
    });
    attachNode.appendChild(fragment);
  }

  window.render = {
    renderNodes: renderNodes,
  };
})();
