'use strict';

(function () {

  var roomsQuantToGuest = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var main = document.querySelector('main');
  var mapPinMain = document.querySelector('.map__pin--main');

  var templateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');

  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var adForm = document.querySelector('.ad-form');

  var filesChooser = {
    avatar: document.querySelector('.ad-form__field input[type=file]'),
    potos: document.querySelector('.ad-form__upload input[type=file]'),
  };

  var dropZones = {
    avatar: document.querySelector('.ad-form-header__drop-zone'),
    potos: document.querySelector('.ad-form__drop-zone'),
  };

  var adFormAddress = document.querySelector('#address');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  var timeOfArrival = document.querySelector('#timein');
  var checkOutTime = document.querySelector('#timeout');

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var features = document.querySelector('.features');
  var inputFeatures = features.querySelectorAll('[name="features"]');

  var adFormReset = document.querySelector('.ad-form__reset');

  var avatarChooser = makeChooser(filesChooser.avatar, window.dropZone.createAvatarPhoto);
  var photosChooser = makeChooser(filesChooser.potos, window.dropZone.createPhotoContainer);

  var avatarDrop = makeDrop(dropZones.avatar, window.dropZone.createAvatarPhoto);
  var photosDrop = makeDrop(dropZones.potos, window.dropZone.createPhotoContainer);

  function makeFormsActive() {
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach(function (el) {
      el.removeAttribute('disabled');
    });
  }

  function makeFormsInactive() {
    adForm.classList.add('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
  }

  /**
  *
  * @param {HTMLInputElement} fileChooser поле загрузки файлов
  * @param {Function} cb функция-callback
  * @return {object} объект с функциями для навешивания и удаления обработчика
  */
  function makeChooser(fileChooser, cb) {
    var onClickDropZone = window.dropZone.makeOnClickDropZone(fileChooser, cb);

    return {
      init: function () {
        fileChooser.addEventListener('change', onClickDropZone);
      },
      stop: function () {
        fileChooser.removeEventListener('change', onClickDropZone);
      }
    };
  }

  /**
  *
  * @param {HTMLInputElement} dropZone поле для перетаскивания файлов
  * @param {Function} cb функция-callback
  * @return {object} объект с функциями для навешивания и удаления обработчика
  */
  function makeDrop(dropZone, cb) {
    var onDropFiles = window.dropZone.makeOnDropFiles(dropZone, cb);

    return {
      init: function () {
        dropZone.addEventListener('drop', onDropFiles);
      },
      stop: function () {
        dropZone.removeEventListener('drop', onDropFiles);
      }
    };
  }

  /**
  * Заполняет поле адреса координатами метки
  * @param {HTMLButtonElement} el метка, для которой заполняется адрес
  */
  function fillAddressFieldAdForm(el) {
    adFormAddress.value = (el.offsetLeft + el.scrollWidth / 2) + ', ' + (el.offsetTop + el.scrollHeight);
  }

  /**
  * Записывает значение минимальной цены, выбранного типа жилья, в необходимое свойство
  * @param {string} property свойство, в которое записывается минимальная цена
  */
  function setupMinPriceForField(property) {
    priceInput[property] = window.constants.TYPES[typeSelect.value].priceMin;
  }
  /**
  * Настраивает валидацию минимальной цены определенного типа жилья
  * @param {HTMLElement} field поле валидации
  */
  function setupMinPriceValidation(field) {
    if (field === typeSelect) {
      setupMinPriceForField('min');
    }
    var valueNumber = Number(priceInput.value);
    var minNumber = Number(priceInput.min);
    var message = valueNumber < minNumber
      ? ('минимальная цена за ночь ' + minNumber)
      : '';

    priceInput.setCustomValidity(message);
  }

  /**
  * Вводит ограничения на допустимые варианты выбора количества гостей, при выборе количества комнат
  * @param {string} roomValue
  */
  function setupGuestForRoomValidation(roomValue) {
    var roomsQuant = parseInt(roomValue, 10);
    var options = roomsQuantToGuest[roomsQuant];

    capacity.querySelectorAll('option').forEach(function (el) {
      var guest = parseInt(el.value, 10);

      if (options.indexOf(guest) === -1) {
        el.setAttribute('disabled', 'disabled');
      } else {
        el.removeAttribute('disabled');
      }
    });
  }

  /**
  * Синхронизирует поля «Кол-во комнат» и «Кол-во мест»
  *
  */
  function setupValueCapacity() {
    capacity.value = roomNumber.value === '100'
      ? '0'
      : '1';
  }

  /**
  * Синхронизирует поля «Время заезда» и «Время выезда»
  *
  * @param {HTMLElement} field выбранное пользователем поле
  */
  function setupValueFieldTime(field) {
    var fieldSynch = field === timeOfArrival
      ? checkOutTime
      : timeOfArrival;

    fieldSynch.value = field.value;
  }

  /**
  * Стирает заполненное поле
  *
  * @param {HTMLElement} field поле формы
  */
  function eraseValueField(field) {
    field.value = '';
  }

  /**
  *
  * @param {Event} evt
  */
  function onFieldTimeClick(evt) {
    setupValueFieldTime(evt.target);
  }

  /**
  *
  * @param {Event} evt
  */
  function onFieldRoomClick(evt) {
    var roomValue = evt.target.value;

    setupValueCapacity();
    setupGuestForRoomValidation(roomValue);
  }

  function onFeaturesKeyDown(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      evt.preventDefault();
      evt.target.checked = !evt.target.checked;
    }
  }

  /**
  *
  * @param {Event} evt
  */
  function onButtonFormSubmit(evt) {
    window.upload(new FormData(adForm), function () {
      main.appendChild(templateSuccess.cloneNode(true));
    }, function () {
      main.appendChild(templateError.cloneNode(true));
    });

    evt.preventDefault();

    window.page.stopPageWork();

    window.addEventListener('keydown', onResponseMessageEscPress);
    window.addEventListener('click', onResponseMessageClick);
  }

  /**
  *
  * @param {Event} evt
  */
  function onButtonResetFormClick(evt) {
    evt.preventDefault();
    window.page.stopPageWork();
    evt.currentTarget.removeEventListener('click', onButtonResetFormClick);
  }

  /**
  * Функция-обработчик  при нажатии на сообщение об отправке данных
  *
  * @param {Event} evt
  */
  function onResponseMessageClick(evt) {
    evt.preventDefault();
    var child = main.lastElementChild;
    main.removeChild(child);
    window.removeEventListener('keydown', onResponseMessageEscPress);
    window.removeEventListener('click', onResponseMessageClick);
  }
  function onResponseMessageEscPress(evt) {
    evt.preventDefault();
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      var child = main.lastElementChild;
      main.removeChild(child);
      window.removeEventListener('keydown', onResponseMessageEscPress);
      window.removeEventListener('click', onResponseMessageClick);
    }
  }

  function setupFormValidation() {
    setupMinPriceValidation(typeSelect);
    setupGuestForRoomValidation(roomNumber.value);
  }

  function synchFieldsForm() {
    fillAddressFieldAdForm(mapPinMain);
    setupMinPriceForField('placeholder');
    setupValueCapacity();
    setupValueFieldTime(timeOfArrival);
  }

  function addHandlersForm() {
    adForm.addEventListener('submit', onButtonFormSubmit);

    adFormReset.addEventListener('click', onButtonResetFormClick);

    avatarChooser.init();
    photosChooser.init();

    avatarDrop.init();
    photosDrop.init();

    typeSelect.addEventListener('input', function (evt) {
      setupMinPriceForField('placeholder');
      setupMinPriceValidation(evt.target);
    });

    priceInput.addEventListener('input', function (evt) {
      setupMinPriceValidation(evt.target);
    });

    timeOfArrival.addEventListener('input', onFieldTimeClick);
    checkOutTime.addEventListener('input', onFieldTimeClick);

    roomNumber.addEventListener('input', onFieldRoomClick);

    inputFeatures.forEach(function (el) {
      el.addEventListener('keydown', onFeaturesKeyDown);
    });
  }

  function removeHandlersForm() {
    avatarChooser.stop();
    photosChooser.stop();

    avatarDrop.stop();
    photosDrop.stop();

    typeSelect.removeEventListener('input', function (evt) {
      setupMinPriceForField('placeholder');
      setupMinPriceValidation(evt.target);
    });

    priceInput.removeEventListener('input', function (evt) {
      setupMinPriceValidation(evt.target);
    });

    timeOfArrival.removeEventListener('input', onFieldTimeClick);
    checkOutTime.removeEventListener('input', onFieldTimeClick);

    roomNumber.removeEventListener('input', onFieldRoomClick);

    inputFeatures.forEach(function (el) {
      el.removeEventListener('keydown', onFeaturesKeyDown);
    });

    adForm.removeEventListener('submit', onButtonFormSubmit);
  }

  window.form = {
    makeFormsActive: makeFormsActive,
    makeFormsInactive: makeFormsInactive,
    setupFormValidation: setupFormValidation,
    synchFieldsForm: synchFieldsForm,
    fillAddressFieldAdForm: fillAddressFieldAdForm,
    eraseValueField: eraseValueField,
    addHandlersForm: addHandlersForm,
    removeHandlersForm: removeHandlersForm,
  };
})();
