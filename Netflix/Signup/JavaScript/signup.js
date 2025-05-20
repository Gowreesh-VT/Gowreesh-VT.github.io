document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("netflix-full-logo");
    if (logo) {
        logo
        .addEventListener("click", () => {
            window.location.href = "../";
        });
    }

    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        const selectedOption = dropdown.querySelector('.selected-option');
        const optionsMenu = dropdown.querySelector('.options');
        const currentLanguage = dropdown.querySelector('#currentLanguage');
        const allOptions = dropdown.querySelectorAll('.option');

        selectedOption.addEventListener('click', () => {
            if (optionsMenu.style.maxHeight) {
            optionsMenu.style.maxHeight = null;
            } else {
            optionsMenu.style.maxHeight = optionsMenu.scrollHeight + "px";
            }
        });

        allOptions.forEach(option => {
            option.addEventListener('click', () => {
            currentLanguage.innerText = option.innerText;
            optionsMenu.style.maxHeight = null;
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-dropdown')) {
            optionsMenu.style.maxHeight = null;
            }
        });
    });

    // Handle email display in linkRegistration.html and signup.html
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    const displayEmailStep1 = document.getElementById("display-email-step1");
    if (displayEmailStep1) {
        displayEmailStep1.textContent = email || "vt.gowreesh43@gmail.com";
    }

    const displayEmailStep2 = document.getElementById("display-email-step2");
    if (displayEmailStep2) {
        displayEmailStep2.textContent = email || "fallback@example.com";
    }

    const displayEmailStep3 = document.getElementById("display-email-step3");
    if (displayEmailStep3) {
        displayEmailStep3.textContent = email || "fallback@example.com";
    }

    const sendLinkBtn = document.getElementById("send-link");
    if (sendLinkBtn && displayEmailStep1) {
        sendLinkBtn.addEventListener("click", () => {
            const emailText = displayEmailStep1.textContent.trim();
            // window.location.href = `signup.html?email=${encodeURIComponent(emailText)}`;
            // window.location.href = `../linkSent/index.html?email=${encodeURIComponent(emailText)}`;
            window.location.href = `../linkSent/?email=${encodeURIComponent(emailText)}`;
        });
    }

    const regformEmailInput = document.getElementById("email");
    const urlParams = new URLSearchParams(window.location.search);
    const passedEmail = urlParams.get("email");

    if (regformEmailInput && passedEmail) {
        regformEmailInput.value = passedEmail;
    }

    const createPassBtn = document.getElementById("create-pass-btn");
    if (createPassBtn && email) {
        createPassBtn.addEventListener("click", function () {
            // window.location.href = `regform.html?email=${encodeURIComponent(email)}`;
            // window.location.href = `../regform/index.html?email=${encodeURIComponent(email)}`;
            window.location.href = `../regform/?email=${encodeURIComponent(email)}`;
        });
    }

    // Handles popup events if present
    const showBtn = document.getElementById('Resend-Link-Btn');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-popup');
    if (showBtn && popup && closeBtn) {
      showBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
      });

      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    }

    // Validation functionality
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const passwordError2 = document.getElementById("password-error2");

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
        if (passwordInput.value.trim() === "" ) {
            passwordInput.classList.add("input-error");
            passwordError.style.display = "block";
            passwordError2.style.display = "none";
        } else if (passwordInput.value.length < 6) {
            passwordInput.classList.add("input-error");
            passwordError.style.display = "none";
            passwordError2.style.display = "block";
        } else {
            passwordInput.classList.remove("input-error");
            passwordError.style.display = "none";
            passwordError2.style.display = "none";
        }
    }

    const NextBtn = document.getElementById("regform-Btn");
    NextBtn.addEventListener("click", function () {
        validateEmail();
        validatePassword();

        const emailVal = emailInput.value.trim();
        const passVal = passwordInput.value.trim();

        if (isValidEmail(emailVal) && passVal.length >= 6) {
            // window.location.href = `../verifyemail/index.html?email=${encodeURIComponent(email)}`;
            window.location.href = `../verifyemail/?email=${encodeURIComponent(emailVal)}`;
        }
    });

    emailInput.addEventListener("blur", validateEmail);
    emailInput.addEventListener("input", validateEmail);

    passwordInput.addEventListener("blur", validatePassword);
    passwordInput.addEventListener("input", validatePassword);


    // Toggle password visibility
    const toggleIcon = document.getElementById("togglePasswordIcon");
    const toggleWrapper = document.querySelector(".toggle-password");

    if (passwordInput && toggleIcon && toggleWrapper) {
        toggleWrapper.style.display = "none";

        function togglePassword() {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleIcon.classList.remove("fa-eye");
                toggleIcon.classList.add("fa-eye-slash");
            } else {
                passwordInput.type = "password";
                toggleIcon.classList.remove("fa-eye-slash");
                toggleIcon.classList.add("fa-eye");
            }
        }

        toggleWrapper.addEventListener("click", togglePassword);

        passwordInput.addEventListener("focus", () => {
            toggleWrapper.style.display = "block";
        });

        passwordInput.addEventListener("input", () => {
            toggleWrapper.style.display = passwordInput.value.length > 0 ? "block" : "none";
        });

        passwordInput.addEventListener("blur", () => {
            if (passwordInput.value.length === 0) {
                toggleWrapper.style.display = "none";
            }
        });
    }

});