'use strict';

var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');

var onPinDrag = window.pinDrag.makeOnPinDrag(window.validationForm.fillAddressFieldAdForm, window.setup.startPageWork);

window.tearDown.stopPageWork();

mapPinMain.addEventListener('mousedown', onPinDrag);
