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

function validateEmail() {
  const emailValue = emailInput.value.trim();

  if (emailValue.length > 4 && !emailValue.includes("@")) {
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    emailError.style.display = "block";
    emailError2.style.display = "none";
  } else if (emailValue.length <= 4 || emailValue === "") {
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    emailError2.style.display = "block";
    emailError.style.display = "none";
  } else if (emailValue.length > 4 && emailValue.includes("@") && emailValue.includes(".")) {
    emailInput.classList.remove("input-error");
    emailInput.classList.add("input-success");
    emailError.style.display = "none";
    emailError2.style.display = "none";
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

  if (emailValueFnl.length > 4 && !emailValueFnl.includes("@")) {
      emailInputFnl.classList.add("input-error");
      emailInputFnl.classList.remove("input-success");
      emailErrorFnl.style.display = "block";
      emailError2Fnl.style.display = "none";
  } else if (emailValueFnl.length <= 4 || emailValueFnl === "") {
      emailInputFnl.classList.add("input-error");
      emailInputFnl.classList.remove("input-success");
      emailError2Fnl.style.display = "block";
      emailErrorFnl.style.display = "none";
  } else if (emailValueFnl.length > 4 && emailValueFnl.includes("@") && emailValueFnl.includes(".")) {
      emailInputFnl.classList.remove("input-error");
      emailInputFnl.classList.add("input-success");
      emailErrorFnl.style.display = "none";
      emailError2Fnl.style.display = "none";
  }
}

document.getElementById("get-strted-btn").addEventListener("click", function(e) {
  const emailValue = emailInput.value.trim();

  if (emailValue === "" || !emailValue.includes("@") || !emailValue.includes(".")) {
    e.preventDefault();
    emailInput.focus(); 
  } else if (emailValue.length > 4 && emailValue.includes("@") && emailValue.includes(".")) {
    // Redirect to the login page 
    window.location.href = "HTML/Login.html";
  }
});

document.getElementById("fnl-get-strted-btn").addEventListener("click", function() {
  const emailValueFnl = emailInputFnl.value.trim();

  if (emailValueFnl === "" || !emailValueFnl.includes("@") || !emailValueFnl.includes(".")) {
    emailInputFnl.focus();
  } else if (emailValueFnl.length > 4 && emailValueFnl.includes("@") && emailValueFnl.includes(".")) {
    // Redirect to the login page 
    window.location.href = "HTML/Login.html";
  }
});
