'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var inputFeatures = housingFeatures.querySelectorAll('[name="features"]');

  var mapPins = document.querySelector('.map__pins');
  var mapPinsCollection = document.getElementsByClassName('map__pin');
  var mapCardsCollection = document.getElementsByClassName('map__card');

  var rangePrice = {
    low: {
      min: 0,
      max: 10000,
    },
    middle: {
      min: 10000,
      max: 50000,
    },
    high: {
      min: 50000,
      max: Infinity,
    }
  };

  /**
  * Приводит фильтры в активное состояние
  *
  */
  function makeFiltersActive() {
    mapFilters.querySelectorAll('select').forEach(function (el) {
      el.removeAttribute('disabled');
    });
    mapFilters.querySelectorAll('fieldset').forEach(function (el) {
      el.removeAttribute('disabled');
    });
  }
  /**
  * Блокирует фильтры
  *
  */
  function makeFiltersInactive() {
    mapFilters.querySelectorAll('select').forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
    mapFilters.querySelectorAll('fieldset').forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
  }

  function createFiltersDefault() {
    return {
      type: {
        value: 'any'
      },
      price: {
        value: 'any'
      },
      rooms: {
        value: 'any'
      },
      guests: {
        value: 'any'
      },
      features: [],
    };
  }

  /**
  * Функция-обработчик при выборе параметра в фильтрах
  *
  * @param {HTMLElement} evt
  */
  function onInputFilterClick(evt) {
    var nameInput = evt.currentTarget.name.split('-').pop();

    filters[nameInput].value = evt.currentTarget.value;

    window.util.removeAds(mapPinsCollection);
    window.util.removeAds(mapCardsCollection);
    applyFilter(window.data.listAdsCopy);
    window.addDom.renderNodes(window.data.listAdsCopy, window.pin.createPinNode, mapPins, window._map.addPinHandlers);
    window.addDom.renderNodes(window.data.listAdsCopy, window.card.createCardNode, mapPins, window._map.addCardHandlers);
  }
  /**
  * Функция-обработчик при выборе характеристик
  *
  * @param {HTMLElement} evt
  */
  function onInputFeaturesClick(evt) {
    var nameChecked = evt.target.value;

    if (evt.target.checked) {
      filters.features.push(nameChecked);
    } else {
      filters.features = filters.features.filter(function (feature) {
        return feature !== nameChecked;
      });
    }

    window.util.removeAds(mapPinsCollection);
    window.util.removeAds(mapCardsCollection);
    applyFilter(window.data.listAdsCopy);
    window.addDom.renderNodes(window.data.listAdsCopy, window.pin.createPinNode, mapPins, window._map.addPinHandlers);
    window.addDom.renderNodes(window.data.listAdsCopy, window.card.createCardNode, mapPins, window._map.addCardHandlers);
  }

  /**
   * Проверяет, соответствует ли объект параметрам фильтра
   *
   * @param {object} ad массив объявления
   * @return {boolean} true
   */
  function isDoesFilterValue(ad) {
    return (filters.type.value === 'any' || filters.type.value === ad.offer.type)
      && (filters.price.value === 'any' || (ad.offer.price >= rangePrice[filters.price.value].min && ad.offer.price <= rangePrice[filters.price.value].max))
      && (filters.rooms.value === 'any' || filters.rooms.value === String(ad.offer.rooms))
      && (filters.guests.value === 'any' || filters.guests.value === String(ad.offer.guests))
      && (filters.features.length === 0 || filters.features.every(function (el) {
        return ad.offer.features.indexOf(el) !== -1;
      }));
  }

  /**
  * Применяет фильтры к данным
  *
  * @param {object[]} arr объект с данными
  */
  function applyFilter(arr) {
    arr.forEach(function (ad) {
      if (isDoesFilterValue(ad)) {
        ad.show = true;
      } else {
        ad.show = false;
      }
    });
  }

  /**
  * Сбрасывает фильтры
  *
  * @param {object[]} arr объект с данными
  */
  function resetFilters(arr) {
    filters = createFiltersDefault();
    applyFilter(arr);
  }

  var filters = createFiltersDefault();


  housingType.addEventListener('input', onInputFilterClick);
  housingPrice.addEventListener('input', onInputFilterClick);
  housingRooms.addEventListener('input', onInputFilterClick);
  housingGuests.addEventListener('input', onInputFilterClick);
  inputFeatures.forEach(function (el) {
    el.addEventListener('click', onInputFeaturesClick);
  });

  window.filter = {
    makeFiltersActive: makeFiltersActive,
    makeFiltersInactive: makeFiltersInactive,
    resetFilters: resetFilters
  };
})();
