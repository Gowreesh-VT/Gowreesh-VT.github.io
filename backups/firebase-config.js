const firebaseConfig = {
    apiKey: "AIzaSyDNOwidcMGsujGYifjKlIMo3VQvd0kBMKI",
    authDomain: "gowreesh-portfolio.firebaseapp.com",
    projectId: "gowreesh-portfolio",
    storageBucket: "gowreesh-portfolio.firebasestorage.app",
    messagingSenderId: "701923189745",
    appId: "1:701923189745:web:311ac70a8b3f1a78449a50",
    measurementId: "G-5YQRSDG91L" 
};

let firebaseApp;
let firebaseAuth;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeFirebase, 100);
});

function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            firebaseApp = firebase.initializeApp(firebaseConfig);
            firebaseAuth = firebase.auth();
            
            window.firebaseApp = firebaseApp;
            window.firebaseAuth = firebaseAuth;
            
            window.dispatchEvent(new CustomEvent('firebaseReady', {
                detail: { app: firebaseApp, auth: firebaseAuth }
            }));
            
            return true;
        } else {
            console.error('Firebase scripts not loaded, retrying...');
            setTimeout(initializeFirebase, 100);
            return false;
        }
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        return false;
    }
}

window.firebaseConfig = firebaseConfig;
window.initializeFirebase = initializeFirebase;