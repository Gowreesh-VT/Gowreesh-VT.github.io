/**
 * Breadcrumb Schema (JSON-LD) for SEO
 * Improves search result display and site navigation understanding
 */

// Breadcrumb List Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://gowreesh.me"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://gowreesh.me#about"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Resume",
      "item": "https://gowreesh.me#resume"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Portfolio",
      "item": "https://gowreesh.me#portfolio"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Services",
      "item": "https://gowreesh.me#services"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "Blog",
      "item": "https://gowreesh.me#blog"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "Contact",
      "item": "https://gowreesh.me#contact"
    }
  ]
};

// Function to inject breadcrumb schema
function injectBreadcrumbSchema() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(breadcrumbSchema);
  document.head.appendChild(script);
}

// Inject schema when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectBreadcrumbSchema);
} else {
  injectBreadcrumbSchema();
}

// Export for potential use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { breadcrumbSchema };
}
