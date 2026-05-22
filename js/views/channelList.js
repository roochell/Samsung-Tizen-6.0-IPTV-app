(function (global) { 'use strict';
function byName(a, b) { return String(a || '').localeCompare(String(b || '')); }

global.ChannelListView = {
  renderCategories: function (root, categories, onPick) {
    root.innerHTML = '';
    var lay = DOM.el('div', { className: 'screen ch-page-layout' });
    var sorted = (categories || []).slice().sort(byName);
    lay.appendChild(DOM.el('div', { className: 'ch-fixed-head', text: 'Categories (' + sorted.length + ')' }));
    var list = DOM.el('div', { className: 'ch-scroll-list' });
    sorted.forEach(function (c) {
      var b = DOM.el('button', { 'data-focusable': 'true', className: 'card', text: c });
      b.onclick = function () { onPick(c); };
      list.appendChild(b);
    });
    lay.appendChild(list);
    root.appendChild(lay);
  },

  renderChannels: function (root, channels, page, onPick, onPage) {
    var per = 30;
    var totalPages = Math.max(1, Math.ceil(channels.length / per));
    var safePage = Math.min(Math.max(0, page), totalPages - 1);
    var start = safePage * per;
    var slice = channels.slice(start, start + per);
    root.innerHTML = '';

    var lay = DOM.el('div', { className: 'screen ch-page-layout' });
    lay.appendChild(DOM.el('div', { className: 'ch-fixed-head', text: 'Channels (' + channels.length + ') Page ' + (safePage + 1) + '/' + totalPages }));

    var list = DOM.el('div', { className: 'ch-scroll-list' });
    slice.forEach(function (c) {
      var b = DOM.el('button', { 'data-focusable': 'true', className: 'card', text: c.name || 'Unnamed' });
      b.onclick = function () { onPick(c); };
      list.appendChild(b);
    });
    lay.appendChild(list);

    var pager = DOM.el('div', { className: 'pager' });
    var prev = DOM.el('button', { 'data-focusable': 'true', className: 'card', text: 'Prev' });
    var next = DOM.el('button', { 'data-focusable': 'true', className: 'card', text: 'Next' });
    prev.onclick = function () { onPage(Math.max(0, safePage - 1)); };
    next.onclick = function () { onPage(Math.min(totalPages - 1, safePage + 1)); };
    pager.appendChild(prev);
    pager.appendChild(next);
    lay.appendChild(pager);

    root.appendChild(lay);
  }
};
}(window));
