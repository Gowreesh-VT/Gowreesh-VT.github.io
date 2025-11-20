# Gowreesh V T - Portfolio Website

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fgowreesh.works)](https://gowreesh.works)
[![Firebase Hosting](https://img.shields.io/badge/Hosted%20on-Firebase-orange)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, responsive, and highly optimized personal portfolio website showcasing my skills, projects, and achievements in web development and cybersecurity.

🔗 **Live Site**: [gowreesh.works](https://gowreesh.works)

## 🌟 Features

### Core Functionality
- **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Dark/Light Theme Toggle** - Persistent theme preference with smooth transitions
- **Interactive 3D Background** - Particle system using Three.js
- **Smooth Animations** - Scroll-triggered animations and micro-interactions
- **Skills Visualization** - Interactive radar charts and skill bars
- **Dynamic Typing Effect** - Animated text introduction
- **Contact Form** - Integrated contact functionality
- **Progressive Web App (PWA)** - Installable with offline support

### Performance Optimizations
- ⚡ **Lazy Loading** - Images, modals, and third-party scripts
- 🎯 **Critical CSS** - Inlined critical styles for faster initial render
- 📦 **Asset Optimization** - Minified CSS/JS, WebP images with fallbacks
- 🚀 **Resource Hints** - DNS prefetch, preconnect, and preload directives
- 📊 **Google Analytics** - Lazy-loaded on user interaction
- 🔄 **Service Worker** - Caching strategy for improved performance

### Technical Highlights
- SEO optimized with meta tags, Open Graph, and Twitter Cards
- Structured data for better search engine indexing
- Accessibility features (ARIA labels, semantic HTML)
- Optimized font loading with `font-display: swap`
- Responsive images with `srcset` and `<picture>` elements

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, grid, flexbox
- **JavaScript (ES6+)** - Vanilla JS for functionality
- **Three.js** - 3D graphics and animations

### Libraries & Frameworks
- **jQuery** - DOM manipulation (legacy support)
- **Font Awesome 6** - Icon library
- **Google Fonts** - Typography

### Backend & Hosting
- **Firebase Hosting** - Fast and secure hosting
- **Firebase** - Backend services integration
- **Google Analytics** - Traffic and user behavior tracking

### Build Tools
- **clean-css-cli** - CSS minification
- **uglify-js** - JavaScript minification

## 📁 Project Structure

```
.
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sitemap.xml            # SEO sitemap
├── sw.js                  # Service worker
├── firebase.json          # Firebase configuration
├── package.json           # Dependencies
│
├── css/                   # Stylesheets
│   ├── critical.min.css   # Critical above-the-fold CSS
│   ├── main.min.css       # Main consolidated CSS
│   └── ...               # Component-specific styles
│
├── js/                    # JavaScript modules
│   ├── main.js           # Core functionality
│   ├── enhanced-ui.js    # UI interactions
│   ├── particles-3d.js   # 3D background
│   ├── skills-visualization.js
│   ├── lazy-loading.js   # Lazy loading logic
│   └── ...               # Other modules
│
├── images/                # Image assets (WebP optimized)
├── fonts/                 # Custom fonts
└── Resume.pdf            # Downloadable CV
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase CLI (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gowreesh-VT/Gowreesh-VT.github.io.git
   cd Gowreesh-VT.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development**
   
   Simply open `index.html` in a modern web browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

4. **Build for production**
   
   Minify CSS:
   ```bash
   npx cleancss -o css/output.min.css css/input.css
   ```
   
   Minify JavaScript:
   ```bash
   npx uglifyjs js/input.js -o js/output.min.js -c -m
   ```

### Deployment

This site is configured for Firebase Hosting:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy
firebase deploy
```

## 📊 Performance Metrics

The website is optimized for maximum performance:
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties in `css/base.css` or `css/main.css`:

```css
:root {
  --primary-color: #ff0077;
  --secondary-color: #00d9ff;
  /* ... */
}
```

### Updating Content
- **Profile Information**: Edit the `#about` section in `index.html`
- **Skills**: Modify the skill bars and radar chart data in `js/skills-visualization.js`
- **Projects**: Update the `#portfolio` section in `index.html`

### Adding Projects
Add project cards to the portfolio section following the existing structure with proper responsive images.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Gowreesh V T**
- Website: [gowreesh.works](https://gowreesh.works)
- LinkedIn: [@gowreesh](https://www.linkedin.com/in/gowreesh/)
- Twitter: [@gowreesh_vt](https://twitter.com/gowreesh_vt)
- GitHub: [@Gowreesh-VT](https://github.com/Gowreesh-VT)
- Email: vt.gowreesh43@gmail.com

## 🙏 Acknowledgments

- Three.js community for 3D graphics support
- Font Awesome for the icon library
- Firebase team for excellent hosting services
- Meta for frontend developer certification resources

## 📈 Future Enhancements

- [ ] Blog section with CMS integration
- [ ] Enhanced animations and transitions
- [ ] Multi-language support
- [ ] Advanced project filtering
- [ ] Integration with GitHub API for dynamic project showcase
- [ ] Enhanced analytics dashboard

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are always welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

**Built with ❤️ by Gowreesh V T**

*Last Updated: November 2025*
