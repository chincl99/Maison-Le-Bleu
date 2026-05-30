---
name: theme-toggle
description: Add a light/dark theme toggle to the 金龍閣 Golden Dragon Pavilion restaurant site. Use this skill when the user asks to add, improve, or fix the light/dark mode switch on this project.
---

You are an agent specialized in adding a production-quality light/dark theme toggle to the **金龍閣 Golden Dragon Pavilion** restaurant site — a no-build, no-framework project with three flat files: `index.html`, `styles.css`, and `script.js`.

## Project context

- **`styles.css`** — all colours are CSS custom properties on `:root`. The current dark palette uses `--clr-ink`, `--clr-dark`, `--clr-card`, `--clr-card-deep`, `--clr-ivory`, `--clr-paper`, `--clr-muted`, `--clr-border`, `--clr-celadon`, `--clr-celadon-lt`, `--clr-gold`, `--clr-gold-hover`, `--clr-rouge`, `--clr-rouge-deep`, `--clr-error`.
- **`index.html`** — nav is `.nav > .nav__inner`. Inside `.nav__inner`: logo `a.nav__logo`, hamburger `button.nav__hamburger`, and `ul.nav__links`.
- **`script.js`** — a single IIFE. Blocks: nav scroll state, hero Ken-Burns, hamburger toggle, IntersectionObserver fade-ins, testimonial carousel, form validation. The IIFE already runs `'use strict'`.

## What to implement

### 1. Light theme CSS variables (`styles.css`)

Add a `[data-theme="light"]` selector on `:root` or `html` that overrides all colour variables with a warm daylight palette that suits the imperial Chinese aesthetic — think rice paper, brushed gold, cinnabar red on cream.

Suggested light palette:
```css
html[data-theme="light"] {
  --clr-ink:        #F9F4EC;
  --clr-dark:       #F0E8D8;
  --clr-card:       #EDE2CF;
  --clr-card-deep:  #E4D6BC;

  --clr-ivory:      #2C1A0E;
  --clr-paper:      #5C3D22;
  --clr-muted:      #8A7060;
  --clr-border:     #C8B898;

  --clr-celadon:    #4A8A7C;
  --clr-celadon-lt: #2E6E60;
  --clr-gold:       #A0780A;
  --clr-gold-hover: #7A5C08;
  --clr-rouge:      #8B1A22;
  --clr-rouge-deep: #5C0F16;

  --clr-error:      #C0392B;
}
```

Also override nav background and card backgrounds if they are hardcoded (check `.nav`, `.nav.scrolled`, `.menu__card`, `.testimonial__slide`, `.reservation`, `.footer`).

Add a smooth CSS transition on `html` or `body`:
```css
html {
  transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
}
```

### 2. Toggle button (`index.html`)

Insert a `<button>` inside `.nav__inner`, between `.nav__links` and the hamburger (or after the links), with:
- `class="nav__theme-toggle"` and `id="themeToggle"`
- `aria-label="Switch to light mode"` (updated by JS)
- `aria-pressed="false"` (updated by JS)
- SVG sun icon for light mode, moon icon for dark mode — swap via JS class `nav__theme-toggle--light`

Example markup:
```html
<button class="nav__theme-toggle" id="themeToggle" aria-label="Switch to light mode" aria-pressed="false">
  <svg class="theme-icon theme-icon--moon" ...><!-- moon SVG --></svg>
  <svg class="theme-icon theme-icon--sun"  ...><!-- sun SVG --></svg>
</button>
```

### 3. Toggle styles (`styles.css`, nav section)

```css
.nav__theme-toggle {
  background: none;
  border: 1px solid var(--clr-border);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: var(--clr-ivory);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--dur) var(--ease), color var(--dur) var(--ease), background var(--dur) var(--ease);
  flex-shrink: 0;
}
.nav__theme-toggle:hover {
  border-color: var(--clr-gold);
  color: var(--clr-gold);
}
.theme-icon { width: 18px; height: 18px; }
/* show moon in dark mode, sun in light mode */
.theme-icon--sun  { display: none; }
html[data-theme="light"] .theme-icon--moon { display: none; }
html[data-theme="light"] .theme-icon--sun  { display: block; }
```

### 4. JS logic (`script.js`)

Add a new block inside the IIFE — after the existing hamburger block and before the IntersectionObserver block:

```js
/* ────────────────────────────────────────
   Theme toggle: light / dark
──────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  const isLight = theme === 'light';
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.setAttribute('aria-pressed', String(isLight));
  }
}

// Restore saved preference, then fall back to OS preference
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved ?? (prefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}
```

## Implementation checklist

1. Read `styles.css` `:root` block to confirm every colour variable name before writing the light overrides.
2. Read the `.nav__inner` markup to insert the button in exactly the right place.
3. Read `script.js` to find where to insert the new theme block without breaking the IIFE structure.
4. Apply all three file edits (CSS variables, HTML button, JS logic).
5. Verify: toggle button appears in nav, switching persists on reload, no FOUC (flash of unstyled content) because `applyTheme` runs before paint via the synchronous `localStorage` read.

## Quality bar

- No FOUC: `applyTheme` must run before first paint. Achieve this by placing the theme-restore script inline in `<head>` as a tiny `<script>` block (not deferred), OR ensure the IIFE in `script.js` is loaded with `defer` and accept minor FOUC if that is the existing pattern. If the site currently has no `defer`, add a small `<script>` in `<head>` before `styles.css`:
  ```html
  <script>
    (function(){
      var t = localStorage.getItem('theme') ||
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', t);
    })();
  </script>
  ```
- Accessible: `aria-label` and `aria-pressed` must update on every toggle.
- Persistent: `localStorage` key `'theme'` is used for persistence.
- Responsive: button must appear in both desktop nav and mobile overlay (or be accessible via the hamburger menu on mobile).
