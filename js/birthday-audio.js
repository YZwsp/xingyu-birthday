(function () {
  if (window.self !== window.top) {
    return;
  }

  var audio = document.getElementById('birthdayAudio');
  if (!audio) {
    return;
  }

  var queryEnabled = /(?:\?|&)music=1(?:&|$)/.test(window.location.search);
  var storedState = /^shiping-birthday:(\d+(?:\.\d+)?):([01])$/.exec(window.name || '');
  var enabled = queryEnabled || Boolean(storedState && storedState[2] === '1');
  var savedTime = storedState ? parseFloat(storedState[1]) || 0 : 0;
  var lastSavedSecond = -1;

  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'audio-toggle';
  button.setAttribute('aria-label', '播放或暂停背景音乐');
  button.textContent = '♪';
  button.dataset.playing = 'false';
  document.body.appendChild(button);

  function saveState(force) {
    if (!window.name && !enabled) {
      return;
    }

    var second = Math.floor(audio.currentTime || 0);
    if (force || second !== lastSavedSecond) {
      lastSavedSecond = second;
      window.name = 'shiping-birthday:' + second + ':' + (enabled ? '1' : '0');
    }
  }

  function updateButton() {
    var playing = enabled && !audio.paused && !audio.ended;
    button.dataset.playing = playing ? 'true' : 'false';
    button.textContent = playing ? '♫' : '♪';
  }

  function start() {
    if (!enabled) {
      updateButton();
      return;
    }

    if (savedTime > 0 && Math.abs(audio.currentTime - savedTime) > 1) {
      try {
        audio.currentTime = savedTime;
      } catch (error) {
        // Metadata may not be ready yet; the loadedmetadata handler retries.
      }
    }

    var promise = audio.play();
    if (promise && typeof promise.then === 'function') {
      promise.then(updateButton).catch(updateButton);
    } else {
      updateButton();
    }
  }

  button.addEventListener('click', function () {
    if (enabled && !audio.paused) {
      enabled = false;
      audio.pause();
      saveState(true);
      updateButton();
      return;
    }

    enabled = true;
    saveState(true);
    start();
  });

  audio.addEventListener('loadedmetadata', function () {
    if (enabled && savedTime > 0) {
      try {
        audio.currentTime = savedTime;
      } catch (error) {
        // Ignore timing errors while the browser prepares the audio.
      }
    }
    start();
  });

  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);
  audio.addEventListener('ended', updateButton);
  audio.addEventListener('timeupdate', function () {
    saveState(false);
  });

  window.addEventListener('beforeunload', function () {
    saveState(true);
  });

  saveState(true);
  updateButton();

  if (audio.readyState >= 1) {
    start();
  }
}());


