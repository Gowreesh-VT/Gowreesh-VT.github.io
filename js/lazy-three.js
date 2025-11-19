/**
 * Lazy Load Heavy Scripts
 * Reduces initial JavaScript payload by loading Three.js and other heavy scripts on-demand
 * Savings: ~142 KiB (90KB Three.js + 52KB unused GA code)
 */

(function() {
  'use strict';

  let threeJsLoaded = false;
  let threeJsLoading = false;
  let particlesEnabled = true;

  /**
   * Load Three.js on user interaction or when scrolling near canvas
   */
  function loadThreeJs(callback) {
    if (threeJsLoaded) {
      callback && callback();
      return;
    }

    if (threeJsLoading) {
      // Wait for current load to complete
      const checkInterval = setInterval(() => {
        if (threeJsLoaded) {
          clearInterval(checkInterval);
          callback && callback();
        }
      }, 100);
      return;
    }

    threeJsLoading = true;
    console.log('⏳ Loading Three.js...');

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js';
    script.async = true;
    
    script.onload = () => {
      threeJsLoaded = true;
      threeJsLoading = false;
      console.log('✓ Three.js loaded');
      callback && callback();
    };

    script.onerror = () => {
      threeJsLoading = false;
      console.warn('Failed to load Three.js');
    };

    document.head.appendChild(script);
  }

  /**
   * Initialize particles after Three.js loads
   */
  function initParticlesWhenReady() {
    loadThreeJs(() => {
      // Set global flag for mobile optimization
      window._particlesMobileMode = isMobileDevice();
      
      // Load particles-3d.js after Three.js
      const particlesScript = document.createElement('script');
      particlesScript.src = '/js/particles-3d.js';
      particlesScript.async = true;
      document.head.appendChild(particlesScript);
    });
  }

  /**
   * Check if user prefers reduced motion (accessibility)
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Detect low-end device (disable particles for better performance)
   */
  function isLowEndDevice() {
    // Check for low memory or slow hardware
    const memory = navigator.deviceMemory; // GB
    const cores = navigator.hardwareConcurrency;
    
    // Only disable on very low-end devices (< 2GB RAM or < 2 CPU cores)
    if (memory && memory < 2) return true;
    if (cores && cores < 2) return true;
    
    // Check for very old mobile devices (screen width < 360px typically very old/low-end)
    if (window.innerWidth < 360) return true;
    
    return false;
  }

  /**
   * Check if device is mobile
   */
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Initialize lazy loading strategy
   */
  function initLazyThreeJs() {
    // Don't load on low-end devices or if user prefers reduced motion
    if (prefersReducedMotion() || isLowEndDevice()) {
      console.log('⚡ Skipping Three.js (performance optimization)');
      particlesEnabled = false;
      return;
    }

    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
      console.log('⚡ No particle canvas found');
      return;
    }

    // Strategy 1: Load after user interaction (scroll, click, touch)
    const loadOnInteraction = () => {
      initParticlesWhenReady();
      // Remove listeners after first interaction
      window.removeEventListener('scroll', loadOnInteraction);
      window.removeEventListener('click', loadOnInteraction);
      window.removeEventListener('touchstart', loadOnInteraction);
      window.removeEventListener('mousemove', loadOnInteraction);
    };

    // Strategy 2: Load after page is fully loaded and idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        if (!threeJsLoaded && particlesEnabled) {
          console.log('⏳ Loading Three.js during idle time');
          initParticlesWhenReady();
        }
      }, { timeout: 3000 });
    } else {
      // Fallback: Load after 3 seconds
      setTimeout(() => {
        if (!threeJsLoaded && particlesEnabled) {
          initParticlesWhenReady();
        }
      }, 3000);
    }

    // Also load on first interaction (whichever comes first)
    window.addEventListener('scroll', loadOnInteraction, { passive: true, once: true });
    window.addEventListener('click', loadOnInteraction, { once: true });
    window.addEventListener('touchstart', loadOnInteraction, { passive: true, once: true });
    window.addEventListener('mousemove', loadOnInteraction, { passive: true, once: true });

    console.log('✓ Three.js lazy loading initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyThreeJs);
  } else {
    initLazyThreeJs();
  }

  // Export for debugging
  window.lazyThreeJs = {
    load: loadThreeJs,
    isLoaded: () => threeJsLoaded,
    isEnabled: () => particlesEnabled
  };

})();
