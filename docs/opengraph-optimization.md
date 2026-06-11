# Guía de Optimización de OpenGraph y SEO para Astro y Vercel

Este documento resume los conocimientos adquiridos y las mejores prácticas aplicadas en el proyecto **Glow Studio** para alcanzar un puntaje perfecto de **100/100** en auditorías de OpenGraph (`opengraph.to`).

---

## 1. Configuración de Dominio Dinámico en Astro + Vercel

### El Problema
Por defecto, Astro utiliza la opción `site` en `astro.config.mjs` para calcular todas las URLs absolutas (como el tag de la imagen de OpenGraph y el enlace canonical). Si este valor se deja hardcodeado a un dominio de producción final (ej. `https://glowstudio.pe`) que no se encuentra online o no tiene los DNS apuntados todavía, los validadores de redes sociales (LinkedIn, Twitter, Facebook) fallarán al intentar descargar la imagen de OpenGraph de ese servidor remoto.

### La Solución
Configurar el campo `site` dinámicamente utilizando las variables de entorno de Vercel. La variable ideal es **`VERCEL_PROJECT_PRODUCTION_URL`**, la cual resuelve automáticamente al dominio activo que tiene configurado el panel de control del proyecto (incluyendo URLs de staging como `glow-studio-alpha.vercel.app` o el dominio de producción final una vez vinculado).

**`astro.config.mjs`:**
```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// Resuelve al dominio activo en Vercel, o cae en el dominio final por defecto
const SITE = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: "https://glow-studio-alpha.vercel.app";

export default defineConfig({
	site: SITE,
	integrations: [react(), tailwind(), sitemap()],
});
```

---

## 2. Redimensionamiento de Imágenes con FFMPEG

### El Problema
LinkedIn, Facebook y Twitter requieren imágenes de OpenGraph horizontales con una relación de aspecto de **1.91:1** (mínimo sugerido: **1200x630px**). Si se comparte una imagen cuadrada (ej. `1024x1024px`), las plataformas la recortarán o mostrarán una previsualización de tarjeta pequeña, lo cual resta profesionalidad.

### La Solución
Generar una imagen dedicada para redes sociales a partir de la imagen principal utilizando `ffmpeg`. Para evitar deformar o estirar la imagen, se aplica un filtro compuesto que recorta el centro de la imagen original a la proporción correcta y luego la escala al tamaño objetivo.

**Comando FFMPEG utilizado:**
```bash
ffmpeg -i public/assets/hero.webp -vf "crop=1024:538:0:243,scale=1200:630" -c:v libwebp -lossless 0 -q:v 80 public/assets/hero-og.webp
```

* **Explicación del filtro (`crop`):**
  * Ancho de la imagen: `1024px`.
  * Alto objetivo de proporción: `1024 * (630 / 1200) ≈ 538px`.
  * Píxeles sobrantes a recortar verticalmente: `1024 - 538 = 486px` (`243px` arriba y `243px` abajo).
  * `crop=1024:538:0:243` toma el cuadro del centro.
  * `scale=1200:630` escala la imagen resultante sin alterar su aspecto.
* **Resultado:** Se conserva la imagen cuadrada original `hero.webp` para los componentes y estilos de la web, y se usa la versión optimizada `hero-og.webp` exclusivamente en los metadatos.

---

## 3. Estructura Completa del Head para OpenGraph y Twitter

Para alcanzar el puntaje de 100/100, se integró el siguiente marcado dinámico en `src/layouts/Layout.astro`:

```astro
---
const canonicalURL = new URL(Astro.url.pathname, Astro.site || "https://glowstudio.pe");
const socialImageURL = new URL(image, Astro.site || "https://glowstudio.pe");
---

<!-- Enlace Canonical -->
<link rel="canonical" href={canonicalURL.href} />

<!-- Iconos & Web App Manifest -->
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
<link rel="manifest" href="/site.webmanifest" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL.href} />
<meta property="og:site_name" content="Glow Studio" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={socialImageURL.href} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Glow Studio — Cuidado de la piel y bienestar en Arequipa" />
<meta property="og:locale" content="es_PE" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@glowstudio" />
<meta name="twitter:url" content={canonicalURL.href} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={socialImageURL.href} />
```

---

## 4. Favicon y Web App Manifest

1. **Favicon Fallback:** Google Search no soporta oficialmente favicons en formato `.svg`. Siempre es mandatorio proveer una alternativa `.png` o `.ico` explícita en el head:
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```
2. **Web App Manifest:** Crear un archivo `site.webmanifest` en la carpeta `public/` del proyecto. Esto le permite a Android habilitar la opción de "Añadir a la pantalla de inicio", define el color del tema del navegador y mejora el SEO en móviles.

**`public/site.webmanifest`:**
```json
{
  "name": "Glow Studio",
  "short_name": "Glow Studio",
  "description": "Tratamientos de cuidado de piel y bienestar en Arequipa.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F4EEE4",
  "theme_color": "#F4EEE4",
  "icons": [
    {
      "src": "/favicon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```
