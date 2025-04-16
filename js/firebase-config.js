// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHv19dThRHf8ZL0XVnTeGftUOmP1RkgSQ",
    authDomain: "class-d4f9b.firebaseapp.com",
    databaseURL: "https://class-d4f9b-default-rtdb.firebaseio.com",
    projectId: "class-d4f9b",
    storageBucket: "class-d4f9b.firebasestorage.app",
    messagingSenderId: "119551430571",
    appId: "1:119551430571:web:426e3df057c31c37f78cee",
    measurementId: "G-9173ZZ5MXK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
