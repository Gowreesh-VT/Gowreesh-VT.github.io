document.getElementById("heading_logo").addEventListener("click", function() {
        window.location.href = "../index.html";
});

const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const darkMode = document.querySelector('.dark-mode');

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode-variables');

    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');

    const currentMode = document.body.classList.contains('dark-mode-variables') ? 'true' : 'false';
    localStorage.setItem('darkMode', currentMode);
}

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', toggleDarkMode);

const storedMode = localStorage.getItem('darkMode');
if (storedMode === 'true') {
    toggleDarkMode();
}

function closeAllPopups() {
    document.querySelectorAll('.popup_eq').forEach(popup => {
        popup.style.display = 'none';
        popup.style.animation = '';
    });
}
function showPopup(popupId) {
    closeAllPopups();

    const popup = document.getElementById(popupId);
    popup.style.display = 'flex';
    popup.style.animation = 'fadeIn 0.5s ease-in-out';
}

function showBedroomPopup() { showPopup('bedroom-popup'); }
function showKitchenPopup() { showPopup('kitchen-popup'); }
function showLivingPopup() { showPopup('Living_Room-popup'); }
function showBathroomPopup() { showPopup('Bathroom-popup'); }
function showGaragePopup() { showPopup('Garage-popup'); }
function showMotorPopup() { showPopup('Motor-popup'); }
function showGardenPopup() { showPopup('Garden-popup'); }

// bedroom popup Close
function closeBedroomPopup() {
  const popup = document.getElementById('bedroom-popup');
    popup.style.animation = 'fadeOut 0.5s ease-in-out'
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = '';
    }, 500);
  }

// Kitchen popup Close
function closeKitchenPopup() {
  const popup = document.getElementById('kitchen-popup');
    popup.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = '';
    }, 500);
}

// Living Room popup Close
function closeLivingPopup() {
  const popup = document.getElementById('Living_Room-popup');
    popup.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = '';
    }, 500);
}

// Bathroom popup Close
function closeBathroomPopup() {
  const popup = document.getElementById('Bathroom-popup');
    popup.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = '';
    }, 500);
}

// Garage popup Close
function closeGaragePopup() {
  const popup = document.getElementById('Garage-popup');
    popup.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = '';
    }, 500);
}

// Motor_Room popup Close
function closeMotorPopup() {
  const popup = document.getElementById('Motor-popup');
    popup.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = '';
    }, 500);
}

// Garden popup Close
function closeGardenPopup() {
  const popup = document.getElementById('Garden-popup');
    popup.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = '';
    }, 500);
}

function hidePopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.animation = 'fadeOut 0.5s ease-in-out';
    setTimeout(() => {
        popup.style.display = 'none';
        popup.style.animation = '';
    }, 500);
}

