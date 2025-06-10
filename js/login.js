/*----------------------------------------------------*/
/*	01. Login and Register Page Change
/*	02. Close Popup
/*	03. ReCAPTCHA Info Toggle
/*	04. Password Toggle
/*	05. Email Validation and functions
/*	06. Login Functionality
/*	07. Switch between Code and Password Login
/*	08. Go Back Function for Login Page
/*	09. OTP input Functionality
/*	10. OTP Login Functionality
/*	11. Resend OTP Code Functionality
/*	12. OTP Validation and Submission
/*	13. Signup Functionality
/*	14. Signup Password and Confirm Password
/*	15. Go Back Link in Signup
/*	16. Authentication with Google and Microsoft
/*	17. Password Strength Indicator

------------------------------------------------------*/


/*----------------------------------------------------*/
/*	01. Login and Register Page Change
------------------------------------------------------*/

// Login and Register changing functionality
const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link1");
const btnPopup = document.querySelectorAll(".Login-popup-btn");
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

// Click outside the modal to close
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    wrapper.classList.remove("active-popup");
    overlay.classList.remove("active");
    body.classList.remove("modal-open");
  }
});

// Close modal on Escape key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    wrapper.classList.remove("active-popup");
    overlay.classList.remove("active");
    body.classList.remove("modal-open");
  }
});

/*----------------------------------------------------*/
/*	02. Close Popup
------------------------------------------------------*/

function closeAuthPopup() {
  document.querySelector(".wrapper")?.classList.remove("active-popup");
  document.querySelector(".popup-overlay")?.classList.remove("active");
  document.body.classList.remove("modal-open");
}

/*----------------------------------------------------*/
/*	03. ReCAPTCHA Info Toggle
------------------------------------------------------*/

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

document.getElementById('forgot-learn-more').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('forgot-recaptcha-info').style.display = 'block';
    document.getElementById('forgot-learn-more').style.display = 'none';
});

/*----------------------------------------------------*/
/*	04. Password Toggle
------------------------------------------------------*/
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

/*----------------------------------------------------*/
/*	05. Email Validation and functions
------------------------------------------------------*/

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


/*----------------------------------------------------*/
/*	06. Login Functionality
------------------------------------------------------*/

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
    showError(loginPassword, loginPasswordError);
    valid = false;
  } else {
    clearError(loginPassword, loginPasswordError);
  }

  if (!valid) return;

  btnText.textContent = "Signing in...";
  loader.style.display = "inline-block";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  btnText.textContent = "Sign In";
  loader.style.display = "none";

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    const { user } = data;
    let name = user.user_metadata?.full_name;

    if (!name) {
      const email = user.email || "";
      name = email.split('@')[0] || "User";
    }

    const loginHeading = document.getElementById("login-section-heading");
    if (loginHeading) {
      loginHeading.textContent = `Hi! ${name}`;
    }

    alert("Login successful!");
    closeAuthPopup();
  }
});


/*----------------------------------------------------*/
/*	07. Switch between Code and Password Login
------------------------------------------------------*/


// Toggle between using code and password for login
const useCodeBtn = document.getElementById('use-code-btn');
const usePasswordBtn = document.getElementById('use-password-btn');
const usePassInstBtn = document.getElementById('use-password-instead-btn');
const codeInputBtn = document.getElementById('send-code-btn');

const loginEmailForm = document.getElementById('login-email-form');
const SignupEmailForm = document.getElementById('signup-email-form');
const passwordcont = document.getElementById('password-container');
const inputCont = document.getElementById('input-container');
const otpEmailInputCont = document.getElementById('otp-email-input-container');
const codeContainer = document.getElementById('code-container');
const rememberCont = document.getElementById('remember-container');
const recaptchaCont = document.getElementById('recaptcha-container');
const forgotRecaptchaCont = document.getElementById('forgot-pass-recaptcha-container');
const forgotSuccessContainer = document.getElementById("forgot-password-success-container");

const btnhide = document.getElementById('ent-btns-hide');
const btnappear = document.getElementById('form-show');
const loginText = document.getElementById('Login-heading');

const forgotPasswordLink = document.getElementById("forgot-pass");
const forgotPasswordContainer = document.getElementById("forgot-password-container");
const resetPasswordContainer = document.getElementById("reset-password-container");


