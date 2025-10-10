// firebase-config.js
// Firebase configuration using CDN version

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNOwidcMGsujGYifjKlIMo3VQvd0kBMKI",
    authDomain: "gowreesh-portfolio.firebaseapp.com",
    projectId: "gowreesh-portfolio",
    storageBucket: "gowreesh-portfolio.firebasestorage.app",
    messagingSenderId: "701923189745",
    appId: "1:701923189745:web:311ac70a8b3f1a78449a50",
    measurementId: "G-5YQRSDG91L" 
};

// Global Firebase variables
let firebaseApp;
let firebaseAuth;
let firebaseDb;
let firebaseFunctions;

// Initialize Firebase when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeFirebase, 100); // Small delay to ensure Firebase scripts are loaded
});

// Initialize Firebase function
function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            // Initialize Firebase app
            firebaseApp = firebase.initializeApp(firebaseConfig);
            
            // Initialize services
            firebaseAuth = firebase.auth();
            firebaseDb = firebase.firestore();
            firebaseFunctions = firebase.functions();
            
            // Make available globally
            window.firebaseApp = firebaseApp;
            window.firebaseAuth = firebaseAuth;
            window.firebaseDb = firebaseDb;
            window.firebaseFunctions = firebaseFunctions;
            
            // Dispatch event to notify other scripts
            window.dispatchEvent(new CustomEvent('firebaseReady', {
                detail: { app: firebaseApp, auth: firebaseAuth, db: firebaseDb, functions: firebaseFunctions }
            }));
            
            return true;
        } else {
            console.error('Firebase scripts not loaded, retrying...');
            setTimeout(initializeFirebase, 100); // Retry after 100ms
            return false;
        }
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        return false;
    }
}

// Export configuration for other modules
window.firebaseConfig = firebaseConfig;
window.initializeFirebase = initializeFirebase;