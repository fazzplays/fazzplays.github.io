// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNy3c6eBuvic5LLCaNmnTVv64UXYzqK3o",
  authDomain: "trialrun-b61b9.firebaseapp.com",
  projectId: "trialrun-b61b9",
  storageBucket: "trialrun-b61b9.appspot.com",
  messagingSenderId: "192363523725",
  appId: "1:192363523725:web:b9f79152fd35ecc06efcc4",
  measurementId: "G-2JZ14EPL38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize Firestore
const db = getFirestore(app);
export default db;