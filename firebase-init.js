// firebase-init.js
// Exports Firestore helpers used by the site (ES modules).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBw5hWPVlGxIDuliN0Yp3lNqw29GxwdL0A",
  authDomain: "orari-sito.firebaseapp.com",
  projectId: "orari-sito",
  storageBucket: "orari-sito.firebasestorage.app",
  messagingSenderId: "1092566011740",
  appId: "1:1092566011740:web:7cb09f5bec0273d6b6bb99"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, updateDoc, increment, collection, addDoc, getDocs };
