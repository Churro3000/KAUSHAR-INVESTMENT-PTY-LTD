// speed.js - Ultra-fast image preloading for product cards & slideshow
// Loads ALL visible product images + slideshow images with maximum priority on page load

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preload ALL images from product cards (using data-images attribute)
  document.querySelectorAll('.product-card').forEach(card => {
    const imagesData = card.getAttribute('data-images');
    if (imagesData) {
      try {
        const images = JSON.parse(imagesData);
        images.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          link.fetchPriority = 'high'; // highest priority (Chrome/Edge/Safari support)
          document.head.appendChild(link);
        });
      } catch (e) {
        console.warn('Invalid data-images JSON in product card:', e);
      }
    }
  });

  // 2. Preload slideshow images (hardcoded list for maximum speed)
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

  slideshowImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });

  // Optional: Force browser to prioritize visible images even more
  requestAnimationFrame(() => {
    document.querySelectorAll('.product-image, .slide img').forEach(img => {
      if (img.src) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = img.src;
        preloadLink.fetchPriority = 'high';
        document.head.appendChild(preloadLink);
      }
    });
  });
});
