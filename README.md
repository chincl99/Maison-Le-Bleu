# Maison Le Bleu

A single-page restaurant website for **Maison Le Bleu**, a fictional French fine-dining restaurant in Paris. No build tools, no frameworks — open `index.html` directly in any browser.

## Live Site

[https://chincl99.github.io/Maison-Le-Bleu/](https://chincl99.github.io/Maison-Le-Bleu/)

## Features

- Hero section with Ken-Burns animation and a full-screen atmospheric photograph
- Signature dishes menu with image cards
- Customer testimonials carousel with auto-advance and manual controls
- Online reservation form with client-side validation and confirmation state
- Voice announcement on successful booking (Web Speech API)
- Balloon drop celebration — coloured balloons rise with swaying animation on form success
- Light / dark theme toggle with OS preference detection and `localStorage` persistence
- WhatsApp Business floating-action button (bottom-right) for direct messaging
- **Chatbot assistant** — gold floating-action button (above WhatsApp FAB) opens a chat panel with:
  - Greeting message and 5 quick-suggestion chips on first open
  - Keyword-matched answers across 16 topic areas (reservations, menus, hours, location, payments, events…)
  - Typing indicator animation before each reply
  - Accessible: `aria-live` messages region, focus management, Escape to close
- Fully responsive design — mobile, tablet, desktop (hamburger nav at 768 px)
- Accessible: skip link, ARIA labels, `aria-live` regions, focus-visible outlines

## Tech Stack

- Plain HTML, CSS, vanilla JavaScript — no frameworks or build tools
- Google Fonts: Cormorant Garamond, Montserrat
- Unsplash images (direct CDN URLs, no API key needed)

## Running Locally

```
# Windows — open in default browser
start index.html

# Or drag index.html into any browser window
```

No server, package manager, or install step required.

## Project Structure

```
├── index.html      # All markup — nav, hero, menu, testimonials, reservations, footer, FABs
├── styles.css      # All styles — CSS variables, BEM classes, responsive breakpoints
└── script.js       # Single IIFE — nav scroll, hamburger, theme toggle, carousel, form validation, chatbot
```

### Custom agents & skills

```
└── .claude/agents/whatsapp-chatbot-widget.md   # Agent: manage the WhatsApp FAB
```

## Customisation

**Colours** — all colours are CSS custom properties on `:root` in `styles.css`. The primary accent is `--clr-gold: #c8a96e`. A `[data-theme="light"]` block provides the light palette. Edit only the variables block to retheme the entire site.

**Theme toggle** — reads `localStorage('theme')`, falls back to `prefers-color-scheme`. To change the default, edit the inline `<script>` in `<head>` of `index.html`.

**WhatsApp number** — change the digits after `wa.me/` in the `<a class="wa-fab">` href in `index.html`.

**Chatbot knowledge base** — edit the `CHAT_KB` array in `script.js`. Each entry has a `keys` array of regex patterns and an `a` HTML answer string. Add new entries to expand the bot's topic coverage.

**Images** — all photos are Unsplash direct URLs with query params (e.g. `?w=600&h=400&fit=crop&q=80`). Swap the photo ID segment in the URL to change any image.

**Content** — edit text directly in `index.html`. Section IDs (`#menu`, `#testimonials`, `#reservations`) are used by nav links and the hero CTA — keep them if you rename sections.
