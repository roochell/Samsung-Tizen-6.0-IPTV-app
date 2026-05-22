(function (global) { 'use strict';
var VideoEngine = { play: function (video, url, ok, err) { var t = setTimeout(function(){ err(new Error('video timeout')); }, 8000); video.src = url; video.onplaying = function(){ clearTimeout(t); ok(); }; video.onerror = function(){ clearTimeout(t); err(new Error('video error')); }; video.play(); } };
global.VideoEngine = VideoEngine;
}(window));
