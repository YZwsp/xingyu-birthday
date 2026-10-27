(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('.memories-page .section'));
  if (!sections.length) {
    return;
  }

  var nav = document.createElement('nav');
  nav.className = 'story-nav';
  nav.setAttribute('aria-label', '回忆页导航');

  var buttons = sections.map(function (section, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'story-nav__dot';
    button.setAttribute('aria-label', '前往第 ' + (index + 1) + ' 屏');
    button.addEventListener('click', function () {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    nav.appendChild(button);
    return button;
  });

  document.body.appendChild(nav);

  function activate(index) {
    buttons.forEach(function (button, buttonIndex) {
      button.classList.toggle('is-active', buttonIndex === index);
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });

      if (visible.length) {
        activate(sections.indexOf(visible[0].target));
      }
    }, {
      root: null,
      threshold: [0.45, 0.65]
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    activate(0);
  }

  activate(0);
}());
