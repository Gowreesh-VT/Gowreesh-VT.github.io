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
  function openPopup() {
    const imgSrc = card.querySelector('.cert-logo').src;
    const title = card.querySelector('h3').textContent;
    const link = card.getAttribute('data-link'); // ✅ Get verification link

    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalCategory.textContent = 'Programming';
    modalLink.href = link || '#'; // ✅ Set the Details button to open the right link

    modal.style.display = 'block';
    overlay.style.display = 'block';

    void modal.offsetWidth;

    modal.classList.add('show');
    overlay.classList.add('show');
  }

  const btn = card.querySelector('.view-btn');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPopup();
  });

  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('view-btn')) {
      openPopup();
    }
  });
});

function closePopup() {
  modal.classList.remove('show');
  overlay.classList.remove('show');

  setTimeout(() => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }, 300);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePopup();
  }
});

closeModal.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup();
});

overlay.addEventListener('click', () => {
  closePopup();
});

