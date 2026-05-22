(function (global) { 'use strict';
function row(label, input) {
  var wrap = DOM.el('div', { className: 'form-row' });
  wrap.appendChild(DOM.el('label', { text: label }));
  wrap.appendChild(input);
  return wrap;
}

global.HomeView = {
  render: function (root, playlists, handlers) {
    root.innerHTML = '';
    var s = DOM.el('div', { className: 'screen' });
    s.appendChild(DOM.el('div', { className: 'top-title', text: 'Playlists' }));

    playlists.forEach(function (p) {
      var b = DOM.el('button', { 'data-focusable': 'true', className: 'card', text: (p.active ? '* ' : '') + p.name + ' [' + p.type + ']' });
      b.onclick = function () { handlers.onOpen(p); };
      s.appendChild(b);
    });

    var form = DOM.el('div', { className: 'card form' });
    var name = DOM.el('input', { placeholder: 'Playlist Name', value: 'My Playlist' });
    var type = DOM.el('select', {});
    type.appendChild(DOM.el('option', { value: 'xtream', text: 'Xtream' }));
    type.appendChild(DOM.el('option', { value: 'm3u', text: 'M3U URL' }));
    var url = DOM.el('input', { placeholder: 'Server URL or M3U URL' });
    var user = DOM.el('input', { placeholder: 'Username (Xtream only)' });
    var pass = DOM.el('input', { placeholder: 'Password (Xtream only)' });
    var save = DOM.el('button', { 'data-focusable': 'true', className: 'card', text: 'Add Playlist' });

    form.appendChild(row('Name', name));
    form.appendChild(row('Type', type));
    form.appendChild(row('URL', url));
    form.appendChild(row('Username', user));
    form.appendChild(row('Password', pass));
    form.appendChild(save);

    save.onclick = function () {
      handlers.onAdd({
        name: name.value,
        type: type.value,
        url: url.value,
        user: user.value,
        pass: pass.value
      });
    };

    s.appendChild(form);
    root.appendChild(s);
  }
};
}(window));
