/**
 * Performance Optimizations
 * Replaces jQuery animations with CSS transitions and optimizes reflows
 */

(function() {
  'use strict';

  // Utility: Debounce function to limit event handler calls
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Utility: Throttle function using requestAnimationFrame
  function throttleRAF(func) {
    let rafId = null;
    return function(...args) {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          func.apply(this, args);
          rafId = null;
        });
      }
    };
  }

  // Replace jQuery fadeIn/fadeOut with CSS transitions
  function fadeOut(element, duration = 300, callback) {
    if (!element) return;
    
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '0';
    });
    
    setTimeout(() => {
      element.style.display = 'none';
      if (callback) callback();
    }, duration);
  }

  function fadeIn(element, duration = 300, display = 'block') {
    if (!element) return;
    
    element.style.display = display;
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  }

  // Optimized scroll handler with throttling
  const optimizedScrollHandler = throttleRAF(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const goTopBtn = document.getElementById('go-top');
    
    if (goTopBtn) {
      if (scrollTop > 300) {
        goTopBtn.classList.add('visible');
      } else {
        goTopBtn.classList.remove('visible');
      }
    }
  });

  // Batch DOM reads and writes to prevent layout thrashing
  function batchDOMOperations(readOperations, writeOperations) {
    // First, do all reads
    const readResults = readOperations.map(fn => fn());
    
    // Then, do all writes in next frame
    requestAnimationFrame(() => {
      writeOperations.forEach((fn, index) => fn(readResults[index]));
    });
  }

  // Optimize counter animations with requestAnimationFrame
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  // Initialize optimizations when DOM is ready
  function init() {
    // Replace jQuery scroll handler
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Add CSS class for go-top button transitions
    const goTopBtn = document.getElementById('go-top');
    if (goTopBtn) {
      goTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // Optimize stat counters
    const statSection = document.getElementById('stats');
    if (statSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counters = statSection.querySelectorAll('.stat-count');
            counters.forEach(counter => {
              const target = parseInt(counter.textContent, 10);
              animateCounter(counter, target);
            });
            observer.disconnect(); // Trigger once only
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(statSection);
    }

    // Optimize contact form validation with debouncing
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      const inputs = contactForm.querySelectorAll('input, textarea');
      const debouncedValidate = debounce((input) => {
        // Validation logic here
        if (input.validity.valid) {
          input.classList.remove('error');
          input.classList.add('valid');
        } else {
          input.classList.remove('valid');
          input.classList.add('error');
        }
      }, 300);

      inputs.forEach(input => {
        input.addEventListener('input', () => debouncedValidate(input), { passive: true });
      });
    }
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export utilities for use in other scripts
  window.perfOptim = {
    fadeIn,
    fadeOut,
    debounce,
    throttleRAF,
    batchDOMOperations,
    animateCounter
  };

})();
