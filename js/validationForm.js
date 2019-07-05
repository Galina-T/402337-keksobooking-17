'use strict';

(function () {

  var adFormAddress = document.querySelector('#address');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  var timeOfArrival = document.querySelector('#timein');
  var checkOutTime = document.querySelector('#timeout');

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  /**
  * Заполняет поле адреса координатами метки
  * @param {HTMLElement} el метка, для которой заполняется адрес
  */
  function fillAddressFieldAdForm(el) {
    adFormAddress.value = (el.offsetLeft + el.scrollWidth / 2) + ', ' + (el.offsetTop + el.scrollHeight);
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
  * Записывает значение минимальной цены, выбранного типа жилья, в необходимое свойство
  * @param {string} property свойство, в которое записывается минимальная цена
  */
  function setupMinPriceForField(property) {
    priceInput[property] = window.constants.TYPES[typeSelect.value].priceMin;
  }

  /**
  * создает функцию-обработчик при выборе кол-ва комнат
  *
  * @param {HTMLElement} evt
  */
  function onFieldRoomClick(evt) {
    var roomValue = evt.target.value;

    setupValueCapacity();
    setupValidationForRoom(roomValue);
  }

  /**
  * Вводит ограничения на допустимые варианты выбора количества гостей, при выборе количества комнат
  * @param {string} roomValue
  */
  function setupValidationForRoom(roomValue) {
    capacity.querySelectorAll('option').forEach(function (el) {
      if (el.value > roomValue || el.value === '0') {
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
  * @param {HTMLElement} evt
  */
  function onFieldTimeClick(evt) {
    var field = evt.currentTarget === timeOfArrival
      ? checkOutTime
      : timeOfArrival;

    field.value = evt.target.value;
  }

  function addHandlersForm() {
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
  }

  function removeHandlersForm() {
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
  }

  window.validationForm = {
    fillAddressFieldAdForm: fillAddressFieldAdForm,
    setupMinPriceValidation: setupMinPriceValidation,
    setupMinPriceForField: setupMinPriceForField,
    onFieldTimeClick: onFieldTimeClick,
    setupValidationForRoom: setupValidationForRoom,
    setupValueCapacity: setupValueCapacity,
    addHandlersForm: addHandlersForm,
    removeHandlersForm: removeHandlersForm,
  };
})();
