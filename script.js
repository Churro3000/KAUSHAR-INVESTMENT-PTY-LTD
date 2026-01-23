// Smooth Scroll to Section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`scrollToSection: No element found with id "${id}"`);
  }
}

// Toggle Mobile Menu Visibility
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('show');
  } else {
    console.warn('toggleMobileMenu: No element found with id "mobileMenu"');
  }
}

// Optional: Close mobile menu when clicking a menu link
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
      });
    });
  }
});

// ==================== SLIDESHOW AUTO-SLIDE & EVEN-UNEVEN FIX ====================
const slideshowTrack = document.querySelector('.slideshow-track');
const slideshowSlides = Array.from(document.querySelectorAll('.slide'));

let slideshowIndex = 0;
let slideshowInterval;

function startSlideshow() {
  clearInterval(slideshowInterval);
  slideshowInterval = setInterval(() => {
    nextSlideshowSlide();
  }, 2500); // Auto-slide every 2.5 seconds
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
}

function nextSlideshowSlide() {
  const slidesPerView = window.innerWidth <= 768 ? 1 : 3;
  const totalSlides = slideshowSlides.length;

  // Calculate next position
  slideshowIndex += slidesPerView;

  // If near end, loop back to start (smooth infinite feel)
  if (slideshowIndex >= totalSlides) {
    slideshowIndex = 0;
  }

  // For big screens: if last group is incomplete, repeat last images to fill
  const lastVisibleIndex = slideshowIndex + slidesPerView - 1;
  if (lastVisibleIndex >= totalSlides) {
    // Offset to show last full group + repeat end if needed
    slideshowIndex = totalSlides - slidesPerView;
    if (slideshowIndex < 0) slideshowIndex = 0;
  }

  updateSlideshowPosition();
}

function prevSlideshowSlide() {
  const slidesPerView = window.innerWidth <= 768 ? 1 : 3;
  slideshowIndex -= slidesPerView;
  if (slideshowIndex < 0) slideshowIndex = 0;
  updateSlideshowPosition();
}

function updateSlideshowPosition() {
  if (slideshowSlides.length === 0) return;
  const slideWidth = slideshowSlides[0].offsetWidth;
  slideshowTrack.style.transform = `translateX(-${slideshowIndex * slideWidth}px)`;
}

// Touch swipe for slideshow
let slideshowStartX = 0;
slideshowTrack.addEventListener('touchstart', (e) => {
  stopSlideshow();
  slideshowStartX = e.touches[0].clientX;
});

slideshowTrack.addEventListener('touchend', (e) => {
  const diff = slideshowStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextSlideshowSlide();
    else prevSlideshowSlide();
  }
  startSlideshow();
});

// Handle resize & initial load
window.addEventListener('resize', () => {
  updateSlideshowPosition();
});
window.addEventListener('load', () => {
  updateSlideshowPosition();
  startSlideshow();
});

// THE INDEX FILE SCRIPT CODES (DO NOT CHANGE) 
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.ads-track');
  const slides = document.querySelectorAll('.ad-slide');
  const dotsContainer = document.querySelector('.ad-dots');
  const prevBtn = document.querySelector('.ad-prev');
  const nextBtn = document.querySelector('.ad-next');

  let currentIndex = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
});

// Featured Products Carousel – same logic as advertiser
document.addEventListener('DOMContentLoaded', () => {
  const featTrack = document.querySelector('.featured-track');
  const featSlides = document.querySelectorAll('.featured-slide');
  const featPrev = document.querySelector('.feat-prev');
  const featNext = document.querySelector('.feat-next');

  let featIndex = 0;

  function updateFeatured() {
    if (featTrack && featSlides.length > 0) {
      featTrack.style.transform = `translateX(-${featIndex * 100}%)`;
    }
  }

  if (featPrev) {
    featPrev.addEventListener('click', () => {
      featIndex = (featIndex - 1 + featSlides.length) % featSlides.length;
      updateFeatured();
    });
  }

  if (featNext) {
    featNext.addEventListener('click', () => {
      featIndex = (featIndex + 1) % featSlides.length;
      updateFeatured();
    });
  }
});
