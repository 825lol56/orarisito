// Simple, robust behavior for toolbar and menus (no dev icon)
// Requires icons in /icons/ folder: instagram.png, suggestions.png, login.png, lightmode.png, darkmode.png, install.png

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const btnInstagram = document.getElementById('btn-instagram');
  const btnSuggestions = document.getElementById('btn-suggestions');
  const loginIcon = document.getElementById('login-icon');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon') || document.querySelector('#theme-toggle img');
  const installButton = document.getElementById('install-button');

  const loginMenu = document.getElementById('login-menu');
  const installMenu = document.getElementById('install-menu');
  const popupOverlay = document.getElementById('popup-overlay');
  const popupBox = document.getElementById('popup-box');
  const popupText = document.getElementById('popup-text');

  // 1) Populate Instagram button (always visible)
  btnInstagram.innerHTML = '<img src="icons/instagram.png" alt="Instagram">';
  btnInstagram.addEventListener('click', () => {
    window.open('https://instagram.com/lorenzo.c.l', '_blank');
  });

  // 2) Suggestions
  btnSuggestions.addEventListener('click', () => {
    showMessage('Funzione suggerimenti in arrivo!');
  });

  // 3) Login menu toggle (positioned above the login icon)
  function positionAbove(element, menu) {
    const r = element.getBoundingClientRect();
    const left = r.left + r.width / 2;
    const bottom = window.innerHeight - r.top + 10; // 10px gap
    menu.style.left = left + 'px';
    menu.style.bottom = bottom + 'px';
    menu.style.transform = 'translateX(-50%)';
  }

  function toggleMenu(menu, anchorEl) {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
      menu.setAttribute('aria-hidden', 'true');
    } else {
      positionAbove(anchorEl, menu);
      menu.style.display = 'block';
      menu.setAttribute('aria-hidden', 'false');
    }
  }

  loginIcon.addEventListener('click', () => toggleMenu(loginMenu, loginIcon));
  document.getElementById('login-close').addEventListener('click', () => {
    loginMenu.style.display = 'none';
  });

  // login submit (keeps behavior local; you said you'll access developer page directly)
  document.getElementById('login-submit').addEventListener('click', () => {
    const code = document.getElementById('login-code').value.trim();
    if (code === 'lrnzluckystrike') {
      showMessage('Accesso riuscito (salvato solo localmente).');
      loginMenu.style.display = 'none';
      // optionally set a flag locally (if you want), but you said you will access dev page directly
      // localStorage.setItem('developer', 'true');
    } else {
      showMessage('Codice non valido.');
    }
  });

  // 4) Theme toggle (light/dark)
  let dark = false;
  themeToggle.addEventListener('click', () => {
    dark = !dark;
    if (dark) {
      document.body.style.background = '#111';
      document.body.style.color = '#fff';
      if (themeIcon) themeIcon.src = 'icons/darkmode.png';
    } else {
      document.body.style.background = '#f5f6fa';
      document.body.style.color = '#222';
      if (themeIcon) themeIcon.src = 'icons/lightmode.png';
    }
  });

  // 5) Install menu (two buttons)
  installButton.addEventListener('click', () => toggleMenu(installMenu, installButton));
  document.getElementById('install-close').addEventListener('click', () => installMenu.style.display = 'none');
  document.getElementById('install-ios').addEventListener('click', () => {
    showMessage("iOS: premi Condividi → 'Aggiungi alla schermata Home'");
    installMenu.style.display = 'none';
  });

  // install android: use beforeinstallprompt if available
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  document.getElementById('install-android').addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt = null;
      installMenu.style.display = 'none';
    } else {
      showMessage('Installazione non disponibile su questo dispositivo.');
    }
  });

  // message popup helpers
  function showMessage(text) {
    popupText.textContent = text;
    popupOverlay.style.display = 'block';
    popupBox.style.display = 'block';
    popupBox.setAttribute('aria-hidden', 'false');
    popupOverlay.setAttribute('aria-hidden', 'false');
  }
  document.getElementById('popup-close').addEventListener('click', hideMessage);
  popupOverlay.addEventListener('click', hideMessage);
  function hideMessage() {
    popupOverlay.style.display = 'none';
    popupBox.style.display = 'none';
    popupBox.setAttribute('aria-hidden', 'true');
    popupOverlay.setAttribute('aria-hidden', 'true');
  }

  // reposition popup menus on resize (keep above their anchors)
  window.addEventListener('resize', () => {
    if (loginMenu.style.display === 'block') positionAbove(loginIcon, loginMenu);
    if (installMenu.style.display === 'block') positionAbove(installButton, installMenu);
  });
});
