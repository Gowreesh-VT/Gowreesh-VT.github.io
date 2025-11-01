/**
 * Structured Data (JSON-LD) for SEO
 * Enhances search engine understanding and rich snippet display
 */

// Person Schema - Main profile information
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gowreesh V T",
  "url": "https://gowreesh.works",
  "image": "https://gowreesh.works/images/logo.webp",
  "jobTitle": "Front-End Developer & Cybersecurity Enthusiast",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "description": "Passionate developer specializing in front-end development, JavaScript, and cybersecurity. Building innovative web solutions with modern technologies.",
  "knowsAbout": [
    "JavaScript",
    "HTML5",
    "CSS3",
    "React",
    "Web Development",
    "Front-End Development",
    "UI/UX Design",
    "Cybersecurity",
    "Three.js",
    "WebGL",
    "Responsive Design",
    "PWA Development"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "name": "Meta Front-End Developer Certificate",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Meta"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "name": "MongoDB Developer Certification",
      "recognizedBy": {
        "@type": "Organization",
        "name": "MongoDB University"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "name": "EdX Front-End Certifications",
      "recognizedBy": {
        "@type": "Organization",
        "name": "EdX"
      }
    }
  ],
  "sameAs": [
    "https://github.com/Gowreesh-VT",
    "https://www.linkedin.com/in/gowreesh-v-t/",
    "https://twitter.com/GowreeshVT"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Bannari Amman Institute Of Technology"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Erode",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "email": "vt.gowreesh43@gmail.com",
  "telephone": "+91-8300144343"
};

// WebSite Schema - Site information
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Gowreesh V T Portfolio",
  "url": "https://gowreesh.works",
  "description": "Professional portfolio showcasing web development projects, skills, and achievements",
  "author": {
    "@type": "Person",
    "name": "Gowreesh V T"
  },
  "inLanguage": "en-US",
  "copyrightYear": 2025,
  "copyrightHolder": {
    "@type": "Person",
    "name": "Gowreesh V T"
  }
};

// Portfolio Projects Schema
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Gowreesh V T - Web Development Portfolio",
  "creator": {
    "@type": "Person",
    "name": "Gowreesh V T"
  },
  "description": "Collection of professional web development projects including Netflix Clone, Smart Home Dashboard, E-commerce platforms, and more",
  "keywords": "web development, portfolio, front-end development, JavaScript, React, UI/UX design",
  "url": "https://gowreesh.works/#portfolio"
};

// Professional Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Person",
    "name": "Gowreesh V T",
    "url": "https://gowreesh.works"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Design",
          "description": "Captivating websites that blend style and functionality"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development",
          "description": "Functional and dynamic websites with seamless user experience"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "UI/UX Design",
          "description": "User-friendly interfaces that enhance the user experience"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Branding",
          "description": "Unique brand identity from logos to brand guidelines"
        }
      }
    ]
  }
};

// Function to inject schemas into the page
function injectStructuredData() {
  const schemas = [
    personSchema,
    websiteSchema,
    portfolioSchema,
    serviceSchema
  ];

  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });

  console.log('✅ Structured data (JSON-LD) injected successfully');
}

// Inject schemas when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStructuredData);
} else {
  injectStructuredData();
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    personSchema,
    websiteSchema,
    portfolioSchema,
    serviceSchema
  };
}
