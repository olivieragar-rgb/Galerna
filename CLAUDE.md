# CLAUDE.md — Cía La Galerna Web

## Qué es este proyecto
Web artística para Cía La Galerna (compañía de circo y teatro de calle, Granada, 2024).
Fundadores: Irene Gutiérrez y Sergio Rey.

## Estado actual
- Branch: `feature/galerna-web`
- Fase: Plan de implementación escrito, pendiente de ejecutar
- Plan: `docs/superpowers/plans/2026-04-06-galerna-rebuild.md`
- Spec: `docs/superpowers/specs/2026-04-06-galerna-rebuild-design.md`

## Concepto aprobado
Experiencia cinematográfica scroll-driven. **4 fases:**
1. Carpa lejana (scale 0.35) → dolly-in hasta llenar la pantalla (0%→25%)
2. Puertas de la carpa se abren, luz dorada desde dentro (25%→50%)
3. Foco teatral + Pasacalles aparece (50%→65%)
4. 4 secciones interiores con transiciones de foco (65%→100%)

## Stack técnico
- HTML/CSS/JS puro — sin frameworks, sin build tools
- GSAP 3.12.5 + ScrollTrigger (CDN)
- Patrón: `div#escena` fixed + `div#espaciador` 800vh
- Google Fonts: Cinzel Decorative (títulos) + IM Fell English (cuerpo)

## Archivos que NO se tocan
- `css/variables.css` — paleta y tokens
- `css/base.css` — reset y tipografía
- `js/main.js` — registro de GSAP plugins

## Archivos del rebuild (según el plan)
- `index.html` — reescrito con SVG inline
- `css/escena.css` — NUEVO
- `css/secciones-interior.css` — NUEVO
- `css/navegacion.css` — reemplazado
- `js/escena.js` — NUEVO (toda la timeline)
- `js/navegacion.js` — reemplazado

## Assets disponibles
```
assets/images/heroes/carrito-circo-hero.jpg
assets/images/espectaculos/portes-split-maillot-rojo.jpg
assets/images/personas/irene-sergio-payasos.jpg
assets/images/personas/irene-telas-sola.jpg
```
Copiar de `D:/PROYECTO_GALERNA/Material visual/` (ver Task 0 del plan).

## Paleta de colores
```css
--color-negro:       #0d0d0d
--color-rojo:        #c41e1e
--color-rojo-oscuro: #8b1a1a
--color-rosa:        #e8739a
--color-crema:       #f5e6c8
--color-dorado:      #c4993b
```

## Cómo retomar el trabajo
1. Lee el plan: `docs/superpowers/plans/2026-04-06-galerna-rebuild.md`
2. Usa `superpowers:subagent-driven-development` o `superpowers:executing-plans`
3. Empieza por Task 0 (copiar assets) si no está hecho
