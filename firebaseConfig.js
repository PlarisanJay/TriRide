import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Add this

const firebaseConfig = {
  apiKey: "AIzaSyBFuz6uS0uatzrZAJXbj525X4kKJXFPooY",
  authDomain: "triride-9a42b.firebaseapp.com",
  projectId: "triride-9a42b",
  storageBucket: "triride-9a42b.firebasestorage.app",
  messagingSenderId: "250977367091",
  appId: "1:250977367091:web:ae60d63ccb5f31e7c59f46",
  measurementId: "G-G4PBR2SNEN"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Export auth