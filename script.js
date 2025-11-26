import { db, doc, getDoc, setDoc, updateDoc, increment } from './firebase-init.js';

document.addEventListener("DOMContentLoaded", () => {

  const instagramBtn = document.getElementById("btn-instagram");
  const loginIcon = document.getElementById("login-icon");
  const loginMenu = document.getElementById("login-menu");
  const loginBtn = document.getElementById("login-btn");

  // Render Instagram/Dev button immediately
  function renderInstagramButton() {
    if(localStorage.getItem("developer")==="true") {
      instagramBtn.innerHTML='<img src="icons/devpanel.png" alt="Developer Panel">';
      instagramBtn.onclick = ()=>window.location.href="developer.html";
    } else {
      instagramBtn.innerHTML='<img src="icons/instagram.png" alt="Instagram">';
      instagramBtn.onclick = ()=>window.open("https://instagram.com/yourpage","_blank");
    }
  }
  renderInstagramButton();

  // Timetable clicks
  document.querySelectorAll(".cards-container a").forEach(a => {
    a.addEventListener("click", async () => {
      const id = a.dataset.id;
      const ref = doc(db,"analytics",id);
      const snap = await getDoc(ref);
      if(!snap.exists()) await setDoc(ref,{count:1});
      else await updateDoc(ref,{count:increment(1)});
    });
  });

  // Login Menu
  function toggleLoginMenu() {
    if(loginMenu.style.display==="block") { loginMenu.style.display="none"; return; }
    positionLoginMenu();
    loginMenu.style.display="block";
  }
  function positionLoginMenu() {
    const rect = loginIcon.getBoundingClientRect();
    loginMenu.style.left = `${rect.left + rect.width/2}px`;
    loginMenu.style.bottom = `${window.innerHeight - rect.top + 10}px`;
    loginMenu.style.transform="translateX(-50%)";
  }
  loginIcon.addEventListener("click", toggleLoginMenu);

  loginBtn.addEventListener("click", () => {
    const code = document.getElementById("login-code").value.trim();
    if(code==="lrnzluckystrike") {
      localStorage.setItem("developer","true");
      loginMenu.style.display="none";
      renderInstagramButton();
    } else alert("Codice non valido.");
  });

  // Dark/Light Mode
  const themeToggleBtn=document.getElementById("theme-toggle");
  themeToggleBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    const img=themeToggleBtn.querySelector("img");
    img.src=document.body.classList.contains("dark-mode")?"icons/darkmode.png":"icons/lightmode.png";
  });

  // Popups
  window.openSuggestionsPopup = ()=>showPopup("Suggerimenti disponibili presto.");
  function showPopup(text){
    document.getElementById("popup-text").innerText=text;
    document.getElementById("popup-overlay").style.display="block";
    document.getElementById("popup-box").style.display="block";
  }
  function closePopup(){
    document.getElementById("popup-overlay").style.display="none";
    document.getElementById("popup-box").style.display="none";
  }
  window.closePopup=closePopup;

  // Install Menu
  let deferredPrompt=null;
  window.addEventListener("beforeinstallprompt",(e)=>{
    e.preventDefault();
    deferredPrompt=e;
  });
  window.toggleInstallMenu=()=>{
    const menu=document.getElementById("install-menu");
    menu.style.display=menu.style.display==="block"?"none":"block";
  };
  window.closeInstallMenu=()=>document.getElementById("install-menu").style.display="none";
  window.installAndroid=()=>{
    if(deferredPrompt){ deferredPrompt.prompt(); deferredPrompt=null; }
    else showPopup("Installazione non disponibile su questo dispositivo.");
  };
  window.showIOSInstructions=()=>showPopup("Su iOS: premi Condividi → 'Aggiungi alla schermata Home'");
});
