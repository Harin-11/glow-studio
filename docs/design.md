# Sistema de Diseño Creativo — Glow Studio

Este documento detalla las directrices creativas, decisiones estéticas y estructura técnica de Glow Studio para garantizar la coherencia visual durante la expansión del sitio web a múltiples páginas.

---

## 1. Identidad Visual y Paleta de Colores

Glow Studio utiliza una paleta de colores orgánica, premium y de bajo contraste, diseñada para inspirar calma, limpieza y bienestar.

| Nombre | Código Hex | Aplicación Principal | Sensación / Intención |
|---|---|---|---|
| **Glow Cream** | `#F4EEE4` | Fondo de página principal, secciones claras | Calidez, luz, naturalidad. |
| **Glow Parchment** | `#EDE5D6` | Fondos secundarios, tarjetas | Textura suave, elegancia táctil. |
| **Glow Mist** | `#FAF7F2` | Fondos de transición, bloques limpios | Amplitud, aire libre, pureza. |
| **Glow Charcoal** | `#1E1B18` | Secciones oscuras, textos principales | Sofisticación, profundidad, silencio. |
| **Glow Bark** | `#3D3530` | Subtítulos, textos secundarios en claro | Orgánico, tierra, estabilidad. |
| **Glow Dusk** | `#7A7068` | Etiquetas, estados desactivados | Neutralidad, sombra suave. |
| **Glow Gold** | `#A8845A` | Acentos, botones, enlaces destacados | Calidad premium, destello, sol. |
| **Glow Gold Light** | `#C4A47A` | Hover en botones de acento | Luminosidad, interacción activa. |
| **Glow Sage** | `#7B9176` | Detalles de ingredientes o bienestar | Botánico, frescura, sanación. |

---

## 2. Sistema Tipográfico

Evitamos las fuentes predeterminadas del navegador en favor de una tipografía combinada que mezcla la elegancia clásica editorial con la legibilidad moderna y técnica.

- **Display (Serif)**: `Cormorant Garamond` (Italic, Light, Bold)
  - *Uso*: Títulos principales, frases filosóficas, citas poéticas.
  - *Estilo*: Letras itálicas elegantes con ligaduras naturales y espaciado orgánico.
- **Heading (Serif SC)**: `Cormorant SC` (Small Caps, Medium)
  - *Uso*: Títulos de secciones, marca (GLOW STUDIO).
  - *Estilo*: Serif de caja alta de inspiración clásica romana, transmite orden y atemporalidad.
- **Body (Sans-serif)**: `DM Sans` (Light, Regular)
  - *Uso*: Descripciones, textos explicativos, contenido de acordeones.
  - *Estilo*: Sans-serif geométrica pero suave, altamente legible en pantallas pequeñas.
- **Mono (Monospace)**: `DM Mono` (Regular)
  - *Uso*: Etiquetas de sección (Labels), números de sección, duraciones o precios.
  - *Estilo*: Técnico, preciso, minimalista.

---

## 3. Principios de Layout e Interacción

Para mantener el carácter premium de Glow Studio, cada página nueva debe seguir estas reglas:

1. **Micro-animaciones Fluidas**:
   - Todo elemento interactivo (tarjetas, botones, enlaces de navegación) debe tener una transición suave (`transition-all duration-300 ease-out`).
   - Uso de la clase `.reveal` conectada a un `IntersectionObserver` para animaciones de scroll (desplazamiento vertical de 60px, escala a 0.98 y blur a 0).
2. **Espaciado Generoso (Espacio en Blanco)**:
   - Secciones separadas por padding de mínimo `py-12` en móvil, escalando a `md:py-16` y `lg:py-20` en pantallas grandes.
   - Respetar la amplitud del diseño para que "la página pueda respirar".
3. **Bordes Elegantes e Hilos Visuales**:
   - Divisores finos usando `border-glow-gold/10` sobre fondos claros o `border-white/5` sobre fondos oscuros.
   - Hilos verticales decorativos (como el indicador de scroll) para guiar la mirada de forma sutil.
4. **Experiencia de Carga y Navegación**:
   - Uso de la pantalla de carga tipo "puertas deslizantes" (`Loader.astro`) para enmarcar el ingreso a la web.
   - Cursor personalizado circular en escritorio que reacciona agrandándose y haciéndose traslúcido en hovers interactivos.

---

## 4. Estructura de las Nuevas Páginas (Propuesta)

Para la expansión multi-página, mantendremos la misma estructura de navegación pero distribuyendo el contenido de forma más profunda:

- **Página de Inicio (`/`)**:
  - Hero de impacto con el concepto de la marca.
  - Cita filosófica de introducción.
  - Muestra general de los rituales más solicitados.
  - El "Método Glow" interconectado (React Canvas + Accordion).
  - CTA de reserva y contacto directo.
- **Página de Nosotros (`/nosotros`)**:
  - Historia del Studio y fundadores.
  - Perfiles de los profesionales (Equipo) con grids elegantes, fotos estéticas y su especialidad.
  - Detalle de los pilares del Método (Cuidado consciente, Espacio seguro, Excelencia técnica).
- **Página de Rituales (`/rituales`)**:
  - Catálogo completo de tratamientos organizado por categorías (Rostro, Cuerpo, Manos, Cejas/Pestañas).
  - Precios y tiempos transparentes (ej. `60 min · S/. 120`).
  - Botones de acción directa para reservar cada tratamiento en particular a través de WhatsApp.
