(function (global) { 'use strict';
var AvplayEngine = { canPlay: function () { return !!(global.webapis && webapis.avplay); }, play: function (url, onOk, onErr) {
  var a = webapis.avplay; var done = false;
  function fail(e){ if (!done) { done = true; onErr(e || new Error('AVPlay error')); } }
  try { a.stop(); } catch (e0) {}
  try { a.close(); } catch (e1) {}
  try {
    a.open(url); a.setDisplayMethod('PLAYER_DISPLAY_MODE_FULL_SCREEN'); a.setStreamingProperty('SET_MODE_4K','TRUE');
    setTimeout(function(){ fail(new Error('AVPlay timeout')); },7000);
    a.prepareAsync(function(){ if(done){return;} done=true; a.play(); onOk(); }, fail);
  } catch (e) { fail(e); }
}};
global.AvplayEngine = AvplayEngine;
}(window));
