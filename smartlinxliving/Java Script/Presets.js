document.addEventListener("DOMContentLoaded", function () {
    const sideMenu = document.querySelector('aside');
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const darkMode = document.querySelector('.dark-mode');

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode-variables');

        darkMode.querySelectorAll('span').forEach((span) => span.classList.toggle('active'));

        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode-variables'));
    }

    menuBtn.addEventListener('click', () => (sideMenu.style.display = 'block'));
    closeBtn.addEventListener('click', () => (sideMenu.style.display = 'none'));
    darkMode.addEventListener('click', toggleDarkMode);

    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }
});


document.getElementById("heading_logo").addEventListener("click", function() {
        window.location.href = "../index.html";
});
