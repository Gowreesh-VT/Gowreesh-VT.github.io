let currentUser = null;

window.addEventListener('firebaseReady', function(event) {
    const { auth } = event.detail;
    setupAuthenticationListeners(auth);
});

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
        
        if (user) {
            console.log('User signed in:', user.email);
        } else {
            console.log('User signed out');
        }
    });
    
    setupAuthModal();
}

function updateAuthUI(user) {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (user) {
        if (loginBtn) {
            loginBtn.style.display = 'none';
            loginBtn.textContent = `Welcome, ${user.displayName || user.email.split('@')[0]}`;
        }
        if (logoutBtn) {
            logoutBtn.style.display = 'inline-block';
        }
    } else {
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
    console.log('Setting up auth modal...');
    
    const authModal = document.getElementById('login-popup');
    const loginBtn = document.getElementById('login-btn');
    const loginPopupBtns = document.querySelectorAll('.Login-popup-btn');
    const closeBtn = document.querySelector('.icon-close');
    const overlay = document.querySelector('.popup-overlay');
    
    console.log('Found elements:', {
        authModal: !!authModal,
        loginBtn: !!loginBtn,
        loginPopupBtns: loginPopupBtns.length,
        closeBtn: !!closeBtn,
        overlay: !!overlay
    });
    
    function openAuthModal(e) {
        e.preventDefault();
        console.log('Login button clicked, opening existing login popup');
        console.log('Auth modal element:', authModal);
        console.log('Overlay element:', overlay);
        
        if (!currentUser) {
            if (authModal && overlay) {
                authModal.classList.add('active-popup');
                overlay.classList.add('active');
                document.body.classList.add('modal-open');
                console.log('Login popup opened successfully');
            } else {
                console.error('Login popup elements not found!');
            }
        } else {
            console.log('User already logged in:', currentUser.email);
        }
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', openAuthModal);
        console.log('Added click listener to navigation login button');
    }
    
    loginPopupBtns.forEach((btn, index) => {
        btn.addEventListener('click', openAuthModal);
        console.log(`Added click listener to Login-popup-btn ${index + 1}`);
    });
    
    console.log(`Found ${loginPopupBtns.length} Login-popup-btn elements`);
    
    function closeModal() {
        if (authModal && overlay) {
            authModal.classList.remove('active-popup');
            overlay.classList.remove('active');
            document.body.classList.remove('modal-open');
            console.log('Login popup closed');
        }
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
        console.log('Added click listener to close button');
    }
    if (overlay) {
        overlay.addEventListener('click', closeModal);
        console.log('Added click listener to overlay');
    }
    
    setupExistingLoginForm();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', signOut);
        console.log('Added click listener to logout button');
    }
}

function setupExistingLoginForm() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const registerLink = document.querySelector('.register-link1');
    
    const googleAuthBtn = document.getElementById('google-auth-btn');
    if (googleAuthBtn) {
        googleAuthBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('Google sign-in button clicked');
            
            try {
                const provider = new firebase.auth.GoogleAuthProvider();
                
                provider.addScope('profile');
                provider.addScope('email');
                
                googleAuthBtn.disabled = true;
                googleAuthBtn.innerHTML = '<i class="fab fa-google"></i> Signing in...';
                
                const result = await window.firebaseAuth.signInWithPopup(provider);
                
                const user = result.user;
                console.log('Google sign-in successful:', user.email);
                
                const authModal = document.getElementById('login-popup');
                const overlay = document.querySelector('.popup-overlay');
                if (authModal && overlay) {
                    authModal.classList.remove('active-popup');
                    overlay.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
                
                showMessage(`Welcome, ${user.displayName || user.email}!`, 'success');
                
            } catch (error) {
                console.error('Google sign-in error:', error);
                
                if (error.code === 'auth/popup-closed-by-user') {
                    showMessage('Sign-in cancelled', 'info');
                } else if (error.code === 'auth/popup-blocked') {
                    showMessage('Please allow popups for this site', 'error');
                } else {
                    showMessage(getErrorMessage(error), 'error');
                }
            } finally {
                googleAuthBtn.disabled = false;
                googleAuthBtn.innerHTML = '<i class="fab fa-google"></i> Continue with Google';
            }
        });
        console.log('Google sign-in button configured');
    }
    
    if (loginBtn && emailInput && passwordInput) {
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (!email || !password) {
                showMessage('Please enter both email and password', 'error');
                return;
            }
            
            const btnText = loginBtn.querySelector('.btn-text');
            const btnLoader = loginBtn.querySelector('.btn-loader');
            
            if (btnText) btnText.textContent = 'Signing In...';
            if (btnLoader) btnLoader.style.display = 'inline-block';
            loginBtn.disabled = true;
            
            try {
                await window.firebaseAuth.signInWithEmailAndPassword(email, password);
                
                const authModal = document.getElementById('login-popup');
                const overlay = document.querySelector('.popup-overlay');
                authModal.classList.remove('active-popup');
                overlay.classList.remove('active');
                document.body.classList.remove('modal-open');
                
                showMessage('Welcome back!', 'success');
                
                emailInput.value = '';
                passwordInput.value = '';
                
            } catch (error) {
                console.error('Sign in error:', error);
                showMessage(getErrorMessage(error), 'error');
            } finally {
                if (btnText) btnText.textContent = 'Sign In';
                if (btnLoader) btnLoader.style.display = 'none';
                loginBtn.disabled = false;
            }
        });
    }
    
    if (registerLink) {
        registerLink.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const email = emailInput?.value.trim();
            const password = passwordInput?.value.trim();
            
            if (!email || !password) {
                showMessage('Please enter email and password to create account', 'error');
                return;
            }
            
            try {
                await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
                
                const authModal = document.getElementById('login-popup');
                const overlay = document.querySelector('.popup-overlay');
                authModal.classList.remove('active-popup');
                overlay.classList.remove('active');
                document.body.classList.remove('modal-open');
                
                showMessage('Account created successfully!', 'success');
                
                emailInput.value = '';
                passwordInput.value = '';
                
            } catch (error) {
                console.error('Sign up error:', error);
                showMessage(getErrorMessage(error), 'error');
            }
        });
    }
    
    const forgotPassBtn = document.getElementById('forgot-pass');
    if (forgotPassBtn) {
        forgotPassBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const email = emailInput?.value.trim();
            if (!email) {
                showMessage('Please enter your email address first', 'error');
                return;
            }
            
            try {
                await window.firebaseAuth.sendPasswordResetEmail(email);
                showMessage('Password reset email sent! Check your inbox.', 'success');
            } catch (error) {
                console.error('Password reset error:', error);
                showMessage(getErrorMessage(error), 'error');
            }
        });
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