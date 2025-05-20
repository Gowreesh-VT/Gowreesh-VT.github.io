const logo = document.getElementById("netflix-full-logo");
    if (logo) {
        logo.addEventListener("click", () => {
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

document.addEventListener("DOMContentLoaded", () => {
  const planOptions = document.querySelectorAll(".plan-option");
  const mostPopularBanner = document.querySelector(".plan-option-display-top");
  const basicInput = document.querySelector("#plan-basic");

  // ✅ Function to toggle "Most Popular" banner color
  function updateMostPopularColor() {
    if (basicInput.checked) {
      mostPopularBanner.classList.add("active");
    } else {
      mostPopularBanner.classList.remove("active");
    }
  }

  // ✅ Attach click handlers to each plan
  planOptions.forEach(plan => {
    const input = plan.querySelector("input[type='radio']");
    const tick = plan.querySelector(".tick-icon");

    // Hide tick initially
    if (tick) tick.style.display = "none";

    plan.addEventListener("click", () => {
      // Deselect all
      planOptions.forEach(p => {
        p.classList.remove("selected");
        const otherTick = p.querySelector(".tick-icon");
        if (otherTick) otherTick.style.display = "none";
      });

      // Select this one
      input.checked = true;
      plan.classList.add("selected");
      if (tick) tick.style.display = "block";

      // Update "Most Popular" badge
      updateMostPopularColor();
    });
  });

  // ✅ On page load: apply selected plan state
  const selectedInput = document.querySelector("input[name='plan-select']:checked");
  if (selectedInput) {
    const selectedPlan = selectedInput.closest(".plan-option");
    if (selectedPlan) {
      selectedPlan.classList.add("selected");
      const tick = selectedPlan.querySelector(".tick-icon");
      if (tick) tick.style.display = "block";
    }
  }

  // ✅ Also update the banner color immediately
  updateMostPopularColor();
});

