// secure.js - Targeted image protection + dev tools block

// List of protected image filenames (add yours here)
const protectedImages = [
  'hikvision_cam1.png',
  'HybridSmartCam.png',
  'SirenCam.png',
  '4Intercom.png',
  'SmartCam24h.png',
  'TurboCamInOut.png',
  'TwoWayCam.png',
  // ... add the rest from your list
];

// 1. Block right-click on specific images
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') {
    const src = e.target.src || '';
    const filename = src.split('/').pop(); // get just the filename

    if (protectedImages.includes(filename)) {
      e.preventDefault();
      // Optional: show a tiny non-intrusive message
      // alert("Image is protected. Please inquire for full details.");
      return false;
    }
  }
}, false);

// 2. Block F12 and common dev tools shortcuts (site-wide)
function blockDevTools(e) {
  // F12
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }

  // Ctrl + Shift + I / J / C / K
  if (e.ctrlKey && e.shiftKey && 
      (e.key.toLowerCase() === 'i' || 
       e.key.toLowerCase() === 'j' || 
       e.key.toLowerCase() === 'c' || 
       e.key.toLowerCase() === 'k')) {
    e.preventDefault();
    return false;
  }

  // Ctrl + U (view source)
  if (e.ctrlKey && e.key.toLowerCase() === 'u') {
    e.preventDefault();
    return false;
  }

  // Ctrl + S (save page)
  if (e.ctrlKey && e.key.toLowerCase() === 's') {
    e.preventDefault();
    return false;
  }
}

document.addEventListener('keydown', blockDevTools, true);
