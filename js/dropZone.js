'use strict';

(function () {
  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var photoContainer = document.querySelector('.ad-form__photo');

  var preview = document.querySelector('.ad-form-header__preview img');
  var defaultAvatarImgSrc = preview.src;

  /**
  * @param {FileReader} reader instance класса FileReader
  * @return {Function} функция для создания контейнера с выбранной фотографией
  */
  function createPhotoContainer(reader) {
    return function () {
      var container = photoContainer.cloneNode(true);
      var img = document.createElement('img');
      img.src = reader.result;
      img.style.width = 40 + 'px';
      img.style.height = 44 + 'px';
      img.style.margin = '0 auto';
      container.style.cssText = 'display: flex; align-items: center';
      container.appendChild(img);

      adFormPhotoContainer.insertBefore(container, adFormPhotoContainer.children[1]);
    };
  }

  /**
  * @param {FileReader} reader instance класса FileReader
  * @return {Function} функция записи url выбранного аватара
  */
  function createAvatarPhoto(reader) {
    return function () {
      preview.src = reader.result;
    };
  }

  /**
  * @param {{files: array}} obj объект, содержащий файлы
  * @param {Function} cb функция-callback
  * @return {Function} onDropZoneClick функция-обработчик
  */
  function makeOnDropZoneClick(obj, cb) {
    return function onDropZoneClick() {
      Array.prototype.map.call(obj.files, function (file) {
        var fileName = file.name.toLowerCase();

        var matches = window.constants.FILE_TYPES.some(function (type) {
          return fileName.endsWith(type);
        });

        if (matches) {
          var reader = new FileReader();

          var onReaderLoad = cb(reader);

          reader.addEventListener('load', onReaderLoad);

          reader.readAsDataURL(file);
        }
      });
    };
  }

  function setDefaultAvatar() {
    preview.src = defaultAvatarImgSrc;
  }

  function cleanPhotosContainer() {
    adFormPhotoContainer.querySelectorAll('.ad-form__photo').forEach(function (el, idx, array) {
      if (idx < array.length - 1) {
        el.parentElement.removeChild(el);
      }
    });
  }

  function preventDefaults(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  /**
  * @param {HTMLElement} dropZone поле для перетаскивания файлов
  * @param {Function} cb функция-callback
  * @return {Function} onDropFiles функция-обработчик
  */
  function makeOnDropFiles(dropZone, cb) {
    window.constants.DROP_EVENTS.forEach(function (eventName) {
      dropZone.addEventListener(eventName, preventDefaults, false);
    });
    return function onDropFiles(evt) {
      var data = evt.dataTransfer;

      makeOnDropZoneClick(data, cb)();
    };
  }

  window.dropZone = {
    createPhotoContainer: createPhotoContainer,
    createAvatarPhoto: createAvatarPhoto,
    makeOnDropZoneClick: makeOnDropZoneClick,
    makeOnDropFiles: makeOnDropFiles,
    cleanPhotosContainer: cleanPhotosContainer,
    setDefaultAvatar: setDefaultAvatar,
  };
})();

