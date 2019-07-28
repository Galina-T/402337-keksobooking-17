'use strict';

(function () {
  /**
  * @typedef   {{author: {avatar: string},
  *              offer: {title: string,
  *                     address: string,
  *                     price: number,
  *                     type: string,
  *                     rooms: number,
  *                     guests: number,
  *                     checkin: string,
  *                     checkout: string,
  *                     features: string[],
  *                     description: string,
  *                     photos: string[]},
  *             location: {x: number,
  *                        y: number},
  *             show: boolean}} ad объект объявления
  */

  var mapFilters = document.querySelector('.map__filters');

  var mapFiltersSelect = mapFilters.querySelectorAll('select');

  var housingFeatures = document.querySelector('#housing-features');
  var inputFeatures = housingFeatures.querySelectorAll('[name="features"]');

  var mapPins = document.querySelector('.map__pins');

  var HtmlCollection = {
    pins: document.getElementsByClassName('map__pin'),
    cards: document.getElementsByClassName('map__card'),
  };

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

  var filters = createFiltersDefault();

  function makeFiltersActive() {
    mapFilters.querySelectorAll('select').forEach(function (el) {
      el.removeAttribute('disabled');
    });
    mapFilters.querySelectorAll('fieldset').forEach(function (el) {
      el.removeAttribute('disabled');
    });
  }

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
   * Проверяет, соответствует ли объект параметрам фильтра
   *
   * @param  {ad} ad объект объявления
   * @return {boolean} boolean
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
    window.util.changeValueShow(arr, isDoesFilterValue);
    window.util.applyToTheWholeObject(window.util.removeAds, HtmlCollection);

    var listAdsShow = window.util.getShowObjectSpecificLength(arr, window.constants.QUANTITY);

    window.render.renderNodes(listAdsShow, window.pin.createPinNode, mapPins, window.cityMap.addPinHandlers);
    window.render.renderNodes(listAdsShow, window.card.createCardNode, mapPins);
  }

  /**
  *
  * @param {object[]} arr объект с данными
  */
  function resetFilters(arr) {
    filters = createFiltersDefault();
    window.util.changeValueShow(arr, isDoesFilterValue);
  }

  /**
  *
  * @param {Event} evt
  */
  function onInputFilterClick(evt) {

    var nameInput = evt.currentTarget.name.split('-').pop();

    filters[nameInput].value = evt.currentTarget.value;

    applyFilter(window.data.listAdsCopy);
  }
  /**
  *
  * @param {Event} evt
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

    applyFilter(window.data.listAdsCopy);
  }
  /**
  *
  * @param {KeyboardEvent} evt
  */
  function onInputFeaturesKeyDown(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      evt.target.checked = !evt.target.checked;
      onInputFeaturesClick(evt);
    }
  }

  function addHandlersFilters() {
    mapFiltersSelect.forEach(function (el) {
      el.addEventListener('input', onInputFilterClick);
    });
    inputFeatures.forEach(function (el) {
      el.addEventListener('click', onInputFeaturesClick);
      el.addEventListener('keydown', onInputFeaturesKeyDown);
    });
  }

  function removeHandlersFilters() {
    mapFiltersSelect.forEach(function (el) {
      el.removeEventListener('input', onInputFilterClick);
    });
    inputFeatures.forEach(function (el) {
      el.removeEventListener('click', onInputFeaturesClick);
    });
  }

  window.filter = {
    makeFiltersActive: makeFiltersActive,
    makeFiltersInactive: makeFiltersInactive,
    resetFilters: resetFilters,
    addHandlersFilters: addHandlersFilters,
    removeHandlersFilters: removeHandlersFilters
  };
})();
