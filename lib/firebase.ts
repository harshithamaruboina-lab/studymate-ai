import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdrtzAsTIM66hvKehYQp6MZoF2hSBddxE",
  authDomain: "studymate-ai-32ced.firebaseapp.com",
  projectId: "studymate-ai-32ced",
  storageBucket: "studymate-ai-32ced.firebasestorage.app",
  messagingSenderId: "481764907449",
  appId: "1:481764907449:web:a27a052b9672115868be68",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);