useCodeBtn.addEventListener('click', () => {
    loginText.style.display = 'block'; 
    otpEmailInputCont.style.display = 'block';
    inputCont.style.display = 'none';
    btnappear.style.display = 'block';
    passwordcont.style.display = 'none';
    btnhide.style.display = 'none';
    codeContainer.style.display = 'none';
    recaptchaCont.style.display = "block";
    forgotPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "none";
    forgotSuccessContainer.style.display = "none";
    resetPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "none";
    resetPasswordContainer.style.display = "none";

});

usePasswordBtn.addEventListener('click', () => {
    loginText.style.display = 'block';
    btnappear.style.display = 'none';
    inputCont.style.display = 'block';
    otpEmailInputCont.style.display = 'none';
    passwordcont.style.display = 'block';
    btnhide.style.display = 'block';
    codeContainer.style.display = 'none';
    recaptchaCont.style.display = "block";
    forgotPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "none";
    resetPasswordContainer.style.display = "none";
    forgotSuccessContainer.style.display = "none";
    resetPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "none";
    resetPasswordContainer.style.display = "none";

});

// codeInputBtn.addEventListener('click', () => {
//     loginText.style.display = 'block';
//     inputCont.style.display = 'none';
//     passwordcont.style.display = 'none';
//     otpEmailInputCont.style.display = 'none';
//     codeContainer.style.display = 'flex';
//     btnhide.style.display = 'none';
//     btnappear.style.display = 'none';
//     rememberCont.style.display = 'none';
//     recaptchaCont.style.display = 'none';
//     recaptchaCont.style.display = "block";
//     forgotPasswordContainer.style.display = "none";
//     forgotRecaptchaCont.style.display = "none";
//     resetPasswordContainer.style.display = "none";
//     forgotSuccessContainer.style.display = "none";
//     resetPasswordContainer.style.display = "none";
//     forgotRecaptchaCont.style.display = "none";
//     resetPasswordContainer.style.display = "none";
// });

usePassInstBtn.addEventListener('click', () => {
    loginText.style.display = 'block';
    btnappear.style.display = 'none';
    otpEmailInputCont.style.display = 'none';
    inputCont.style.display = 'block';
    passwordcont.style.display = 'block';
    btnhide.style.display = 'block';
    codeContainer.style.display = 'none';
    rememberCont.style.display = 'flex';
    recaptchaCont.style.display = 'block';
    recaptchaCont.style.display = "block";
    forgotPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "none";
    forgotSuccessContainer.style.display = "none";
    resetPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "none";
    resetPasswordContainer.style.display = "none";

});

forgotPasswordLink.addEventListener("click", () => {
    loginText.style.display = 'none';
    loginEmailForm.style.display = "none";
    btnhide.style.display = "none";
    rememberCont.style.display = "none";
    btnappear.style.display = "none";
    recaptchaCont.style.display = "none";
    forgotPasswordContainer.style.display = "block";
    forgotRecaptchaCont.style.display = "block";
    forgotSuccessContainer.style.display = "none";
    resetPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "block";
    resetPasswordContainer.style.display = "none";

});




/*----------------------------------------------------*/
/*	08. Go Back Function for Login Page
------------------------------------------------------*/

let previousLoginStep = null;

function saveCurrentLoginStep() {
  previousLoginStep = {
    inputCont: inputCont.style.display,
    otpEmailInputCont: otpEmailInputCont.style.display,
    passwordcont: passwordcont.style.display,
    btnhide: btnhide.style.display,
    rememberCont: rememberCont.style.display,
    formShow: btnappear.style.display,
    recaptchaCont: recaptchaCont.style.display,
    recaptchaCont: recaptchaCont?.style.display,
    loginText: loginText?.style.display,
    loginEmailForm: loginEmailForm?.style.display,
  };
}


document.getElementById("go-back-link").addEventListener("click", () => {
  // Hide all sections first
  inputCont.style.display = "none";
  otpEmailInputCont.style.display = "none";
  passwordcont.style.display = "none";
  btnhide.style.display = "none";
  rememberCont.style.display = "none";
  btnappear.style.display = "none";
  codeContainer.style.display = "none";
  forgotPasswordContainer.style.display = "none";
  forgotRecaptchaCont.style.display = "none";
  forgotSuccessContainer.style.display = "none";
  resetPasswordContainer.style.display = "none";

  // Restore last known login state or default
  inputCont.style.display = previousLoginStep?.inputCont ?? "block";
  otpEmailInputCont.style.display = previousLoginStep?.otpEmailInputCont ?? "none";
  passwordcont.style.display = previousLoginStep?.passwordcont ?? "block";
  btnhide.style.display = previousLoginStep?.btnhide ?? "block";
  rememberCont.style.display = previousLoginStep?.rememberCont ?? "flex";
  btnappear.style.display = previousLoginStep?.formShow ?? "none";
  recaptchaCont.style.display = previousLoginStep?.recaptchaCont ?? "block";

  loginText.style.display = "block";
  loginEmailForm.style.display = "block";

  // Clear OTP values only if OTP was used
  if (codeContainer.style.display === "flex") {
    OTPinputs.forEach((input, index) => {
      input.value = "";
      input.setAttribute("disabled", index !== 0);
    });
    OTPinputs[0].focus();
  }
});


