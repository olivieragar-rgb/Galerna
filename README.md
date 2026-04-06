# Cía La Galerna — Web

Web oficial de Cía La Galerna, compañía de teatro de calle y circo.

## Estructura

```
galerna-web/
├── index.html
├── css/
│   ├── variables.css    ← paleta de colores, tipografías, breakpoints
│   ├── base.css         ← reset, utilidades globales
│   ├── carpa.css        ← pantalla de entrada y animación de carpa
│   ├── secciones.css    ← pasacalles, espectáculos, talleres, nosotros, contacto
│   ├── navegacion.css   ← nav fijo y hamburger
│   └── responsive.css   ← ajustes transversales mobile
├── js/
│   ├── main.js          ← inicialización GSAP + ScrollTrigger
│   ├── carpa.js         ← animación de apertura de carpa
│   ├── scroll-scenes.js ← animaciones de las secciones de contenido
│   └── navegacion.js    ← nav visible/oculto + hamburger + scroll suave
└── assets/
    ├── images/
    │   ├── heroes/          ← fotos principales (max 1920px, ~200KB en WebP)
    │   ├── pasacalles/      ← fotos de cada pasacalles (max 600px, ~80KB)
    │   ├── espectaculos/    ← fotos de espectáculos (max 600px, ~80KB)
    │   ├── talleres/        ← fotos de talleres (max 600px)
    │   └── personas/        ← fotos de Sergio e Irene (max 600px)
    ├── logo/                ← logo PNG con fondo transparente
    └── texturas/            ← texturas de pergamino, grain
```

## Cómo añadir fotos

1. Renombra las fotos con nombres descriptivos (sin espacios ni caracteres especiales)
2. Convierte a WebP usando [squoosh.app](https://squoosh.app)
3. Cópialas a la carpeta correspondiente dentro de `assets/images/`
4. Las imágenes ya están referenciadas en el HTML — si el nombre coincide, aparecerán automáticamente

**Fotos actuales y sus rutas:**

| Foto | Destino |
|------|---------|
| `carrito-circo-hero.jpg` | `assets/images/heroes/` |
| `irene-aro-plaza-publico.jpg` | `assets/images/heroes/` y `espectaculos/` |
| `irene-telas-muro.jpg` | `assets/images/espectaculos/` |
| `portes-split-maillot-rojo.jpg` | `assets/images/espectaculos/` |
| `portes-vertical-manos.jpg` | `assets/images/espectaculos/` |
| `sergio-monociclo.jpg` | `assets/images/espectaculos/` |
| `irene-sergio-payasos.jpg` | `assets/images/personas/` |
| `sergio-maestro-ceremonias.jpg` | `assets/images/personas/` |

## Cómo modificar textos

Todos los textos están en `index.html`. Busca por el nombre del espectáculo o sección.

## Desarrollo local

**Opción 1 — npx (sin instalación):**
```bash
npx serve galerna-web
# Abre http://localhost:3000
```

**Opción 2 — VS Code:**
Instala la extensión **Live Server** → clic en "Go Live"

⚠️ No abrir `index.html` directamente con doble clic. GSAP ScrollTrigger no funciona con `file://`.

## Deploy en Netlify

1. Sube la carpeta `galerna-web/` a Netlify (drag & drop en netlify.com)
2. O conecta el repositorio Git y configura:
   - Build command: (vacío)
   - Publish directory: `galerna-web`

## Tamaños de imagen recomendados

| Tipo | Ancho máx | Peso objetivo | Formato |
|------|-----------|---------------|---------|
| Hero | 1920px | ~200KB | WebP |
| Tarjetas / secciones | 600px | ~80KB | WebP |
| Thumbnails | 300px | ~30KB | WebP |
