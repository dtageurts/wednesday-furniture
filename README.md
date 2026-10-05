# Wednesday website

Plain HTML/CSS/JS. No build step. Same file names as the old site, so all links keep working.

Link check (Oct 2026 redesign): every page, nav link, button, piece card, photo and form route was checked. All targets exist.

## Files
- `index.html`, `pieces.html`, `piece.html?slug=…`, `contact.html`, `about.html`
- `styles.css` — all styling (mobile first, desktop from 900px)
- `data.js` — **edit this** for pieces, prices, keywords, testimonials, email, Instagram, delivery price and the form address
- `photos/`, `brand/`

## Before going live: make the contact form send email
Right now "Send request" opens the visitor's email app with everything filled in.
To receive requests directly (no email app needed):
1. Make a free form at https://formspree.io (or a similar service).
2. Copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it in `data.js` → `const FORM_ENDPOINT = "…";`
Note: photo uploads need a paid Formspree plan. On the free plan the text arrives, photos don't.

## Push to GitHub safely
1. In your repo, make a new branch: `git checkout -b redesign`
2. Replace the old site files with the contents of this folder (keep your `.git` folder and any `CNAME` file).
3. `git add -A && git commit -m "Redesign" && git push -u origin redesign`
4. Check the preview (Netlify/Vercel make one per branch automatically; on GitHub Pages, open the files locally first).
5. Happy? Open a Pull Request on GitHub from `redesign` into `main` and merge. That makes it live.
6. Something wrong? On GitHub, open the merged Pull Request and press **Revert**.
