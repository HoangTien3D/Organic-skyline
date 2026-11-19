(function () {
  'use strict';

  var triggerButton = document.getElementById('info-trigger');
  var closeButton = document.getElementById('info-close');
  var overlay = document.getElementById('modal-overlay');
  var backdrop = document.getElementById('modal-backdrop');

  if (!triggerButton || !closeButton || !overlay || !backdrop) {
    return;
  }

  var isOpen = false;
  var hideTimer = null;
  var prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function openModal() {
    if (isOpen) return;
    isOpen = true;

    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }

    overlay.hidden = false;
    triggerButton.setAttribute('aria-expanded', 'true');
    triggerButton.setAttribute('aria-label', 'Close project information');

    window.requestAnimationFrame(function () {
      overlay.classList.add('is-open');
      closeButton.focus();
    });
  }

  function closeModal() {
    if (!isOpen) return;
    isOpen = false;

    overlay.classList.remove('is-open');
    triggerButton.setAttribute('aria-expanded', 'false');
    triggerButton.setAttribute('aria-label', 'Open project information');

    if (prefersReducedMotion) {
      overlay.hidden = true;
    } else {
      hideTimer = window.setTimeout(function () {
        if (!isOpen) {
          overlay.hidden = true;
        }
      }, 180);
    }

    triggerButton.focus();
  }

  triggerButton.addEventListener('click', function () {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  });

  closeButton.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen) {
      closeModal();
    }
  });
})();
