'use strict';

var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');

window.tearDown.stopPageWork();

mapPinMain.addEventListener('mousedown', window.pinDrag.onPinDrag);


