let currentUser = null;

// Wait for Firebase to be ready
window.addEventListener('firebaseReady', function(event) {
    const { auth } = event.detail;
    setupAuthenticationListeners(auth);
});

// Fallback if firebaseReady event doesn't fire
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.firebaseAuth) {
            setupAuthenticationListeners(window.firebaseAuth);
        }
    }, 1000);
});

function setupAuthenticationListeners(auth) {
    auth.onAuthStateChanged((user) => {
        currentUser = user;
        updateAuthUI(user);
    });
    
    // Setup auth modal functionality
    setupAuthModal();
}

function updateAuthUI(user) {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (user) {
        // User is signed in
        if (loginBtn) {
            loginBtn.style.display = 'none';
            loginBtn.textContent = `Welcome, ${user.displayName || user.email.split('@')[0]}`;
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'inline-block';
        }
    } else {
        // User is signed out
        if (loginBtn) {
            loginBtn.style.display = 'inline-block';
            loginBtn.textContent = 'Login';
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    }
}

function setupAuthModal() {
    // Setup logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', signOut);
    }
}

async function signOut() {
    try {
        await window.firebaseAuth.signOut();
        showMessage('Signed out successfully', 'success');
    } catch (error) {
        console.error('Sign out error:', error);
        showMessage('Error signing out', 'error');
    }
}

function showMessage(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `auth-toast ${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/email-already-in-use':
            return 'Email is already registered.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        default:
            return error.message || 'An error occurred. Please try again.';
    }
}