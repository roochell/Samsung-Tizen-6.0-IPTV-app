(function (global) { 'use strict';
var AVPlay = { get: function () { return global.webapis && global.webapis.avplay; } };
global.TizenAVPlay = AVPlay;
}(window));
