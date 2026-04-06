/* ============================================
   CÍA LA GALERNA — main.js
   Inicialización de GSAP y ScrollTrigger
   ============================================ */

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

// Configuración global
gsap.config({
  nullTargetWarn: false,
});

// Ajustes de ScrollTrigger
ScrollTrigger.config({
  ignoreMobileResize: true,
});

// Actualizar ScrollTrigger al cargar imágenes
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
