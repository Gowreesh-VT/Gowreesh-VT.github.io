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

function closeAuthPopup() {
  document.querySelector(".wrapper")?.classList.remove("active-popup");
  document.querySelector(".popup-overlay")?.classList.remove("active");
  document.body.classList.remove("modal-open");
}

// Login Inputs
const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');
const loginEmailError = document.getElementById('email-error');
const loginPasswordError = document.getElementById('password-error');

// Email Validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function showError(input, errorEl) {
  errorEl.style.display = 'flex';
  input.classList.add('input-error');
}

function clearError(input, errorEl) {
  errorEl.style.display = 'none';
  input.classList.remove('input-error');
}

// Login Handler
loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const btnText = loginBtn.querySelector('.btn-text');
  const loader = loginBtn.querySelector('.btn-loader');

  let valid = true;
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;

  if (!isValidEmail(email)) {
    showError(loginEmail, loginEmailError);
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

  // Show loader
  btnText.textContent = "Signing in...";
  loader.style.display = "inline-block";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  // Hide loader
  btnText.textContent = "Sign In";
  loader.style.display = "none";

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    alert("Login successful!");
    closeAuthPopup(); // Hide modal if used
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

  if (!isValidEmail(signupEmail.value.trim().toLowerCase())) {
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

  return valid;
});

const signupPassword = document.getElementById('signup-password');
const signupConfirm = document.getElementById('signup-confirm-password');
const signupPassError = document.getElementById('signup-password-error');
const signupConfirmError = document.getElementById('signup-confirm-password-error');
const signupText = signupBtn.querySelector('.btn-text');
const signupLoader = signupBtn.querySelector('.btn-loader');

signupBtn.addEventListener('click', async () => {
  let valid = true;
  const pass = signupPassword.value.trim();
  const confirm = signupConfirm.value.trim();
  const email = signupEmail.value.trim().toLowerCase();
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

  signupText.textContent = "Signing up...";
  signupLoader.style.display = "inline-block";

  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      data: { name },
      emailRedirectTo: "https://gowreesh.works/thanks"
    }
  });

  signupText.textContent = "Sign Up";
  signupLoader.style.display = "none";

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful! Please check your email.");
    closeAuthPopup();
  }
});

// Google Auth Button
const googleAuthBtn = document.getElementById('google-auth-btn');

googleAuthBtn?.addEventListener('click', async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://gowreesh.works/'
    }
  });

  if (error) {
    alert("Google Auth failed: " + error.message);
  }
});

// Microsoft Auth Button
const microsoftBtn = document.getElementById('microsoft-auth-btn');
microsoftBtn?.addEventListener('click', async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      redirectTo: 'https://gowreesh.works/thanks'
    }
  });

  if (error) {
    alert("Microsoft login failed: " + error.message);
  }
});


const sendCodeBtn = document.getElementById("send-code-btn");
const otpEmailInput = document.getElementById("email"); // Reuses the same login email input
const sendCodeText = sendCodeBtn.querySelector('.btn-text');
const sendCodeLoader = sendCodeBtn.querySelector('.btn-loader');

sendCodeBtn.addEventListener("click", async () => {
  const email = otpEmailInput.value.trim().toLowerCase();

  if (!isValidEmail(email)) {
    showError(otpEmailInput, loginEmailError, "Please enter a valid email.");
    return;
  }

  // Show loader
  sendCodeText.textContent = "Sending...";
  sendCodeLoader.style.display = "inline-block";
  sendCodeBtn.disabled = true;

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: "https://gowreesh.works/verify" 
    }
  });

  // Hide loader
  sendCodeText.textContent = "Send sign-in code";
  sendCodeLoader.style.display = "none";
  sendCodeBtn.disabled = false;

  if (error) {
    alert("Failed to send code: " + error.message);
  } else {
    alert("Sign-in link sent to your email. Please check your inbox.");
  }
});


// Toggle between using code and password for login
const useCodeBtn = document.getElementById('use-code-btn');
const usePasswordBtn = document.getElementById('use-password-btn');
// const usePassInstBtn = document.getElementById('use-password-instead-btn');
// const codeInputBtn = document.getElementById('send-code-btn');

const passwordcont = document.getElementById('password-container');
// const inputCont = document.getElementById('input-container');
const codeContainer = document.getElementById('code-container');
// const rememberCont = document.getElementById('remember-container');

const btnhide = document.getElementById('ent-btns-hide');
const btnappear = document.getElementById('form-show');
// const hideLast = document.getElementById('hide-last');

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

// codeInputBtn.addEventListener('click', () => {
//     inputCont.style.display = 'none';
//     passwordcont.style.display = 'none';
//     codeContainer.style.display = 'flex';
//     btnhide.style.display = 'none';
//     btnappear.style.display = 'none';
//     rememberCont.style.display = 'none';
//     hideLast.style.display = 'none';
// });

// usePassInstBtn.addEventListener('click', () => {
//     btnappear.style.display = 'none';
//     inputCont.style.display = 'block';
//     passwordcont.style.display = 'block';
//     btnhide.style.display = 'block';
//     codeContainer.style.display = 'none';
//     rememberCont.style.display = 'flex';
//     hideLast.style.display = 'block';
// });

// OTP input functionality
// const OTPinputs = document.querySelectorAll('.otp-inputarea');
// const otpSubmitBtn = document.querySelector(".otp-btn");

// window.onload = () => OTPinputs[0]?.focus();

// OTPinputs.forEach((input, index) => {
//   input.addEventListener('input', () => {
//     input.value = input.value.slice(0, 1);
//     if (input.value && index < OTPinputs.length - 1) {
//       OTPinputs[index + 1].removeAttribute('disabled');
//       OTPinputs[index + 1].focus();
//     }

//     const allFilled = [...OTPinputs].every(inp => inp.value);
//     otpSubmitBtn.disabled = !allFilled;
//     otpSubmitBtn.classList.toggle("active", allFilled);
//   });

//   input.addEventListener('keyup', (e) => {
//     if (e.key === "Backspace" && index > 0) {
//       input.value = '';
//       OTPinputs[index].setAttribute("disabled", true);
//       OTPinputs[index - 1].focus();
//     }
//   });
// });


// Login and Register changing functionality
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

// Password strength indicator for signup
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


