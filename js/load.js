'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  /**
  * Загружает данные с сервера
  *
  * @param {Function} onSuccess функцию обратного вызова, вызываемая, если данные загружены успешно
  * @param {Function} onError функцию обратного вызова, вызываемая, если произошла ошибка при загрузке данных
  */

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();