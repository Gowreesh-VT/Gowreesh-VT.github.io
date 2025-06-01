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

// Login Inputs
const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');
const loginBtn = document.querySelector('.sgn-in-btn');
const loginEmailError = document.getElementById('email-error');
const loginPasswordError = document.getElementById('password-error');

// Email Validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Show/Hide error
function showError(input, errorEl, message) {
  errorEl.textContent = message;
  errorEl.style.display = 'block';
  input.classList.add('input-error');
}

function clearError(input, errorEl) {
  errorEl.style.display = 'none';
  input.classList.remove('input-error');
}

// Login Handler
loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  let valid = true;
  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!isValidEmail(email)) {
    showError(loginEmail, loginEmailError, "Please enter a valid email.");
    valid = false;
  } else {
    clearError(loginEmail, loginEmailError);
  }

  if (password.length < 4) {
    showError(loginPassword, loginPasswordError, "Password must be at least 4 characters.");
    valid = false;
  } else {
    clearError(loginPassword, loginPasswordError);
  }

  if (!valid) return;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    alert("Login successful!");
    // redirect or hide modal if needed
  }
});

// Signup Step 1 - Name & Email
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupNameError = document.getElementById('signup-name-error');
const signupEmailError = document.getElementById('signup-email-error');

const signupNextBtn = document.getElementById('signup-next-btn');
const signupBtn = document.getElementById('signup-btn');

const signupNameCont = document.getElementById('signup-name-container');
const signupEmailCont = document.getElementById('signup-input-container');
const signupPassCont = document.getElementById('signup-password-container');
const signupConfirmCont = document.getElementById('confirm-password-container');

signupNextBtn.addEventListener('click', () => {
  let valid = true;

  if (signupName.value.trim().length < 5) {
    showError(signupName, signupNameError, "Name must be at least 5 characters.");
    valid = false;
  } else {
    clearError(signupName, signupNameError);
  }

  if (!isValidEmail(signupEmail.value.trim())) {
    showError(signupEmail, signupEmailError, "Invalid email address.");
    valid = false;
  } else {
    clearError(signupEmail, signupEmailError);
  }

  if (valid) {
    signupNameCont.style.display = 'none';
    signupEmailCont.style.display = 'none';
    signupPassCont.style.display = 'block';
    signupConfirmCont.style.display = 'block';
    signupNextBtn.style.display = 'none';
    signupBtn.style.display = 'block';
  }
});

const signupPassword = document.getElementById('signup-password');
const signupConfirm = document.getElementById('signup-confirm-password');
const signupPassError = document.getElementById('signup-password-error');
const signupConfirmError = document.getElementById('signup-confirm-password-error');

signupBtn.addEventListener('click', async () => {
  let valid = true;
  const pass = signupPassword.value.trim();
  const confirm = signupConfirm.value.trim();
  const email = signupEmail.value.trim();
  const name = signupName.value.trim();

  if (pass.length < 6) {
    showError(signupPassword, signupPassError, "Password must be at least 6 characters.");
    valid = false;
  } else {
    clearError(signupPassword, signupPassError);
  }

  if (pass !== confirm) {
    showError(signupConfirm, signupConfirmError, "Passwords do not match.");
    valid = false;
  } else {
    clearError(signupConfirm, signupConfirmError);
  }

  if (!valid) return;

  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      data: { name },
      emailRedirectTo: "https://gowreesh.works/thanks" // ✅ customize if needed
    }
  });

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful! Please check your email to verify your account.");
    document.querySelector(".login-link")?.click(); // ✅ optional redirect to login
  }
});

const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("password-strength-text");

signupPassword.addEventListener("input", () => {
  const val = signupPassword.value;
  let score = 0;

  if (val.length >= 6) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  if (score === 0) {
    strengthBar.style.width = "0%";
    strengthBar.className = "strength-bar";
    strengthText.textContent = "Password strength";
    strengthText.style.color = "#ccc";
  } else if (score <= 2) {
    strengthBar.style.width = "33%";
    strengthBar.className = "strength-bar strength-weak";
    strengthText.textContent = "Weak";
    strengthText.style.color = "#e74c3c";
  } else if (score === 3) {
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

const OTPinputs = document.querySelectorAll(".otp-inputarea");
const otpSubmitBtn = document.querySelector(".sgn-in-btn");

// Autofocus first input on page load
window.addEventListener("load", () => OTPinputs[0]?.focus());

OTPinputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.slice(0, 1); // allow only 1 digit

    if (input.value && index < OTPinputs.length - 1) {
      OTPinputs[index + 1].removeAttribute("disabled");
      OTPinputs[index + 1].focus();
    }

    const allFilled = [...OTPinputs].every(inp => inp.value);
    otpSubmitBtn.disabled = !allFilled;
    otpSubmitBtn.classList.toggle("active", allFilled);
  });

  input.addEventListener("keyup", (e) => {
    if (e.key === "Backspace" && index > 0) {
      input.value = "";
      OTPinputs[index].setAttribute("disabled", true);
      OTPinputs[index - 1].focus();
    }
  });
});

// Toggle wrapper classes for login/signup
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
