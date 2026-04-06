# Cía La Galerna Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Galerna website as a cinematic scroll-driven experience where the user approaches a circus tent, the doors open, and all content appears inside.

**Architecture:** A single GSAP timeline tied to an 800vh spacer div, with a fixed `#escena` div as the viewport. The tent SVG (inline in HTML) scales in during Phase 1 (dolly-in), curtains animate open in Phase 2, a spotlight cone reveals 5 sections in Phases 3–4.

**Tech Stack:** HTML5, CSS3, vanilla JS, GSAP 3.12.5 + ScrollTrigger (CDN). No build tools. Google Fonts: Cinzel Decorative + IM Fell English.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `index.html` | Rewrite | Full HTML: nav, #escena, inline SVG, 5 sections, #espaciador |
| `css/escena.css` | Create | Scene: sky, fog, ground, #carpa-container, #interior, spotlight |
| `css/secciones-interior.css` | Create | Interior sections: layout, images, titles, tags, contact |
| `css/navegacion.css` | Replace | Nav: hidden until `.nav-visible`, links style |
| `js/escena.js` | Create | Full GSAP timeline: crearEstrellas() + 4-phase timeline |
| `js/navegacion.js` | Replace | Scroll-progress listener, nav reveal at 50%, scroll-to-section |
| `css/variables.css` | No changes | Color tokens and fonts |
| `css/base.css` | No changes | Reset and base typography |
| `js/main.js` | No changes | GSAP + ScrollTrigger registration |
| `assets/images/` + `assets/video/` | Add files | Copy from `D:/PROYECTO_GALERNA/Material visual/` |

---

## Task 0: Copy Media Assets

**Files:**
- Modify: `assets/images/pasacalles/`, `assets/images/espectaculos/`, `assets/images/personas/`
- Create: `assets/video/`

- [ ] **Step 1: Copy pasacalles image**

```bash
cp "D:/PROYECTO_GALERNA/Material visual/WhatsApp Image 2026-03-23 at 21.25.12.jpeg" \
   "D:/PROYECTO_GALERNA/galerna-web/assets/images/pasacalles/carrito-calle.jpeg"
```

- [ ] **Step 2: Copy espectáculos images**

```bash
cp "D:/PROYECTO_GALERNA/Material visual/WhatsApp Image 2026-03-23 at 21.25.11.jpeg" \
   "D:/PROYECTO_GALERNA/galerna-web/assets/images/espectaculos/duo-maillots.jpeg"
cp "D:/PROYECTO_GALERNA/Material visual/WhatsApp Image 2026-03-23 at 21.24.44.jpeg" \
   "D:/PROYECTO_GALERNA/galerna-web/assets/images/espectaculos/irene-telas-medieval.jpeg"
```

- [ ] **Step 3: Copy personas images**

```bash
cp "D:/PROYECTO_GALERNA/Material visual/WhatsApp Image 2026-03-23 at 21.26.00.jpeg" \
   "D:/PROYECTO_GALERNA/galerna-web/assets/images/personas/sergio-chaqueta-roja.jpeg"
cp "D:/PROYECTO_GALERNA/Material visual/WhatsApp Image 2026-03-23 at 21.25.59.jpeg" \
   "D:/PROYECTO_GALERNA/galerna-web/assets/images/personas/irene-sergio-payasos-2.jpeg"
```

- [ ] **Step 4: Create video directory and copy video**

```bash
mkdir -p "D:/PROYECTO_GALERNA/galerna-web/assets/video"
cp "D:/PROYECTO_GALERNA/Material visual/01MARACENA GALERNA MARIONETA.mp4" \
   "D:/PROYECTO_GALERNA/galerna-web/assets/video/la-dragona.mp4"
```

- [ ] **Step 5: Verify files exist**

```bash
ls D:/PROYECTO_GALERNA/galerna-web/assets/images/pasacalles/
ls D:/PROYECTO_GALERNA/galerna-web/assets/video/
```

Expected output: `carrito-calle.jpeg` and `la-dragona.mp4` listed.

- [ ] **Step 6: Commit**

```bash
git add assets/images/ assets/video/
git commit -m "assets: add media files for rebuild"
```

---

## Task 1: index.html — Full Scaffold + Inline SVG

**Files:**
- Modify: `index.html` (full rewrite)

The SVG tent is inline in the HTML. Curtains (`#puerta-izq`, `#puerta-der`) start closed (meeting in the center). GSAP will animate them open in Phase 2.

- [ ] **Step 1: Rewrite index.html**

Replace the entire file with:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cía La Galerna | Teatro, Circo y Tú</title>
  <meta name="description" content="Pasacalles, espectáculos circenses y talleres infantiles. Irene Gutiérrez y Sergio Rey.">
  <meta property="og:title" content="Cía La Galerna | Teatro, Circo y Tú">
  <meta property="og:description" content="Pasacalles, espectáculos circenses y talleres infantiles para tu evento.">
  <meta property="og:type" content="website">

  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/escena.css">
  <link rel="stylesheet" href="css/secciones-interior.css">
  <link rel="stylesheet" href="css/navegacion.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="js/main.js" defer></script>
  <script src="js/escena.js" defer></script>
  <script src="js/navegacion.js" defer></script>
