# Cía La Galerna — Rebuild Completo: Diseño

**Fecha:** 2026-04-06
**Estado:** Aprobado por usuario
**Rama:** feature/galerna-web

---

## 1. Concepto

Experiencia web cinematográfica inmersiva controlada por scroll. No es una landing page convencional — es la entrada a un espectáculo de circo. La metáfora central: **el usuario se acerca a la carpa, las puertas se abren, y entra**.

Dirección estética: **CIRCO NOCTURNO CINEMATOGRÁFICO** — maximalist, teatral, atmosférico.

---

## 2. Arquitectura técnica

- **Stack:** HTML + CSS + JS vanilla, GSAP 3.12.5 + ScrollTrigger
- **Patrón de scroll:** `div#escena` con `position:fixed` (100vw × 100vh) + `div#espaciador` de ~800vh
- **Una sola timeline GSAP** con `scrub: true` vinculada al espaciador
- Sin framework, sin build tool. Archivos CSS/JS separados (no inline).
- Google Fonts: Cinzel Decorative (títulos) + IM Fell English (cuerpo)

---

## 3. Carpa SVG (aprobado en sesión visual)

Vista **frontal** (no cenital). Elementos:
- Mástil central delgado, remate dorado en punta — sin bandera
- Dos postes laterales con capiteles ornamentales dorados
- Guirnaldas de luces (catenary) entre postes y mástil
- Awning triangular con curvas bezier orgánicas (no rectas)
  - 8 sectores de rayas alternando rojo oscuro (#7a1818) y dorado (#9a7418)
  - Flecos irregulares scalloped en el borde inferior
  - Bombillas con halo a lo largo de los flecos
- Cuerpo rectangular con rayas verticales oscuras (rojo sobre negro)
- Shading lateral para dar volumen
- **Puertas completamente abiertas** — dos telas enganchadas/atadas a cada lado
  - Pliegues de tela con paths curvos radiando desde el broche
  - Broche ornamental dorado + cordón colgante en cada lado
- Rendija de luz cálida visible entre las telas abiertas
- Cielo nocturno negro visible alrededor de toda la carpa

---

## 4. Las 4 fases de animación (timeline única scrub)

### Fase 1 — La carpa a lo lejos (0% → 25%)
- Fondo: cielo nocturno con estrellas (30–40 puntos CSS)
- Niebla baja: div con radial-gradient que se mueve lentamente (animación CSS)
- Suelo oscuro en la parte inferior (~20% pantalla)
- Carpa SVG empieza a scale 0.35 — se ve lejana
- Al scrollear: scale 0.35 → 1.0 (dolly-in)
- Parallax: cielo se mueve muy poco, suelo se acerca más rápido
- Estrellas se desvanecen gradualmente
- Indicador "Entra al espectáculo" desaparece al inicio del scroll

### Fase 2 — Apertura de puertas (25% → 50%)
- Las dos telas de entrada se abren: translateX izquierda/derecha
- Rotación sutil (perspective 3D) para simular apertura de tela real
- Detrás: luz interior que se expande (radial-gradient amarillo-ámbar)
- Bloom: capa de box-shadow que se expande
- El marco (postes + toldo) queda visible SIEMPRE tras la apertura
- Al final: puertas completamente abiertas, interior visible

### Fase 3 — Primera escena: Pasacalles (50% → 65%)
- Interior: fondo pergamino cálido (#2a1a0a)
- Foco cónico desde arriba (SVG trapecio con gradiente ámbar, opacity 0.15)
- Dentro del foco, con stagger:
  1. Imagen Pasacalles (carrito-circo-hero.jpg) con marco ornamental
  2. Título "PASACALLES"
  3. Subtítulo + descripción
  4. CTA "Descubrir →"

### Fase 4 — Secciones interiores (65% → 100%)
Cada sección: la actual se desvanece → foco se apaga brevemente → foco vuelve → nueva sección aparece

**Sección 2 — Espectáculos** (65% → 78%)
- Imagen: portes-split-maillot-rojo.jpg (Irene y Sergio acrobacia)
- Título: "ESPECTÁCULOS CIRCENSES"
- Subtítulo: telas aéreas, acrobacias de suelo, portes, clown, monociclo

**Sección 3 — La Dragona** (78% → 83%) ← TEASER MÍNIMO
- Fondo interior ligeramente rosado/magenta (color diferente)
- Solo: etiqueta discreta + título "BAJO LAS ALAS DE LA DRAGONA" + texto misterioso de 1 línea
- Sin imagen (o imagen de vídeo congelada si hay)

**Sección 4 — Talleres** (83% → 91%)
- Imagen: carrito-circo-hero.jpg o foto de actividad
- Título: "TALLERES INFANTILES"
- Los 8 talleres como tags/iconos (no lista larga)

**Sección 5 — Nosotros + Contacto** (91% → 100%)
- Foto dúo: 21.25.59.jpeg (Irene y Sergio como clowns/maestros — foto espectacular)
- Título: "CÍA LA GALERNA"
- Bio compacta
- Contacto: WhatsApp, email, Instagram

---

## 5. Navegación

- Nav fija oculta inicialmente
- Aparece cuando el scroll supera el 50% (cuando ya estamos "dentro" de la carpa)
- Links: Pasacalles | Espectáculos | Talleres | Nosotros | Contacto
- El click en un link hace scroll al spacer position correspondiente a esa sección

---

## 6. Asignación de imágenes y vídeos

| Asset | Uso |
|-------|-----|
| `carrito-circo-hero.jpg` | Pasacalles — imagen principal de sección |
| `WhatsApp...21.25.12.jpeg` | Pasacalles — hero alternativo (carrito en calle) |
| `portes-split-maillot-rojo.jpg` | Espectáculos — imagen principal |
| `WhatsApp...21.25.11.jpeg` | Espectáculos — duo acrobático (maillots rojos/negros) |
| `irene-telas-muro.jpg` | Espectáculos — La Pluma (telas) |
| `WhatsApp...21.24.44.jpeg` | Espectáculos — Irene en telas (mercado medieval) |
| `WhatsApp...21.26.00.jpeg` | Sergio — foto perfil (chaqueta roja, sombrero copa) |
| `irene-telas-sola.jpg` | Irene — foto perfil |
| `WhatsApp...21.25.59.jpeg` | Nosotros — foto dúo protagonista |
| `WhatsApp...21.26.01.jpeg` | Sergio monociclo — alternativa |
| `01MARACENA GALERNA MARIONETA.mp4` | La Dragona — teaser vídeo (muted, autoplay loop) |
| Otros vídeos | Espectáculos — posible fondo vídeo o galería |

---

## 7. Paleta de colores (sin cambios)

```css
--color-negro: #0d0d0d;
--color-rojo: #c41e1e;
--color-rojo-oscuro: #8b1a1a;
--color-rojo-vino: #5c0f0f;
--color-rosa: #e8739a;
--color-crema: #f5e6c8;
--color-dorado: #c4993b;
```

---

## 8. Estructura de archivos del rebuild

```
galerna-web/
├── index.html              ← reescrito completamente
├── css/
│   ├── variables.css       ← sin cambios
│   ├── base.css            ← sin cambios
│   ├── escena.css          ← nuevo (reemplaza carpa.css)
│   ├── secciones-interior.css ← nuevo (reemplaza secciones.css)
│   └── navegacion.css      ← actualizado
├── js/
│   ├── main.js             ← sin cambios (registra ScrollTrigger)
│   ├── escena.js           ← nuevo (reemplaza carpa.js, toda la timeline)
│   └── navegacion.js       ← actualizado
└── assets/
    └── images/             ← + nuevas fotos copiadas de Material visual
```

---

## 9. Lo que NO cambia

- `css/variables.css` — paleta y tokens
- `css/base.css` — reset y tipografía base
- `js/main.js` — registro de ScrollTrigger
- Contenido textual de las secciones
- Datos de contacto y links sociales
- Archivos del Prompt 5 (talleres, nosotros, contacto CSS) — se reutilizan adaptados

---

## 10. Notas de performance

- `will-change: transform` en el contenedor de la carpa SVG
- Máximo 15 partículas de luz simultáneas
- `transform3d` para activar GPU en los elementos animados
- Videos: `muted autoplay loop playsinline` — sin sonido
- `prefers-reduced-motion`: la timeline se pausa en la primera fase si se detecta
