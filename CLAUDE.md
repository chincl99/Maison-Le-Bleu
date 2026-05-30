# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page restaurant booking website for **Maison Le Bleu**, a fictional French fine-dining restaurant. No build tools, no frameworks — open `index.html` directly in a browser.

## Running the site

```
# Windows — open in default browser
start "c:\chincl\Open AI new project\index.html"

# Or drag index.html into any browser window
```

There is no dev server, package manager, or build step.

## Architecture

Three flat files with clear separation of concerns:

- **`index.html`** — all markup. Sections in order: `<nav>`, `.hero`, `#menu`, `#testimonials`, `#reservations`, `<footer>`. Each section uses `id` anchors that the nav links and the hero CTA point to.
- **`styles.css`** — numbered sections matching the HTML structure (Variables → Reset → Container/Buttons → Nav → Hero → Sections → Menu → Carousel → Reservations → Footer → Animations → Responsive). All colours are CSS custom properties on `:root`; touch only the variables block to retheme.
- **`script.js`** — single IIFE, no modules. Five self-contained blocks in order: nav scroll state, hero Ken-Burns trigger, hamburger/overlay, IntersectionObserver fade-ins, testimonial carousel, form validation.

## Key design decisions

**CSS naming** follows a loose BEM pattern: `.block`, `.block__element`, `.block--modifier`. The modifier for interactive state uses a `body.nav-open` class toggled by JS.

**Carousel** uses CSS grid stacking (all slides share `grid-area: 1 / 1`) so height is always determined by the tallest slide rather than a fixed `min-height`. Active slide gets `opacity: 1; pointer-events: all`.

**Form validation** runs entirely in `script.js` on `submit`. It clears all errors first, then re-validates each field and calls `setError(fieldId, message)` / `clearError(fieldId)` helpers. On success it hides the `<form>` and shows `#confirmation` (uses the `hidden` attribute, not CSS). The reset button reverses this.

**Images** are all Unsplash direct URLs with `?w=600&h=400&fit=crop&q=80` params. The hero uses `?w=1920&q=85&fit=crop`. Swap the photo ID segment to change images.

**Responsive breakpoints** in `styles.css` (section 12): 1100 px (footer 2-col), 900 px (menu 2-col, reservations stacked), 768 px (hamburger nav, form rows stack), 560 px (menu 1-col, footer 1-col).

## Colours & typography

All colours are CSS variables in `styles.css :root`. Primary accent is `--clr-gold: #c8a96e`. Two Google Fonts are loaded in `<head>`: **Cormorant Garamond** (serif, headings) and **Montserrat** (sans-serif, body/UI).

## Accessibility notes

- Every `<img>` has a descriptive `alt`.
- All form inputs are associated with `<label for="…">` and have `aria-describedby` pointing to their error `<span>`.
- Error spans use `role="alert" aria-live="polite"`.
- The skip link (`.skip-link`) targets `#main-content`.
- Carousel uses `aria-live="polite"` on the track and `role="group"` on each slide.
