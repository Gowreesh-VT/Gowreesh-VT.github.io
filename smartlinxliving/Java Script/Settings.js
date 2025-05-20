document.getElementById("heading_logo").addEventListener("click", function() {
        window.location.href = "../";
});

document.addEventListener("DOMContentLoaded", function () {
    const sideMenu = document.querySelector('aside');
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const darkMode = document.querySelector('.dark-mode');

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode-variables');

            darkMode.querySelector('span:nth-child(1)')?.classList.toggle('active');
            darkMode.querySelector('span:nth-child(2)')?.classList.toggle('active');

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
});
