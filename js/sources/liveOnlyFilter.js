(function (global) { 'use strict';
var banned = /(vod|movie|series|adult|xxx)/i;
global.LiveOnlyFilter = function (items) { return (items || []).filter(function (i) { return !banned.test((i.group || '') + ' ' + (i.name || '')); }); };
}(window));
