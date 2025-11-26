import { db, doc, getDoc, collection, getDocs } from './firebase-init.js';

document.addEventListener("DOMContentLoaded", async () => {
  // protect developer page using client-side check
  if (localStorage.getItem("developer") !== "true") {
    document.getElementById("protected-content").style.display = "none";
    document.getElementById("access-denied").style.display = "block";
    return;
  }

  // show protected area
  document.getElementById("protected-content").style.display = "block";

  // load analytics counts
  const analyticsList = document.getElementById("analytics-list");
  analyticsList.innerHTML = "";
  const ids = ["treniNapSorr", "treniSorrNap", "busVico", "busNotturno"];
  for (const id of ids) {
    try {
      const ref = doc(db, "analytics", id);
      const snap = await getDoc(ref);
      const count = snap.exists() ? (snap.data().count || 0) : 0;
      const li = document.createElement("li");
      li.textContent = `${id}: ${count}`;
      analyticsList.appendChild(li);
    } catch (err) {
      const li = document.createElement("li");
      li.textContent = `${id}: (error)`;
      analyticsList.appendChild(li);
    }
  }

  // load suggestions
  const suggestionsList = document.getElementById("suggestions-list");
  suggestionsList.innerHTML = "";
  try {
    const snaps = await getDocs(collection(db, "suggestions"));
    snaps.forEach(docSnap => {
      const li = document.createElement("li");
      li.textContent = `[${docSnap.id}] ${docSnap.data().text || ""}`;
      suggestionsList.appendChild(li);
    });
  } catch (err) {
    const li = document.createElement("li");
    li.textContent = "(errore caricamento suggestions)";
    suggestionsList.appendChild(li);
  }
});
