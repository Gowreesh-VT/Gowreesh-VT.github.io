/**
 * Performance Optimizations
 * Replaces jQuery animations with CSS transitions and optimizes reflows
 */

(function() {
  'use strict';

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

  function batchDOMOperations(readOperations, writeOperations) {
    const readResults = readOperations.map(fn => fn());
    
    requestAnimationFrame(() => {
      writeOperations.forEach((fn, index) => fn(readResults[index]));
    });
  }

  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
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

  function init() {
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    const goTopBtn = document.getElementById('go-top');
    if (goTopBtn) {
      goTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

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
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(statSection);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      const inputs = contactForm.querySelectorAll('input, textarea');
      const debouncedValidate = debounce((input) => {

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.perfOptim = {
    fadeIn,
    fadeOut,
    debounce,
    throttleRAF,
    batchDOMOperations,
    animateCounter
  };

})();
