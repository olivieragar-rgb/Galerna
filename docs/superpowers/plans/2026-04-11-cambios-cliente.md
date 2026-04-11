# Plan: Cambios solicitados por el cliente — 11 abril 2026

## Contexto
Feedback directo del cliente (Irene/Sergio) sobre la web actual.

---

## Task 1 — Quitar párrafos de pasacalles de `circo-teatro.html`
**Archivo:** `circo-teatro.html` (líneas 56-59)  
**Acción:** Eliminar los dos últimos `<p class="pagina-intro">` de la cabecera que hablan de animación itinerante y estéticas de pasacalles. Son estos:

```html
<!-- ELIMINAR estos dos párrafos: -->
<p class="pagina-intro">Animación itinerante de circo y teatro donde la fantasía cobra vida a cada paso. Nuestros espectáculos combinan personajes únicos, calidad teatral y virtuosos números circenses, acompañados de música e interacción con el público para crear experiencias llenas de color, humor y emoción.</p>
<p class="pagina-intro">Adaptamos cada pasacalles a distintas estéticas: medieval, circense, árabe, marinera o pirata, vikinga o personalizada para tu evento.</p>
```

Esos párrafos pertenecen a pasacalles, no a espectáculos estáticos.

---

## Task 2 — Nueva descripción de "El Bufón y la Acróbata Aérea"
**Archivo:** `circo-teatro.html`  
**Acción:** Reemplazar el `<p class="detalle-desc">` del Bufón por el texto del cliente:

**Texto actual:**
> Un espectáculo de 35 minutos donde se realizan diversas técnicas circenses. Un mundo donde el caos del bufón y la gracia de la acróbata colisionan. Humor físico e intensidad aérea que se buscan y se persiguen hasta el desenlace.

**Texto nuevo:**
> Un mundo donde el caos del payaso y la gracia de la acróbata aérea colisionan en una historia de amor. Humor físico e intensidad circense se combinan en un lenguaje lleno de ritmo y emoción, a través de malabares, acrobacia aérea, portes acrobáticos, clown, rolabola y equilibrio en sillas. Un espectáculo donde el público disfruta de la esencia del circo sentado en una hermosa gradería de madera semicircular.

---

## Task 3 — Nueva descripción de "La Pluma"
**Archivo:** `circo-teatro.html`  
**Acción:** Reemplazar el `<p class="detalle-desc">` de La Pluma:

**Texto actual:**
> Un espectáculo de 15 minutos que combina la acrobacia en aro aéreo con danza, teatro y manipulación de objetos. Lulú y su inseparable pluma Lilí. Un encuentro íntimo donde la fragilidad se convierte en fortaleza.

**Texto nuevo:**
> Lulú, una escritora del mundo de la fantasía, da vida a sus historias junto a su inseparable pluma Lilí. Un espectáculo de manipulación de objetos, aro aéreo y danza, donde la imaginación y la fragilidad se elevan al aire.

---

## Task 4 — Fotos de cada espectáculo (BLOQUEADO — pendiente de WhatsApp)
**Archivo:** `circo-teatro.html`  
**Acción:** Reemplazar las imágenes de la galería de cada espectáculo con las fotos correctas.
- **La Pluma**: NO son de telas, son de aro y de la escritora.
- **Metamorfosis**: Sí son de telas y de la bruja.
- **El Bufón y la Acróbata Aérea**: combinar telas, aro y portes.

**Estado:** ⏸️ BLOQUEADO — El cliente enviará por WhatsApp las fotos específicas de cada espectáculo. Cuando lleguen:
1. Copiar las fotos a `assets/images/espectaculos/[carpeta-del-espectáculo]/`
2. Actualizar los `<img src="...">` en la galería de cada sección

---

## Task 5 — Cambiar "Animación callejera" por "Animación itinerante"
**Archivos:** `index.html` y `pasacalles.html`

En `index.html`, línea ~130, sección pasacalles:
```html
<!-- ANTES -->
<span class="sec-etiqueta">Animación callejera</span>
<!-- DESPUÉS -->
<span class="sec-etiqueta">Animación itinerante</span>
```

En `pasacalles.html`, línea ~57, hero:
```html
<!-- ANTES -->
<span class="sec-etiqueta">Animación callejera</span>
<!-- DESPUÉS -->
<span class="sec-etiqueta">Animación itinerante</span>
```

---

## Task 6 — Nueva descripción de "Pasacalles por Estética"
**Archivo:** `pasacalles.html`  
**Acción:** Reemplazar la descripción en la sección separador de estéticas.

**Texto actual (línea ~258 aprox, dentro de `.esteticas-separador`):**
> Además de los espectáculos con narrativa, la compañía dispone de pasacalles categorizados por su estética visual.

