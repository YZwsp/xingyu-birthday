(function () {
  var trigger = document.getElementById('giftTrigger');
  if (!trigger) {
    return;
  }

  var overlay = document.createElement('div');
  overlay.className = 'gift-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', '生日礼物特效');
  overlay.innerHTML = [
    '<div class="gift-aurora"></div>',
    '<div class="gift-sky"></div>',
    '<div class="gift-orbit"></div>',
    '<div class="gift-overlay__halo"></div>',
    '<div class="gift-ring"></div>',
    '<div class="gift-ring gift-ring--two"></div>',
    '<div class="gift-stage">',
    '  <div class="gift-badge">没了，就这些 · TO 思萍</div>',
    '  <div class="gift-three-d">',
    '    <div class="gift-word-spin"><span class="gift-word">生日快乐</span></div>',
    '  </div>',
    '  <p class="gift-caption">没买礼物，要是你觉得开心，<br>这些代码就有了意义。</p>',
    '  <button class="gift-close" type="button">开心</button>',
    '</div>'
  ].join('');
  document.body.appendChild(overlay);

  var sky = overlay.querySelector('.gift-sky');
  var orbit = overlay.querySelector('.gift-orbit');

  var closeButton = overlay.querySelector('.gift-close');
  var closeTimer;
  var closeAnimationTimer;
  var isClosing = false;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createSky() {
    if (!sky) {
      return;
    }

    sky.innerHTML = '';

    for (var i = 0; i < 55; i += 1) {
      var star = document.createElement('span');
      var size = randomBetween(1, 2.6);
      star.className = 'gift-star';
      star.style.left = randomBetween(0, 100) + '%';
      star.style.top = randomBetween(0, 100) + '%';
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.setProperty('--dur', randomBetween(2.4, 5.8) + 's');
      star.style.setProperty('--delay', randomBetween(0, 3) + 's');
      star.style.setProperty('--peak', randomBetween(0.45, 1));
      sky.appendChild(star);
    }

    for (var j = 0; j < 14; j += 1) {
      var dust = document.createElement('span');
      dust.className = 'gift-dust';
      dust.style.left = randomBetween(2, 98) + '%';
      dust.style.setProperty('--size', randomBetween(1.6, 3.6) + 'px');
      dust.style.setProperty('--dur', randomBetween(7, 12) + 's');
      dust.style.setProperty('--delay', randomBetween(0, 6) + 's');
      dust.style.setProperty('--drift', randomBetween(-40, 40) + 'px');
      sky.appendChild(dust);
    }

    for (var k = 0; k < 2; k += 1) {
      var shoot = document.createElement('span');
      shoot.className = 'gift-shooting';
      shoot.style.setProperty('--x', (k === 0 ? randomBetween(4, 26) : randomBetween(46, 68)) + '%');
      shoot.style.setProperty('--y', randomBetween(6, 24) + '%');
      shoot.style.setProperty('--delay', (k === 0 ? 0.8 : 3.4) + 's');
      sky.appendChild(shoot);
    }
  }

  function createOrbit() {
    if (!orbit) {
      return;
    }

    orbit.innerHTML = '';

    for (var i = 0; i < 14; i += 1) {
      var star = document.createElement('span');
      star.className = 'gift-orbit__star';
      star.style.setProperty('--a', (i * 360 / 14) + 'deg');
      star.style.setProperty('--size', randomBetween(2.2, 4) + 'px');
      orbit.appendChild(star);
    }
  }

  function clearSky() {
    if (sky) {
      sky.innerHTML = '';
    }
    if (orbit) {
      orbit.innerHTML = '';
    }
  }

  function createBurstParticles() {
    var symbols = ['✦', '✧', '◆', '●', '✶', '❖'];
    var colors = ['#ffd978', '#ffe9b1', '#f2a3b7', '#8eb8d8', '#ffffff'];

    for (var i = 0; i < 42; i += 1) {
      var particle = document.createElement('span');
      var angle = Math.random() * Math.PI * 2;
      var distance = randomBetween(90, 520);
      particle.className = 'gift-particle';
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
      particle.style.setProperty('--size', randomBetween(12, 29) + 'px');
      particle.style.setProperty('--scale', randomBetween(0.8, 1.7));
      particle.style.setProperty('--rotate', randomBetween(80, 320) + 'deg');
      particle.style.setProperty('--duration', randomBetween(1.2, 2.2) + 's');
      particle.style.setProperty('--delay', randomBetween(0, 0.55) + 's');
      overlay.appendChild(particle);
    }
  }

  function createFloatingGifts() {
    var symbols = ['✦', '✧', '·', '✶', '✦', '✧'];

    for (var i = 0; i < 18; i += 1) {
      var float = document.createElement('span');
      float.className = 'gift-float';
      float.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      float.style.left = randomBetween(4, 96) + 'vw';
      float.style.color = i % 3 === 0 ? '#f2a3b7' : '#ffd978';
      float.style.setProperty('--size', randomBetween(20, 42) + 'px');
      float.style.setProperty('--drift', randomBetween(-80, 80) + 'px');
      float.style.setProperty('--duration', randomBetween(3.6, 6.2) + 's');
      float.style.setProperty('--delay', randomBetween(0.25, 2.4) + 's');
      overlay.appendChild(float);
    }
  }

  function clearParticles() {
    overlay.querySelectorAll('.gift-particle, .gift-float').forEach(function (particle) {
      particle.remove();
    });
  }

  function openGift() {
    window.clearTimeout(closeTimer);
    window.clearTimeout(closeAnimationTimer);
    isClosing = false;
    closeButton.disabled = false;
    clearParticles();
    clearSky();
    createSky();
    createOrbit();
    createBurstParticles();
    createFloatingGifts();
    overlay.classList.remove('is-open', 'is-closing');
    void overlay.offsetWidth;
    overlay.classList.add('is-open');
    document.body.classList.add('gift-open');
    closeTimer = window.setTimeout(closeGift, 8200);
  }

  function finishClose() {
    overlay.classList.remove('is-open', 'is-closing');
    document.body.classList.remove('gift-open');
    closeButton.disabled = false;
    isClosing = false;
    clearParticles();
  }

  function closeGift() {
    if (isClosing) {
      return;
    }

    isClosing = true;
    window.clearTimeout(closeTimer);
    closeButton.disabled = true;
    overlay.classList.add('is-closing');

    closeAnimationTimer = window.setTimeout(finishClose, 1120);
  }
  trigger.addEventListener('click', openGift);
  closeButton.addEventListener('click', closeGift);
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeGift();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeGift();
    }
  });
}());







