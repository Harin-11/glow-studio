# Tasks: Astro 7 Performance Hardening

## Phase 0 — Baseline

- [ ] 0.1 Ensure Node/pnpm are available and run the production build.
- [ ] 0.2 Record mobile Lighthouse results for `/`, `/metodo`, and `/rituales`: LCP, INP, CLS, transfer size, and long tasks.

## Phase 1 — First-render path

- [ ] 1.1 Update `src/layouts/Layout.astro` so loader dismissal does not block scrolling or reveal initialization behind a fixed 1.5 second wait.
- [ ] 1.2 Update `src/styles/global.css` only as needed to preserve the loader transition with the shorter non-blocking lifecycle.
- [ ] 1.3 Verify first-visit and returning-visit behavior, including `localStorage` fast path.

## Phase 2 — Canvas runtime

- [ ] 2.1 Update `src/components/MetodoCanvas.jsx` to cache orb nodes and stable drawing state.
- [ ] 2.2 Pause animation while offscreen or while the document is hidden.
- [ ] 2.3 Render a static frame for reduced-motion users and clean up all listeners/observers.
- [ ] 2.4 Verify orb interaction and resize behavior on desktop and mobile.

## Phase 3 — CSS and image cost

- [ ] 3.1 Simplify `.reveal` in `src/styles/global.css` to opacity/transform and remove blanket `will-change`/blur cost.
- [ ] 3.2 Add `decoding="async"` to lazy Astro `Picture` usages missing it.
- [ ] 3.3 Verify no layout, accessibility, or visual-regression issues in the affected sections.

## Phase 4 — Verification

- [ ] 4.1 Rebuild the production site.
- [ ] 4.2 Repeat the same Lighthouse measurements and compare against Phase 0.
- [ ] 4.3 Keep only changes that improve or preserve the measured metrics; revert speculative changes.

## Explicit YAGNI Guardrails

- No new package.
- No service worker or caching architecture.
- No React rewrite.
- No responsive-image redesign for the post-quiz result.
- No changes to fonts, copy, routes, security headers, or design tokens.
