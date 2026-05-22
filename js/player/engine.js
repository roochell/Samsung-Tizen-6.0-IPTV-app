(function (global) { 'use strict';
var Engine = {};
Engine.play = function (video, url, ok, err) {
  if (AvplayEngine.canPlay()) { return AvplayEngine.play(url, ok, function(){ if (HlsjsEngine.canPlay(url)) { HlsjsEngine.play(video,url,ok,function(){ VideoEngine.play(video,url,ok,err); }); } else { VideoEngine.play(video,url,ok,err); } }); }
  if (HlsjsEngine.canPlay(url)) { return HlsjsEngine.play(video,url,ok,function(){ VideoEngine.play(video,url,ok,err); }); }
  return VideoEngine.play(video,url,ok,err);
};
global.PlayerEngine = Engine;
}(window));
