# Audit Completo — Glow Studio Mobile Menu Issues

## Estado actual (branch: `feat/astro-migration`)

Último commit: `c5bfea0` — "fix: aria-label duplicado como texto + header fondo transparente"

---

## 🔴 CRÍTICO (bugs visibles para el usuario)

### 1. Header no se funde con el overlay (color distinto)

**Archivo**: `src/components/Header.astro` (línea 60-65)
**Problema**: El CSS actual de `header.menu-open` tiene:

```css
header.menu-open {
  background: rgba(30, 27, 24, 0.4);
  backdrop-filter: blur(8px);
}
```

El header está a `z-50`, ENCIMA del overlay (`z-40`). Su `backdrop-filter` blurea el overlay que ya está blureado → **doble blur = color más oscuro y diferente al resto del viewport**.

El overlay aporta 40% carbón + blur(8px). El header aporta OTRO 40% carbón + blur(8px). Efectivo: ~64% carbón con blur acumulado.

**Edición previa a `transparent` + `none` NO se persistió** (fue sobrescrita en commit posterior `53534ed`).

### 2. Scroll funciona cuando el menú está abierto

**Archivos**: `src/pages/index.astro` + `src/styles/global.css`
**Problema**: El JS hace `document.body.classList.add("menu-open")` pero NO existe la regla CSS `body.menu-open { overflow: hidden; }` en `global.css`.

- La regla existe en `src/style.css` (archivo LEGACY, NO importado por Astro)
- `main.js` (también legacy) referencia la misma clase
- Resultado: el body **no bloquea el scroll** al abrir el menú

### 3. Logo invisible sobre header oscuro

**Archivo**: `src/components/Header.astro` (línea 66-68)
**Problema**: Con fondo `rgba(30,27,24,0.40)`, el logo a `rgba(255,255,255,0.30)` tiene contraste mínimo. Al 30% de opacidad sobre un fondo ya oscuro (40% carbón), el logo es casi invisible.

---

## 🟡 MEDIO (diseño/consistencia)

### 4. Archivos legacy sin uso

**Archivos**: `src/main.js` (16KB), `src/style.css` (19KB)
**Problema**: Contienen código duplicado del sitio pre-Astro (hamburger menu, scroll lock CSS, reveal animations). No están importados por ningún componente Astro pero siguen en el repo. Generan confusión y riesgo de inconsistencias.

### 5. Header scrolled + menu-open conflicto potencial

**Archivo**: `src/components/Header.astro` (línea 51-57, 60-65)
**Problema**: Si el usuario abre el menú después de scrollear, el header tiene AMBAS clases: `scrolled` + `menu-open`.

- `scrolled` pone `height: 60px` (mobile) / `80px` (desktop)
- `menu-open` NO redefine height
- Resultado: header con altura reducida pero fondo blur oscuro, puede verse desproporcionado

### 6. Nav-label "MENU" aparece sobre overlay

**Archivo**: `src/components/Header.astro` (línea 18)
**Problema**: `#menu-label` muestra "MENU" con `opacity: 1` cuando el menú abre. Está al lado del hamburger, sobre el header que ahora tiene fondo oscuro. El texto usa `text-glow-dusk/60` que es gris medio → bajo contraste.

---

## 🟢 MENOR (optimizaciones)

### 7. Cursor React se ejecuta en mobile

**Archivo**: `src/components/CursorEffects.jsx`
**Problema**: El componente React registra `mousemove` handlers sin verificar si es mobile. El CSS oculta los elementos del cursor con media query, pero el JS sigue ejecutándose. Ineficiente pero no visible para el usuario.

### 8. Hero image overflow potencial en mobile

**Archivo**: `src/components/Hero.astro` (línea 16)
**Problema**: `md:overflow-hidden` solo aplica en desktop. En mobile, la imagen del hero con `max-md:aspect-[16/10]` podría desbordar en pantallas muy estrechas.

---

## Raíz técnica del problema del header

```
Stacking actual:
┌─────────────────────────────────────┐
│  HEADER (z-50)                      │
│  bg: rgba(30,27,24,0.40)           │  ← CAPA EXTRA de color
│  backdrop-filter: blur(8px)         │  ← BLUREA el overlay
│  logo: rgba(255,255,255,0.30)      │  ← 30% sobre fondo oscuro
├─────────────────────────────────────┤
│  OVERLAY (z-40)                     │
│  bg: rgba(30,27,24,0.40)           │  ← Primer filtro de color
│  backdrop-filter: blur(8px)         │  ← Primer blur
├─────────────────────────────────────┤
│  PAGE CONTENT                       │  ← Contenido real
└─────────────────────────────────────┘
```

El header tiene su PROPIO color y blur, no usa el del overlay. Resultado: zona del header = **más oscura y más blurreada** que el resto.

---

## Plan de corrección (orden de ejecución)

### Paso 1: Bloquear scroll con menú abierto

- Agregar `body.menu-open { overflow: hidden; }` a `src/styles/global.css`
- Esto es el fix más simple y directo al bug reportado

### Paso 2: Header transparente — blending perfecto con overlay

- Cambiar `header.menu-open` a `background: transparent` + `backdrop-filter: none`
- El overlay (z-40) cubre TODO incluyendo el área del header
- El header (z-50) flota ENCIMA sin agregar color propio
- Logo: `rgba(255,255,255,0.45)` — legible sobre el fondo oscuro del overlay
- Hamburger: `rgba(255,255,255,0.55)` — visible pero no agresivo
- **Clave**: el header NO aporta color ni blur. El overlay lo hace todo uniformemente.

### Paso 3: Resolver conflicto scrolled + menu-open

- Agregar `height: auto` o `height: var(--header-height-mobile, 70px)` a `header.menu-open`
- Esto previene que el header se encoja a 60px cuando está scrolled Y abierto

### Paso 4: Mejorar "MENU" label

- Ajustar `text-glow-dusk/60` a algo más legible sobre fondo oscuro
- O remover el label si no aporta valor visual

### Paso 5: Eliminar archivos legacy

- Borrar `src/main.js` y `src/style.css` (no están importados por Astro)

### Paso 6: Verificar cross-breakpoint

- Verificar que los fixes no afecten:
  - Desktop (≥768px): header normal, sin overlay, sin menu-open
  - Mobile (<768px): overlay + header + nav-panel funcionando
  - Transición resize: menú se cierra al pasar de mobile a desktop

---

## Riesgos

- **Bajo**: Los cambios son puramente CSS (color/overflow/height)
- **Medio**: Si el header es transparente y el hero es crema, el logo blanco podría perderse ANTES de que el overlay se muestre. Pero el overlay SOLO aparece cuando el menú está abierto, así que siempre hay fondo oscuro detrás.
- **Verificación requerida**: Probar en Safari (backdrop-filter tiene quirks en WebKit)
