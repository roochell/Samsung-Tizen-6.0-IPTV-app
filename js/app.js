(function (global) { 'use strict';
var App = {
  state: 'home',
  playlists: [],
  grouped: { map: {}, keys: [] },
  channels: [],
  page: 0,
  category: '',
  currentPlaylist: null
};

function groupChannels(items) {
  var map = {};
  var keys = [];
  (items || []).forEach(function (it) {
    var category = it.category_name || it.group || 'Uncategorized';
    var streamId = it.stream_id || it.id || '';
    var channel = {
      name: it.name || it.title || ('CH ' + streamId),
      url: it.url || it.stream_url || '',
      stream_id: streamId
    };
    if (!map[category]) { map[category] = []; keys.push(category); }
    map[category].push(channel);
  });
  return { map: map, keys: keys };
}

App.renderHome = function () {
  App.state = 'home';
  HomeView.render(document.getElementById('app'), App.playlists, {
    onOpen: App.openPlaylist,
    onAdd: App.addPlaylist
  });
};

App.addPlaylist = function (draft) {
  if (!draft || !draft.name || !draft.url || !draft.type) { return; }
  var arr = Playlists.all();
  arr.push({
    id: String(Date.now()),
    name: draft.name,
    type: draft.type,
    url: draft.url,
    user: draft.user || '',
    pass: draft.pass || '',
    active: arr.length === 0
  });
  Playlists.save(arr).then(function () {
    App.playlists = Playlists.all();
    App.renderHome();
  });
};

App.openPlaylist = function (p) {
  App.currentPlaylist = p;
  App.state = 'categories';

  if (p.type === 'xtream') {
    Xtream.live(p.url, p.user, p.pass).then(function (items) {
      var liveItems = LiveOnlyFilter(items || []);
      liveItems.forEach(function (it) {
        if (!it.url && it.stream_id) { it.url = Xtream.toLiveUrl(p.url, p.user, p.pass, it.stream_id); }
      });
      App.grouped = groupChannels(liveItems);
      ChannelListView.renderCategories(document.getElementById('app'), App.grouped.keys, App.openCategory);
    }, function () {
      App.grouped = { map: {}, keys: [] };
      ChannelListView.renderCategories(document.getElementById('app'), [], App.openCategory);
    });
    return;
  }

  if (p.type === 'm3u') {
    M3U.load(p.url).then(function (items) {
      App.grouped = groupChannels(LiveOnlyFilter(items || []));
      ChannelListView.renderCategories(document.getElementById('app'), App.grouped.keys, App.openCategory);
    }, function () {
      App.grouped = { map: {}, keys: [] };
      ChannelListView.renderCategories(document.getElementById('app'), [], App.openCategory);
    });
  }
};

App.openCategory = function (category) {
  App.category = category;
  App.page = 0;
  App.state = 'channels';
  App.channels = (App.grouped.map[category] || []).slice().sort(function (a, b) {
    return String(a.name || '').localeCompare(String(b.name || ''));
  });
  App.renderChannels();
};

App.renderChannels = function () {
  ChannelListView.renderChannels(document.getElementById('app'), App.channels, App.page, function (c) {
    App.openPlayer(c);
  }, function (p) {
    App.page = p;
    App.renderChannels();
  });
};

App.openPlayer = function (channel) {
  App.state = 'player';
  var root = document.getElementById('app');
  var video = PlayerView.render(root, channel);
  PlayerEngine.play(video, channel.url, function () {}, function () {});
};

App.back = function () {
  if (App.state === 'player') { App.state = 'channels'; App.renderChannels(); return; }
  if (App.state === 'channels') { App.state = 'categories'; ChannelListView.renderCategories(document.getElementById('app'), App.grouped.keys, App.openCategory); return; }
  if (App.state === 'categories') { App.renderHome(); return; }
  if (App.state === 'home') { try { tizen.application.getCurrentApplication().exit(); } catch (e) {} }
};

App.start = function () {
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 10009 || e.keyCode === 8) { App.back(); }
  });
  Playlists.bootstrap().then(function (list) {
    App.playlists = list || [];
    App.renderHome();
  });
};

global.App = App;
}(window));
