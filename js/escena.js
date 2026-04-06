/* ============================================
   CÍA LA GALERNA — escena.js
   Timeline GSAP scroll-driven: 4 fases
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // POSICIONES EN LA TIMELINE (0.0 → 1.0)
  // ============================================
  const P = {
    fase1End:  0.25,
    fase2End:  0.50,
    fase3End:  0.65,
    sec2Start: 0.65, sec2End: 0.78,
    sec3Start: 0.78, sec3End: 0.83,
    sec4Start: 0.83, sec4End: 0.91,
    sec5Start: 0.91, sec5End: 1.00,
  };

  // ============================================
  // ESTRELLAS (35 elementos CSS)
  // ============================================
  function crearEstrellas() {
    const cielo = document.querySelector('.cielo');
    for (let i = 0; i < 35; i++) {
      const s    = document.createElement('div');
      s.className = 'estrella';
      const size = (Math.random() * 2.2 + 0.5).toFixed(1);
      s.style.cssText =
        `width:${size}px;height:${size}px;` +
        `top:${(Math.random() * 72).toFixed(1)}%;` +
        `left:${(Math.random() * 100).toFixed(1)}%;` +
        `--dur:${(Math.random() * 3 + 2).toFixed(1)}s;` +
        `--delay:${(Math.random() * 4).toFixed(1)}s;` +
        `--opMin:${(Math.random() * 0.3 + 0.1).toFixed(2)};` +
        `--opMax:${(Math.random() * 0.5 + 0.5).toFixed(2)};`;
      cielo.appendChild(s);
    }
  }

  // ============================================
  // TIMELINE PRINCIPAL
  // ============================================
  function initTimeline() {
    const espaciador    = document.getElementById('espaciador');
    const carpaCont     = document.getElementById('carpa-container');
    const puertaIzq     = document.getElementById('puerta-izq');
    const puertaDer     = document.getElementById('puerta-der');
    const luzInterior   = document.getElementById('luz-interior');
    const interior      = document.getElementById('interior');
    const interiorFondo = document.querySelector('.interior-fondo');
    const focoCono      = document.querySelector('.foco-cono');
    const indicador     = document.getElementById('indicador-scroll');
    const estrellas     = document.querySelectorAll('.estrella');

    // moveX: cuántos px mover cada puerta (25% del viewport)
    const moveX = window.innerWidth * 0.25;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: espaciador,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });

    // ---- FASE 1 (0 → 25%): Dolly-in ----

    // Ocultar indicador al iniciar el scroll
    tl.to(indicador, {
      opacity: 0,
      duration: P.fase1End * 0.25,
      ease: 'power2.in',
    }, 0);

    // Dolly-in: scale 0.35 → 1.0
    tl.to(carpaCont, {
      scale: 1,
      duration: P.fase1End,
      ease: 'power2.inOut',
    }, 0);

    // Estrellas se desvanecen durante la segunda mitad de fase 1
    tl.to(estrellas, {
      opacity: 0,
      duration: P.fase1End * 0.6,
      stagger: 0.008,
      ease: 'power1.in',
    }, P.fase1End * 0.4);

    // ---- FASE 2 (25% → 50%): Puertas se abren ----

    const fase2Dur = P.fase2End - P.fase1End;

    // Puerta izquierda: sale hacia la izquierda
    tl.fromTo(puertaIzq,
      { x: 0, opacity: 1 },
      { x: -moveX, opacity: 0.55, duration: fase2Dur, ease: 'power2.inOut' },
      P.fase1End
    );

    // Puerta derecha: sale hacia la derecha
    tl.fromTo(puertaDer,
      { x: 0, opacity: 1 },
      { x: moveX,  opacity: 0.55, duration: fase2Dur, ease: 'power2.inOut' },
      P.fase1End
    );

    // Luz interior: aparece cuando las puertas están a mitad
    tl.fromTo(luzInterior,
      { opacity: 0 },
      { opacity: 1, duration: fase2Dur * 0.75, ease: 'power3.out' },
      P.fase1End + fase2Dur * 0.25
    );

    // Fondo interior pergamino
    tl.fromTo(interiorFondo,
      { opacity: 0 },
      { opacity: 1, duration: fase2Dur, ease: 'power2.inOut' },
      P.fase1End
    );

    // #interior aparece (y activa pointer-events)
    tl.fromTo(interior,
      { opacity: 0 },
      {
        opacity: 1,
        duration: fase2Dur * 0.45,
        ease: 'power2.out',
        onStart() { interior.classList.add('visible'); },
      },
      P.fase1End + fase2Dur * 0.55
    );

    // ---- FASE 3 (50% → 65%): Foco + Pasacalles ----

    const fase3Dur = P.fase3End - P.fase2End;
    const sPas     = document.getElementById('s-pasacalles');
    const pasTexts = sPas
      ? sPas.querySelectorAll('.sec-etiqueta, .sec-titulo, .sec-descripcion, .sec-cta')
      : [];

    // Foco cónico aparece
    tl.fromTo(focoCono,
      { opacity: 0 },
      { opacity: 1, duration: fase3Dur * 0.3, ease: 'power2.out' },
      P.fase2End
    );

    if (sPas) {
      // Sección entera sube desde abajo y aparece
      tl.fromTo(sPas,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: fase3Dur * 0.45,
          ease: 'power2.out',
          onStart() { sPas.classList.add('activa'); },
        },
        P.fase2End + fase3Dur * 0.2
      );

      // Stagger interno en los elementos de texto
      tl.fromTo(pasTexts,
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0,
          duration: fase3Dur * 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        },
        P.fase2End + fase3Dur * 0.3
      );
    }

    // ---- FASE 4 (65% → 100%): Transiciones entre secciones ----

    function transicion(idActual, idSiguiente, inicio, duracion) {
      const actual    = document.getElementById(idActual);
      const siguiente = document.getElementById(idSiguiente);
      const mid       = inicio + duracion * 0.42;

      if (actual) {
        tl.to(actual, {
          opacity: 0,
          duration: duracion * 0.32,
          ease: 'power2.in',
          onComplete() { actual.classList.remove('activa'); },
        }, inicio);

        // Foco baja brevemente
        tl.to(focoCono,
          { opacity: 0.15, duration: duracion * 0.14, ease: 'power1.inOut' },
          inicio + duracion * 0.28
        );
        tl.to(focoCono,
          { opacity: 1,    duration: duracion * 0.14, ease: 'power1.inOut' },
          mid
        );
      }

      if (siguiente) {
        tl.fromTo(siguiente,
          { opacity: 0, y: 14 },
          {
            opacity: 1, y: 0,
            duration: duracion * 0.38,
            ease: 'power2.out',
            onStart() { siguiente.classList.add('activa'); },
          },
          mid + duracion * 0.06
        );
      }
    }

    transicion('s-pasacalles', 's-espectaculos', P.sec2Start, P.sec2End - P.sec2Start);
    transicion('s-espectaculos', 's-dragona',    P.sec3Start, P.sec3End - P.sec3Start);
    transicion('s-dragona',     's-talleres',    P.sec4Start, P.sec4End - P.sec4Start);
    transicion('s-talleres',    's-nosotros',    P.sec5Start, P.sec5End - P.sec5Start);

    return tl;
  }

  // ============================================
  // INIT
  // ============================================
  window.addEventListener('load', () => {
    crearEstrellas();
    initTimeline();

    // Reduced motion: adelanta al 25% sin animación
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ScrollTrigger.getAll().forEach(st => {
        const target = st.start + (st.end - st.start) * 0.25;
        st.scroll(target);
      });
    }
  });

})();
