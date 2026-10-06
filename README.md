# Wednesday website

Plain HTML/CSS/JS. No build step. Same file names as the old site, so all links keep working.

Link check (Oct 2026 redesign): every page, nav link, button, piece card, photo and form route was checked. All targets exist.

## Files
- `index.html`, `pieces.html`, `piece.html?slug=…`, `contact.html`, `about.html`
- `styles.css` — all styling (mobile first, desktop from 900px)
- `data.js` — **edit this** for pieces, prices, keywords, testimonials, email, Instagram, delivery price and the form address
- `api/contact.mjs` — server-side contact endpoint that sends email through Resend
- `photos/`, `brand/`

## Contact form email
The form posts to `/api/contact`, a Vercel Function that sends through Resend. Configure these server-side Vercel environment variables:
- `RESEND_API_KEY` — required
- `INQUIRY_TO_EMAIL` — optional; defaults to `contact@wednesdayfurniture.com`
- `RESEND_FROM_EMAIL` — optional; defaults to Resend's test sender

The sender domain in `RESEND_FROM_EMAIL` must be verified in Resend. Optional photo uploads are attached to the email (up to 4 images and 4 MB total, staying below Vercel's request limit).

## Push to GitHub safely
1. In your repo, make a new branch: `git checkout -b redesign`
2. Replace the old site files with the contents of this folder (keep your `.git` folder and any `CNAME` file).
3. `git add -A && git commit -m "Redesign" && git push -u origin redesign`
4. Check the preview (Netlify/Vercel make one per branch automatically; on GitHub Pages, open the files locally first).
5. Happy? Open a Pull Request on GitHub from `redesign` into `main` and merge. That makes it live.
6. Something wrong? On GitHub, open the merged Pull Request and press **Revert**.
