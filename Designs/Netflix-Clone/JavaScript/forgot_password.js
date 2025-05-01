
// Validation functionality
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

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

emailInput.addEventListener("blur", validateEmail);
emailInput.addEventListener("input", validateEmail);

const emailRadio = document.querySelector('input[value="Email"]');
const smsRadio = document.querySelector('input[value="SMS"]');
const emailForm = document.getElementById("email-form");
const mobileForm = document.getElementById("number-input-container");
const emailText = document.getElementById("email-show");
const smsText = document.getElementById("text-show");
const emailButtons = document.getElementById("email-button-show");
const smsButtons = document.getElementById("sms-button-show");

emailRadio.addEventListener("change", () => {
  if (emailRadio.checked) {
    emailForm.style.display = "block";
    mobileForm.style.display = "none";
    emailText.style.display = "block";
    smsText.style.display = "none";
    emailButtons.style.display = "block";
    smsButtons.style.display = "none";
  }
});

smsRadio.addEventListener("change", () => {
  if (smsRadio.checked) {
    emailForm.style.display = "none";
    mobileForm.style.display = "block";
    emailText.style.display = "none";
    smsText.style.display = "block";
    emailButtons.style.display = "none";
    smsButtons.style.display = "block";
  }
});


const input = document.getElementById("mobile-number");
const label = document.querySelector("label");

input.addEventListener("input", () => {
  label.classList.toggle("active", input.value.trim() !== "");
});

const selectedCode = document.getElementById("selectedCode");
const codeOptions = document.getElementById("codeOptions");
const mobileInput = document.getElementById("mobile-number");
const mobileLabel = document.getElementById("mobile-label");

// Show label + code when focused
mobileInput.addEventListener("focus", () => {
  selectedCode.style.display = "inline-block";
  mobileLabel.classList.add("active");
});

mobileInput.addEventListener("blur", () => {
  setTimeout(() => {
    if (mobileInput.value.trim() === "") {
      mobileLabel.classList.remove("active");
      selectedCode.style.display = "none";
    }
    codeOptions.style.display = "none";
  }, 100);
});


codeOptions.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    selectedCode.textContent = e.target.dataset.code;
    codeOptions.style.display = "none";
    mobileInput.focus();
  }
});


document.addEventListener("click", (e) => {
  if (!e.target.closest(".selected-code") && !e.target.closest(".code-options")) {
    codeOptions.style.display = "none";
  }
});
