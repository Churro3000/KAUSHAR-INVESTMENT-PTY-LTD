// Advert Carousel Logic
const track = document.getElementById('adsTrack');
const prevBtn = document.getElementById('adPrev');
const nextBtn = document.getElementById('adNext');
const dotsContainer = document.getElementById('adDots');
let currentIndex = 0;
const slides = track.children.length;

// Create dots
for (let i = 0; i < slides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
  dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll('.dot');

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides) % slides;
  updateCarousel();
});

// Mobile swipe support
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

track.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  const threshold = 60; // swipe sensitivity

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // Swipe left → next
      currentIndex = (currentIndex + 1) % slides;
    } else {
      // Swipe right → previous
      currentIndex = (currentIndex - 1 + slides) % slides;
    }
    updateCarousel();
  }
}
