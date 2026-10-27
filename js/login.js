(function () {
  var frame = document.getElementById('birthdayFrame');
  var audio = document.getElementById('shellAudio');
  var audioButton = document.getElementById('shellAudioToggle');
  var coverStage = document.getElementById('coverStage');
  var envelope = document.getElementById('letterEnvelope');
  var receiveButton = document.getElementById('receiveButton');
  var skipButton = document.getElementById('skipButton');
  var letterNextButton = document.getElementById('letterNextButton');

  if (!frame || !audio || !audioButton || !coverStage || !envelope || !receiveButton || !skipButton || !letterNextButton) {
    return;
  }

  var storageKey = 'shipingBirthdayVisited';
  var state = 'cover';

  function enterFullscreen() {
    var target = document.documentElement;
    var request = target.requestFullscreen ||
      target.webkitRequestFullscreen ||
      target.mozRequestFullScreen ||
      target.msRequestFullscreen;

    if (request) {
      try {
        var result = request.call(target);
        if (result && typeof result.catch === 'function') {
          result.catch(function () {});
        }
      } catch (error) {
        // Fullscreen is optional.
      }
    }
  }

  function updateAudioButton() {
    var playing = !audio.paused && !audio.ended;
    audioButton.dataset.playing = playing ? 'true' : 'false';
    audioButton.textContent = playing ? '♫' : '♪';
  }

  function playMusic() {
    var promise = audio.play();
    if (promise && typeof promise.then === 'function') {
      promise.then(updateAudioButton).catch(updateAudioButton);
    } else {
      updateAudioButton();
    }
  }

  function rememberVisit() {
    try {
      localStorage.setItem(storageKey, '1');
    } catch (error) {
      // Some browsers restrict storage for local files.
    }
  }

  function showSkipOption() {
    // 她要是忙，第一眼就能找到路，不用把动画看完。
    skipButton.hidden = false;
  }

  function openEnvelope() {
    if (state !== 'cover') {
      return;
    }

    state = 'opening';
    rememberVisit();
    enterFullscreen();
    playMusic();
    receiveButton.disabled = true;
    skipButton.disabled = true;
    letterNextButton.hidden = false;
    envelope.classList.add('is-opening');
  }

  function enterParticles() {
    if (state !== 'opening') {
      return;
    }

    state = 'entering';
    letterNextButton.disabled = true;
    frame.src = 'html/index1.html?embedded=1&music=1';
    document.body.classList.add('is-entered');
    coverStage.classList.add('is-leaving');
  }

  function skipToMemories() {
    if (state !== 'cover') {
      return;
    }

    state = 'entering';
    rememberVisit();
    enterFullscreen();
    playMusic();
    frame.src = 'html/Memories.html?music=1';
    document.body.classList.add('is-entered');
    coverStage.classList.add('is-leaving');
  }

  receiveButton.addEventListener('click', openEnvelope);
  letterNextButton.addEventListener('click', enterParticles);
  skipButton.addEventListener('click', skipToMemories);

  audioButton.addEventListener('click', function () {
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      updateAudioButton();
    }
  });

  audio.addEventListener('play', updateAudioButton);
  audio.addEventListener('pause', updateAudioButton);
  audio.addEventListener('ended', updateAudioButton);
  updateAudioButton();
  showSkipOption();
}());