/*----------------------------------------------------*/
/*	09. OTP input Functionality
------------------------------------------------------*/

const OTPinputs = document.querySelectorAll('.otp-inputarea');
const otpSubmitBtn = document.querySelector(".otp-btn");

window.onload = () => OTPinputs[0]?.focus();

OTPinputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    input.value = input.value.slice(0, 1);
    if (input.value && index < OTPinputs.length - 1) {
      OTPinputs[index + 1].removeAttribute('disabled');
      OTPinputs[index + 1].focus();
    }

    const allFilled = [...OTPinputs].every(inp => inp.value);
    otpSubmitBtn.disabled = !allFilled;
    otpSubmitBtn.classList.toggle("active", allFilled);
  });

  input.addEventListener('keyup', (e) => {
    if (e.key === "Backspace" && index > 0) {
      input.value = '';
      OTPinputs[index].setAttribute("disabled", true);
      OTPinputs[index - 1].focus();
    }
  });
});


/*----------------------------------------------------*/
/*	10. OTP Login Functionality
------------------------------------------------------*/

const sendCodeBtn = document.getElementById("send-code-btn");
const otpEmailInput = document.getElementById("otp-email");
const OtploginEmailError = document.getElementById('otp-email-error');
const sendCodeText = sendCodeBtn.querySelector('.btn-text');
const sendCodeLoader = sendCodeBtn.querySelector('.btn-loader');

document.getElementById('send-code-btn').addEventListener('click', async () => {
  let valid = true;
  const emailInput = document.getElementById('otp-email');
  const email = emailInput.value.trim().toLowerCase();

  if (!isValidEmail(email)) {
    showError(emailInput, OtploginEmailError);
    valid = false;
  } else {
    clearError(emailInput, OtploginEmailError);
  }

  const sendCodeText = document.querySelector('#send-code-btn .btn-text');
  const sendCodeLoader = document.querySelector('#send-code-btn .btn-loader');

  // Show loader
  sendCodeText.textContent = "Sending...";
  sendCodeLoader.style.display = "inline-block";
  document.getElementById('send-code-btn').disabled = true;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://gowreesh.works/verify"
    }
  });

  // Hide loader
  sendCodeText.textContent = "Send sign-in code";
  sendCodeLoader.style.display = "none";
  document.getElementById('send-code-btn').disabled = false;

  if (error) {
    alert("❌ Failed to send code: " + error.message);
  } else {
    saveCurrentLoginStep();

    loginText.style.display = 'none';
    inputCont.style.display = 'none';
    passwordcont.style.display = 'none';
    otpEmailInputCont.style.display = 'none';
    codeContainer.style.display = 'flex';
    btnhide.style.display = 'none';
    btnappear.style.display = 'none';
    rememberCont.style.display = 'none';
    recaptchaCont.style.display = 'none';
    recaptchaCont.style.display = "block";
    forgotPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "none";
    resetPasswordContainer.style.display = "none";
    forgotSuccessContainer.style.display = "none";
    resetPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "none";
    resetPasswordContainer.style.display = "none";

    alert("✅ OTP sent! Please check your email.");
  }
});


/*----------------------------------------------------*/
/*	11. Resend OTP Code Functionality
------------------------------------------------------*/

const resendCodeLink = document.getElementById("resend-code-link");
resendCodeLink.addEventListener("click", async () => {
  const email = otpEmailInput.value.trim().toLowerCase();

  if (!isValidEmail(email)) {
    showError(otpEmailInput, loginEmailError, "Please enter a valid email.");
    return;
  }

  resendCodeLink.textContent = "Resending...";
  resendCodeLink.style.pointerEvents = "none";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://gowreesh.works/verify"
    }
  });

  setTimeout(() => {
    resendCodeLink.textContent = "Resend Code";
    resendCodeLink.style.pointerEvents = "auto";
  }, 3000);

  if (error) {
    alert("❌ Failed to resend code: " + error.message);
  } else {
    alert("✅ New code sent to your email.");
  }
});


