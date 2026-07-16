# Glow Studio Development & Review Guidelines

This document defines the coding standards, styling conventions, performance guidelines, and SEO best practices for the Glow Studio codebase. Adhere to these rules when creating or modifying files in this project.

## 1. Tech Stack Overview
* **Framework**: Astro (v7.x)
* **UI Libraries**: React (v19.x) for interactive components
* **Styling**: Tailwind CSS (v3.x) with custom design tokens + custom CSS in `src/styles/global.css`
* **Fonts**: Self-hosted locally using `@fontsource` packages
* **Hosting**: Vercel

---

## 2. Astro Guidelines

### 2.1 Prefetching
* Native prefetching is configured globally in `astro.config.mjs` (`prefetchAll: true`, default strategy `"hover"`).
* Avoid adding redundant `data-astro-prefetch` attributes on links unless overriding the default strategy (e.g., using `data-astro-prefetch="viewport"` on primary CTAs).

### 2.2 Image Optimization
* Use the `<Picture />` component from `astro:assets` for all content images inside Astro files.
* Always specify explicit `width`, `height`, `formats={["avif", "webp"]}`, `widths`, and `sizes`.
* **LCP (Largest Contentful Paint)**: Hero images above the fold must use `loading="eager"` and `fetchpriority="high"`.
* **Other Images**: Must use `loading="lazy"` and `decoding="async"`.

### 2.3 Head, SEO & Accessibility
* `src/layouts/Layout.astro` is the single source of truth for page setup, meta properties, and document structure.
* Always use absolute URLs for canonical links and OpenGraph/Twitter sharing images.
* Maintain WCAG 2.1 AA compliance: provide descriptive `alt` tags and keep the viewport tag scale-unrestricted: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
* Update sitemap links in `public/robots.txt` if the site production domain changes.

---

## 3. React Guidelines (Client-Side Components)

### 3.1 Client Directives
* Use client directives (`client:visible`, `client:load`) carefully.
* Prefer `client:visible` for interactive components located below the fold (e.g., `MetodoContainer`, `SkinQuiz`).

### 3.2 Performance & State Management
* Keep component state minimal. Use `useCallback` for callbacks passed to child components.
* For animations, prefer manipulating custom CSS variables directly on DOM elements rather than forcing React state updates (refer to the `MetodoCanvas.jsx` frame ticker for an example).

### 3.3 Images in React Components
* For images inside React components, use standard `<img>` tags.
* Ensure you add native performance attributes: `loading="lazy"` and `decoding="async"`.

---

## 4. Styling & Tailwind CSS

### 4.1 Design System & Theme Colors
* Adhere strictly to the theme colors defined in `tailwind.config.mjs`:
  * **Backgrounds**: `bg-glow-cream` (`#F4EEE4`), `bg-glow-mist` (`#FAF7F2`), `bg-glow-parchment` (`#EDE5D6`)
  * **Text**: `text-glow-charcoal` (`#1E1B18`), `text-glow-bark` (`#3D3530`), `text-glow-dusk` (`#7A7068`)
  * **Accents/Gold**: `text-glow-gold` (`#805E3B`), `text-glow-gold-light` (`#8D6B45`), `text-glow-gold-soft` (`#A8845A`)
  * **Sage**: `text-glow-sage` (`#7B9176`), `text-glow-sage-mist` (`#D4DDD2`)
* Fonts mapping:
  * `font-display`: Cormorant Garamond
  * `font-heading`: Cormorant SC
  * `font-body`: DM Sans
  * `font-mono`: DM Mono

### 4.2 Utility Classes vs. Global CSS
* Use Tailwind utility classes for element-specific styles.
* Keep global styles, animations (like `.reveal` or `.btn-glow`), and mobile overrides inside `src/styles/global.css`. Avoid repeating complex animations or button styles inline.
* Place mobile layout overrides inside responsive media queries at the bottom of `src/styles/global.css`.

---

## 5. Security & Deployment

### 5.1 Content Security Policy (CSP)
* Maintain CSP rules in `vercel.json`.
* Do not whitelist external Google Font domains (like `fonts.googleapis.com` or `fonts.gstatic.com`) as all fonts are self-hosted via local packages.
* Keep `form-action` restricted to trusted URLs like `https://wa.me`.
