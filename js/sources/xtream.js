(function (global) { 'use strict';
var Xtream = {};

function xhrJson(url, timeout) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = timeout || 120000;
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try { resolve(JSON.parse(xhr.responseText || '[]')); }
        catch (e) { reject(new Error('Xtream parse error')); }
      } else {
        reject(new Error('Xtream failed: ' + xhr.status));
      }
    };
    xhr.onerror = function () { reject(new Error('Xtream network error')); };
    xhr.ontimeout = function () { reject(new Error('Xtream timeout')); };
    xhr.send();
  });
}

Xtream.live = function (base, user, pass) {
  var root = String(base || '').replace(/\/$/, '');
  var q = '?username=' + encodeURIComponent(user || '') + '&password=' + encodeURIComponent(pass || '');
  return xhrJson(root + '/player_api.php' + q + '&action=get_live_streams', 120000);
};

Xtream.categories = function (base, user, pass) {
  var root = String(base || '').replace(/\/$/, '');
  var q = '?username=' + encodeURIComponent(user || '') + '&password=' + encodeURIComponent(pass || '');
  return xhrJson(root + '/player_api.php' + q + '&action=get_live_categories', 120000);
};

Xtream.toLiveUrl = function (base, user, pass, streamId) {
  var root = String(base || '').replace(/\/$/, '');
  return root + '/live/' + encodeURIComponent(user || '') + '/' + encodeURIComponent(pass || '') + '/' + encodeURIComponent(streamId) + '.m3u8';
};

global.Xtream = Xtream;
}(window));
