(function (global) { 'use strict';
var KEY = 'tuhin.playlists.v1';
var Playlists = {};
Playlists.all = function () { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } };
Playlists.save = function (items) { localStorage.setItem(KEY, JSON.stringify(items)); return Playlists.sync(); };
Playlists.sync = function () {
  var data = Playlists.all().map(function (p) { return { id: p.id, type: p.type, name: p.name, url: p.url, user: p.user, pass: p.pass, active: !!p.active }; });
  if (!global.Backup) { return Promise.resolve(false); }
  return Backup.upload({ playlists: data, ts: Date.now() }).then(function () { return true; }, function () { return false; });
};
Playlists.bootstrap = function () {
  if (Playlists.all().length > 0 || !global.Backup) { return Promise.resolve(Playlists.all()); }
  return Backup.download().then(function (snap) {
    if (snap && snap.playlists && snap.playlists.length) { localStorage.setItem(KEY, JSON.stringify(snap.playlists)); }
    return Playlists.all();
  }, function () { return Playlists.all(); });
};
global.Playlists = Playlists;
}(window));
