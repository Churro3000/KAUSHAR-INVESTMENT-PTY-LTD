//  Smooth Scroll to Section 
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
