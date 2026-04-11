/* ============================================
   CÍA LA GALERNA — animaciones.js
   Scroll-driven reveals con GSAP ScrollTrigger
   UI/UX: Parallax Storytelling + Kinetic Typography
   ============================================ */

(function () {
  'use strict';

  // Reducción de movimiento — no animar
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('load', function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    /* ── HERO: vídeo se desvanece → imagen de focos ─────────── */
    (function heroVideoToSpotlight() {
      var heroVideo = document.getElementById('hero-video');
      var spotlight = document.getElementById('hero-spotlight');
      if (!heroVideo || !spotlight) return;

      setTimeout(function () {
        heroVideo.style.opacity = '0';
        spotlight.style.opacity = '0.85';
        setTimeout(function () {
          heroVideo.pause();
        }, 2200);
      }, 10000);
    })();

    /* ── HERO: entrada cinética al cargar ──────────────────── */
    const heroTl = gsap.timeline({ delay: 0.3 });

    heroTl
      .to('.hero-titulo', {
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
      })
      .to('.hero-subtitulo', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.8')
      .to('.hero-cta', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5')
      .to('.hero-arrow-down', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.3');

    /* ── HERO: parallax del vídeo/spotlight al hacer scroll ── */
    gsap.to('#hero-video, #hero-spotlight', {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    /* ── HERO: título se desvanece al salir ────────────────── */
    gsap.to('.hero-content', {
      opacity: 0,
      y: -60,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: '#hero',
        start: '40% top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    /* ── Función: reveal de imagen con clip-path + scale ──── */
    function revealMedia(el, delay) {
      gsap.fromTo(el, 
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.4,
          ease: 'power3.inOut',
          delay: delay || 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      // Subtle scale-up on the image/video inside
      var inner = el.querySelector('img, video, .carousel');
      if (inner) {
        gsap.fromTo(inner,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.8,
            ease: 'power2.out',
            delay: delay || 0,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }

    /* ── Función: reveal de contenido de texto ────────────── */
    function revealContent(el, delay) {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: delay || 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    /* ── Función: parallax suave en imágenes ─────────────── */
    function parallaxMedia(el) {
      gsap.fromTo(el.querySelector('img'),
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    /* ── CIRCO Y TEATRO ──────────────────────────────────── */
    const circoMedia = document.querySelector('#circo-teatro .reveal-media');
    const circoContent = document.querySelector('#circo-teatro .reveal-content');
    if (circoMedia) revealMedia(circoMedia, 0);
    if (circoContent) revealContent(circoContent, 0.2);

    /* ── PASACALLES ────────────────────────────────────────── */
    const pasaMedia = document.querySelector('#pasacalles .reveal-media');
    const pasaContent = document.querySelector('#pasacalles .reveal-content');
    if (pasaMedia) revealMedia(pasaMedia, 0);
    if (pasaContent) revealContent(pasaContent, 0.2);

    /* ── MARIONETAS ───────────────────────────────────────── */
    const marioMedia = document.querySelector('#marionetas .reveal-media');
    const marioContent = document.querySelector('#marionetas .reveal-content');
    if (marioMedia) revealMedia(marioMedia, 0);
    if (marioContent) revealContent(marioContent, 0.2);

    /* ── TALLERES ──────────────────────────────────────────── */
    const talleresMedia = document.querySelector('#talleres .reveal-media');
    if (talleresMedia) revealMedia(talleresMedia, 0);
    const talleresContent = document.querySelector('#talleres .reveal-content');
    if (talleresContent) revealContent(talleresContent, 0.2);

    /* ── NOSOTROS ──────────────────────────────────────────── */
    const nosotrosMedia = document.querySelector('#nosotros .reveal-media');
    const nosotrosContent = document.querySelector('#nosotros .reveal-content');
    if (nosotrosMedia) revealMedia(nosotrosMedia, 0);
    if (nosotrosMedia) parallaxMedia(nosotrosMedia);
    if (nosotrosContent) revealContent(nosotrosContent, 0.25);

    /* ── CARRUSELES: inicialización automática ─────────────── */
    document.querySelectorAll('.carousel').forEach(function (carousel) {
      var slides = carousel.querySelectorAll('.carousel-slide');
      var dotsContainer = carousel.querySelector('.carousel-dots');
      var prevBtn = carousel.querySelector('.carousel-prev');
      var nextBtn = carousel.querySelector('.carousel-next');
      if (slides.length < 2) return;

      var currentIndex = 0;
      var autoplayInterval = parseInt(carousel.dataset.autoplay) || 5000;

      // Create dots
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
        var oldVideo = slides[currentIndex].querySelector('video');
        if (oldVideo) oldVideo.pause();

        currentIndex = index;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        var newVideo = slides[currentIndex].querySelector('video');
        if (newVideo) newVideo.play();
      }

      function next() {
        goTo((currentIndex + 1) % slides.length);
      }

      function prev() {
        goTo((currentIndex - 1 + slides.length) % slides.length);
      }

      // Arrow buttons
      if (prevBtn) prevBtn.addEventListener('click', function () { resetTimer(); prev(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { resetTimer(); next(); });

      // Autoplay
      var timer = setInterval(next, autoplayInterval);
      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, autoplayInterval);
      }
      carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
      carousel.addEventListener('mouseleave', function () { timer = setInterval(next, autoplayInterval); });
    });

    /* ── Línea divisora entre secciones (fade-in) ─────────── */
    document.querySelectorAll('.sec-divisor').forEach(function (el) {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* ── Refresh ScrollTrigger tras cargar imágenes ────────── */
    ScrollTrigger.refresh();

    /* ── Scroll al hash si venimos de otra página ──────────── */
    var hash = window.location.hash;
    if (hash) {
      var target = document.querySelector(hash);
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  });

})();
