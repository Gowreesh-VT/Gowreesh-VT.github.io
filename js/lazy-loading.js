/*----------------------------------------------------*/
/*	Lazy Loading Implementation
------------------------------------------------------*/

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      img.classList.add('loading');
      
      img.src = img.dataset.src;
      
      img.onload = () => {
        img.classList.remove('loading');
        img.classList.add('loaded');
      };
      
      img.onerror = () => {
        img.classList.remove('loading');
        img.classList.add('error');
      };
      
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px 0px',
  threshold: 0.01
});

// Initialize lazy loading
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
  initLazyLoading();
}