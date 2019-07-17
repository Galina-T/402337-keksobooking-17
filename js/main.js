'use strict';

var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');

window.load(window.data.loadData, window.data.errorHandler);

var onPinDrag = window.pinDrag.makeOnPinDrag(window.form.fillAddressFieldAdForm, window.setup.startPageWork);

window.tearDown.stopPageWork();

mapPinMain.addEventListener('mousedown', onPinDrag);
