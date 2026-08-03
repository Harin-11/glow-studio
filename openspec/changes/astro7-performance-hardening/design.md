# Design: Astro 7 Performance Hardening

## 1. Loader Lifecycle

Keep the loader markup and visual transition, but remove its role as a gate for the page:

- Do not hold `body` scrolling until a fixed 1.5 second timer completes.
- Start reveal initialization independently of the loader transition.
- Use one short, bounded dismissal path and hide the loader after the transition completes.
- Preserve the returning-user `localStorage` fast path.

The loader remains decorative; content remains the source of truth for readiness.

## 2. MetodoCanvas Lifecycle

Keep the current canvas visual and React API. Change only its runtime lifecycle:

- Cache orb elements once after mount.
- Cache the connection gradient until active index or canvas size changes.
- Gate animation with `IntersectionObserver` and `document.visibilityState`.
- Render one static frame when `prefers-reduced-motion: reduce` matches.
- Continue using refs so animation does not cause React re-renders.
- Clean up animation, observers, and media-query listeners on unmount.

No new animation engine or canvas abstraction is introduced.

## 3. Reveal Animation

Retain the existing reveal timing and intersection behavior, but use opacity and transform only. Remove blanket `will-change` and blur from the default path. Add a reduced-motion rule that makes revealed content immediately visible without transitions.

## 4. Images

Add `decoding="async"` to existing lazy Astro `Picture` instances. Do not redesign `SkinQuiz` image delivery in this slice because it is not part of the initial render path.

## Verification

Run the project build, then collect mobile Lighthouse measurements for the homepage, `/metodo`, and `/rituales`. Compare LCP, INP, CLS, total transfer, and long tasks with the baseline.
