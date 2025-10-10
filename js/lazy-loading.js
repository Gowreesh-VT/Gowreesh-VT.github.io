/*----------------------------------------------------*/
/*	Lazy Loading Implementation
------------------------------------------------------*/

// Intersection Observer for lazy loading images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      
      // Add loading class for smooth transition
      img.classList.add('loading');
      
      // Load the actual image
      img.src = img.dataset.src;
      
      // Handle successful load
      img.onload = () => {
        img.classList.remove('loading');
        img.classList.add('loaded');
      };
      
      // Handle error
      img.onerror = () => {
        img.classList.remove('loading');
        img.classList.add('error');
      };
      
      // Stop observing this image
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '50px 0px', // Start loading 50px before image enters viewport
  threshold: 0.01
});

// Initialize lazy loading
function initLazyLoading() {
  // Find all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    // Use Intersection Observer if supported
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
  initLazyLoading();
}