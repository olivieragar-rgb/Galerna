/* ============================================
   CÍA LA GALERNA — detalle.js
   Animaciones para páginas de detalle
   ============================================ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('load', function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    /* ── Cabecera: fade in ───────────────────────── */
    gsap.from('.pagina-cabecera', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });

    /* ── Secciones de detalle: reveal on scroll ──── */
    document.querySelectorAll('.detalle-seccion').forEach(function (seccion) {
      var galeria = seccion.querySelector('.detalle-galeria');
      var info = seccion.querySelector('.detalle-info');

      if (galeria) {
        gsap.from(galeria, {
          opacity: 0,
          x: seccion.classList.contains('detalle-invertida') ? 60 : -60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: seccion,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (info) {
        gsap.from(info, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: seccion,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    /* ── Separadores estéticas ───────────────────── */
    var separador = document.querySelector('.esteticas-separador');
    if (separador) {
      gsap.from(separador, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: separador,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    /* ── CTA final ───────────────────────────────── */
    var ctaFinal = document.querySelector('.pagina-cta-final');
    if (ctaFinal) {
      gsap.from(ctaFinal, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaFinal,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }

    ScrollTrigger.refresh();
  });
})();
