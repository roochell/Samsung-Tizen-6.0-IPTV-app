(function (global) { 'use strict';
global.PlayerView = {
  render: function (root, channel) {
    root.innerHTML = '';
    var wrap = DOM.el('div', { className: 'player-wrap' });
    wrap.appendChild(DOM.el('div', { className: 'topbar', text: channel.name || 'Player' }));
    var video = DOM.el('video', { style: 'width:100%;height:100%;background:black', autoplay: 'autoplay' });
    wrap.appendChild(video);
    root.appendChild(wrap);
    return video;
  }
};
}(window));
