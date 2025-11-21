(function() {
  'use strict';

  let threeJsLoaded = false;
  let threeJsLoading = false;
  let particlesEnabled = true;

  function loadThreeJs(callback) {
    if (threeJsLoaded) {
      callback && callback();
      return;
    }

    if (threeJsLoading) {
      const checkInterval = setInterval(() => {
        if (threeJsLoaded) {
          clearInterval(checkInterval);
          callback && callback();
        }
      }, 100);
      return;
    }

    threeJsLoading = true;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js';
    script.async = true;
    
    script.onload = () => {
      threeJsLoaded = true;
      threeJsLoading = false;
      callback && callback();
    };

    script.onerror = () => {
      threeJsLoading = false;
    };

    document.head.appendChild(script);
  }

  function initParticlesWhenReady() {
    loadThreeJs(() => {
      window._particlesMobileMode = isMobileDevice();
      
      const particlesScript = document.createElement('script');
      particlesScript.src = '/js/particles-3d.js';
      particlesScript.async = true;
      document.head.appendChild(particlesScript);
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isLowEndDevice() {
    const memory = navigator.deviceMemory;
    const cores = navigator.hardwareConcurrency;
    

    if (memory && memory < 2) return true;
    if (cores && cores < 2) return true;
    
    if (window.innerWidth < 360) return true;
    
    return false;
  }

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function initLazyThreeJs() {
    if (prefersReducedMotion() || isLowEndDevice()) {
      particlesEnabled = false;
      return;
    }

    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
      return;
    }

    const loadOnInteraction = () => {
      initParticlesWhenReady();
      window.removeEventListener('scroll', loadOnInteraction);
      window.removeEventListener('click', loadOnInteraction);
      window.removeEventListener('touchstart', loadOnInteraction);
      window.removeEventListener('mousemove', loadOnInteraction);
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        if (!threeJsLoaded && particlesEnabled) {
          initParticlesWhenReady();
        }
      }, { timeout: 3000 });
    } else {

      setTimeout(() => {
        if (!threeJsLoaded && particlesEnabled) {
          initParticlesWhenReady();
        }
      }, 3000);
    }
    window.addEventListener('scroll', loadOnInteraction, { passive: true, once: true });
    window.addEventListener('click', loadOnInteraction, { once: true });
    window.addEventListener('touchstart', loadOnInteraction, { passive: true, once: true });
    window.addEventListener('mousemove', loadOnInteraction, { passive: true, once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyThreeJs);
  } else {
    initLazyThreeJs();
  }

  window.lazyThreeJs = {
    load: loadThreeJs,
    isLoaded: () => threeJsLoaded,
    isEnabled: () => particlesEnabled
  };

})();
