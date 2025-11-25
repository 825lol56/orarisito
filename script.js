/* SHOW INSTALL MENU */
function openInstall() {
    document.getElementById("installMenu").classList.remove("hidden");
}

/* CLOSE INSTALL MENU */
function closeInstall() {
    document.getElementById("installMenu").classList.add("hidden");
}

/* ANDROID INSTALL (PWA) */
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function installAndroid() {
    if (!deferredPrompt) {
        alert("Installazione non disponibile su questo dispositivo");
        return;
    }
    deferredPrompt.prompt();
}

/* DARK MODE TOGGLE */
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

/* LOAD SAVED THEME */
window.onload = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark");
    }
};
