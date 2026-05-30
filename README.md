# Maison Le Bleu

A single-page restaurant booking website for **Maison Le Bleu**, a fictional French fine-dining restaurant.

## Live Site

[https://chincl99.github.io/Maison-Le-Bleu/](https://chincl99.github.io/Maison-Le-Bleu/)

## Features

- Elegant hero section with Ken-Burns animation
- Interactive menu showcase
- Customer testimonials carousel
- Online reservation form with validation
- Fully responsive design (mobile, tablet, desktop)

## Tech Stack

- Plain HTML, CSS, JavaScript — no frameworks or build tools
- Google Fonts: Cormorant Garamond & Montserrat
- Unsplash images

## Running Locally

Just open `index.html` in any browser — no server or install needed.

## Project Structure

```
├── index.html      # All markup
├── styles.css      # All styles (CSS variables, responsive breakpoints)
└── script.js       # Nav, carousel, form validation
```

## Customisation

- **Colours** — all colours are CSS custom properties in `styles.css` under `:root`. Change `--clr-gold: #c8a96e` and the other variables to retheme the entire site.
- **Images** — all photos are Unsplash direct URLs with query params (e.g. `?w=600&h=400&fit=crop&q=80`). Swap the photo ID segment in the URL to change any image.
- **Content** — edit text directly in `index.html`. Section IDs (`#menu`, `#reservations`, etc.) are used by nav links and the hero CTA, so keep them if you rename sections.