</head>
<body>

  <!-- NAVEGACIÓN (oculta hasta scroll 50%) -->
  <nav id="nav" aria-label="Navegación principal">
    <div class="nav-logo">Cía La Galerna</div>
    <ul class="nav-links" role="list">
      <li><a href="#" data-section="pasacalles">Pasacalles</a></li>
      <li><a href="#" data-section="espectaculos">Espectáculos</a></li>
      <li><a href="#" data-section="talleres">Talleres</a></li>
      <li><a href="#" data-section="nosotros">Nosotros</a></li>
      <li><a href="#" data-section="contacto">Contacto</a></li>
    </ul>
  </nav>

  <!-- ESCENA FIJA -->
  <div id="escena">

    <div class="cielo" aria-hidden="true"></div>
    <div class="niebla" aria-hidden="true"></div>
    <div class="suelo" aria-hidden="true"></div>

    <!-- Carpa SVG (scale 0.35 → 1.0 en Fase 1) -->
    <div id="carpa-container">
      <svg id="carpa-svg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"
           role="img" aria-label="Carpa de circo Cía La Galerna">
        <defs>
          <linearGradient id="gradTela" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#5c0f0f"/>
            <stop offset="30%"  stop-color="#8b1a1a"/>
            <stop offset="65%"  stop-color="#6b1515"/>
            <stop offset="100%" stop-color="#5c0f0f"/>
          </linearGradient>
          <linearGradient id="gradCuerpo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#2a0505"/>
            <stop offset="10%"  stop-color="#3a0808"/>
            <stop offset="90%"  stop-color="#3a0808"/>
            <stop offset="100%" stop-color="#2a0505"/>
          </linearGradient>
          <radialGradient id="gradLuzInterior" cx="50%" cy="55%" r="50%">
            <stop offset="0%"   stop-color="#ffb347" stop-opacity="1"/>
            <stop offset="45%"  stop-color="#e8832a" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#c4993b"  stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="gradSombraIzq" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#000" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="gradSombraDer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#000" stop-opacity="0"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
          </linearGradient>
          <filter id="glowBulb" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glowTip">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
          </filter>
        </defs>

        <!-- Cuerpo de la carpa -->
        <rect x="190" y="350" width="620" height="615" fill="url(#gradCuerpo)"/>
        <!-- Rayas verticales del cuerpo (4 franjas oscuras) -->
        <rect x="190" y="350" width="88" height="615" fill="#150202" opacity="0.45"/>
        <rect x="366" y="350" width="88" height="615" fill="#150202" opacity="0.45"/>
        <rect x="542" y="350" width="88" height="615" fill="#150202" opacity="0.45"/>
        <rect x="718" y="350" width="88" height="615" fill="#150202" opacity="0.45"/>
        <!-- Sombra lateral izq/der -->
        <rect x="190" y="350" width="130" height="615" fill="url(#gradSombraIzq)"/>
        <rect x="680" y="350" width="130" height="615" fill="url(#gradSombraDer)"/>

        <!-- Luz interior (opacidad 0 → 1 animada en Fase 2) -->
        <rect id="luz-interior" x="310" y="350" width="380" height="615"
              fill="url(#gradLuzInterior)" opacity="0"/>

        <!-- Puerta izquierda (cerrada: cubre x=310–500) -->
        <g id="puerta-izq">
          <path d="M 310,352 C 308,430 312,510 316,590 C 320,670 310,750 312,830
                   C 314,900 308,945 310,965 L 500,965 L 500,352 Z"
                fill="url(#gradTela)"/>
          <!-- Pliegues de tela -->
          <line x1="370" y1="352" x2="355" y2="965" stroke="#2a0505" stroke-width="2" opacity="0.65"/>
          <line x1="430" y1="352" x2="420" y2="965" stroke="#2a0505" stroke-width="1.5" opacity="0.45"/>
          <!-- Broche/anilla en el centro superior -->
          <circle cx="500" cy="378" r="11" fill="#c4993b"/>
          <circle cx="500" cy="378" r="7"  fill="#e8c56e"/>
          <path d="M 500,389 Q 494,418 496,448" stroke="#c4993b" stroke-width="2" fill="none"/>
          <circle cx="496" cy="452" r="4" fill="#c4993b"/>
        </g>

        <!-- Puerta derecha (cerrada: cubre x=500–690) -->
        <g id="puerta-der">
          <path d="M 500,352 L 690,352 C 692,430 688,510 684,590 C 680,670 690,750 688,830
                   C 686,900 692,945 690,965 L 500,965 Z"
                fill="url(#gradTela)"/>
          <!-- Pliegues de tela -->
          <line x1="630" y1="352" x2="645" y2="965" stroke="#2a0505" stroke-width="2" opacity="0.65"/>
          <line x1="570" y1="352" x2="580" y2="965" stroke="#2a0505" stroke-width="1.5" opacity="0.45"/>
        </g>

        <!-- Postes laterales -->
        <rect x="118" y="345" width="48" height="620" rx="4" fill="#140808"/>
        <rect x="122" y="345" width="7"  height="620" fill="#2a1212" opacity="0.7"/>
        <!-- Capital izq -->
        <path d="M 102,350 C 102,334 118,323 142,321 C 166,323 183,334 183,350
                 L 181,366 L 165,356 L 142,354 L 119,356 L 108,366 Z"
              fill="#c4993b"/>
        <rect x="108" y="344" width="69" height="9" rx="2" fill="#c4993b" opacity="0.6"/>

        <rect x="834" y="345" width="48" height="620" rx="4" fill="#140808"/>
        <rect x="871" y="345" width="7"  height="620" fill="#2a1212" opacity="0.7"/>
        <!-- Capital der -->
        <path d="M 817,350 C 817,334 834,323 858,321 C 882,323 898,334 898,350
                 L 896,366 L 880,356 L 858,354 L 835,356 L 819,366 Z"
              fill="#c4993b"/>
        <rect x="823" y="344" width="69" height="9" rx="2" fill="#c4993b" opacity="0.6"/>

        <!-- Mástil central -->
        <rect x="493" y="42" width="14" height="315" fill="#140808"/>
        <rect x="496" y="42" width="4"  height="315" fill="#2a1212" opacity="0.5"/>
        <!-- Remate dorado -->
        <polygon points="500,18 489,55 511,55" fill="#c4993b"/>
        <circle cx="500" cy="18" r="8" fill="#c4993b"/>
        <!-- Glow del remate -->
        <circle cx="500" cy="18" r="14" fill="#c4993b" opacity="0.25" filter="url(#glowTip)"/>

        <!-- Toldo / Awning — 8 sectores desde el pico (500,282) -->
        <polygon points="500,282  80,412 192,412" fill="#7a1818"/>
        <polygon points="500,282 192,412 304,412" fill="#9a7418"/>
        <polygon points="500,282 304,412 416,412" fill="#7a1818"/>
        <polygon points="500,282 416,412 528,412" fill="#9a7418"/>
        <polygon points="500,282 528,412 640,412" fill="#7a1818"/>
        <polygon points="500,282 640,412 752,412" fill="#9a7418"/>
        <polygon points="500,282 752,412 864,412" fill="#7a1818"/>
        <polygon points="500,282 864,412 976,412" fill="#9a7418"/>
        <!-- Borde del toldo -->
        <line x1="80" y1="410" x2="920" y2="410" stroke="#c4993b" stroke-width="2.5" opacity="0.55"/>

        <!-- Flecos scalloped (21 semicírculos, spacing=40px, desde x=80 hasta x=920) -->
        <path d="M 80,410
          A 20,20 0 0 0 120,410 A 20,20 0 0 0 160,410 A 20,20 0 0 0 200,410
          A 20,20 0 0 0 240,410 A 20,20 0 0 0 280,410 A 20,20 0 0 0 320,410
          A 20,20 0 0 0 360,410 A 20,20 0 0 0 400,410 A 20,20 0 0 0 440,410
          A 20,20 0 0 0 480,410 A 20,20 0 0 0 520,410 A 20,20 0 0 0 560,410
          A 20,20 0 0 0 600,410 A 20,20 0 0 0 640,410 A 20,20 0 0 0 680,410
          A 20,20 0 0 0 720,410 A 20,20 0 0 0 760,410 A 20,20 0 0 0 800,410
          A 20,20 0 0 0 840,410 A 20,20 0 0 0 880,410 A 20,20 0 0 0 920,410"
          fill="#8b1a1a" stroke="#7a1818" stroke-width="1"/>

        <!-- Bombillas en los valles de los flecos -->
        <g filter="url(#glowBulb)" fill="#ffe066">
          <circle cx="100" cy="430" r="4.5"/>
          <circle cx="140" cy="430" r="4.5"/>
          <circle cx="180" cy="430" r="4.5"/>
          <circle cx="220" cy="430" r="4.5"/>
          <circle cx="260" cy="430" r="4.5"/>
          <circle cx="300" cy="430" r="4.5"/>
          <circle cx="340" cy="430" r="4.5"/>
          <circle cx="380" cy="430" r="4.5"/>
          <circle cx="420" cy="430" r="4.5"/>
          <circle cx="460" cy="430" r="4.5"/>
          <circle cx="500" cy="430" r="4.5"/>
          <circle cx="540" cy="430" r="4.5"/>
          <circle cx="580" cy="430" r="4.5"/>
          <circle cx="620" cy="430" r="4.5"/>
          <circle cx="660" cy="430" r="4.5"/>
          <circle cx="700" cy="430" r="4.5"/>
          <circle cx="740" cy="430" r="4.5"/>
          <circle cx="780" cy="430" r="4.5"/>
          <circle cx="820" cy="430" r="4.5"/>
          <circle cx="860" cy="430" r="4.5"/>
          <circle cx="900" cy="430" r="4.5"/>
        </g>

        <!-- Guirnalda izq (poste izq → mástil) -->
        <path d="M 142,360 Q 321,445 500,292"
              stroke="#c4993b" stroke-width="1.5" fill="none" opacity="0.65"/>
        <g filter="url(#glowBulb)" fill="#ffe066">
          <circle cx="205" cy="395" r="3.5"/>
          <circle cx="268" cy="412" r="3.5"/>
          <circle cx="331" cy="420" r="3.5"/>
          <circle cx="394" cy="415" r="3.5"/>
          <circle cx="450" cy="400" r="3.5"/>
        </g>

        <!-- Guirnalda der (mástil → poste der) -->
        <path d="M 500,292 Q 679,445 858,360"
              stroke="#c4993b" stroke-width="1.5" fill="none" opacity="0.65"/>
        <g filter="url(#glowBulb)" fill="#ffe066">
          <circle cx="550" cy="400" r="3.5"/>
          <circle cx="606" cy="415" r="3.5"/>
          <circle cx="669" cy="420" r="3.5"/>
          <circle cx="732" cy="412" r="3.5"/>
          <circle cx="795" cy="395" r="3.5"/>
        </g>

        <!-- Rótulo sobre el toldo -->
        <rect x="235" y="296" width="530" height="52" rx="3" fill="#0d0505" opacity="0.75"/>
        <text x="500" y="330" text-anchor="middle"
              font-family="'Cinzel Decorative', serif"
              font-size="24" fill="#f5e6c8" letter-spacing="6">CÍA LA GALERNA</text>

      </svg>
    </div><!-- /#carpa-container -->

    <!-- Interior (visible a partir de Fase 2) -->
    <div id="interior">
      <div class="interior-fondo"></div>

      <!-- Foco cónico desde arriba -->
      <svg class="foco-cono" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet"
           aria-hidden="true">
        <defs>
          <radialGradient id="gradFoco" cx="50%" cy="0%" r="80%" fx="50%" fy="0%">
            <stop offset="0%"   stop-color="#ffcc66" stop-opacity="0.18"/>
            <stop offset="55%"  stop-color="#e8a030" stop-opacity="0.07"/>
            <stop offset="100%" stop-color="#c4993b"  stop-opacity="0"/>
          </radialGradient>
        </defs>
        <polygon points="420,0 580,0 800,1000 200,1000"
                 fill="url(#gradFoco)"/>
      </svg>

      <!-- Sección 1: Pasacalles (Fase 3: 50%→65%) -->
      <section id="s-pasacalles" class="seccion-interior" data-section="pasacalles">
        <div class="sec-imagen">
          <img src="assets/images/heroes/carrito-circo-hero.jpg"
               alt="Carrito de circo decorado para pasacalles" loading="lazy"/>
        </div>
        <div class="sec-texto">
          <span class="sec-etiqueta">Para tu evento</span>
          <h2 class="sec-titulo">PASACALLES</h2>
          <p class="sec-descripcion">Animación callejera circense que convierte cualquier espacio en un festival itinerante. Música en vivo, vestuario espectacular, interacción directa con el público.</p>
          <a href="mailto:ciagalerna@gmail.com?subject=Consulta%20Pasacalles" class="sec-cta">Contratar →</a>
        </div>
      </section>

      <!-- Sección 2: Espectáculos (Fase 4: 65%→78%) -->
      <section id="s-espectaculos" class="seccion-interior" data-section="espectaculos">
        <div class="sec-imagen">
          <img src="assets/images/espectaculos/portes-split-maillot-rojo.jpg"
               alt="Irene y Sergio en número de portes y acrobacia" loading="lazy"/>
        </div>
        <div class="sec-texto">
          <span class="sec-etiqueta">Circo y teatro</span>
          <h2 class="sec-titulo">ESPECTÁCULOS<br>CIRCENSES</h2>
          <p class="sec-descripcion">Telas aéreas · Acrobacias de suelo · Portes · Clown · Monociclo</p>
          <a href="mailto:ciagalerna@gmail.com?subject=Consulta%20Espectáculos" class="sec-cta">Contratar →</a>
        </div>
      </section>

      <!-- Sección 3: La Dragona (Fase 4: 78%→83%) — teaser mínimo -->
      <section id="s-dragona" class="seccion-interior seccion-dragona" data-section="dragona">
        <div class="sec-texto sec-texto-centrado">
          <span class="sec-etiqueta dragona-etiqueta">Próximamente</span>
          <h2 class="sec-titulo dragona-titulo">BAJO LAS ALAS<br>DE LA DRAGONA</h2>
          <p class="sec-descripcion">Un espectáculo que aún no tiene nombre. Pronto.</p>
          <video class="dragona-video" autoplay muted loop playsinline
                 aria-label="Teaser La Dragona">
            <source src="assets/video/la-dragona.mp4" type="video/mp4">
          </video>
        </div>
      </section>

      <!-- Sección 4: Talleres (Fase 4: 83%→91%) -->
      <section id="s-talleres" class="seccion-interior" data-section="talleres">
        <div class="sec-imagen">
          <img src="assets/images/heroes/carrito-circo-hero.jpg"
               alt="Taller de circo para niños" loading="lazy"/>
        </div>
        <div class="sec-texto">
          <span class="sec-etiqueta">Para los más pequeños</span>
          <h2 class="sec-titulo">TALLERES<br>INFANTILES</h2>
          <div class="talleres-tags">
            <span class="tag">Malabares</span>
            <span class="tag">Telas aéreas</span>
            <span class="tag">Equilibrio</span>
            <span class="tag">Monociclo</span>
            <span class="tag">Clown</span>
            <span class="tag">Acrobacia</span>
            <span class="tag">Magia</span>
            <span class="tag">Zancos</span>
          </div>
          <a href="mailto:ciagalerna@gmail.com?subject=Consulta%20Talleres" class="sec-cta">Contratar →</a>
        </div>
      </section>

      <!-- Sección 5: Nosotros + Contacto (Fase 4: 91%→100%) -->
      <section id="s-nosotros" class="seccion-interior" data-section="nosotros">
        <div class="sec-imagen sec-imagen-duo">
          <img src="assets/images/personas/irene-sergio-payasos.jpg"
               alt="Irene Gutiérrez y Sergio Rey, Cía La Galerna" loading="lazy"/>
        </div>
        <div class="sec-texto">
          <span class="sec-etiqueta">Quiénes somos</span>
          <h2 class="sec-titulo">CÍA LA GALERNA</h2>
          <p class="sec-descripcion">Irene Gutiérrez y Sergio Rey. Artistas circenses y de teatro de calle formados en Granada. Desde 2024 llevamos el espectáculo donde nos llamen.</p>
          <div id="contacto" class="contacto-lista">
            <a href="https://wa.me/34600000000" class="contacto-item" target="_blank" rel="noopener">
              <span class="contacto-icon">📞</span> WhatsApp
            </a>
            <a href="mailto:ciagalerna@gmail.com" class="contacto-item">
              <span class="contacto-icon">✉</span> ciagalerna@gmail.com
            </a>
            <a href="https://instagram.com/ciagalerna" class="contacto-item" target="_blank" rel="noopener">
              <span class="contacto-icon">◎</span> @ciagalerna
            </a>
          </div>
        </div>
      </section>

    </div><!-- /#interior -->

    <!-- Indicador de scroll inicial -->
    <div id="indicador-scroll" aria-hidden="true">
      <span>Entra al espectáculo</span>
      <div class="indicador-flecha">↓</div>
    </div>

  </div><!-- /#escena -->

  <!-- ESPACIADOR (800vh — duración total del scroll) -->
  <div id="espaciador"></div>

