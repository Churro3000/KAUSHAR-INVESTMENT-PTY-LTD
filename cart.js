// cart.js - Shopping cart logic (localStorage, slide menu, inquire)

document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.querySelector('#cart-icon');
  const cartMenu = document.querySelector('#cart-menu');
  const cartContent = document.querySelector('#cart-content');
  const cartCount = document.querySelector('#cart-count');
  const inquireBtn = document.querySelector('#inquire-cart');

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // Update cart count
  function updateCartCount() {
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'block' : 'none';
  }

  // Render cart menu content
  function renderCart() {
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
  cartIcon.addEventListener('click', () => {
    cartMenu.style.transform = 'translateX(0)';
  });
  cartMenu.addEventListener('click', (e) => {
    if (e.target === cartMenu) {
      cartMenu.style.transform = 'translateX(100%)';
    }
  });

  // Inquire button - open WhatsApp with product titles
  inquireBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    const titles = cart.map(p => p.title).join(', ');
    const message = encodeURIComponent(`Good day, I'd like to inquire about the following products: ${titles}`);
    window.open(`https://wa.me/26771665187?text=${message}`, '_blank');
  });

  // Add to cart buttons (on product cards)
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const product = {
        title: card.dataset.title,
        image: card.querySelector('.product-image').src
      };
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });

  // Initial render
  renderCart();
});
