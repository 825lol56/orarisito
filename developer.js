import { db, getDoc, doc, getDocs, collection } from './firebase-init.js';

async function loadAnalytics() {
    const analyticsList = document.getElementById("analytics-list");
    analyticsList.innerHTML = "";
    const ids = ["treniNapSorr","treniSorrNap","busVico","busNotturno"];
    for (const id of ids) {
        const ref = doc(db, "analytics", id);
        const snap = await getDoc(ref);
        const count = snap.exists() ? snap.data().count : 0;
        const li = document.createElement("li");
        li.textContent = `${id}: ${count}`;
        analyticsList.appendChild(li);
    }
}

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
