/**
 * Updated: November 2025
 */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gowreesh V T",
  "alternateName": "Gowreesh VT",
  "url": "https://gowreesh.works",
  "image": "https://gowreesh.works/images/profile-photo.webp",
  "jobTitle": "Full-Stack Developer & Tech Enthusiast",
  "worksFor": {
    "@type": "EducationalOrganization",
    "name": "VIT Chennai",
    "sameAs": "https://chennai.vit.ac.in/"
  },
  "description": "Passionate developer specializing in web development, cybersecurity, and emerging technologies. Currently studying at VIT Chennai, building innovative solutions with modern tech stacks.",
  "birthDate": "2007-09-24",
  "knowsAbout": [
    "Full-Stack Web Development",
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Three.js",
    "Python",
    "Node.js",
    "MySQL",
    "MongoDB",
    "Supabase",
    "Firebase",
    "Google Cloud",
    "AWS",
    "Cybersecurity",
    "Quantum Cryptography",
    "BB84 Protocol",
    "Progressive Web Apps",
    "UI/UX Design",
    "Web Performance Optimization",
    "WebGL",
    "Responsive Design"
  ],
  "knowsLanguage": [
    {
      "@type": "Language",
      "name": "English",
      "alternateName": "en"
    }
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "name": "Meta Front-End Developer Professional Certificate",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Meta"
      },
      "about": "Front-End Development, React, JavaScript"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "name": "Google UX Design Certificate",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Google"
      },
      "about": "User Experience Design, UI Design"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "name": "GitHub Foundations Certificate",
      "recognizedBy": {
        "@type": "Organization",
        "name": "GitHub"
      },
      "about": "Version Control, Git, GitHub"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "name": "MongoDB Developer Certification",
      "recognizedBy": {
        "@type": "Organization",
        "name": "MongoDB University"
      },
      "about": "Database Management, NoSQL"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certificate",
      "name": "EdX Front-End Certifications",
      "recognizedBy": {
        "@type": "Organization",
        "name": "EdX"
      },
      "about": "Front-End Development"
    }
  ],
  "sameAs": [
    "https://github.com/Gowreesh-VT",
    "https://www.linkedin.com/in/gowreesh-vt"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "VIT Chennai"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "addressCountry": "India"
  },
  "email": "vt.gowreesh43@gmail.com"
};

// WebSite Schema - Site information
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Gowreesh V T - Portfolio",
  "alternateName": "Gowreesh VT Portfolio",
  "url": "https://gowreesh.works",
  "description": "Personal portfolio showcasing web development projects, skills, certifications, and technical achievements. Specializing in full-stack development, cybersecurity, and modern web technologies.",
  "author": {
    "@type": "Person",
    "name": "Gowreesh V T"
  },
  "inLanguage": "en-US",
  "copyrightYear": 2025,
  "copyrightHolder": {
    "@type": "Person",
    "name": "Gowreesh V T"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://gowreesh.works/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Gowreesh V T - Developer Portfolio",
  "url": "https://gowreesh.works",
  "description": "Full-stack developer portfolio featuring projects in web development, cybersecurity, and emerging technologies",
  "about": {
    "@type": "Person",
    "name": "Gowreesh V T"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://gowreesh.works/images/profile-photo.webp",
    "width": 200,
    "height": 200
  },
  "datePublished": "2024-01-01",
  "dateModified": "2025-11-02",
  "inLanguage": "en-US"
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "Gowreesh V T"
  },
  "dateCreated": "2024-01-01",
  "dateModified": "2025-11-02"
};

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
          "name": "Full-Stack Web Development",
          "description": "Building responsive, modern web applications with React, Node.js, and modern frameworks"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Frontend Development",
          "description": "Creating beautiful, interactive user interfaces with HTML5, CSS3, JavaScript, and React"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Backend Development",
          "description": "Building scalable server-side applications with Python, Node.js, and databases"
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
          "name": "Progressive Web Apps",
          "description": "Building fast, reliable, and engaging web applications that work offline"
        }
      }
    ]
  }
};

function injectStructuredData() {
  const schemas = [
    personSchema,
    websiteSchema,
    webPageSchema,
    profilePageSchema,
    serviceSchema
  ];

  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStructuredData);
} else {
  injectStructuredData();
}

// Export for testing/development (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    personSchema,
    websiteSchema,
    webPageSchema,
    profilePageSchema,
    serviceSchema
  };
}
