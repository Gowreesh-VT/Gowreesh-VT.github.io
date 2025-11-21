(function() {
  'use strict';

  const modalData = {
    'modal-01': {
      title: 'BB84 Simulation',
      category: 'Web Simulation',
      description: 'This is a Web Simulation using Type Script and React JS to simulate BB84 protocol',
      image: 'images/portfolio/BB84 Simulation.webp',
      link: 'bb84/',
      linkText: 'Live View'
    },
    'modal-02': {
      title: 'SmartLinx Living',
      category: 'Web Development',
      description: 'SmartLinx Living is a smart home automation dashboard that allows users to control and monitor devices efficiently. It features preset modes, real-time sensor updates, and user role management for seamless automation. The interface provides weather insights, security status, and device control in a sleek, dark-themed UI.',
      image: 'images/portfolio/SmartLinx_Living HomePage.webp',
      link: 'smartlinxliving/',
      linkText: 'Live View'
    },
    'modal-03': {
      title: 'Certificates',
      category: 'From Meta',
      description: '',
      image: 'images/Top-Left.webp',
      link: 'https://www.coursera.org/account/accomplishments/professional-cert/EPLZM65KNQWE',
      linkText: 'Details',
      external: true
    },
    'modal-04': {
      title: 'Certificates',
      category: 'From Google',
      description: '',
      image: 'images/Top-Right.webp',
      link: 'https://coursera.org/verify/7EV3BZZ6YCFV',
      linkText: 'Details',
      external: true
    },
    'modal-05': {
      title: 'Certificate Loading',
      category: 'From Harvard',
      description: '',
      image: 'images/Middle-Right.webp',
      icon: 'fa-spinner fa-spin',
      link: '#',
      linkText: 'Details'
    },
    'modal-06': {
      title: 'Certificates',
      category: 'From DataCamp',
      description: '',
      image: 'images/Middle-Left.webp',
      link: 'https://www.datacamp.com/certificate/SQA0011208598196',
      linkText: 'Details',
      external: true
    },
    'modal-07': {
      title: 'Certificates',
      category: 'From GitHub',
      description: '',
      image: 'images/Bottom-Left.webp',
      link: 'https://www.credly.com/badges/0367b736-4d40-4024-bc7a-311b07103795/public_url',
      linkText: 'Details',
      external: true
    },
    'modal-08': {
      title: 'Netflix',
      category: 'Web Design',
      description: 'While creating my Netflix clone, I drew inspiration from its bold visuals and smooth user experience, aiming to recreate the sleek, cinematic feel in a simplified, user-friendly design.',
      image: 'images/portfolio/Netflix-Clone.webp',
      link: 'Netflix/in/',
      linkText: 'Live View'
    }
  };

  function createModalHTML(id, data) {
    const titleIcon = data.icon ? `<i class="fa ${data.icon}"></i> ` : '';
    const target = data.external ? 'target="_blank" rel="noopener noreferrer"' : '';
    
    return `
      <div class="media">
        <img src="${data.image}" alt="${data.title}" width="1200" height="800" loading="lazy">
      </div>
      <div class="description-box">
        <h4>${titleIcon}${data.title}</h4>
        ${data.description ? `<p>${data.description}</p>` : ''}
        <div class="categories">${data.category}</div>
      </div>
      <div class="link-box">
        <a href="${data.link}" ${target}>${data.linkText}</a>
        <a href="#" class="popup-modal-dismiss">Close</a>
      </div>
    `;
  }

  function showModal(modalId) {
    const data = modalData[modalId];
    if (!data) {
      console.warn('Modal data not found:', modalId);
      return;
    }

    let modal = document.getElementById(modalId);
    
    if (!modal) {

      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'popup-modal slider mfp-hide';
      modal.innerHTML = createModalHTML(modalId, data);
      document.body.appendChild(modal);
    }

    if (typeof $.magnificPopup !== 'undefined') {
      $.magnificPopup.open({
        items: {
          src: '#' + modalId,
          type: 'inline'
        },
        fixedContentPos: false,
        removalDelay: 300,
        showCloseBtn: false,
        mainClass: 'mfp-fade'
      });
    }
  }

  function initLazyModals() {
    const portfolioLinks = document.querySelectorAll('.item-wrap a[href^="#modal-"]');
    
    portfolioLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('href').substring(1);
        showModal(modalId);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyModals);
  } else {
    initLazyModals();
  }

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup-modal-dismiss')) {
      e.preventDefault();
      if (typeof $.magnificPopup !== 'undefined') {
        $.magnificPopup.close();
      }
    }
  });

})();
