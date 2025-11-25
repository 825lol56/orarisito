import { db, getDoc, doc, getDocs, collection } from './firebase-init.js';

// Protect developer page
if(localStorage.getItem("developer") !== "true") {
  document.body.innerHTML = "<h1>Accesso negato</h1><p>Devi essere sviluppatore per accedere a questa pagina.</p>";
  throw new Error("Accesso negato");
}

// Load analytics
async function loadAnalytics() {
  const analyticsList = document.getElementById("analytics-list");
  analyticsList.innerHTML = "";
  const ids = ["treniNapSorr","treniSorrNap","busVico","busNotturno"];
  for(const id of ids){
    const ref = doc(db,"analytics",id);
    const snap = await getDoc(ref);
    const count = snap.exists() ? snap.data().count : 0;
    const li = document.createElement("li");
    li.textContent = `${id}: ${count}`;
    analyticsList.appendChild(li);
  }
}

// Load suggestions
async function loadSuggestions() {
  const suggestionsList = document.getElementById("suggestions-list");
  suggestionsList.innerHTML = "";
  const snaps = await getDocs(collection(db,"suggestions"));
  snaps.forEach(doc => {
    const li = document.createElement("li");
    li.textContent = `[${doc.id}] ${doc.data().text}`;
    suggestionsList.appendChild(li);
  });
}

loadAnalytics();
loadSuggestions();