/*----------------------------------------------------*/
/*	12. OTP Validation and Submission
------------------------------------------------------*/

otpSubmitBtn.addEventListener("click", async () => {
  const email = otpEmailInput.value.trim().toLowerCase();
  const otp = [...OTPinputs].map(inp => inp.value).join('');

  if (!isValidEmail(email) || otp.length !== 6) {
    alert("Enter valid email and 6-digit code.");
    return;
  }

  const btnText = otpSubmitBtn.querySelector('.btn-text');
  const loader = otpSubmitBtn.querySelector('.btn-loader');

  // Show loader
  btnText.textContent = "Verifying...";
  loader.style.display = "inline-block";
  otpSubmitBtn.disabled = true;

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'email',
  });

  // Hide loader
  btnText.textContent = "Sign In";
  loader.style.display = "none";
  otpSubmitBtn.disabled = false;

  if (error) {
    document.getElementById("code-error").style.display = "flex";
  } else {
    alert("✅ Logged in successfully!");
    console.log("User:", data.user);
    closeAuthPopup();
  }
});

/*----------------------------------------------------*/
/*	13. Forgot Password Functionality
------------------------------------------------------*/

const forgotEmailInput = document.getElementById("forgot-password-email");
const forgotEmailError = document.getElementById("forgot-pass-email-error");
const forgotSubmitBtn = document.getElementById("forgot-password-submit-btn");

forgotSubmitBtn.addEventListener("click", async () => {
  const email = forgotEmailInput.value.trim().toLowerCase();

  if (!isValidEmail(email)) {
    showError(forgotEmailInput, forgotEmailError);
    return;
  } else {
    clearError(forgotEmailInput, forgotEmailError);
  }

  const btnText = forgotSubmitBtn.querySelector('.btn-text');
  const loader = forgotSubmitBtn.querySelector('.btn-loader');
  btnText.textContent = "Sending...";
  loader.style.display = "inline-block";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://gowreesh.works/#reset"

  });

  btnText.textContent = "Send Reset Link";
  loader.style.display = "none";

  if (error) {
    alert("❌ Failed to send reset link: " + error.message);
  } else {
    alert("✅ Reset link sent! Check your inbox.");
    forgotPasswordContainer.style.display = "none";
    forgotSuccessContainer.style.display = "block";
  }

});

/*----------------------------------------------------*/
/*	14. Reset Password Functionality
------------------------------------------------------*/

window.addEventListener("load", () => {
  const hash = window.location.hash;

  if (hash.includes("access_token") || hash.includes("reset")) {
    // Show modal popup
    wrapper.classList.add("active-popup");
    overlay.classList.add("active");
    body.classList.add("modal-open");

    loginText.style.display = "none";
    loginEmailForm.style.display = "none";
    rememberCont.style.display = "none";
    btnhide.style.display = "none";
    btnappear.style.display = "none";
    recaptchaCont.style.display = "none";
    forgotPasswordContainer.style.display = "none";
    forgotRecaptchaCont.style.display = "block";
    forgotSuccessContainer.style.display = "none";

    resetPasswordContainer.style.display = "block";
  }

});

/*----------------------------------------------------*/
/*	15. Forgot Email Redirect Link
------------------------------------------------------*/

const forgotEmailRedirectLink = document.querySelector(".forgot-email-redirect");

forgotEmailRedirectLink?.addEventListener("click", (e) => {
  e.preventDefault();

  alert("No worries! You can create a new account or contact admin at vt.gowreesh43@gmail.com.");

  // Switch to signup mode
  wrapper.classList.add("active");
  wrapper.classList.add("active-popup");
  overlay.classList.add("active");
  body.classList.add("modal-open");

});


/*----------------------------------------------------*/
/*	16. Forgot Password Reset Functionality
------------------------------------------------------*/

const forgotNewPassword = document.getElementById("forgot-password");
const forgotConfirmPassword = document.getElementById("forgot-confirm-password");
const forgotPassError = document.getElementById("forgot-password-error");
const forgotConfirmError = document.getElementById("forgot-confirm-password-error");
const resetStatus = document.getElementById("reset-status");
const setPasswordBtn = document.getElementById("set-password-btn");

