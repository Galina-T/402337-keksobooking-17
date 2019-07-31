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

  var mapFilterSelects = mapFilters.querySelectorAll('select');

  var mapFilterFieldsets = mapFilters.querySelectorAll('fieldset');

  var filterFeatures = document.querySelector('#housing-features');

  var inputFeatures = filterFeatures.querySelectorAll('[name="features"]');

  var PriceRange = {
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
    mapFilterSelects.forEach(function (el) {
      el.removeAttribute('disabled');
    });
    mapFilterFieldsets.forEach(function (el) {
      el.removeAttribute('disabled');
    });
  }

  function makeFiltersInactive() {
    mapFilterSelects.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });
    mapFilterFieldsets.forEach(function (el) {
      el.setAttribute('disabled', 'disabled');
    });

    mapFilterSelects.forEach(window.util.setupSelectedDefault);

    window.util.setupCheckedDefault(filterFeatures);
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
   * @param  {ad} ad объект объявления
   * @return {boolean} boolean
   */
  function hasAllFiltersMatch(ad) {
    return (filters.type.value === 'any' || filters.type.value === ad.offer.type)
      && (filters.price.value === 'any' || (ad.offer.price >= PriceRange[filters.price.value].min && ad.offer.price <= PriceRange[filters.price.value].max))
      && (filters.rooms.value === 'any' || filters.rooms.value === String(ad.offer.rooms))
      && (filters.guests.value === 'any' || filters.guests.value === String(ad.offer.guests))
      && (filters.features.length === 0 || filters.features.every(function (el) {
        return ad.offer.features.indexOf(el) !== -1;
      }));
  }

  /**
   * Применяет фильтры к данным
   * @param {object[]} data объект с данными
   */
  function applyFilter(data) {
    window.util.changeValueShow(data, hasAllFiltersMatch);

    window.cityMap.removeAds();

    window.cityMap.renderAds(data);
  }

  /**
   * @param {object[]} data объект с данными
   */
  function resetFilters(data) {
    filters = createFiltersDefault();
    window.util.changeValueShow(data, hasAllFiltersMatch);
  }

  /**
   * @param {Event} evt
   */
  function onInputFilterClick(evt) {

    var nameInput = evt.currentTarget.name.split('-').pop();

    filters[nameInput].value = evt.currentTarget.value;

    applyFilter(window.data.listAdsCopy);
  }
  /**
   * @param {Event} evt
   */
  var onInputFeaturesClick = window.debounce(function (evt) {
    var nameChecked = evt.target.value;

    if (evt.target.checked) {
      filters.features.push(nameChecked);
    } else {
      filters.features = filters.features.filter(function (feature) {
        return feature !== nameChecked;
      });
    }
    applyFilter(window.data.listAdsCopy);
  });

  /**
   * @param {KeyboardEvent} evt
   */
  function onInputFeaturesKeyDown(evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      evt.target.checked = !evt.target.checked;
      onInputFeaturesClick(evt);
    }
  }

  function addHandlersFilters() {
    mapFilterSelects.forEach(function (el) {
      el.addEventListener('input', onInputFilterClick);
    });
    inputFeatures.forEach(function (el) {
      el.addEventListener('click', onInputFeaturesClick);
      el.addEventListener('keydown', onInputFeaturesKeyDown);
    });
  }

  function removeHandlersFilters() {
    mapFilterSelects.forEach(function (el) {
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
