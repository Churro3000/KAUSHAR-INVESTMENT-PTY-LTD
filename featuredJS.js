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
  
  if (window.innerWidth <= 768) {
    return cardWidth + gap; // mobile: one full card + gap
  } else {
    return (cardWidth + 30) * 4; // desktop: 4 cards
  }
}

// Calculate max scroll position (negative value)
function updateMaxPosition() {
  const totalWidth = grid.scrollWidth;
  const visibleWidth = grid.parentElement.offsetWidth;
  let calculatedMax = -(totalWidth - visibleWidth);
  
  // Protect against tiny negative values due to rounding
  if (calculatedMax > -1) calculatedMax = 0;
  
  return calculatedMax;
}

let maxPosition = updateMaxPosition();

// Run on load and resize
window.addEventListener('load', () => {
  maxPosition = updateMaxPosition();
});
window.addEventListener('resize', () => {
  maxPosition = updateMaxPosition();
  // Optional: snap back if window got much larger
  if (currentPosition < maxPosition) {
    currentPosition = maxPosition;
    grid.style.transform = `translateX(${currentPosition}px)`;
  }
});

nextBtn.addEventListener('click', () => {
  const slideAmount = getSlideWidth();
  const newPosition = currentPosition - slideAmount;
  
  // Recalculate fresh maxPosition before deciding (handles layout shifts)
  maxPosition = updateMaxPosition();
  
  // Allow a few pixels of tolerance so last card isn't blocked by rounding
  const tolerance = 4;
  
  if (newPosition >= maxPosition - tolerance) {
    currentPosition = newPosition;
    grid.style.transform = `translateX(${currentPosition}px)`;
  }
  // If we're very close to the end, snap exactly to maxPosition
  else if (newPosition < maxPosition && currentPosition > maxPosition) {
    currentPosition = maxPosition;
    grid.style.transform = `translateX(${currentPosition}px)`;
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPosition >= 0) return; // already at start
  
  const slideAmount = getSlideWidth();
  currentPosition += slideAmount;
  
  // Don't go beyond start
  if (currentPosition > 0) currentPosition = 0;
  
  grid.style.transform = `translateX(${currentPosition}px)`;
});

// ==================== MODAL POPUP LOGIC ====================
// (unchanged – keeping your original modal code exactly as is)

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
