window.onload = () => {
  const intro = document.getElementById("intro-cont");
  const mainContent = document.querySelector(".strt-pge");
  const animatedLetter = intro.querySelector("netflixintro");
  
  animatedLetter.addEventListener("animationend", () => {
    intro.classList.add("hide-intro");

  });
};

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

const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const movieRow = document.getElementById("movieRow");
const movieCards = document.querySelectorAll(".movie-card");

function updateButtonVisibility() {
  if (movieRow.scrollLeft <= 0) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "flex";
  }

  if (movieRow.scrollLeft + movieRow.clientWidth >= movieRow.scrollWidth - 1) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "flex";
  }
}

const visibleWidth = movieRow.offsetWidth;
const cardWidth = movieCards[0].offsetWidth + 10;
const cardsPerScroll = Math.floor(visibleWidth / cardWidth);
const scrollAmount = cardWidth * cardsPerScroll;

leftBtn.addEventListener("click", () => {
  movieRow.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});

rightBtn.addEventListener("click", () => {
  movieRow.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});

movieRow.addEventListener("scroll", updateButtonVisibility);

updateButtonVisibility();

// Validation functionality
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const emailError2 = document.getElementById("email-error2");
let emailStartedTyping = false;

emailInput.addEventListener("input", () => {
    emailStartedTyping = true;
    validateEmail();
});

emailInput.addEventListener("blur", () => {
    if (emailStartedTyping) {
        validateEmail();
    }
});

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (!isValidEmail(emailValue)) {
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
  
    if (emailValue.includes("@")) {
      emailError.style.display = "none";
      emailError2.style.display = "block";
    } else {
      emailError.style.display = "block";
      emailError2.style.display = "none";
    }
  } else {
    emailInput.classList.remove("input-error");
    emailInput.classList.add("input-success");
    emailError.style.display = "none";
    emailError2.style.display = "none";
  
    emailInputFnl.value = emailValue;
    validateEmailFnl(); 
  }  
}

const emailInputFnl = document.getElementById("email-fnl");
const emailErrorFnl = document.getElementById("email-error-fnl");
const emailError2Fnl = document.getElementById("email-error2-fnl");
let emailFnlStartedTyping = false;

emailInputFnl.addEventListener("input", () => {
    emailFnlStartedTyping = true;
    validateEmailFnl();
});

emailInputFnl.addEventListener("blur", () => {
    if (emailFnlStartedTyping) {
        validateEmailFnl();
    }
});

function validateEmailFnl() {
  const emailValueFnl = emailInputFnl.value.trim();

  if (!isValidEmail(emailValueFnl)) {
    emailInputFnl.classList.add("input-error");
    emailInputFnl.classList.remove("input-success");
  
    if (emailValueFnl.includes("@")) {
      emailErrorFnl.style.display = "none";
      emailError2Fnl.style.display = "block";
    } else {
      emailErrorFnl.style.display = "block";
      emailError2Fnl.style.display = "none";
    }
  } else {
    emailInputFnl.classList.remove("input-error");
    emailInputFnl.classList.add("input-success");
    emailErrorFnl.style.display = "none";
    emailError2Fnl.style.display = "none";
  
    emailInput.value = emailValueFnl;
    validateEmail(); 
  }
}

document.getElementById("get-strted-btn").addEventListener("click", function() {
  const emailValue = emailInput.value.trim();
  const email = document.getElementById('email').value.trim();

  if (emailValue === "" || !emailValue.includes("@") || !emailValue.includes(".")) {
    emailInput.focus(); 
  } else if (emailValue.length > 4 && emailValue.includes("@") && emailValue.includes(".")) {

    window.location.href = `HTML/Signup/linkRegistration.html?email=${encodeURIComponent(email)}`;
  }
});

document.getElementById("fnl-get-strted-btn").addEventListener("click", function() {
  const emailValueFnl = emailInputFnl.value.trim();
  const email = document.getElementById('email-fnl').value.trim();

  if (emailValueFnl === "" || !emailValueFnl.includes("@") || !emailValueFnl.includes(".")) {
    emailInputFnl.focus();
  } else if (emailValueFnl.length > 4 && emailValueFnl.includes("@") && emailValueFnl.includes(".")) {

    window.location.href = `HTML/Signup/linkRegistration.html?email=${encodeURIComponent(email)}`;
  }
});

function togglePopup(id) {
  const modal = document.getElementById(id);
  const backdrop = document.getElementById("modal-overlay");
  const isActive = modal.classList.contains("active");

  if (isActive) {
    closeModal(modal, backdrop);
  } else {
    document.querySelectorAll(".popup-modal.active").forEach(m => m.classList.remove("active"));

    modal.classList.add("active");
    backdrop.classList.add("active");
    document.body.classList.add("modal-open");
  }
}

function closeModal(modal, backdrop) {
  modal.classList.remove("active");
  backdrop.classList.remove("active");
  document.body.classList.remove("modal-open");
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".popup-modal.active");
    const backdrop = document.getElementById("modal-overlay");
    if (modal) {
      closeModal(modal, backdrop);
    }
  }
});

document.getElementById("modal-overlay").addEventListener("click", function () {
  const modal = document.querySelector(".popup-modal.active");
  if (modal) {
    closeModal(modal, this);
  }
});

window.onload = function () {
  document.querySelectorAll(".popup-get-strted-btn").forEach(button => {
    button.addEventListener("click", function () {
      window.location.href = "HTML/Signup/linkRegistration.html";
    });
  });
};

document.getElementById('learn-more').addEventListener('click', function() {
    document.getElementById('recaptcha-info').style.display = 'block';
    document.getElementById('learn-more').style.display = 'none';
});