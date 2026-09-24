# The Clarity Chamber

Live site: [https://theclaritychamber.com](https://theclaritychamber.com)

Static website for Loveleen Sarao’s tarot practice (Australia). Hosted on **GitHub Pages** from the `main` branch of this repository. Custom domain is set in `CNAME`.

## Pages

| File | URL |
| --- | --- |
| `index.html` | / |
| `about.html` | /about.html |
| `readings.html` | /readings.html |
| `cards.html` | /cards.html |
| `how-it-works.html` | /how-it-works.html |
| `blog/index.html` | /blog/ |
| `blog/live-or-recorded-tarot-reading.html` | /blog/live-or-recorded-tarot-reading.html |
| `faq.html` | /faq.html |
| `contact.html` | /contact.html |
| `legal.html` | /legal.html |
| `cancel.html` | /cancel.html (disallowed in `robots.txt`) |
| `404.html` | custom not-found page |

## How to edit and publish

1. Edit HTML in the root, styles in `css/site.css` and `css/pages.css`, and behaviour in `js/nav.js`.
   Do not replace `js/nav.js` with a local draft unless you diff it against `main` first — older copies in working folders are stubs.
2. Put images in `images/` (card art in `images/cards/`). The circular seal in `images/logo-192.png` is the locked brand mark — see `BRAND.md`.
3. Commit to `main`. GitHub Pages rebuilds automatically. Treat `main` as the source of truth, not local zip extracts.
4. After content changes, update `<lastmod>` dates in `sitemap.xml`.

Prefer git commits with a short purpose (`Update readings prices`) instead of “Add files via upload”.

## Brand files

These paths are referenced by every page:

- `images/favicon.ico`
- `images/favicon-32.png`
- `images/apple-touch-icon.png`
- `images/logo-192.png` (header mark)
- `images/logo.png` (same mark, extra path)
- `images/og-card.png` (Open Graph 1200×630)
- `site.webmanifest` (theme colour and home-screen name)

## Social

- [Instagram](https://www.instagram.com/theclaritychamber)
- [YouTube](https://www.youtube.com/@theclaritychamber.official)
- [TikTok](https://www.tiktok.com/@theclaritychamber)

## Media

Card JPEGs and `videos/loveleen-reading.mp4` are stored in the repo so Pages can serve them. Keep files compressed. For a longer video later, host it on YouTube or Vimeo and embed the URL instead of committing a large MP4.

## Owner

The Clarity Chamber — Loveleen Sarao  
https://theclaritychamber.com
