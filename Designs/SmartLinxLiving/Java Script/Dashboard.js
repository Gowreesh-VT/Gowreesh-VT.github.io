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


document.addEventListener('DOMContentLoaded', function () {
    function getCurrentDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('en-US', options);
        return currentDate;
    }

    function getCurrentTime() {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const currentTime = new Date().toLocaleTimeString('en-US', options);
        return currentTime;
    }

    // Function to update the date and time
    function updateDateTime() {
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('time');

        dateElement.textContent = `Date: ${getCurrentDate()}`;
        timeElement.textContent = `Time: ${getCurrentTime()}`;
    }

    // Update date, time
    updateDateTime();
    updateWeather();


    setInterval(updateDateTime, 60000);

});
  //Activate Presets 
  function changeStatus(time) {
    const clickedButton = document.getElementById(time + 'Btn');

    if (clickedButton.classList.contains('active')) {
        clickedButton.classList.remove('active');
        clickedButton.querySelector('.status').innerText = '';
    } else {
        document.querySelectorAll('.button-container button').forEach(btn => {
            btn.classList.remove('active');
            btn.querySelector('.status').innerText = '';
        });
        clickedButton.classList.add('active');
        clickedButton.querySelector('.status').innerText = 'Active';
    }
}

 // Popup For Users
function showPopup(name, imageSrc, defaultRole) {
    const popup = document.getElementById('userPopup');
    const popupImage = document.getElementById('popupImage');
    const popupName = document.getElementById('popupName');
    const roleSelect = document.getElementById('roleSelect');
    const accessBox = document.getElementById('accessBox');

    const storedRole = localStorage.getItem('selectedRole') || defaultRole;
    const storedUserName = localStorage.getItem('selectedUserName') || '';

    roleSelect.value = storedRole;

    popup.setAttribute('data-username', name);

    popupImage.src = imageSrc;
    popupName.innerText = name;

    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('userPopup');
    popup.style.display = 'none';
}

// Function to change the role
function changeRole() {
    const roleSelect = document.getElementById('roleSelect');
    const selectedRole = roleSelect.value;

    const userName = document.getElementById('userPopup').getAttribute('data-username');

    localStorage.setItem('selectedRole', selectedRole);
    localStorage.setItem('selectedUserName', userName);

    const users = document.querySelectorAll('.user');
    users.forEach(user => {
        const nameElement = user.querySelector('h2');
        const selectedRoleElement = user.querySelector('.selected-role');

        if (nameElement.innerText === userName && selectedRoleElement) {
            selectedRoleElement.innerText = `Role: ${selectedRole}`;
        }
    });
}


function showAdminPopup() {
    const adminPopup = document.getElementById('adminPopup');
    const adminImage = document.getElementById('adminImage');
    const adminName = document.getElementById('adminName');

    adminImage.src = 'images/badass_leo_song_1695907284597_1695907284857.jpg'; // Replace with the correct path
    adminName.innerText = 'Admin';    

    adminPopup.style.display = 'block';
}

function closePopup1() {
    const popup = document.getElementById('adminPopup');
    popup.style.display = 'none';
}