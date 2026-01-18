// ==================== CAROUSEL SLIDING LOGIC ====================
const grid = document.getElementById('productsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPosition = 0;

function getSlideWidth() {
  const card = grid.querySelector('.product-card');
  if (!card) return 350;
  const cardWidth = card.offsetWidth;
  
  if (window.innerWidth <= 768) {
    const gap = 20;
    return cardWidth + gap; // mobile: 1 card
  } else {
    const gap = 30;
    return (cardWidth + gap) * 4; // desktop: ~4 cards
  }
}

function getMaxPosition() {
  const totalWidth = grid.scrollWidth;
  const containerWidth = grid.parentElement.offsetWidth;
  let maxPos = containerWidth - totalWidth; // usually negative
  if (maxPos > 0) maxPos = 0; // content fits → no scroll
  return maxPos;
}

let maxPosition = getMaxPosition();

// Recalculate on load, resize, and before important moves
window.addEventListener('load', () => { maxPosition = getMaxPosition(); });
window.addEventListener('resize', () => {
  maxPosition = getMaxPosition();
  // Snap back if needed (window got wider)
  if (currentPosition < maxPosition) {
    currentPosition = maxPosition;
    grid.style.transform = `translateX(${currentPosition}px)`;
  }
});

nextBtn.addEventListener('click', () => {
  const slide = getSlideWidth();
  const proposed = currentPosition - slide;
  maxPosition = getMaxPosition(); // fresh calculation

  // Allow small overshoot tolerance (subpixel, borders, rounding)
  const tolerance = 6;

  if (proposed >= maxPosition - tolerance) {
    // Move, but never go beyond the actual end
    currentPosition = Math.max(proposed, maxPosition);
    grid.style.transform = `translateX(${currentPosition}px)`;
  }
  // Optional: snap exactly to end if very close
  else if (Math.abs(proposed - maxPosition) < slide * 0.4) {
    currentPosition = maxPosition;
    grid.style.transform = `translateX(${currentPosition}px)`;
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPosition >= 0) return;

  const slide = getSlideWidth();
  currentPosition += slide;

  // Never go positive
  if (currentPosition > 0) currentPosition = 0;

  grid.style.transform = `translateX(${currentPosition}px)`;
});

// ==================== MOBILE-ONLY TOUCH SWIPE SUPPORT ====================
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

grid.addEventListener('touchstart', (e) => {
  if (window.innerWidth > 768) return; // mobile only
  touchStartX = e.touches[0].clientX;
  isSwiping = true;
}, { passive: true });

grid.addEventListener('touchmove', (e) => {
  if (!isSwiping || window.innerWidth > 768) return;
  // Optional: could add live drag preview here, but keeping simple for now
}, { passive: true });

grid.addEventListener('touchend', (e) => {
  if (!isSwiping || window.innerWidth > 768) return;
  isSwiping = false;
  
  touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX; // positive = swipe left (next)
  
  const swipeThreshold = 50; // pixels needed to trigger slide
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left → next
      nextBtn.click(); // reuse existing next logic
    } else {
      // Swipe right → previous
      prevBtn.click(); // reuse existing prev logic
    }
  }
}, { passive: true });

// ==================== MODAL POPUP LOGIC ====================
// Updated to match hardware.html version for better mobile display & consistency

const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.modal-close');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const dotsContainer = document.getElementById('modalDots');
let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    currentImages = JSON.parse(card.dataset.images); // hardware version doesn't use || '[]' — assumes data is clean
    currentIndex = 0;
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalPrice.textContent = card.dataset.price;
    updateModalImage();
    modal.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => modal.classList.remove('active'));

modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('active');
});

document.querySelector('.modal-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateModalImage();
});

document.querySelector('.modal-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateModalImage();
});

function updateModalImage() {
  if (currentImages.length > 0) {
    modalImg.src = currentImages[currentIndex];
  }
  dotsContainer.innerHTML = '';
  currentImages.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('modal-dot');
    if (i === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateModalImage();
    });
    dotsContainer.appendChild(dot);
  });
}
