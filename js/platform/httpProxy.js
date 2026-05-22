(function (global) { 'use strict';
var HttpProxy = { rewrite: function (url, proxy) { if (!proxy) { return url; } return proxy.indexOf('{url}') > -1 ? proxy.replace('{url}', encodeURIComponent(url)) : proxy + url; } };
global.HttpProxy = HttpProxy;
}(window));
