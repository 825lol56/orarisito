import { db, doc, getDoc, setDoc, updateDoc, increment } from './firebase-init.js';

let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// Login
const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", async () => {
    const code = document.getElementById("login-code").value.trim();
    if (code === "") return alert("Inserisci un codice valido.");

    if (code === "lrnzluckystrike") {
        // Developer login
        loginSuccess("developer");
    } else {
        // For now, invalid code
        alert("Codice non valido.");
    }
});

function loginSuccess(role) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.getElementById("bottom-banner").style.display = "flex";

    if (role === "developer") {
        const instagramBtn = document.getElementById("btn-instagram");
        instagramBtn.innerHTML = `<img src="icons/devpanel.png" alt="Developer Panel">`;
        instagramBtn.onclick = () => { window.location.href = "developer.html"; };
    }
}

// Timetable click analytics
document.querySelectorAll(".cards-container a").forEach(a => {
    a.addEventListener("click", async () => {
        const id = a.dataset.id;
        const ref = doc(db, "analytics", id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            await setDoc(ref, { count: 1 });
        } else {
            await updateDoc(ref, { count: increment(1) });
        }
    });
});

// Rest of your previous scripts: popups, install menu, theme toggle
const themeToggleBtn = document.getElementById("theme-toggle");
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

function openSuggestionsPopup() { showPopup("Suggerimenti disponibile presto."); }
function openLoginPopup() { showPopup("Login info."); }
function showPopup(text) {
    document.getElementById("popup-text").innerText = text;
    document.getElementById("popup-overlay").style.display = "block";
    document.getElementById("popup-box").style.display = "block";
}
function closePopup() {
    document.getElementById("popup-overlay").style.display = "none";
    document.getElementById("popup-box").style.display = "none";
}

function toggleInstallMenu() {
    const menu = document.getElementById("install-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
function closeInstallMenu() { document.getElementById("install-menu").style.display = "none"; }

function installAndroid() { 
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; }
    else { showPopup("Installazione non disponibile su questo dispositivo."); }
}

function showIOSInstructions() { showPopup("Su iOS: premi Condividi → 'Aggiungi alla schermata Home'"); }
