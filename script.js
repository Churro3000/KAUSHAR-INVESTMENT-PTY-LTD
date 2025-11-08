function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Toggle mobile menu visibility with smooth animation
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('show'); // toggle the 'show' class
}

// Disable right-click on the logo
const logo = document.querySelector('.logo'); // selects your logo element

logo.addEventListener('contextmenu', function(e) {
  e.preventDefault(); // prevents the default right-click menu
  alert("Right-click disabled on the logo!"); // optional message
});
