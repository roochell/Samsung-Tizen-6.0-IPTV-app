(function (global) { 'use strict';
var HlsjsEngine = { canPlay: function (url) { return /\.m3u8($|\?)/i.test(url) && global.Hls && Hls.isSupported(); }, play: function (video, url, ok, err) { var h=new Hls(); h.loadSource(url); h.attachMedia(video); h.on(Hls.Events.MANIFEST_PARSED, function(){ video.play(); ok(); }); h.on(Hls.Events.ERROR, function(){ err(new Error('hls error')); }); } };
global.HlsjsEngine = HlsjsEngine;
}(window));
