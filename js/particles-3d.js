(function() {
    'use strict';
    
    if (window.particlesInitialized) {
        return;
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        return;
    }
    
    let retryCount = 0;
    const maxRetries = 50;
    let initializationStarted = false;
    
    function initParticles() {
        if (initializationStarted) {
            return;
        }
        
        if (typeof THREE === 'undefined') {
            retryCount++;
            if (retryCount < maxRetries) {
                setTimeout(initParticles, 100);
            }
            return;
        }
        
        initializationStarted = true;
        
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        let scene, camera, renderer, particles;
        let mouseX = 0, mouseY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        
        scene = new THREE.Scene();
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        const fogColor = isDarkMode ? 0x0a0a0a : 0xf5f5f5;
        scene.fog = new THREE.Fog(fogColor, 1, 2000);
        
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 1000;
        
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const color = new THREE.Color();
        
        // Optimize particle count for mobile devices
        const isMobile = window._particlesMobileMode || false;
        const particleCount = isMobile ? 300 : 1000;
        
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;
            
            positions.push(x, y, z);
            
            if (isDarkMode) {
                color.setHSL(0.55 + Math.random() * 0.2, 0.7, 0.6 + Math.random() * 0.2);
            } else {
                color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.3 + Math.random() * 0.2);
            }
            
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: isMobile ? 2 : 3,
            vertexColors: true,
            transparent: true,
            opacity: isMobile ? 0.8 : 1.0,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        particles = new THREE.Points(geometry, material);
        scene.add(particles);
        
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            alpha: true, 
            antialias: !isMobile // Disable antialiasing on mobile for better performance
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Limit pixel ratio on mobile to improve performance
        renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio);
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - windowHalfX) * 0.5;
            mouseY = (e.clientY - windowHalfY) * 0.5;
        });
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        window.addEventListener('themeChanged', () => {
            const newIsDarkMode = document.documentElement.classList.contains('dark-mode');
            const newFogColor = newIsDarkMode ? 0x0a0a0a : 0xf5f5f5;
            scene.fog.color.setHex(newFogColor);
            
            const newColors = [];
            for (let i = 0; i < particleCount; i++) {
                if (newIsDarkMode) {
                    color.setHSL(0.55 + Math.random() * 0.2, 0.7, 0.6 + Math.random() * 0.2);
                } else {
                    color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.3 + Math.random() * 0.2);
                }
                newColors.push(color.r, color.g, color.b);
            }
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(newColors, 3));
        });
        
        const rotationSpeed = isMobile ? 0.5 : 1; // Slower rotation on mobile
        const cameraSpeed = isMobile ? 0.03 : 0.05; // Slower camera movement on mobile
        
        function animate() {
            requestAnimationFrame(animate);
            
            particles.rotation.x += 0.0003 * rotationSpeed;
            particles.rotation.y += 0.0005 * rotationSpeed;
            
            camera.position.x += (mouseX - camera.position.x) * cameraSpeed;
            camera.position.y += (-mouseY - camera.position.y) * cameraSpeed;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        }
        
        animate();
        window.particlesInitialized = true;
    }
    
    function startInit() {
        if (!initializationStarted && !window.particlesInitialized) {
            setTimeout(initParticles, 50);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startInit);
        window.addEventListener('load', startInit);
    } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
        startInit();
    }
})();