setPasswordBtn?.addEventListener("click", async () => {
  const pass = forgotNewPassword.value.trim();
  const confirm = forgotConfirmPassword.value.trim();

  let valid = true;

  if (pass.length < 4 || pass.length > 60) {
    forgotPassError.style.display = "flex";
    valid = false;
  } else {
    forgotPassError.style.display = "none";
  }

  if (pass !== confirm) {
    forgotConfirmError.style.display = "flex";
    valid = false;
  } else {
    forgotConfirmError.style.display = "none";
  }

  if (!valid) return;

  const btnText = setPasswordBtn.querySelector(".btn-text");
  const loader = setPasswordBtn.querySelector(".btn-loader");

  btnText.textContent = "Updating...";
  loader.style.display = "inline-block";

  const { error } = await supabase.auth.updateUser({
    password: pass,
  });

  btnText.textContent = "Set Password";
  loader.style.display = "none";

  if (error) {
    resetStatus.textContent = "❌ " + error.message;
    resetStatus.style.color = "#e74c3c";
  } else {
    resetStatus.textContent = "✅ Password successfully changed!";
    resetStatus.style.color = "#2ecc71";
    forgotNewPassword.value = "";
    forgotConfirmPassword.value = "";
  }
});


/*----------------------------------------------------*/
/*	17. Signup Functionality
------------------------------------------------------*/

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
    showError(signupEmail, signupEmailError);
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
    document.getElementById('signup-go-back-wrapper').style.display = 'block';
  }

  return valid;
});

/*----------------------------------------------------*/
/*	18. Signup Password and Confirm Password
------------------------------------------------------*/

// Signup Step 2 - Password & Confirm Password
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
  const fullName = signupName?.value.trim();

  if (pass.length < 6) {
    showError(signupPassword, signupPassError);
    valid = false;
  } else {
    clearError(signupPassword, signupPassError);
  }

  if (pass !== confirm) {
    showError(signupConfirm, signupConfirmError);
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
      data: { 
        full_name: fullName,
      }
    }
  });

  signupText.textContent = "Sign Up";
  signupLoader.style.display = "none";

  if (error) {
    if (error.message.includes("already registered")) {
      alert("⚠️ This email is already registered. Try logging in instead.");
    } else {
      alert("❌ Signup failed: " + error.message);
    }
  } else {
    const name = fullName || email.substring(0, email.indexOf('@'));

    const SignupHeading = document.getElementById("login-section-heading");
    if (SignupHeading) {
      SignupHeading.textContent = `Hi! ${name}`;
    }

    alert("Signup successful! Please check your email.");
    closeAuthPopup();
  }
});

/*----------------------------------------------------*/
/*	19. Go Back Link in Signup
------------------------------------------------------*/

document.getElementById('signup-go-back-link').addEventListener('click', () => {
  signupPassCont.style.display = 'none';
  signupConfirmCont.style.display = 'none';
  signupBtn.style.display = 'none';
  signupNameCont.style.display = 'block';
  signupEmailCont.style.display = 'block';
  signupNextBtn.style.display = 'block';

  document.getElementById('signup-go-back-link').style.display = 'none';
});


/*----------------------------------------------------*/
/*	20. Authentication with Google and Microsoft
------------------------------------------------------*/

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


/*----------------------------------------------------*/
/*	21. Password Strength Indicator for Signup
------------------------------------------------------*/

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

/*------------------------------------------------------------*/
/*	22. Password Strength Indicator for Forgot Password
--------------------------------------------------------------*/

const forgotStrengthBar = document.getElementById("forgot-pass-strength-bar");
const forgotStrengthText = document.getElementById("forgot-password-strength-text");

forgotNewPassword.addEventListener("input", () => {
  const value = forgotNewPassword.value;
  let strength = 0;

  // Evaluate strength
  if (value.length >= 6) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;

  // Update UI
  if (strength === 0) {
    forgotStrengthBar.style.width = "0%";
    forgotStrengthBar.className = "strength-bar";
    forgotStrengthText.textContent = "Password strength";
    forgotStrengthText.style.color = "#888";
  } else if (strength <= 2) {
    forgotStrengthBar.style.width = "33%";
    forgotStrengthBar.className = "strength-bar strength-weak";
    forgotStrengthText.textContent = "Weak";
    forgotStrengthText.style.color = "#e74c3c";
  } else if (strength === 3) {
    forgotStrengthBar.style.width = "66%";
    forgotStrengthBar.className = "strength-bar strength-medium";
    forgotStrengthText.textContent = "Medium";
    forgotStrengthText.style.color = "#f1c40f";
  } else {
    forgotStrengthBar.style.width = "100%";
    forgotStrengthBar.className = "strength-bar strength-strong";
    forgotStrengthText.textContent = "Strong";
    forgotStrengthText.style.color = "#2ecc71";
  }
});
