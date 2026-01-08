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

// Slideshow --------------------------------------------------------------------------
const track = document.querySelector('.slideshow-track');
const slides = Array.from(document.querySelectorAll('.slide'));
let index = 0;
let slideInterval;
let startX = 0;
let isDragging = false;

function startSlideshow() {
  slideInterval = setInterval(nextSlide, 8000); // Changed to 4 seconds
}

function stopSlideshow() {
  clearInterval(slideInterval);
}

function nextSlide() {
  const slidesPerView = window.innerWidth <= 768 ? 1 : 3;
  index = (index + slidesPerView) % slides.length;
  updateSlidePosition();
}

function prevSlide() {
  const slidesPerView = window.innerWidth <= 768 ? 1 : 3;
  index = (index - slidesPerView + slides.length) % slides.length;
  updateSlidePosition();
}

function updateSlidePosition() {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

/* Touch events for swipe */
track.addEventListener('touchstart', (e) => {
  stopSlideshow();
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;
  if (diff > 50) {
    nextSlide();
    isDragging = false;
  } else if (diff < -50) {
    prevSlide();
    isDragging = false;
  }
});

track.addEventListener('touchend', () => {
  isDragging = false;
  startSlideshow();
});

window.addEventListener('resize', updateSlidePosition);

window.addEventListener('load', () => {
  updateSlidePosition();
  startSlideshow();
});
