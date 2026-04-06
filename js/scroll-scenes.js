/* ============================================
   CÍA LA GALERNA — scroll-scenes.js
   Animaciones de scroll para secciones de contenido
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Cartas de Pasacalles ---
  const cartas = gsap.utils.toArray('.carta');
  if (cartas.length) {
    gsap.fromTo(cartas,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#pasacalles-grid',
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // --- Espectáculos — entran desde lados alternos ---
  const espectaculos = gsap.utils.toArray('.espectaculo');
  espectaculos.forEach((el, i) => {
    const desde = i % 2 === 0 ? -60 : 60;   // izq / der alternos
    gsap.fromTo(el,
      { opacity: 0, x: desde, y: 20 },
      {
        opacity: 1, x: 0, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  // --- Teaser La Dragona ---
  const teaser = document.getElementById('dragona-teaser');
  if (teaser) {
    gsap.fromTo(teaser,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: teaser,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // --- Talleres ---
  const talleres = gsap.utils.toArray('.taller-item');
  if (talleres.length) {
    gsap.fromTo(talleres,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.talleres-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

  // --- Perfiles Nosotros ---
  const perfiles = gsap.utils.toArray('.perfil');
  if (perfiles.length) {
    gsap.fromTo(perfiles,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.nosotros-perfiles',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }

});
