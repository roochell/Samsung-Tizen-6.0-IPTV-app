(function (global) { 'use strict';
var cfg = global.BACKUP_CONFIG || {};
var CFG = {
  id: cfg.id || '',
  token: cfg.token || '',
  file: cfg.file || 'iptv-backup.json',
  api: cfg.api || 'https://api.github.com/gists/'
};
var Backup = {};

function hasConfig() { return !!(CFG.id && CFG.token); }

Backup.upload = function (snapshot) {
  if (!hasConfig()) { return Promise.resolve(false); }
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var payload = { files: {} };
    payload.files[CFG.file] = { content: JSON.stringify(snapshot || {}) };
    xhr.open('PATCH', CFG.api + CFG.id, true);
    xhr.timeout = 30000;
    xhr.setRequestHeader('Accept', 'application/vnd.github+json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + CFG.token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () { (xhr.status >= 200 && xhr.status < 300) ? resolve(true) : reject(new Error('backup upload failed')); };
    xhr.onerror = function () { reject(new Error('backup upload network error')); };
    xhr.ontimeout = function () { reject(new Error('backup upload timeout')); };
    xhr.send(JSON.stringify(payload));
  });
};

Backup.download = function () {
  if (!hasConfig()) { return Promise.resolve(null); }
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', CFG.api + CFG.id, true);
    xhr.timeout = 30000;
    xhr.setRequestHeader('Accept', 'application/vnd.github+json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + CFG.token);
    xhr.onload = function () {
      try {
        var data = JSON.parse(xhr.responseText || '{}');
        var content = data.files && data.files[CFG.file] && data.files[CFG.file].content;
        resolve(content ? JSON.parse(content) : null);
      } catch (e) { reject(e); }
    };
    xhr.onerror = function () { reject(new Error('backup download network error')); };
    xhr.ontimeout = function () { reject(new Error('backup download timeout')); };
    xhr.send();
  });
};

global.Backup = Backup;
}(window));
