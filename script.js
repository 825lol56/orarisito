let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// External links
function openExternalLink(url) { window.open(url, "_blank"); }

// Popups
function openSuggestionsPopup() { showPopup("Funzione suggerimenti disponibile presto!"); }
function openLoginPopup() { showPopup("Login in arrivo!"); }
function showPopup(text) {
    document.getElementById("popup-text").innerText = text;
    document.getElementById("popup-overlay").style.display = "block";
    document.getElementById("popup-box").style.display = "block";
}
function closePopup() {
    document.getElementById("popup-overlay").style.display = "none";
    document.getElementById("popup-box").style.display = "none";
}

// Install menu
function toggleInstallMenu() {
    const menu = document.getElementById("install-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
function closeInstallMenu() { document.getElementById("install-menu").style.display = "none"; }

// Android install
function installAndroid() {
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; }
    else { showPopup("Installazione non disponibile su questo dispositivo."); }
}

// iOS instructions
function showIOSInstructions() {
    showPopup("Su iOS: premi il tasto Condividi → 'Aggiungi alla schermata Home'");
}