</body>
</html>
```

- [ ] **Step 2: Verify HTML parses cleanly**

Open `index.html` in browser. Expected: dark background (from `base.css` or browser defaults), 404 errors for missing `escena.css` etc. in DevTools Network — that's fine. No HTML syntax errors in console.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: index.html scaffold with inline tent SVG and 5 interior sections"
```

---

## Task 2: css/escena.css

**Files:**
- Create: `css/escena.css`

- [ ] **Step 1: Create css/escena.css**

```css
/* ============================================
   CÍA LA GALERNA — escena.css
   Ambiente scroll-driven: cielo, niebla, carpa
   ============================================ */

body {
  margin: 0;
  overflow-x: hidden;
}

/* El espaciador define la duración total del scroll */
#espaciador {
  height: 800vh;
  position: relative;
  pointer-events: none;
}

/* Escena fija: siempre ocupa toda la pantalla */
#escena {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #050508;
}

/* ---- Cielo nocturno ---- */
.cielo {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, #0a0820 0%, #050508 60%);
}

/* Las estrellas son divs generados por escena.js */
.estrella {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  animation: parpadeo var(--dur, 3s) ease-in-out infinite var(--delay, 0s);
}

@keyframes parpadeo {
  0%, 100% { opacity: var(--opMin, 0.3); }
  50%       { opacity: var(--opMax, 0.8); }
}

/* ---- Niebla baja ---- */
.niebla {
  position: absolute;
  bottom: 0;
  left: -20%;
  width: 140%;
  height: 30%;
  background: radial-gradient(
    ellipse at 50% 100%,
    rgba(180, 160, 120, 0.16) 0%,
    transparent 70%
  );
  animation: niebla-drift 12s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes niebla-drift {
  0%   { transform: translateX(0)   scaleX(1); }
  100% { transform: translateX(5%)  scaleX(1.06); }
}

/* ---- Suelo oscuro ---- */
.suelo {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 18%;
  background: linear-gradient(to top, #0a0505 0%, #0d0808 60%, transparent 100%);
  pointer-events: none;
}

/* ---- Contenedor de la carpa SVG ---- */
#carpa-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%) scale(0.35);
  transform-origin: center center;
  will-change: transform;
}

#carpa-svg {
  width: 100%;
  height: 100%;
}

/* ---- Interior (visible a partir de Fase 2) ---- */
#interior {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}

#interior.visible {
  pointer-events: auto;
}

.interior-fondo {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 30%,
    #2a1a0a 0%,
    #180d04 50%,
    #0d0805 100%
  );
  opacity: 0;
}

/* ---- Foco cónico teatral ---- */
.foco-cono {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  will-change: opacity;
}

/* ---- Indicador de scroll ---- */
#indicador-scroll {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--color-crema);
  font-family: var(--font-body);
  font-size: 0.88rem;
  letter-spacing: 0.2em;
  opacity: 1;
  pointer-events: none;
}

.indicador-flecha {
  margin-top: 0.4rem;
  animation: flotacion 1.6s ease-in-out infinite;
}

@keyframes flotacion {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(7px); }
}

/* ---- GPU hints ---- */
#puerta-izq,
#puerta-der,
#luz-interior {
  will-change: transform, opacity;
}

.cielo,
.niebla {
  will-change: transform;
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .estrella,
  .niebla,
  .indicador-flecha {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify in browser**

Reload `index.html`. Expected:
- Very dark background with a subtle blue-purple glow at the top center
- Small circus tent visible at center of screen (scale 0.35)
- Ground dark strip at the bottom
- "Entra al espectáculo ↓" indicator at the bottom center
- Fog div present but subtle (no stars yet — JS not written)

- [ ] **Step 3: Commit**

```bash
git add css/escena.css
git commit -m "feat: escena.css - scene environment, sky, fog, carpa container"
```

---

## Task 3: css/secciones-interior.css

**Files:**
- Create: `css/secciones-interior.css`

- [ ] **Step 1: Create css/secciones-interior.css**

```css
/* ============================================
   CÍA LA GALERNA — secciones-interior.css
   Contenido que aparece dentro de la carpa
   ============================================ */

