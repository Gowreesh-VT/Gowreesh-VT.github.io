/**
 * More About Me Modal - JavaScript
 * Handles modal open/close functionality
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.getElementById('aboutModal');
    const btn = document.getElementById('moreAboutBtn');
    const closeBtn = document.querySelector('.about-modal-close');
    
    if (!modal || !btn || !closeBtn) {
      console.error('About modal elements not found');
      return;
    }
    
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      modal.style.display = 'block';
      setTimeout(function() {
        modal.style.opacity = '1';
      }, 10);
    });
    
    closeBtn.addEventListener('click', function() {
      closeModal();
    });
    
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
    
    const modalLinks = modal.querySelectorAll('a.smoothscroll');
    modalLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeModal();
      });
    });
    
    function closeModal() {
      modal.style.opacity = '0';
      setTimeout(function() {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
    
  });

})();
