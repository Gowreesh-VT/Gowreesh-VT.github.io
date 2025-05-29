document.getElementById('learn-more').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('recaptcha-info').style.display = 'block';
    document.getElementById('learn-more').style.display = 'none';
});

document.getElementById('signup-learn-more').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('signup-recaptcha-info').style.display = 'block';
    document.getElementById('signup-learn-more').style.display = 'none';
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

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (!isValidEmail(emailValue)) {
    emailInput.classList.add("input-error");
  
    if (emailValue.includes("@")) {
      emailError.style.display = "none";
    } else {
      emailError.style.display = "block";
    }
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

// Toggle between using code and password for login
const useCodeBtn = document.getElementById('use-code-btn');
const usePasswordBtn = document.getElementById('use-password-btn');
const usePassInstBtn = document.getElementById('use-password-instead-btn');
const codeInputBtn = document.getElementById('send-code-btn');
const nextBtn = document.getElementById('signup-next-btn');
const signupBtn = document.getElementById('signup-btn');

const passwordcont = document.getElementById('password-container');
const inputCont = document.getElementById('input-container');
const codeContainer = document.getElementById('code-container');
const rememberCont = document.getElementById('remember-container');
const signupPassword = document.getElementById('signup-password-container');
const ConfirmPassword = document.getElementById('confirm-password-container');

const btnhide = document.getElementById('ent-btns-hide');
const btnappear = document.getElementById('form-show');
const hideLast = document.getElementById('hide-last');
const signupName = document.getElementById('signup-name-container');
const signupEmail = document.getElementById('signup-email-container');

useCodeBtn.addEventListener('click', () => {
    btnappear.style.display = 'block';
    passwordcont.style.display = 'none';
    btnhide.style.display = 'none';
    codeContainer.style.display = 'none';
});

usePasswordBtn.addEventListener('click', () => {
    btnappear.style.display = 'none';
    passwordcont.style.display = 'block';
    btnhide.style.display = 'block';
    codeContainer.style.display = 'none';
});

codeInputBtn.addEventListener('click', () => {
    inputCont.style.display = 'none';
    passwordcont.style.display = 'none';
    codeContainer.style.display = 'flex';
    btnhide.style.display = 'none';
    btnappear.style.display = 'none';
    rememberCont.style.display = 'none';
    hideLast.style.display = 'none';
});

usePassInstBtn.addEventListener('click', () => {
    btnappear.style.display = 'none';
    inputCont.style.display = 'block';
    passwordcont.style.display = 'block';
    btnhide.style.display = 'block';
    codeContainer.style.display = 'none';
    rememberCont.style.display = 'flex';
    hideLast.style.display = 'block';
});

nextBtn.addEventListener('click', () => {
    signupName.style.display = 'none';
    signupEmail.style.display = 'none';
    signupPassword.style.display = 'block';
    ConfirmPassword.style.display = 'block';
    nextBtn.style.display = 'none';
    signupBtn.style.display = 'block';
});

// OTP input functionality
const OTPinputs = document.querySelectorAll('.otp-inputarea');
const button = document.querySelector('.sgn-in-btn');

window.onload = () => OTPinputs[0].focus();

OTPinputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length > 1) {
            input.value = input.value.slice(0, 1);  // allow only one digit
        }

        if (input.value && index < OTPinputs.length - 1) {
            OTPinputs[index + 1].removeAttribute('disabled');
            OTPinputs[index + 1].focus();
        }

        // Activate button only when all OTP fields are filled
        const allFilled = [...OTPinputs].every(inp => inp.value);
        if (allFilled) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    input.addEventListener('keyup', (e) => {
        if (e.key === "Backspace" && index > 0) {
            input.value = '';
            OTPinputs[index].setAttribute("disabled", true);
            OTPinputs[index - 1].focus();
        }
    });
});


// Login and Register functionality
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link1");
const btnPopup = document.querySelectorAll(".btnLogin-popup");
const closeIcon = document.querySelector(".icon-close");
const overlay = document.querySelector(".popup-overlay");
const body = document.body;

registerLink.addEventListener("click", () => {
  wrapper.classList.add("active");
  wrapper.classList.remove("active-slide");
});

loginLink.addEventListener("click", () => {
  wrapper.classList.remove("active");
  wrapper.classList.add("active-slide");
});

btnPopup.forEach(btn => {
  btn.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
    overlay.classList.add("active");
    body.classList.add("modal-open");
  });
});

closeIcon.addEventListener("click", () => {
  wrapper.classList.remove("active-popup");
  overlay.classList.remove("active");
  body.classList.remove("modal-open");
});

const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("password-strength-text");
const signupPasswordInput = document.getElementById("signup-password");

signupPasswordInput.addEventListener("input", () => {
  const value = signupPasswordInput.value;
  let strength = 0;

  // Evaluate strength
  if (value.length >= 6) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  // Update bar and text
  if (strength === 0) {
    strengthBar.style.width = "0%";
    strengthBar.className = "strength-bar";
    strengthText.textContent = "Password strength";
  } else if (strength <= 2) {
    strengthBar.style.width = "33%";
    strengthBar.className = "strength-bar strength-weak";
    strengthText.textContent = "Weak";
    strengthText.style.color = "#e74c3c";
  } else if (strength === 3) {
    strengthBar.style.width = "66%";
    strengthBar.className = "strength-bar strength-medium";
    strengthText.textContent = "Medium";
    strengthText.style.color = "#f1c40f";
  } else {
    strengthBar.style.width = "100%";
    strengthBar.className = "strength-bar strength-strong";
    strengthText.textContent = "Strong";
    strengthText.style.color = "#2ecc71";
  }
});
