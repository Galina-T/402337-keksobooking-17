'use strict';

(function () {

  var RoomsQuantityToGuest = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var templateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');

  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var main = document.querySelector('main');

  var adForm = document.querySelector('.ad-form');

  var formFieldsets = adForm.querySelectorAll('fieldset');

  var filesChooser = {
    avatar: document.querySelector('.ad-form__field input[type=file]'),
    potos: document.querySelector('.ad-form__upload input[type=file]'),
  };

  var dropZones = {
    avatar: document.querySelector('.ad-form-header__drop-zone'),
    potos: document.querySelector('.ad-form__drop-zone'),
  };

  var inputText = {
    titleAd: adForm.querySelector('#title'),
    adFormAddress: document.querySelector('#address'),
    priceInput: adForm.querySelector('#price'),
    description: adForm.querySelector('#description'),
  };

  var formSelect = {
    housing: adForm.querySelector('#type'),
    timeOfArrival: adForm.querySelector('#timein'),
    checkOutTime: document.querySelector('#timeout'),
    roomNumber: adForm.querySelector('#room_number'),
    capacity: document.querySelector('#capacity'),
  };

  var formFeatures = document.querySelector('.features');
  var inputFeatures = formFeatures.querySelectorAll('[name="features"]');

  var adFormReset = document.querySelector('.ad-form__reset');

  var avatarChooser = makeChooser(filesChooser.avatar, window.dropZone.createAvatarPhoto);
  var photosChooser = makeChooser(filesChooser.potos, window.dropZone.createPhotoContainer);

  var avatarDrop = makeDrop(dropZones.avatar, window.dropZone.createAvatarPhoto);
  var photosDrop = makeDrop(dropZones.potos, window.dropZone.createPhotoContainer);

  var subscribe = window.util.createSubscribers();

  function makeFormsActive() {
    adForm.classList.remove('ad-form--disabled');

    formFieldsets.forEach(function (el) {
      el.removeAttribute('disabled');
    });
  }

  function makeFormsInactive() {
    adForm.classList.add('ad-form--disabled');

    formFieldsets.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
  }

  /**
  * @param {HTMLInputElement} fileChooser поле загрузки файлов
  * @param {Function} cb функция-callback
  * @return {object} объект с функциями для навешивания и удаления обработчика
  */
  function makeChooser(fileChooser, cb) {
    var onDropZoneClick = window.dropZone.makeOnDropZoneClick(fileChooser, cb);

    return {
      init: function () {
        fileChooser.addEventListener('change', onDropZoneClick);
      },
      stop: function () {
        fileChooser.removeEventListener('change', onDropZoneClick);
      }
    };
  }

  /**
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

    inputText.adFormAddress.value = adForm.classList.contains('ad-form--disabled')
      ? (el.offsetLeft + el.clientWidth / 2) + ', ' + (el.offsetTop + el.clientHeight)
      : (el.offsetLeft + el.scrollWidth / 2) + ', ' + (el.offsetTop + el.scrollHeight);
  }

  /**
  * Записывает значение минимальной цены, выбранного типа жилья, в необходимое свойство
  * @param {string} property свойство, в которое записывается минимальная цена
  */
  function setupMinPriceForField(property) {
    inputText.priceInput[property] = window.constants.TYPES[formSelect.housing.value].priceMin;
  }
  /**
  * Настраивает валидацию минимальной цены определенного типа жилья
  * @param {HTMLElement} field поле валидации
  */
  function setupMinPriceValidation(field) {
    if (field === formSelect.housing) {
      setupMinPriceForField('min');
    }
    var valueNumber = Number(inputText.priceInput.value);
    var minNumber = Number(inputText.priceInput.min);
    var message = valueNumber < minNumber
      ? ('минимальная цена за ночь ' + minNumber)
      : '';

    inputText.priceInput.setCustomValidity(message);
  }

  /**
  * Вводит ограничения на допустимые варианты выбора количества гостей, при выборе количества комнат
  * @param {string} roomValue
  */
  function setupGuestForRoomValidation(roomValue) {
    var roomsQuantity = parseInt(roomValue, 10);
    var options = RoomsQuantityToGuest[roomsQuantity];

    formSelect.capacity.querySelectorAll('option').forEach(function (el) {
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
  */
  function setupValueCapacity() {
    formSelect.capacity.value = formSelect.roomNumber.value === '100'
      ? '0'
      : '1';
  }

  /**
  * Синхронизирует поля «Время заезда» и «Время выезда»
  * @param {HTMLElement} field выбранное пользователем поле
  */
  function setupValueFieldTime(field) {
    var fieldSynch = field === formSelect.timeOfArrival
      ? formSelect.checkOutTime
      : formSelect.timeOfArrival;

    fieldSynch.value = field.value;
  }

  /**
  * Стирает заполненное поле
  * @param {HTMLElement} field поле формы
  */
  function eraseValueField(field) {
    field.value = '';
  }

  /**
  * @param {Event} evt
  */
  function onFieldTimeClick(evt) {
    setupValueFieldTime(evt.target);
  }

  /**
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
  * @param {Event} evt
  */
  function onButtonFormSubmit(evt) {
    window.backend.upload(new FormData(adForm), function () {
      main.appendChild(templateSuccess.cloneNode(true));
    }, function () {
      main.appendChild(templateError.cloneNode(true));
    });

    evt.preventDefault();

    window.addEventListener('keydown', onResponseMessageEscPress);
    window.addEventListener('click', onResponseMessageClick);

    subscribe.send();
  }

  /**
  * @param {Event} evt
  */
  function onButtonResetFormClick(evt) {
    evt.preventDefault();

    evt.currentTarget.removeEventListener('click', onButtonResetFormClick);

    subscribe.send();
  }

  /**
  * Функция-обработчик  при нажатии на сообщение об отправке данных
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
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      onResponseMessageClick(evt);
    }
  }

  function setupFormValidation() {
    setupMinPriceValidation(formSelect.housing);
    setupGuestForRoomValidation(formSelect.roomNumber.value);
  }

  function makeFormDefault() {
    window.util.applyToTheWholeObject(eraseValueField, inputText);
    window.util.applyToTheWholeObject(window.util.setupSelectedDefault, formSelect);
    window.util.setupCheckedDefault(formFeatures);
  }

  function synchFieldsForm(pin) {
    fillAddressFieldAdForm(pin);
    setupMinPriceForField('placeholder');
    setupValueCapacity();
    setupValueFieldTime(formSelect.timeOfArrival);
  }

  function addHandlersForm() {
    adForm.addEventListener('submit', onButtonFormSubmit);

    adFormReset.addEventListener('click', onButtonResetFormClick);

    avatarChooser.init();
    photosChooser.init();

    avatarDrop.init();
    photosDrop.init();

    inputText.priceInput.addEventListener('input', function (evt) {
      setupMinPriceValidation(evt.target);
    });

    formSelect.housing.addEventListener('input', function (evt) {
      setupMinPriceForField('placeholder');
      setupMinPriceValidation(evt.target);
    });
    formSelect.timeOfArrival.addEventListener('input', onFieldTimeClick);
    formSelect.checkOutTime.addEventListener('input', onFieldTimeClick);
    formSelect.roomNumber.addEventListener('input', onFieldRoomClick);

    inputFeatures.forEach(function (el) {
      el.addEventListener('keydown', onFeaturesKeyDown);
    });
  }

  function removeHandlersForm() {
    avatarChooser.stop();
    photosChooser.stop();

    avatarDrop.stop();
    photosDrop.stop();

    inputText.priceInput.removeEventListener('input', function (evt) {
      setupMinPriceValidation(evt.target);
    });

    formSelect.housing.removeEventListener('input', function (evt) {
      setupMinPriceForField('placeholder');
      setupMinPriceValidation(evt.target);
    });
    formSelect.timeOfArrival.removeEventListener('input', onFieldTimeClick);
    formSelect.checkOutTime.removeEventListener('input', onFieldTimeClick);
    formSelect.roomNumber.removeEventListener('input', onFieldRoomClick);

    inputFeatures.forEach(function (el) {
      el.removeEventListener('keydown', onFeaturesKeyDown);
    });

    adForm.removeEventListener('submit', onButtonFormSubmit);
  }

  window.form = {
    subscribe: subscribe,
    makeFormsActive: makeFormsActive,
    makeFormsInactive: makeFormsInactive,
    makeFormDefault: makeFormDefault,
    setupFormValidation: setupFormValidation,
    synchFieldsForm: synchFieldsForm,
    fillAddressFieldAdForm: fillAddressFieldAdForm,
    addHandlersForm: addHandlersForm,
    removeHandlersForm: removeHandlersForm,
  };
})();
