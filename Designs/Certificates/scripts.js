function showSidebar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}

function hideSidebar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
}

const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalLink = document.getElementById('modal-link');
const closeModal = document.getElementById('modal-close');
const overlay = document.getElementById('popup-overlay');

document.querySelectorAll('.cert-card').forEach((card) => {
  card.querySelector('.view-btn').addEventListener('click', (e) => {
    e.preventDefault();

    const imgSrc = card.querySelector('.cert-logo').src;
    const title = card.querySelector('h3').textContent;

    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalCategory.textContent = 'Programming'; // You can customize this
    modalLink.href = imgSrc;

    modal.style.display = 'block';
    overlay.style.display = 'block';

    // Force reflow to allow animation on display
    void modal.offsetWidth;

    modal.classList.add('show');
    overlay.classList.add('show');
  });
});

function closePopup() {
  modal.classList.remove('show');
  overlay.classList.remove('show');

  // Hide after animation ends
  setTimeout(() => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }, 300); // Match transition time
}

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup();
});

overlay.addEventListener('click', () => {
  closePopup();
});

