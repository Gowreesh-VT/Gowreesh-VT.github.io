/**
 * Minimal Scroll Animations
 * Clean sliding and fading effects as elements come into view
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px',
    staggerDelay: {
      portfolio: 100,
      timeline: 120,
      stats: 80,
      services: 100,
      tech: 60,
      general: 80
    }
  };

  // Intersection Observer options
  const observerOptions = {
    threshold: config.threshold,
    rootMargin: config.rootMargin
  };

  // Create observer instance
  const animateOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.animDelay) || 0;
        
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Function to setup animations
  function setupAnimations() {
    // Portfolio items - alternate left and right
    const portfolioItems = document.querySelectorAll('.folio-item');
    portfolioItems.forEach((item, index) => {
      const animationClass = index % 2 === 0 ? 'animate-slide-left' : 'animate-slide-right';
      item.classList.add(animationClass);
      item.dataset.animDelay = index * config.staggerDelay.portfolio;
      animateOnScroll.observe(item);
    });

    // Timeline blocks - alternate sides
    const timelineBlocks = document.querySelectorAll('.timeline-block');
    timelineBlocks.forEach((block, index) => {
      const animationClass = index % 2 === 0 ? 'animate-slide-right' : 'animate-slide-left';
      block.classList.add(animationClass);
      block.dataset.animDelay = index * config.staggerDelay.timeline;
      animateOnScroll.observe(block);
    });

    // Stats - fade up
    const statItems = document.querySelectorAll('.stat');
    statItems.forEach((stat, index) => {
      stat.classList.add('animate-fade-up');
      stat.dataset.animDelay = index * config.staggerDelay.stats;
      animateOnScroll.observe(stat);
    });

    // Services - fade up
    const serviceItems = document.querySelectorAll('.service');
    serviceItems.forEach((service, index) => {
      service.classList.add('animate-fade-up');
      service.dataset.animDelay = index * config.staggerDelay.services;
      animateOnScroll.observe(service);
    });

    // Tech cards - fade up
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
      card.classList.add('animate-fade-up');
      card.dataset.animDelay = index * config.staggerDelay.tech;
      animateOnScroll.observe(card);
    });

    // Section intros - fade in
    const sectionIntros = document.querySelectorAll('.section-intro');
    sectionIntros.forEach((intro, index) => {
      intro.classList.add('animate-fade-in');
      intro.dataset.animDelay = index * config.staggerDelay.general;
      animateOnScroll.observe(intro);
    });

    // Contact form - fade up
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
      contactForm.classList.add('animate-fade-up');
      animateOnScroll.observe(contactForm);
    }

    // Contact info boxes - fade up with stagger
    const contactInfoBoxes = document.querySelectorAll('.contact-info');
    contactInfoBoxes.forEach((box, index) => {
      box.classList.add('animate-fade-up');
      box.dataset.animDelay = index * 150;
      animateOnScroll.observe(box);
    });

    // Hero content - fade in
    const heroContent = document.querySelector('.intro-content');
    if (heroContent) {
      heroContent.classList.add('animate-fade-in');
      animateOnScroll.observe(heroContent);
    }

    // About section - comprehensive animations
    
    // About profile image - slide from right
    const aboutImages = document.querySelectorAll('.about-pic img, .about-pic');
    aboutImages.forEach((img, index) => {
      img.classList.add('animate-slide-right');
      img.dataset.animDelay = index * 100;
      animateOnScroll.observe(img);
    });

    // About description text - fade in
    const aboutDesc = document.querySelectorAll('.about-desc, .about-desc p');
    aboutDesc.forEach((desc, index) => {
      desc.classList.add('animate-fade-up');
      desc.dataset.animDelay = 200 + (index * 100);
      animateOnScroll.observe(desc);
    });

    // About section headings - slide from left
    const aboutHeadings = document.querySelectorAll('#about h3, #about h5, .about-content h3, .about-content h5');
    aboutHeadings.forEach((heading, index) => {
      heading.classList.add('animate-slide-left');
      heading.dataset.animDelay = index * 80;
      animateOnScroll.observe(heading);
    });

    // Skill bars container - fade up
    const skillsSection = document.querySelectorAll('.skill-bars, .about-skills');
    skillsSection.forEach((section, index) => {
      section.classList.add('animate-fade-up');
      section.dataset.animDelay = index * 100;
      animateOnScroll.observe(section);
    });

    // Individual skill bars - slide from left with stagger
    const skillBars = document.querySelectorAll('.progress, .skill-bar');
    skillBars.forEach((bar, index) => {
      bar.classList.add('animate-slide-left');
      bar.dataset.animDelay = 300 + (index * 80);
      animateOnScroll.observe(bar);
    });

    // Download CV button - fade up
    const downloadBtn = document.querySelectorAll('.about-desc .button, #about .button');
    downloadBtn.forEach((btn, index) => {
      btn.classList.add('animate-fade-up');
      btn.dataset.animDelay = 400 + (index * 100);
      animateOnScroll.observe(btn);
    });

    // Social links - fade up
    const socialLinks = document.querySelectorAll('.intro-social a');
    socialLinks.forEach((link, index) => {
      link.classList.add('animate-fade-up');
      link.dataset.animDelay = 300 + (index * 80);
      animateOnScroll.observe(link);
    });

    // General CTA buttons - fade up (excluding already animated ones)
    const ctaButtons = document.querySelectorAll('.cta-btn, .intro .button, .header-content .button');
    ctaButtons.forEach((btn, index) => {
      // Skip if already has animation class
      if (!btn.classList.contains('animate-fade-up') && 
          !btn.classList.contains('animate-slide-left') && 
          !btn.classList.contains('animate-slide-right')) {
        btn.classList.add('animate-fade-up');
        btn.dataset.animDelay = index * 100;
        animateOnScroll.observe(btn);
      }
    });

    // About section info items (if any list items exist)
    const aboutListItems = document.querySelectorAll('#about ul li, .about-content ul li, .about-info li');
    aboutListItems.forEach((item, index) => {
      item.classList.add('animate-fade-up');
      item.dataset.animDelay = 200 + (index * 60);
      animateOnScroll.observe(item);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAnimations);
  } else {
    setupAnimations();
  }

  // Re-observe elements on dynamic content load (if needed)
  window.refreshScrollAnimations = setupAnimations;

})();
