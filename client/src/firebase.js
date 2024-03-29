// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "allianz-estate-d74c0.firebaseapp.com",
  projectId: "allianz-estate-d74c0",
  storageBucket: "allianz-estate-d74c0.appspot.com",
  messagingSenderId: "981767102436",
  appId: "1:981767102436:web:7450c6635b0c1ab59f71f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);