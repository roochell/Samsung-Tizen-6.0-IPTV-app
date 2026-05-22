(function (global) {
'use strict';
var DOM = {};
DOM.el = function (tag, props, children) {
  var node = document.createElement(tag);
  var key;
  props = props || {};
  for (key in props) { if (props.hasOwnProperty(key)) {
    if (key === 'className') { node.className = props[key]; }
    else if (key === 'text') { node.textContent = props[key]; }
    else { node.setAttribute(key, props[key]); }
  }}
  (children || []).forEach(function (c) { node.appendChild(c); });
  return node;
};
global.DOM = DOM;
}(window));
