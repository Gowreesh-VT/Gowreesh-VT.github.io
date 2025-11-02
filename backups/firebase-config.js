// firebase-config.js
// Firebase configuration using CDN version (Auth only - EmailJS handles contact form)

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

// Global Firebase variables (Auth only)
let firebaseApp;
let firebaseAuth;

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
            
            // Initialize Auth only (EmailJS handles contact form)
            firebaseAuth = firebase.auth();
            
            // Make available globally
            window.firebaseApp = firebaseApp;
            window.firebaseAuth = firebaseAuth;
            
            // Dispatch event to notify other scripts
            window.dispatchEvent(new CustomEvent('firebaseReady', {
                detail: { app: firebaseApp, auth: firebaseAuth }
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