(function () {
  var revealTimer;
  var readyTimer;
  var blackoutTimer;
  var navigationTimer;
  var blown = false;

  function revealCake() {
    var arrival = document.getElementById('cakeArrival');
    var scene = document.getElementById('cakeArrivalScene');
    var template = document.getElementById('cakeAnimationTemplate');

    if (!arrival || !scene || !template) {
      return;
    }

    scene.appendChild(template.content.cloneNode(true));
    void arrival.offsetWidth;
    arrival.classList.add('is-visible');
    arrival.setAttribute('aria-hidden', 'false');

    readyTimer = window.setTimeout(function () {
      arrival.classList.add('is-ready');
    }, 7200);
  }

  function blowOutCandles() {
    if (blown) {
      return;
    }

    blown = true;

    var arrival = document.getElementById('cakeArrival');
    var button = document.getElementById('blowCandleButton');
    var blackout = document.getElementById('birthdayBlackout');

    if (arrival) {
      arrival.classList.add('is-blowing');
    }

    if (button) {
      button.disabled = true;
      button.textContent = '呼——';
    }

    blackoutTimer = window.setTimeout(function () {
      if (blackout) {
        blackout.classList.add('is-active');
      }
    }, 1250);

    navigationTimer = window.setTimeout(function () {
      window.location.href = 'BirthdayCake.html?music=1';
    }, 3500);
  }

  revealTimer = window.setTimeout(revealCake, 13200);

  document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'blowCandleButton') {
      blowOutCandles();
    }
  });
  window.addEventListener('pagehide', function () {
    window.clearTimeout(revealTimer);
    window.clearTimeout(readyTimer);
    window.clearTimeout(blackoutTimer);
    window.clearTimeout(navigationTimer);
  });
}());


