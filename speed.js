// speed.js - Maximum aggressive preloading for ALL images site-wide
// Goal: zero perceived loading delay - images start downloading instantly with top priority

(function() {
  'use strict';

  // Run as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadAllImages);
  } else {
    preloadAllImages();
  }

  function preloadAllImages() {
    // Helper: create high-priority preload link
    function preload(src) {
      if (!src || typeof src !== 'string' || src.trim() === '') return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src.trim();
      link.fetchPriority = 'high';           // Highest priority in supported browsers
      link.crossOrigin = 'anonymous';        // Helps with caching & parallel loading
      document.head.appendChild(link);
    }

    // 1. Preload from ALL product cards (using data-images attribute)
    document.querySelectorAll('.product-card').forEach(card => {
      const imagesData = card.getAttribute('data-images');
      if (imagesData) {
        try {
          const images = JSON.parse(imagesData);
          if (Array.isArray(images)) {
            images.forEach(preload);
          }
        } catch (e) {
          // Silent fail - don't break anything
        }
      }
    });

    // 2. Preload ALL slideshow images (hardcoded + any found in .slide img)
    const slideshowImages = [
      "images.web/Hikvision_slide.png",
      "images.web/drones_slide.png",
      "images.web/Controllers_slide.png",
      "images.web/Koosda_slide.png",
      "images.web/Watches_slide.png",
      "images.web/Projectors_slide.png",
      "images.web/ingco_tools_slide.png",
      "images.web/Generator_slide.png",
      "images.web/Camera2_slide.png",
      "images.web/Koosda_Tripod_slide.png",
      "images.web/Spraycan_slide.png",
      "images.web/Keyboards_slide.png"
    ];
    slideshowImages.forEach(preload);

    // 3. Preload any direct <img> src found (hero, category buttons, about, etc.)
    document.querySelectorAll('img[src]').forEach(img => {
      if (img.src) preload(img.src);
    });

    // 4. Extra aggressive pass: re-preload visible images in next animation frame
    requestAnimationFrame(() => {
      document.querySelectorAll('.product-image, .slide img, .modal-main-image, img').forEach(img => {
        if (img.src) preload(img.src);
      });
    });

    // 5. One final safety net: preload again after full load (catches dynamic images)
    window.addEventListener('load', () => {
      document.querySelectorAll('img[src]').forEach(img => {
        if (img.src) preload(img.src);
      });
    }, { once: true });
  }
})();
