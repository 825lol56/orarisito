// ===============================
// INSTALL POPUP
// ===============================
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

const installPopup = document.getElementById("install-popup");
const btnInstall = document.getElementById("btn-install");

btnInstall.addEventListener("click", () => {
    installPopup.classList.remove("hidden");
});

document.getElementById("install-close").addEventListener("click", () => {
    installPopup.classList.add("hidden");
});

document.getElementById("install-android").addEventListener("click", () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        installPopup.classList.add("hidden");
    } else {
        alert("Installazione non disponibile su questo dispositivo.");
    }
});

document.getElementById("install-ios").addEventListener("click", () => {
    alert("iOS → Condividi → Aggiungi alla schermata Home.");
    installPopup.classList.add("hidden");
});

// ===============================
// LOGIN POPUP
// ===============================
const loginPopup = document.getElementById("login-popup");

document.getElementById("btn-login").addEventListener("click", () => {
    loginPopup.classList.remove("hidden");
});

document.getElementById("login-close").addEventListener("click", () => {
    loginPopup.classList.add("hidden");
});

// Fake login for now
document.getElementById("login-submit").addEventListener("click", () => {
    const code = document.getElementById("login-code").value.trim();

    if (code === "lrnzluckystrike") {
        alert("Accesso effettuato.");
        loginPopup.classList.add("hidden");
    } else {
        alert("Codice non valido.");
    }
});


// ===============================
// ICON BEHAVIOR
// ===============================

// Instagram
document.getElementById("btn-instagram").addEventListener("click", () => {
    window.open("https://instagram.com", "_blank");
});

// Suggestions placeholder
document.getElementById("btn-suggest").addEventListener("click", () => {
    alert("Funzione suggerimenti in arrivo!");
});

// Light/dark theme
const themeBtn = document.getElementById("btn-theme");
const themeIcon = document.getElementById("theme-icon");

let dark = false;

themeBtn.addEventListener("click", () => {
    dark = !dark;

    if (dark) {
        document.body.style.background = "#111";
        document.body.style.color = "white";
        themeIcon.src = "icons/darkmode.png";
    } else {
        document.body.style.background = "#f0f0f0";
        document.body.style.color = "black";
        themeIcon.src = "icons/lightmode.png";
    }
});