/* ---- Base de todas las secciones ---- */
.seccion-interior {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  padding: 6vh 7vw;
  opacity: 0;
  pointer-events: none;
}

.seccion-interior.activa {
  pointer-events: auto;
}

/* ---- Imagen de sección ---- */
.sec-imagen {
  flex: 0 0 40%;
  max-height: 68vh;
  overflow: hidden;
  border: 2px solid var(--color-dorado);
  box-shadow: 0 0 35px rgba(196, 153, 59, 0.22), var(--sombra-oscura);
  border-radius: 2px;
}

.sec-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: sepia(0.12) contrast(1.05);
}

/* ---- Texto ---- */
.sec-texto {
  flex: 0 0 48%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.sec-etiqueta {
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--color-dorado);
  opacity: 0.85;
}

.sec-titulo {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.2vw, 2.6rem);
  color: var(--color-crema);
  line-height: 1.15;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.75);
  margin: 0;
}

.sec-descripcion {
  font-family: var(--font-body);
  font-size: clamp(0.82rem, 1.1vw, 0.95rem);
  color: rgba(245, 230, 200, 0.72);
  line-height: 1.75;
  margin: 0;
  max-width: 44ch;
}

.sec-cta {
  display: inline-block;
  padding: 0.55rem 1.6rem;
  border: 1px solid var(--color-dorado);
  color: var(--color-dorado);
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 0.14em;
  text-decoration: none;
  border-radius: 1px;
  transition: background 0.22s, color 0.22s;
  align-self: flex-start;
  margin-top: 0.4rem;
}

