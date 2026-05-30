# 金龍閣 · Golden Dragon Pavilion

A single-page restaurant website for **金龍閣 Golden Dragon Pavilion**, an imperial Chinese fine-dining restaurant in Singapore. No build tools, no frameworks — open `index.html` directly in any browser.

## Live Site

[https://chincl99.github.io/Maison-Le-Bleu/](https://chincl99.github.io/Maison-Le-Bleu/)

## Features

- Hero section with Ken-Burns animation and decorative SVG lanterns
- Signature dishes menu with image cards
- Customer testimonials carousel with auto-advance and manual controls
- Online reservation form with client-side validation and confirmation state
- Voice announcement on successful booking: "Hurray! Thank you for your submission. We will get back to you in one business day." (Web Speech API)
- Balloon drop celebration — 28 coloured balloons rise with swaying animation on form success
- Light / dark theme toggle with OS preference detection and `localStorage` persistence
- WhatsApp Business floating-action button (bottom-right) linking to +65 9125 6169
- FAQ floating-action button (gold, above WhatsApp FAB) opening an accessible accordion modal with 15 Q&A pairs across 5 sections — doubles as a RAG knowledge base (`FAQ.md`)
- Fully responsive design — mobile, tablet, desktop (hamburger nav at 768 px)
- Accessible: skip link, ARIA labels, `aria-live` regions, focus-visible outlines

## Tech Stack

- Plain HTML, CSS, vanilla JavaScript — no frameworks or build tools
- Google Fonts: Noto Serif SC, Cormorant Garamond, Raleway
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
├── script.js       # Single IIFE — nav scroll, hamburger, theme toggle, carousel, form validation, FAQ modal
└── FAQ.md          # Mock FAQ knowledge base (30 Q&A pairs) — for RAG / chatbot integration
```

### Custom agents & skills

```
├── .claude/agents/whatsapp-chatbot-widget.md   # Agent: manage the WhatsApp FAB
└── .agents/skills/theme-toggle/SKILL.md        # Skill: add/update the light-dark toggle
```

## Customisation

**Colours** — all colours are CSS custom properties on `:root` in `styles.css`. The dark palette uses `--clr-ink`, `--clr-gold: #C4993A`, `--clr-rouge`, etc. A `html[data-theme="light"]` block provides the warm rice-paper palette. Edit only the variables block to retheme the entire site.

**Theme toggle** — the toggle reads `localStorage('theme')`, falls back to `prefers-color-scheme`. To change the default, edit the inline `<script>` in `<head>` of `index.html`.

**WhatsApp number** — change the digits after `wa.me/` in the `<a class="wa-fab">` href in `index.html`. The agent at `.claude/agents/whatsapp-chatbot-widget.md` can do this for you automatically.

**Images** — all photos are Unsplash direct URLs with query params (e.g. `?w=600&h=400&fit=crop&q=80`). Swap the photo ID segment in the URL to change any image.

**Content** — edit text directly in `index.html`. Section IDs (`#menu`, `#testimonials`, `#reservations`) are used by nav links and the hero CTA — keep them if you rename sections.
