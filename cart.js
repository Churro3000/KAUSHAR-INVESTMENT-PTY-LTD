// cart.js - Shopping cart logic (localStorage, slide menu, inquire, modal support)

document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.querySelector('#cart-icon');
  const cartMenu = document.querySelector('#cart-menu');
  const cartContent = document.querySelector('#cart-content');
  const cartCount = document.querySelector('#cart-count');
  const inquireBtn = document.querySelector('#inquire-cart');

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // Update cart count badge
  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.length;
      cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
  }

  // Render cart menu content (stacked bars with image + title)
  function renderCart() {
    if (!cartContent) return;
    cartContent.innerHTML = '';
    cart.forEach(product => {
      const bar = document.createElement('div');
      bar.style = 'display: flex; align-items: center; gap: 15px; padding: 15px; background: #f9f9f9; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';
      bar.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="width: 60px; height: 60px; object-fit: contain; border-radius: 6px;">
        <span style="font-weight: 600; font-size: 1rem; color: #333;">${product.title}</span>
      `;
      cartContent.appendChild(bar);
    });
    updateCartCount();
  }

  // Open/close cart menu
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      if (cartMenu) {
        cartMenu.style.transform = 'translateX(0)';
      }
    });
  }

  if (cartMenu) {
    cartMenu.addEventListener('click', (e) => {
      if (e.target === cartMenu) {
        cartMenu.style.transform = 'translateX(100%)';
      }
    });
  }

  // Inquire button - open WhatsApp with product titles
  if (inquireBtn) {
    inquireBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
      }
      const titles = cart.map(p => p.title).join(', ');
      const message = encodeURIComponent(`Good day, I'd like to inquire about the following products: ${titles}`);
      window.open(`https://wa.me/26771665187?text=${message}`, '_blank');
    });
  }

  // Add to cart buttons (on product cards AND in modal popup)
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      // Find the product card or modal container
      const container = btn.closest('.product-card') || btn.closest('.modal-content');
      if (!container) return;

      const product = {
        title: container.dataset.title || container.querySelector('#modalTitle')?.textContent || 'Unknown Product',
        image: container.querySelector('.product-image')?.src || container.querySelector('#modalImage')?.src || ''
      };

      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
      alert('Added to cart!');
    });
  });

  // Initial render on page load
  renderCart();
});