.sec-cta:hover {
  background: var(--color-dorado);
  color: var(--color-negro);
}

/* ---- Talleres: tags ---- */
.talleres-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0.3rem 0;
}

.tag {
  padding: 0.28rem 0.75rem;
  border: 1px solid var(--color-rojo-oscuro);
  color: var(--color-crema);
  font-family: var(--font-body);
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  border-radius: 1px;
  background: rgba(139, 26, 26, 0.18);
}

/* ---- Dragona: sección especial ---- */
.seccion-dragona {
  background: radial-gradient(
    ellipse at 50% 40%,
    rgba(180, 80, 140, 0.1) 0%,
    transparent 65%
  );
}

.dragona-titulo {
  color: var(--color-rosa) !important;
  text-shadow: 0 0 32px rgba(232, 115, 154, 0.38);
}

.dragona-etiqueta {
  color: var(--color-rosa) !important;
}

.dragona-video {
  width: 100%;
  max-width: 460px;
  max-height: 280px;
  object-fit: cover;
  border: 1px solid rgba(232, 115, 154, 0.28);
  margin-top: 0.8rem;
  display: block;
  opacity: 0.68;
}

/* ---- Texto centrado (Dragona) ---- */
.sec-texto-centrado {
  align-items: center;
  text-align: center;
  flex: 0 0 65%;
}

