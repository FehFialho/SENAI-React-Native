// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD5C-Es9iAr_arVdpj6s8EZIkzYzqqW-o",
  authDomain: "senai-reactnative.firebaseapp.com",
  projectId: "senai-reactnative",
  storageBucket: "senai-reactnative.firebasestorage.app",
  messagingSenderId: "324761492682",
  appId: "1:324761492682:web:a50bd72e6394e769ef2833",
  measurementId: "G-V9XV959SQ2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);