# Performance Exploration: Astro 7 Glow Studio

## Evidence

- `src/layouts/Layout.astro:147-166` blocks first-visit scrolling and keeps a decorative loader visible through a fixed 1.5 second sequence.
- `src/components/MetodoCanvas.jsx:146-165` runs an uncapped `requestAnimationFrame` loop. Each frame queries `.method-label-orb`, writes CSS variables, updates blobs, and creates a radial gradient.
- `src/styles/global.css:31-40` applies blur, transform, opacity, and `will-change` to every `.reveal` element.
- Astro `Picture` images use AVIF/WebP and responsive widths, but several lazy images omit `decoding="async"`.
- `src/components/SkinQuiz.jsx:299-305` uses a single raw imported image URL only after the quiz result is shown.

## Existing Good Practices

- The homepage hero already uses `Picture`, AVIF/WebP, responsive widths, `loading="eager"`, and `fetchpriority="high"`.
- Below-the-fold React islands use `client:visible`.
- Fonts are self-hosted and use `font-display: swap` through Fontsource.

## Constraints

- No baseline Lighthouse/build metrics were available in the audit environment because Node and pnpm were not on PATH.
- Preserve the visual identity and existing Astro/React architecture.
- Do not add dependencies for this optimization slice.
