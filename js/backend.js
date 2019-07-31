'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  /**
  * Загружает данные с сервера
  * @param {Function} onSuccess функция обратного вызова, вызываемая, если данные загружены успешно
  * @param {Function} onError функция обратного вызова, вызываемая, если произошла ошибка при загрузке данных
  */
  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.SUCCESS_COD) {
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

    xhr.timeout = window.constants.TIMEOUT;

    xhr.open('GET', URL_GET);
    xhr.send();
  }

  /**
   * Загружает данные на сервер
   * @param {object} data объект с данными, которые необходимо отправить
   * @param {Function} onSuccess функция обратного вызова, вызываемая каждый раз, когда данные отправлены успешно
   * @param {Function} onError функциюя обратного вызова, вызываемая, если при отправке данных произошла ошибка
   */
  function upload(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    upload: upload,
  };
})();
