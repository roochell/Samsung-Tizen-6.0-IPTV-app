'use strict';
var fs = require('fs');
var required = [
  'config.xml',
  'index.html',
  'js/app.js',
  'js/sources/xtream.js',
  'js/sources/m3u.js',
  'js/storage/backup.js',
  'js/player/engine.js'
];
required.forEach(function (p) {
  if (!fs.existsSync(p)) {
    throw new Error('Missing required file: ' + p);
  }
});
var xtream = fs.readFileSync('js/sources/xtream.js', 'utf8');
if (xtream.indexOf('encodeURIComponent') === -1) {
  throw new Error('Xtream credentials are not encoded.');
}
console.log('Sanity checks passed.');