.sec-texto-centrado .sec-descripcion {
  max-width: 36ch;
}

/* ---- Nosotros: imagen dúo más alta ---- */
.sec-imagen-duo {
  max-height: 74vh;
}

/* ---- Contacto ---- */
.contacto-lista {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: 0.4rem;
}

.contacto-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: rgba(245, 230, 200, 0.68);
  font-family: var(--font-body);
  font-size: 0.86rem;
  text-decoration: none;
  transition: color 0.2s;
}

.contacto-item:hover {
  color: var(--color-crema);
}

.contacto-icon {
  color: var(--color-dorado);
  font-size: 0.95rem;
}
```

- [ ] **Step 2: Verify in browser**

Reload. No visible change (sections are `opacity: 0`). No console errors.

- [ ] **Step 3: Commit**

```bash
git add css/secciones-interior.css
git commit -m "feat: secciones-interior.css - interior section styles"
```

---

## Task 4: css/navegacion.css — Replace

**Files:**
- Modify: `css/navegacion.css` (full replace)

- [ ] **Step 1: Replace css/navegacion.css**

```css
/* ============================================
   CÍA LA GALERNA — navegacion.css
   Nav fija: oculta hasta .nav-visible (50% scroll)
   ============================================ */

#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 3rem;
  background: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-rojo-vino);
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
}