**Texto nuevo:**
> La compañía cuenta con una amplia variedad de vestuarios y propuestas que permiten adaptar y personalizar cada pasacalles según la temática del evento. Entre nuestras propuestas destacan: estética medieval, árabe, romana, pirata, circense, bandolera… recreando así ambientes llenos de personalidad para cada ocasión.

---

## Task 7 — Reescribir la página de Marionetas
**Archivo:** `marionetas.html`  
**Acción completa — 3 cambios:**

### 7a. Cambiar "Teatro de títeres" → "Teatro de marionetas"
```html
<!-- ANTES -->
<span class="sec-etiqueta">Teatro de títeres</span>
<!-- DESPUÉS -->
<span class="sec-etiqueta">Teatro de marionetas</span>
```

### 7b. Cambiar también en `index.html` la etiqueta de la sección marionetas:
```html
<!-- ANTES -->
<span class="sec-etiqueta">Teatro de títeres</span>
<!-- DESPUÉS -->
<span class="sec-etiqueta">Teatro de marionetas</span>
```

### 7c. Reescribir el contenido de la página
La página actual muestra "El Zancudo y la Marioneta" (que es un pasacalles y ya está en `pasacalles.html`). La página debe describir un **teatro de marionetas de madera con marionetas de gomaespuma**.

**Reemplazar todo el contenido del `<header>` y la `<section class="detalle-seccion">`:**

**Nuevo texto de cabecera (`pagina-intro`):**
> Un precioso teatro de marionetas de madera que cobra vida en plena calle, creando un espacio mágico donde los niños se sientan a disfrutar de historias fantásticas.

**Nueva descripción del espectáculo (`detalle-desc`):**
> A través de marionetas boconas, los actores dan vida a relatos llenos de humor y fantasía: caballeros que no quieren ser caballeros, princesas que renuncian a la corona, brujas divertidas y dragones con mucho que contar. Espectáculos cercanos, encantadores y llenos de imaginación para los más pequeños.

**Técnicas:** Quitar las actuales (Zancos, Manipulación de hilos, etc.) y poner:
- Marionetas boconas
- Gomaespuma
- Teatro de madera
- Interacción con el público

**Fotos:** El cliente dice que no tiene fotos aún pero puede enviar 2 por WhatsApp del material. **De momento dejar las fotos actuales o las que envíe como placeholder.** ⏸️ PARCIALMENTE BLOQUEADO.

**meta description:** Actualizar para reflejar "teatro de marionetas de madera" en vez de "zancudo".

---

## Task 8 — Fotos cortadas (responsive)
**Archivos:** `css/detalle.css` y `css/responsive.css`  
**Acción:** Revisar y ajustar el `object-fit` / `object-position` / `min-height` / `max-height` de las imágenes en las galerías para que no se corten, especialmente:
- Los Goliardos: se ven cortadas tanto en móvil como en escritorio
- Otras fotos que se cortan solo en móvil

**Técnica sugerida:**
1. En `.detalle-galeria img`, valorar usar `aspect-ratio` en vez de `min-height: 200px` para que las fotos respeten su proporción.
2. En responsive móvil, la galería pasa a 1 columna y las imágenes deben verse completas. Considerar `object-fit: contain` o un `aspect-ratio: 4/3` para que no se corten.
3. Probar con la foto de Los Goliardos como caso de prueba.

**Nota:** Este task puede requerir ajuste fino visual — puede necesitar `object-position` específico para fotos concretas que sean muy verticales u horizontales.

---

## Orden de ejecución recomendado

| Orden | Task | Bloqueado? | Complejidad |
|-------|------|------------|-------------|
| 1 | Task 1 — Quitar párrafos pasacalles de circo-teatro | No | Trivial |
| 2 | Task 2 — Descripción Bufón | No | Trivial |
| 3 | Task 3 — Descripción La Pluma | No | Trivial |
| 4 | Task 5 — "Animación itinerante" | No | Trivial |
| 5 | Task 6 — Descripción estéticas | No | Trivial |
| 6 | Task 7 — Reescribir marionetas | Parcial (fotos) | Media |
| 7 | Task 8 — Fotos cortadas (responsive) | No | Media-Alta |
| 8 | Task 4 — Fotos espectáculos | Sí (WhatsApp) | Baja (cuando lleguen) |

---

## Notas para el ejecutor (Sonnet)

- **NO toques** `css/variables.css`, `css/base.css`, ni `js/main.js` (ver CLAUDE.md).
- Las Tasks 1-6 son reemplazos de texto directos — usa `replace_string_in_file` o `multi_replace_string_in_file`.
- Para Task 7, la reescritura de `marionetas.html` es más amplia — lee el archivo completo primero, luego haz los reemplazos.
- Para Task 8, lee `css/detalle.css` y `css/responsive.css` para entender el layout actual antes de tocar nada. Prueba con Live Server si es posible.
- Tasks 4 y parte de 7 están bloqueadas esperando fotos del cliente por WhatsApp.
