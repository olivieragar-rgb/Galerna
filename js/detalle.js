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

    /* ── CARRUSELES en páginas de detalle ─────────── */
    document.querySelectorAll('.carousel').forEach(function (carousel) {
      var slides = carousel.querySelectorAll('.carousel-slide');
      var dotsContainer = carousel.querySelector('.carousel-dots');
      var prevBtn = carousel.querySelector('.carousel-prev');
      var nextBtn = carousel.querySelector('.carousel-next');
      if (slides.length < 2) return;

      var currentIndex = 0;
      var autoplayInterval = parseInt(carousel.dataset.autoplay) || 5000;

      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsContainer.appendChild(dot);
      });

      var dots = dotsContainer.querySelectorAll('.carousel-dot');

      function goTo(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = index;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
      }

      function next() { goTo((currentIndex + 1) % slides.length); }
      function prev() { goTo((currentIndex - 1 + slides.length) % slides.length); }

      if (prevBtn) prevBtn.addEventListener('click', function () { resetTimer(); prev(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { resetTimer(); next(); });

      var timer = setInterval(next, autoplayInterval);
      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, autoplayInterval);
      }
      carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
      carousel.addEventListener('mouseleave', function () { timer = setInterval(next, autoplayInterval); });
    });

    ScrollTrigger.refresh();
  });
})();
