'use strict';

(function () {
  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var photoContainer = document.querySelector('.ad-form__photo');

  var preview = document.querySelector('.ad-form-header__preview img');
  var defaultAvatarImgSrc = preview.src;

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

  function createAvatarPhoto(reader) {
    return function () {
      preview.src = reader.result;
    };
  }

  function checkFileName(fileName) {
    return function (type) {
      return fileName.endsWith(type);
    };
  }

  function makeOnClickDropZone(dropZone, cb) {
    return function onClickDropZone() {
      Array.prototype.map.call(dropZone.files, function (file) {
        var fileName = file.name.toLowerCase();

        var matches = window.constants.FILE_TYPES.some(checkFileName(fileName));

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

  window.dropZone = {
    createPhotoContainer: createPhotoContainer,
    createAvatarPhoto: createAvatarPhoto,
    makeOnClickDropZone: makeOnClickDropZone,
    cleanPhotosContainer: cleanPhotosContainer,
    setDefaultAvatar: setDefaultAvatar,
  };
})();

