(function () { 'use strict';
window.onload = function () { setTimeout(function(){ var s=document.getElementById('splash'); if (s) { s.parentNode.removeChild(s); } App.start(); }, 900); };
}());
