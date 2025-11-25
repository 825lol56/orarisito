let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

/* External link */
function openExternalLink(url) {
    window.open(url, "_blank");
}

/* POPUPS */
function showPopup(text) {
    document.getElementById("popup-text").innerText = text;
    document.getElementById("popup-overlay").style.display = "block";
    document.getElementById("popup-box").style.display = "block";
}

function closePopup() {
    document.getElementById("popup-overlay").style.display = "none";
    document.getElementById("popup-box").style.display = "none";
}

function openSuggestionsPopup() {
    showPopup("Funzione suggerimenti disponibile presto!");
}

function openLoginPopup() {
    showPopup("Login in arrivo!");
}

/* INSTALL MENU */
function openInstallMenu() {
    document.getElementById("install-menu").style.display = "block";
}

function closeInstallMenu() {
    document.getElementById("install-menu").style.display = "none";
}

function installAndroid() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt = null;
    } else {
        showPopup("Installazione non disponibile su questo dispositivo.");
    }
}

function showIOSInstructions() {
    showPopup("Su iOS: premi il tasto Condividi → 'Aggiungi alla schermata Home'");
}