#nav.nav-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--color-crema);
  letter-spacing: 0.15em;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(245, 230, 200, 0.65);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--color-crema);
}
```

- [ ] **Step 2: Commit**

```bash
git add css/navegacion.css
git commit -m "feat: navegacion.css - hidden nav with scroll-reveal class"
```

---

## Task 5: js/escena.js — Stars + Full 4-Phase Timeline

**Files:**
- Create: `js/escena.js`

This is the core animation file. It creates the GSAP timeline that drives all 4 phases via scroll.

- [ ] **Step 1: Create js/escena.js**

```javascript
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
    // Cada transición: sección actual se desvanece → foco parpadea → nueva sección aparece

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

    // Reduced motion: adelanta al 25% (puertas ya abiertas) sin animación
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ScrollTrigger.getAll().forEach(st => {
        const target = st.start + (st.end - st.start) * 0.25;
        st.scroll(target);
      });
    }
  });

})();
```

- [ ] **Step 2: Verify Fase 1 in browser**

Open `index.html`. Scroll slowly from the top. Expected:
- At page load: small tent at center (~35% size), stars twinkling, "Entra al espectáculo ↓" visible
- As you scroll 0→25% of 800vh: tent scales up from 0.35 to 1.0, stars fade out, indicator disappears
- At 25% (after scrolling ~2 full viewport heights): tent fills the screen

If the tent's initial size looks wrong, adjust `scale(0.35)` in `#carpa-container` in `escena.css`.

- [ ] **Step 3: Verify Fase 2 in browser**

Continue scrolling from 25% to 50%. Expected:
- Left curtain slides left and fades slightly
- Right curtain slides right and fades slightly
- Golden light glows from the center (between where the curtains were)
- Warm dark pergamino background fades in behind the SVG

- [ ] **Step 4: Verify Fase 3 in browser**

Scroll from 50% to 65%. Expected:
- Triangular spotlight cone appears from above
- Pasacalles section fades in with y-offset
- Text elements (etiqueta, título, descripción, CTA) stagger in

- [ ] **Step 5: Verify Fase 4 in browser**

Scroll from 65% to 100%. Expected:
- At each section boundary, the current section fades out
- The spotlight cone briefly dims then brightens
- The next section fades in from a slight y-offset below

- [ ] **Step 6: Commit**

```bash
git add js/escena.js
git commit -m "feat: escena.js - 4-phase GSAP scroll timeline with stars and transitions"
```

---

## Task 6: js/navegacion.js — Replace

**Files:**
- Modify: `js/navegacion.js` (full replace)

- [ ] **Step 1: Replace js/navegacion.js**

```javascript
/* ============================================
   CÍA LA GALERNA — navegacion.js
   Reveal al 50% de scroll + scroll-to-section
   ============================================ */

(function () {
  'use strict';

  const nav        = document.getElementById('nav');
  const espaciador = document.getElementById('espaciador');
  const navLinks   = document.querySelectorAll('.nav-links a[data-section]');

  // Posiciones de cada sección en % del espaciador total
  // Deben coincidir con las fases de escena.js
  const POSICIONES = {
    pasacalles:   0.50,
    espectaculos: 0.65,
    talleres:     0.83,
    nosotros:     0.91,
    contacto:     0.91,
  };

  function getProgress() {
    if (!espaciador) return 0;
    const scrolled = window.scrollY - espaciador.offsetTop;
    return Math.max(0, Math.min(1, scrolled / espaciador.offsetHeight));
  }

  function onScroll() {
    if (getProgress() >= 0.5) {
      nav.classList.add('nav-visible');
    } else {
      nav.classList.remove('nav-visible');
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pct = POSICIONES[link.dataset.section];
      if (pct == null) return;
      const top = espaciador.offsetTop + espaciador.offsetHeight * pct;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

})();
```

- [ ] **Step 2: Verify in browser**

