import { db, doc, getDoc, setDoc, updateDoc, increment } from './firebase-init.js';

document.addEventListener("DOMContentLoaded", () => {

  const instagramBtn = document.getElementById("btn-instagram");
  const devBtn = document.getElementById("btn-dev");
  const loginIcon = document.getElementById("login-icon");
  const loginMenu = document.getElementById("login-menu");
  const loginBtn = document.getElementById("login-btn");

  // Ensure developer button is hidden by default (HTML sets display:none, but enforce here)
  devBtn.style.display = devBtn.style.display || "none";

  // Render Instagram button immediately (no flash)
  function renderInstagramButton() {
    // If already developer, show dev button and keep instagram available
    if (localStorage.getItem("developer") === "true") {
      devBtn.style.display = "inline-flex";
      devBtn.onclick = () => window.location.href = "developer.html";
    } else {
      devBtn.style.display = "none";
    }

    // Populate Instagram button and click behavior
    instagramBtn.innerHTML = '<img src="icons/instagram.png" alt="Instagram">';
    instagramBtn.onclick = () => window.open("https://instagram.com/","_blank");
  }

  renderInstagramButton();

  // Timetable click tracking (increments analytics doc counter)
  document.querySelectorAll(".cards-container a").forEach(a => {
    a.addEventListener("click", async () => {
      const id = a.dataset.id;
      try {
        const ref = doc(db, "analytics", id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, { count: 1 });
        } else {
          await updateDoc(ref, { count: increment(1) });
        }
      } catch (err) {
        // silent fail (offline or misconfigured); optional: console.error(err);
      }
    });
  });

  // Login menu: toggle and position above icon
  function toggleLoginMenu() {
    if (loginMenu.style.display === "block") {
      loginMenu.style.display = "none";
      loginMenu.setAttribute("aria-hidden", "true");
      return;
    }
    positionLoginMenu();
    loginMenu.style.display = "block";
    loginMenu.setAttribute("aria-hidden", "false");
  }

  function positionLoginMenu() {
    const rect = loginIcon.getBoundingClientRect();
    const left = rect.left + rect.width / 2;
    // bottom: distance from bottom of viewport; compute so menu sits above icon
    const bottom = window.innerHeight - rect.top + 10;
    loginMenu.style.left = `${left}px`;
    loginMenu.style.bottom = `${bottom}px`;
    loginMenu.style.transform = "translateX(-50%)";
  }

  loginIcon.addEventListener("click", toggleLoginMenu);
  window.toggleLoginMenu = toggleLoginMenu;

  // Login handler
  loginBtn.addEventListener("click", () => {
    const code = document.getElementById("login-code").value.trim();
    if (code === "lrnzluckystrike") {
      localStorage.setItem("developer", "true");
      // show developer button
      devBtn.style.display = "inline-flex";
      devBtn.onclick = () => window.location.href = "developer.html";
      // close menu
      loginMenu.style.display = "none";
    } else {
      alert("Codice non valido.");
    }
  });

  // Dark/light toggle
  const themeToggleBtn = document.getElementById("theme-toggle");
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const img = themeToggleBtn.querySelector("img");
    img.src = document.body.classList.contains("dark-mode") ? "icons/darkmode.png" : "icons/lightmode.png";
  });

  // Simple popup helpers
  window.openSuggestionsPopup = () => showPopup("Suggerimenti disponibili presto.");
  function showPopup(text) {
    document.getElementById("popup-text").innerText = text;
    document.getElementById("popup-overlay").style.display = "block";
    document.getElementById("popup-overlay").setAttribute("aria-hidden", "false");
    document.getElementById("popup-box").style.display = "block";
    document.getElementById("popup-box").setAttribute("aria-hidden", "false");
  }
  function closePopup() {
    document.getElementById("popup-overlay").style.display = "none";
    document.getElementById("popup-overlay").setAttribute("aria-hidden", "true");
    document.getElementById("popup-box").style.display = "none";
    document.getElementById("popup-box").setAttribute("aria-hidden", "true");
  }
  window.closePopup = closePopup;

  // Install menu / beforeinstallprompt
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  window.toggleInstallMenu = () => {
    const menu = document.getElementById("install-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  };
  window.closeInstallMenu = () => document.getElementById("install-menu").style.display = "none";
  window.installAndroid = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt = null;
    } else {
      showPopup("Installazione non disponibile su questo dispositivo.");
    }
  };
  window.showIOSInstructions = () => showPopup("Su iOS: premi Condividi → 'Aggiungi alla schermata Home'");

  // reposition login menu on resize to keep it above icon
  window.addEventListener("resize", () => {
    if (document.getElementById("login-menu").style.display === "block") positionLoginMenu();
  });
});
