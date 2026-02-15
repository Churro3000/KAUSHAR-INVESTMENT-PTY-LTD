// secure.js - Targeted image protection + dev tools block
// Protects only the listed images from right-click + blocks common dev tools shortcuts

// ==================== YOUR PROTECTED IMAGE FILENAMES ====================
const protectedImages = [
  "100p_tools1.png",
  "100p_tools2.png",
  "4Intercom.png",
  "529f84e271a84ef9b1e3a10e14369fe0.jpg",
  "7100DVR.png",
  "AcuSenceDVR.png",
  "Angle_grinder.png",
  "Cable100m.png",
  "CamSystem.png",
  "Camera2_slide.png",
  "Camera_ad.png",
  "Camp-chairs_ad.png",
  "Controllers_ad.png",
  "Controllers_slide.png",
  "CordlessDrill.png",
  "CordlessWrench1.png",
  "CordlessWrench2.png",
  "CovertCam.png",
  "DoubleSideT1.png",
  "DoubleSideT2.png",
  "DoubleSideT3.png",
  "Drone_ad.png",
  "DualSolarCam.png",
  "EasyLinkWiFi.png",
  "Electric_drill550.png",
  "FoldingShovel1.png",
  "FoldingShovel2.png",
  "FoldingShovel3.png",
  "Foot_pump1.png",
  "Foot_pump2.png",
  "Foot_pump3.png",
  "Generator_2800.png",
  "Generator_5500.png",
  "Generator_7500.png",
  "Generator_ad.png",
  "Generator_slide.png",
  "HiddenNetCam.png",
  "Hikvision_cam1.png",
  "Hikvision_cam2.png",
  "Hikvision_cam3.png",
  "Hikvision_slide.png",
  "HorusdyTool1.png",
  "HorusdyTool2.png",
  "HorusdyTool3.png",
  "Howear_watch1.png",
  "Howear_watch2.png",
  "HybridDVR.png",
  "HybridSmartCam.png",
  "Impact_drill680.png",
  "Impact_drill810.png",
  "Impact_wrench1.png",
  "Impact_wrench2.png",
  "JortanCam.png",
  "K_Logo_Web.png",
  "Keyboards_slide.png",
  "Koosda_Tripod_slide.png",
  "Koosda_ad.png",
  "Koosda_slide.png",
  "MarbleCutter1.png",
  "MarbleCutter2.png",
  "MarbleCutter3.png",
  "MarbleCutter4.png",
  "MasakiAngleGrinder.png",
  "MasakiChainsaw.png",
  "Mowana_park.webp",
  "PTZCam.png",
  "Projector1.png",
  "Projector2.png",
  "Projectors_slide.png",
  "SafetyGoggles1.png",
  "SafetyGoggles2.png",
  "SafetyGoggles3.png",
  "SirenCam.png",
  "SmartCam24h.png",
  "SmartNetCam.png",
  "Spraycan_slide.png",
  "THE_LOGO_BIG - Copy.png",
  "THE_LOGO_BIG.png",
  "Tools_ad.png",
  "TurboCamInOut.png",
  "TwoWayCam.png",
  "Watches_slide.png",
  "WirelessSmartCam.png",
  "Y_projector1.png",
  "Y_projector2.png",
  "camp_ad.png",
  "drones_slide.png",
  "hardware_ad.png",
  "in_p1.jpg",
  "in_p2.jpg",
  "in_p3.jpg",
  "in_p4.jpg",
  "in_p5.jpg",
  "in_p6.jpg",
  "ingco_slide.png",
  "ingco_tools_slide.png",
  "mixed_hardware_ad.png"
];

// ==================== BLOCK RIGHT-CLICK ON PROTECTED IMAGES ====================
document.addEventListener('contextmenu', function(e) {
  if (e.target.tagName === 'IMG') {
    const src = e.target.src || e.target.currentSrc || '';
    const filename = src.split('/').pop(); // extract just the filename

    if (protectedImages.includes(filename)) {
      e.preventDefault();
      return false; // No alert/message — just silently blocks
    }
  }
}, false);

// ==================== BLOCK F12 AND COMMON DEV TOOLS SHORTCUTS ====================
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
