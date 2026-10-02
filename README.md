# ClearQuote — Insurance Comparison Demo (concept)

A one-page insurance-comparison website inspired by thezebra.com:
sticky header, video hero with a working quote widget (demo preview),
trust band, coverage cards, 3-step how-it-works, testimonials,
transparency FAQ, and footer. Lightweight HTML + CSS + tiny vanilla JS.

## Files

| File | What it is |
|---|---|
| `index.html` | All content — text marked with `<!-- EDIT: … -->` comments |
| `styles.css` | Single stylesheet — change `--accent` to re-skin |
| `script.js` | Mobile nav, scroll reveals, counters, FAQ, quote-widget demo |
| `assets/` | `logo.png`, `hero-bg.mp4` + `hero-poster.webp`, `cover-auto.webp`, `cover-home.webp`, `cover-business.webp` |

## Where to update text

Search `index.html` for `EDIT:` — brand, phone, hero copy, coverage cards,
steps, testimonials, FAQ answers, footer license line.

## Where to swap images / video

Replace files in `assets/` (keep names) or update `src` paths:

- `hero-bg.mp4` — hero background (short, muted, abstract works best)
- `cover-*.webp` — coverage card images (WebP, 1600px wide max)
- `logo.png` — transparent logo, shown at 36px tall in the header

## Notes

- Quote widget shows clearly-labeled **sample rates** — wire it to a real
  API before production.
- Footer carries a "concept demo" notice; replace license/contact
  placeholders with real details before launch.
- Honors `prefers-reduced-motion` (video hidden, reveals disabled).

## Deploy

Static hosting: drag into Netlify Drop, or push to GitHub with Pages enabled.
