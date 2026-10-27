(function () {
  function revealPage() {
    var curtain = document.getElementById('pageEnterCurtain');
    if (!curtain) {
      return;
    }

    window.setTimeout(function () {
      curtain.classList.add('is-leaving');
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealPage);
  } else {
    revealPage();
  }
}());
