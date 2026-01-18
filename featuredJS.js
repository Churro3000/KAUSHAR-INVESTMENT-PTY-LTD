// ==================== CAROUSEL SLIDING LOGIC ====================
const grid = document.getElementById('productsGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentPosition = 0; // Tracks how far we've slid in pixels

function getSlideWidth() {
  const card = grid.querySelector('.product-card');
  if (!card) return 350; // fallback
  const cardWidth = card.offsetWidth;
  const gap = 20; // smaller gap on mobile for better alignment
  // On mobile: slide exactly one full card
  if (window.innerWidth <= 768) {
    return cardWidth + gap; // more precise – uses actual gap
  }
  // On desktop: slide 4 cards
  else {
    return (cardWidth + 30) * 4; // desktop gap is 30px
  }
}

// Calculate max scroll position (negative value)
let maxPosition = 0;
function updateMaxPosition() {
  const totalWidth = grid.scrollWidth;
  const visibleWidth = grid.parentElement.offsetWidth;
  maxPosition = -(totalWidth - visibleWidth);
  // If content fits fully, disable next from start
  if (maxPosition >= 0) maxPosition = 0;
}

// Run on load and resize (handles mobile orientation change / layout shift)
window.addEventListener('load', updateMaxPosition);
window.addEventListener('resize', updateMaxPosition);

nextBtn.addEventListener('click', () => {
  const slideAmount = getSlideWidth();
  const newPosition = currentPosition - slideAmount;
  // Only slide if we haven't reached the end yet
  if (newPosition >= maxPosition) {
    currentPosition = newPosition;
    grid.style.transform = `translateX(${currentPosition}px)`;
  }
  // else: already at end → do nothing (no more swipe)
});

prevBtn.addEventListener('click', () => {
  if (currentPosition >= 0) return; // already at start
  const slideAmount = getSlideWidth();
  currentPosition += slideAmount;
  grid.style.transform = `translateX(${currentPosition}px)`;
});

// ==================== MODAL POPUP LOGIC ====================
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
    currentImages = JSON.parse(card.dataset.images || '[]');
    currentIndex = 0;
    modalTitle.textContent = card.dataset.title || 'Product';
    modalDesc.textContent = card.dataset.desc || '';
    modalPrice.textContent = card.dataset.price || '';
    updateModalImage();
    modal.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

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
