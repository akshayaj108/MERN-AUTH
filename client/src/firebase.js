// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// "AIzaSyDvBhcU-paw1ACI5j2tmdYJ07O4OMpBmwc"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-auth-4eba9.firebaseapp.com",
  projectId: "mern-auth-4eba9",
  storageBucket: "mern-auth-4eba9.appspot.com",
  messagingSenderId: "833787524071",
  appId: "1:833787524071:web:154a947785094952b5c342",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
