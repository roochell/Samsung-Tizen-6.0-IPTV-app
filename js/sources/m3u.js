(function (global) { 'use strict';
var M3U = {};

M3U.load = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 120000;
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(M3U.parse(xhr.responseText || ''));
      } else {
        reject(new Error('M3U load failed: ' + xhr.status));
      }
    };
    xhr.onerror = function () { reject(new Error('M3U network error')); };
    xhr.ontimeout = function () { reject(new Error('M3U timeout')); };
    xhr.send();
  });
};

M3U.parse = function (text) {
  var lines = String(text || '').split(/\r?\n/);
  var items = [];
  var meta = null;
  var i;
  for (i = 0; i < lines.length; i += 1) {
    var line = (lines[i] || '').trim();
    if (!line) { continue; }
    if (line.indexOf('#EXTINF:') === 0) {
      meta = M3U.parseExtInf(line);
      continue;
    }
    if (line.charAt(0) === '#') { continue; }
    if (meta) {
      items.push({
        name: meta.name || 'Channel',
        category_name: meta.group || 'Uncategorized',
        group: meta.group || 'Uncategorized',
        url: line
      });
      meta = null;
    }
  }
  return items;
};

M3U.parseExtInf = function (line) {
  var info = { name: '', group: '' };
  var comma = line.indexOf(',');
  var attrs = comma > -1 ? line.slice(8, comma) : line.slice(8);
  info.name = comma > -1 ? line.slice(comma + 1).trim() : '';
  var groupMatch = /group-title="([^"]*)"/i.exec(attrs);
  if (groupMatch) { info.group = groupMatch[1].trim(); }
  return info;
};

global.M3U = M3U;
}(window));
