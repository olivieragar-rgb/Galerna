/* ============================================
   CÍA LA GALERNA — carpa.js
   La carpa cubre toda la pantalla.
   Al hacer scroll, las dos mitades se abren
   revelando la foto hero y el contenido.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const lonaIzq     = document.getElementById('carpa-lona-izq');
  const lonaDer     = document.getElementById('carpa-lona-der');
  const sombra      = document.getElementById('carpa-sombra');
  const centro      = document.getElementById('carpa-centro');
  const entradaLogo = document.querySelector('.entrada-logo');
  const scrollHint  = document.querySelector('.scroll-hint');
  const resplandor  = document.getElementById('escena-resplandor');
  const fotoHero    = document.getElementById('escena-foto-hero');
  const entrada     = document.getElementById('entrada');

  if (!lonaIzq || !lonaDer) return;

  // ── Fijar #entrada mientras dura la apertura ─────────────
  ScrollTrigger.create({
    trigger: '#escena-principal',
    start: 'top top',
    end: 'bottom top',
    pin: '#entrada',
    pinSpacing: false,
  });

  // ── Timeline principal (controlada por scroll) ───────────
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#escena-principal',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  // 0 → 0.15  Logo y hint se desvanecen
  tl.to([entradaLogo, scrollHint], {
    opacity: 0,
    y: -20,
    duration: 0.15,
    ease: 'power2.in',
  }, 0);

  // 0.05 → 0.4  Resplandor aparece (tensión antes de abrirse)
  tl.to(resplandor, {
    opacity: 0.8,
    duration: 0.35,
    ease: 'power2.in',
  }, 0.05);

  // 0.15 → 0.85  Las lonas se separan — la carpa se abre
  // Desplazamos bastante para que salgan completamente del viewport
  tl.to(lonaIzq, {
    x: -600,
    duration: 0.7,
    ease: 'power3.inOut',
  }, 0.15);

  tl.to(lonaDer, {
    x: 600,
    duration: 0.7,
    ease: 'power3.inOut',
  }, 0.15);

  // Sombra y centro desaparecen al abrirse
  tl.to([sombra, centro], {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
  }, 0.15);

  // 0.3 → 0.8  Foto hero aparece debajo de las lonas al abrirse
  tl.to(fotoHero, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: 'power2.out',
  }, 0.3);

  // 0.75 → 1   Resplandor se desvanece — foto toma el protagonismo
  tl.to(resplandor, {
    opacity: 0,
    duration: 0.25,
    ease: 'power1.out',
  }, 0.75);


  // ── Estado inicial de la foto hero ───────────────────────
  gsap.set(fotoHero, { opacity: 0, scale: 1.05 });

});
