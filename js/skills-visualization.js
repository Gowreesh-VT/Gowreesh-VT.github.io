/**
 * Skills Visualization JavaScript
 * Handles skill bar animations, radar chart, and timeline
 */

// Skills data configuration
const skillsData = {
  frontend: [
    { name: 'HTML5', icon: 'fab fa-html5', percentage: 95 },
    { name: 'CSS3', icon: 'fab fa-css3-alt', percentage: 92 },
    { name: 'JavaScript', icon: 'fab fa-js-square', percentage: 88 },
    { name: 'React', icon: 'fab fa-react', percentage: 85 },
    { name: 'Three.js', icon: 'fas fa-cube', percentage: 78 }
  ],
  backend: [
    { name: 'Python', icon: 'fab fa-python', percentage: 82 },
    { name: 'Node.js', icon: 'fab fa-node-js', percentage: 75 },
    { name: 'Firebase', icon: 'fas fa-fire', percentage: 88 },
    { name: 'MySQL', icon: 'fas fa-database', percentage: 80 },
    { name: 'MongoDB', icon: 'fas fa-leaf', percentage: 76 }
  ]
};

// Radar chart data
const radarData = {
  labels: ['Frontend', 'Backend', 'UI/UX', 'Security', 'Database', 'DevOps'],
  data: [92, 80, 88, 85, 82, 75]
};

// Learning timeline milestones
const timelineMilestones = [
  {
    year: '2021',
    title: 'Started Web Development Journey',
    description: 'Began learning HTML, CSS, and JavaScript fundamentals. Created first portfolio website.',
    skills: ['HTML', 'CSS', 'JavaScript']
  },
  {
    year: '2022',
    title: 'Frontend Frameworks & React',
    description: 'Mastered React and modern frontend development. Built multiple SPA applications.',
    skills: ['React', 'Redux', 'Webpack']
  },
  {
    year: '2023',
    title: 'Full Stack & Cloud Services',
    description: 'Expanded to backend development with Node.js and Firebase. Deployed production apps.',
    skills: ['Node.js', 'Firebase', 'MongoDB']
  },
  {
    year: '2024',
    title: 'Cybersecurity & Advanced Topics',
    description: 'Studied quantum cryptography (BB84), implemented secure authentication systems.',
    skills: ['Cybersecurity', 'Quantum', 'Auth Systems']
  },
  {
    year: '2025',
    title: 'Meta Certifications & Mastery',
    description: 'Completed Meta Front-End Developer certification. Mastering Three.js and WebGL.',
    skills: ['Three.js', 'WebGL', 'PWA']
  }
];

/**
 * Initialize skill bars animation
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Animate percentage counter
        animatePercentage(entry.target);
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => observer.observe(bar));
}

/**
 * Animate percentage counter
 */
function animatePercentage(skillBar) {
  const percentageEl = skillBar.querySelector('.skill-percentage');
  const targetPercentage = parseInt(percentageEl.textContent);
  let currentPercentage = 0;
  const duration = 2000;
  const increment = targetPercentage / (duration / 16);

  const counter = setInterval(() => {
    currentPercentage += increment;
    if (currentPercentage >= targetPercentage) {
      currentPercentage = targetPercentage;
      clearInterval(counter);
    }
    percentageEl.textContent = Math.floor(currentPercentage) + '%';
  }, 16);
}

/**
 * Create radar chart using SVG
 */
function createRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;

  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 60;
  const levels = 5;
  const angleSlice = (Math.PI * 2) / radarData.labels.length;
  
  // Detect theme mode
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  const textColor = isDarkMode ? '#ffffff' : '#1a1a1a';
  const lineColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const axisColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  
  // Draw background circles
  for (let i = levels; i > 0; i--) {
    const r = (radius / levels) * i;
    svg += `<circle cx="${center}" cy="${center}" r="${r}" 
            fill="none" stroke="${lineColor}" stroke-width="1"/>`;
  }

  // Draw axes
  radarData.labels.forEach((label, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    
    svg += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" 
            stroke="${axisColor}" stroke-width="1"/>`;
    
    // Add labels
    const labelX = center + Math.cos(angle) * (radius + 30);
    const labelY = center + Math.sin(angle) * (radius + 30);
    svg += `<text x="${labelX}" y="${labelY}" 
            fill="${textColor}" font-size="14" font-weight="600" 
            text-anchor="middle" dominant-baseline="middle">${label}</text>`;
  });

  // Draw data polygon
  let points = '';
  radarData.data.forEach((value, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    points += `${x},${y} `;
  });

  svg += `<polygon points="${points}" 
          fill="rgba(255, 0, 119, 0.3)" 
          stroke="#ff0077" stroke-width="2"
          class="radar-polygon"/>`;

  // Draw data points
  radarData.data.forEach((value, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + Math.cos(angle) * r;
    const y = center + Math.sin(angle) * r;
    
    const pointStroke = isDarkMode ? '#ffffff' : '#1a1a1a';
    svg += `<circle cx="${x}" cy="${y}" r="5" 
            fill="#ff0077" stroke="${pointStroke}" stroke-width="2"
            class="radar-point"/>`;
  });

  svg += '</svg>';
  canvas.innerHTML = svg;

  // Animate polygon
  setTimeout(() => {
    const polygon = canvas.querySelector('.radar-polygon');
    if (polygon) {
      polygon.style.opacity = '0';
      polygon.style.transform = 'scale(0)';
      polygon.style.transformOrigin = `${center}px ${center}px`;
      polygon.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        polygon.style.opacity = '1';
        polygon.style.transform = 'scale(1)';
      }, 100);
    }
  }, 500);
}

/**
 * Initialize timeline animations
 */
function initTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 200);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => observer.observe(item));
}

/**
 * Initialize all skills visualizations
 */
function initSkillsVisualization() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initSkillBars();
    
    // Create radar chart when section is visible
    const radarContainer = document.querySelector('.radar-chart-container');
    if (radarContainer) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            createRadarChart();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      observer.observe(radarContainer);
    }
    
    initTimeline();
    
    // Listen for theme changes and update radar chart
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        // Wait for theme transition
        setTimeout(() => {
          if (document.getElementById('radarChart')?.innerHTML) {
            createRadarChart();
          }
        }, 50);
      });
    }
  }
}

// Initialize
initSkillsVisualization();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initSkillsVisualization, skillsData, radarData, timelineMilestones };
}
