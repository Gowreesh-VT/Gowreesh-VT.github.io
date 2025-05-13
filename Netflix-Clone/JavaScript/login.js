// Netflix Logo redirect
document.getElementById("netflix-full-logo").addEventListener("click", function() {
    window.location.href = "../landing_page.html";
});

document.getElementById('learn-more').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent link from navigating
    document.getElementById('recaptcha-info').style.display = 'block';
    document.getElementById('learn-more').style.display = 'none';
});

// Eye toggle functionality
const passwordInput = document.getElementById("password");
const togglePasswordIcon = document.getElementById("togglePasswordIcon");

function togglePassword() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordIcon.classList.remove("fa-eye");
        togglePasswordIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePasswordIcon.classList.remove("fa-eye-slash");
        togglePasswordIcon.classList.add("fa-eye");
    }
}

// Show/hide the eye only when typing or focused
passwordInput.addEventListener("focus", () => {
    document.querySelector(".toggle-password").style.display = "block";
});

passwordInput.addEventListener("input", () => {
    if (passwordInput.value.length > 0) {
        document.querySelector(".toggle-password").style.display = "block";
    } else {
        document.querySelector(".toggle-password").style.display = "none";
    }
});

passwordInput.addEventListener("blur", () => {
    if (passwordInput.value.length === 0) {
        document.querySelector(".toggle-password").style.display = "none";
    }
});

// Validation functionality
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

function validateEmail() {
    const emailValue = emailInput.value.trim();

    if (emailValue === "" || !emailValue.includes("@") || !emailValue.includes(".")) {
        emailInput.classList.add("input-error");
        emailError.style.display = "block";
    } else {
        emailInput.classList.remove("input-error");
        emailError.style.display = "none";
    }
}

function validatePassword() {
    if (passwordInput.value.trim() === ""|| passwordInput.value.length < 4) {
        passwordInput.classList.add("input-error");
        passwordError.style.display = "block";
    } else {
        passwordInput.classList.remove("input-error");
        passwordError.style.display = "none";
    }
}

const signInBtn = document.querySelector(".sgn-in-btn");

signInBtn.addEventListener("click", function () {
    validateEmail();
    validatePassword();
});

emailInput.addEventListener("blur", validateEmail);
emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("blur", validatePassword);
passwordInput.addEventListener("input", validatePassword);



const useCodeBtn = document.getElementById('use-code-btn');
const usePasswordBtn = document.getElementById('use-password-btn');
const passwordcont = document.getElementById('password-container');
const btnhide = document.getElementById('ent-btns-hide');
const btnappear = document.getElementById('form-show');

useCodeBtn.addEventListener('click', () => {
    btnappear.style.display = 'block';
    passwordcont.style.display = 'none';
    btnhide.style.display = 'none';

});

usePasswordBtn.addEventListener('click', () => {
    btnappear.style.display = 'none';
    passwordcont.style.display = 'block';
    btnhide.style.display = 'block';
});
