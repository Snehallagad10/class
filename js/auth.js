// js/auth.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Firebase configuration
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
const auth = getAuth(app);

// Email/password login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error("Login error:", error.message);
            alert('Login failed: ' + error.message);
        }
    });
}

// Google login
const googleBtn = document.getElementById('googleLoginBtn');
const provider = new GoogleAuthProvider();

if (googleBtn) {
    googleBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then(() => {
                window.location.href = 'dashboard.html';
            })
            .catch(error => {
                console.error("Google login failed:", error.message);
                alert("Google login failed: " + error.message);
            });
    });
}

// Optional: redirect if already logged in
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.endsWith("index.html")) {
        window.location.href = "dashboard.html";
    }
});
