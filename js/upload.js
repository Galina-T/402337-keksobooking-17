'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  /**
   * Загружает данные на сервер
   *
   * @param {object} data объект с данными, которые необходимо отправить
   * @param {Function} onSuccess функция обратного вызова, вызываемая каждый раз, когда данные отправлены успешно
   * @param {Function} onError функциюя обратного вызова, вызываемая, если при отправке данных произошла ошибка
   */
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
