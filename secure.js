// secure.js – Image right-click block + common dev tools disable
// Runs safely alongside other scripts (no conflicts)

// ==================== BLOCK RIGHT-CLICK ON ALL IMAGES ====================
document.addEventListener('contextmenu', function(e) {
    // Block only on <img> elements and their children
    if (e.target.closest('img')) {
        e.preventDefault();
        // Optional: show a tiny message (uncomment if you want)
        // alert("Right-click is disabled on images.");
        return false;
    }
}, false);

// ==================== BLOCK MOST COMMON DEV TOOLS SHORTCUTS ====================
// F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+Shift+K
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
}

document.addEventListener('keydown', blockDevTools, true);

// ==================== EXTRA: Block Ctrl+S (save page) ====================
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        return false;
    }
}, true);
