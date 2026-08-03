# Proposal: Astro 7 Performance Hardening

## Intent

Reduce avoidable first-render delay and continuous main-thread work while preserving Glow Studio's visual identity and current Astro/React architecture.

## Scope

### In Scope

- Make the homepage loader presentation-only and bounded, without blocking initial content or scroll for a fixed long delay.
- Make `MetodoCanvas` pause when offscreen, hidden, or reduced motion is preferred; avoid repeated DOM queries and avoid rebuilding stable drawing state every frame.
- Simplify reveal animations to opacity/transform and remove blanket compositor hints.
- Add `decoding="async"` to lazy Astro images that currently omit it.
- Capture build and mobile Lighthouse baselines before and after the change.

### Out of Scope

- Replacing React or the canvas with another library.
- Adding dependencies, a service worker, CDN changes, or speculative bundle splitting.
- Reworking the quiz image into a responsive image pipeline in this slice; it is loaded only after user interaction.
- Changing fonts, copy, layout, security headers, or visual design tokens.

## Capabilities

### New Capabilities

None. This is a runtime and loading optimization of existing capabilities.

### Modified Capabilities

None. User-visible behavior remains functionally equivalent.

## Approach

Apply the smallest source changes in `Layout.astro`, `global.css`, `MetodoCanvas.jsx`, and affected Astro image call sites. Prefer browser-native lifecycle signals (`IntersectionObserver`, `visibilitychange`, `matchMedia`) over dependencies or new abstractions.

## Success Criteria

- First visit does not intentionally hide usable page content behind a fixed 1.5 second delay.
- Canvas work stops when it cannot contribute visible pixels and does not query orb nodes on every frame.
- Reduced-motion users receive a static method visual.
- Lazy Astro images declare asynchronous decoding.
- Build succeeds and mobile LCP/INP/CLS are measured against a recorded baseline with no regression.

## Rollback Plan

Revert the single change commit. Each optimization is isolated to existing files and has no migration or dependency rollback.
