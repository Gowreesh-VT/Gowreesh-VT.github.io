// Get references to the DOM elements
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpButton = document.getElementById('signUpButton');
const codeModal = document.getElementById('codeModal');
const verifyCodeButton = document.getElementById('verifyCodeButton');
const closeCodeModalButton = document.getElementById('closeCodeModal');
const registeredCode = 'SLL2023';

// Event listeners for button clicks
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signUpButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    signUp(); // Call the signUp function
});

// Toggle password visibility
function togglePasswordVisibility(passwordInputId) {
    const passwordInput = document.getElementById(passwordInputId);
    const eyeIcon = passwordInput.nextElementSibling; // Assuming the eye icon is the next sibling

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = '&#128065;'; // Closed eye icon

        // Hide the password after 5 seconds
        setTimeout(() => {
            passwordInput.type = 'password';
            eyeIcon.innerHTML = '&#128064;'; // Open eye icon
        }, 5000);
    } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = '&#128064;'; // Open eye icon
    }
}

// Function to handle login
function login() {
    console.log('Login button clicked');
    const username = document.getElementById('username').value;
    const password = document.getElementById('signInPassword').value;

    // Check if the password meets the criteria
    if (password.length >= 8 && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        showCodeModal(); // Show the code modal
    } else {
        alert('Password must be at least 8 characters long and include a number and a symbol.');
    }
}

// Function to handle sign-up
function signUp() {
    console.log('Sign-Up button clicked');
    const username = document.getElementById('newUsername').value; // Sign-up username input ID
    const password = document.getElementById('signUpPassword').value; // Sign-up password input ID

    // Check if the password meets the criteria
    if (password.length >= 8 && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        showCodeModal(); // Show the code modal
    } else {
        alert('Password must be at least 8 characters long and include a number and a symbol.');
    }
}

// Function to show the code modal
function showCodeModal() {
    codeModal.style.display = 'flex';
    console.log('showCodeModal function called');
}

// Function to verify the entered code
function verifyCode() {
    const enteredCode = document.getElementById('verificationCode').value;

    if (enteredCode === registeredCode) {
        // Delay the redirect after 1 second
        setTimeout(() => {
            window.location.href = '../'; 
        }, 1000);
    } else {
        alert('Incorrect code. Please try again.');
    }
}

// Function to close the code modal
function closeCodeModal() {
    codeModal.style.display = 'none';
}

// Attach event listeners
document.getElementById('signUpButton').addEventListener('click', signUp); // Sign-Up button
document.getElementById('loginButton').addEventListener('click', login); // Login button
document.getElementById('closeCodeModal').addEventListener('click', closeCodeModal); // Close modal button
document.getElementById('verifyCodeButton').addEventListener('click', verifyCode); // Verify code button
