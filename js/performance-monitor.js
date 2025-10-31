// if ('PerformanceObserver' in window && window.location.hostname !== 'localhost') {

//   const lcpObserver = new PerformanceObserver((list) => {
//     const entries = list.getEntries();
//     const lastEntry = entries[entries.length - 1];
    
//     console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    
//     if (typeof gtag !== 'undefined') {
//       gtag('event', 'LCP', {
//         event_category: 'Web Vitals',
//         value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
//         event_label: 'Largest Contentful Paint'
//       });
//     }
//   });
  
//   lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

//   const fidObserver = new PerformanceObserver((list) => {
//     const entries = list.getEntries();
//     entries.forEach((entry) => {
//       const fid = entry.processingStart - entry.startTime;
//       console.log('FID:', fid);
      
//       if (typeof gtag !== 'undefined') {
//         gtag('event', 'FID', {
//           event_category: 'Web Vitals',
//           value: Math.round(fid),
//           event_label: 'First Input Delay'
//         });
//       }
//     });
//   });
  
//   fidObserver.observe({ entryTypes: ['first-input'] });

//   let clsScore = 0;
//   const clsObserver = new PerformanceObserver((list) => {
//     for (const entry of list.getEntries()) {
//       if (!entry.hadRecentInput) {
//         clsScore += entry.value;
//       }
//     }
//     console.log('CLS:', clsScore);
//   });
  
//   clsObserver.observe({ entryTypes: ['layout-shift'] });

//   window.addEventListener('beforeunload', () => {
//     if (typeof gtag !== 'undefined') {
//       gtag('event', 'CLS', {
//         event_category: 'Web Vitals',
//         value: Math.round(clsScore * 1000),
//         event_label: 'Cumulative Layout Shift'
//       });
//     }
//   });

//   window.addEventListener('load', () => {
//     setTimeout(() => {
//       const perfData = performance.getEntriesByType('navigation')[0];
      
//       if (perfData) {
//         const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
//         const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
//         const tcpTime = perfData.connectEnd - perfData.connectStart;
//         const ttfb = perfData.responseStart - perfData.requestStart;
        
//         console.log('Performance Metrics:', {
//           pageLoadTime: Math.round(pageLoadTime),
//           dnsTime: Math.round(dnsTime),
//           tcpTime: Math.round(tcpTime),
//           ttfb: Math.round(ttfb),
//           domInteractive: Math.round(perfData.domInteractive - perfData.fetchStart),
//           domComplete: Math.round(perfData.domComplete - perfData.fetchStart)
//         });
        
//         if (typeof gtag !== 'undefined') {
//           gtag('event', 'timing_complete', {
//             name: 'page_load',
//             value: Math.round(pageLoadTime),
//             event_category: 'Performance'
//           });
//         }
//       }
//     }, 0);
//   });
// }

// window.addEventListener('load', () => {
//   setTimeout(() => {
//     const resources = performance.getEntriesByType('resource');
//     const slowResources = resources.filter(r => r.duration > 1000);
    
//     if (slowResources.length > 0) {
//       console.warn('Slow Resources (>1s):', slowResources.map(r => ({
//         name: r.name,
//         duration: Math.round(r.duration),
//         size: r.transferSize
//       })));
//     }
//   }, 2000);
// });
