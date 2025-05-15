document.getElementById("netflix-full-logo").addEventListener("click", function() {
    window.location.href = "../../landing_page.html";
});

document.getElementById("send-link").addEventListener("click", function() {
    const step1Content = document.getElementById('main-container');
    step1Content.style.transform = 'translateX(-50%)';
    setTimeout(function() {
        window.location.href = 'signup.html';
    }, 200);
});

const params = new URLSearchParams(window.location.search);
const email = params.get('email');
const displayEmailElement = document.getElementById('display-email-step1');

if (email) {
  displayEmailElement.textContent = email;
} else {
  displayEmailElement.textContent = 'vt.gowreesh43@gmail.com';
}

document.getElementById("send-link").addEventListener("click", function() {
    const email = document.getElementById("display-email-step1").textContent.trim();    
    console.log(email);
    window.location.href = `signup.html?email=${encodeURIComponent(email)}`;
});

const displayEmailElement2 = document.getElementById('display-email-step2');
if (email) {
  displayEmailElement2.textContent = email;
} else {
  displayEmailElement2.textContent = 'vt.gowreesh43@gmail.com';
}


const showBtn = document.getElementById('Resend-Link-Btn');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-popup');

showBtn.addEventListener('click', () => {
popup.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
popup.style.display = 'none';
});