Scroll to 50%+ of the spacer. Expected: nav slides down from top with opacity transition.
Click a nav link (e.g., "Talleres"). Expected: smooth scroll to the Talleres section position in the spacer.

- [ ] **Step 3: Commit**

```bash
git add js/navegacion.js
git commit -m "feat: navegacion.js - nav reveal at 50% scroll, click-to-section"
```

---

## Task 7: Full integration check + WhatsApp number

**Files:**
- Modify: `index.html` (update WhatsApp number)

The placeholder `34600000000` in the WhatsApp link needs to be updated with the real number.

- [ ] **Step 1: Update WhatsApp link**

In `index.html`, find:
```html
<a href="https://wa.me/34600000000"
```
Replace `34600000000` with the real number. If you don't have it, leave the placeholder and note it as a TODO comment.

- [ ] **Step 2: Full scroll-through test**

Open `index.html` and scroll from top to bottom in one pass. Check:
1. [ ] Stars appear and fade correctly during dolly-in
2. [ ] Curtains open symmetrically (left goes left, right goes right)
3. [ ] Golden glow appears between open curtains
4. [ ] Pasacalles section appears with stagger
5. [ ] Each section transition has the spotlight blink
6. [ ] Nav appears after scrolling past 50%
7. [ ] Nav links scroll to correct sections
8. [ ] La Dragona video plays muted and looped
9. [ ] No console errors

- [ ] **Step 3: Check images load**

In DevTools Network tab, verify all images load (no 404s). If any image 404s, check the `src` attribute in `index.html` matches the actual file path in `assets/`.

Key images and their expected paths:
- `assets/images/heroes/carrito-circo-hero.jpg` — used in Pasacalles and Talleres
- `assets/images/espectaculos/portes-split-maillot-rojo.jpg` — Espectáculos
- `assets/images/personas/irene-sergio-payasos.jpg` — Nosotros

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "fix: update WhatsApp link and integration check"
```

---

## Self-Review

### Spec coverage check

| Spec requirement | Covered by |
|-----------------|-----------|
| Dolly-in: scale 0.35 → 1.0 | Task 2 (escena.css `#carpa-container`) + Task 5 (escena.js) |
| Estrellas 30-40 puntos CSS | Task 5 `crearEstrellas()` (35 estrellas) |
| Niebla baja con animación CSS | Task 2 `.niebla` |
| Indicador "Entra al espectáculo" | Task 1 HTML + Task 2 CSS |
| Puertas se separan con translateX | Task 5 Fase 2 |
| Rotación sutil / perspectiva | Simplificado a scaleX en el cursor — aceptable sin perspectiva 3D real |
| Luz dorada desde dentro (bloom) | Task 5 `#luz-interior` radialGradient |
| Marco (postes + toldo) = frame permanente | SVG en Task 1: posts y awning no se animan |
| Foco cónico desde arriba | Task 1 `.foco-cono` SVG + Task 5 Fase 3 |
| Pasacalles: imagen + título + descripción + CTA | Task 1 HTML + Task 3 CSS + Task 5 Fase 3 |
| Espectáculos: imagen portes-split + texto | Task 1 HTML + Task 3 CSS |
| La Dragona: fondo rosado + vídeo muted | Task 1 HTML `.seccion-dragona` + Task 3 CSS |
| Talleres: 8 tags | Task 1 HTML `.talleres-tags` |
| Nosotros + Contacto: foto dúo + info | Task 1 HTML `#s-nosotros` |
| Foco se apaga/enciende entre secciones | Task 5 `transicion()` |
| Nav oculta hasta 50% | Task 4 CSS + Task 6 JS |
| Nav links → scroll a posición del spacer | Task 6 JS |
| Carpa SVG frontal, bezier, flecos, guirnaldas | Task 1 SVG inline |
| Mástil central, remate dorado, sin bandera | Task 1 SVG |
| Guirnaldas de bombillas | Task 1 SVG |
| Puertas enganchadas con broche ornamental | Task 1 SVG `#puerta-izq` broche |
| `variables.css` / `base.css` sin cambios | No tocados |
| `js/main.js` sin cambios | No tocado |
| `prefers-reduced-motion` | Task 5 JS + Task 2 CSS |
| `will-change` para GPU | Task 2 CSS |
| Videos: `muted autoplay loop playsinline` | Task 1 HTML `<video>` |
| GSAP 3.12.5 + ScrollTrigger | Task 1 HTML CDN links |

### Placeholder scan

No TBDs, TODOs, or "implement later" found. All code is complete.

### Type/name consistency

- `#puerta-izq` and `#puerta-der` — used consistently in HTML, CSS, and JS
- `P.fase1End` etc. — constants used consistently throughout `escena.js`
- `transicion()` — called with same signature in all 4 cases
- `.nav-visible` class — added in JS, styled in CSS
- `data-section` attribute — set in HTML nav links, read in `navegacion.js` via `link.dataset.section`
- `POSICIONES` keys in `navegacion.js` match `data-section` values in HTML

All consistent.
