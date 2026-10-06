# Wednesday redesign — handoff recap

## Where things are
- **Live-ready site:** this folder (`wednesday-site/`). Plain HTML/CSS/JS, no build step. Same file names as the old site.
- **Design source:** `Wednesday Site v5.dc.html` in the Claude design project (mobile 5a–5e, desktop 6a–6e).
- **Edit content in `data.js`:** pieces, prices, keywords, testimonials, email, Instagram, delivery price (€ 40), `FORM_ENDPOINT`.

## Design decisions (settled)
- Fonts: Gambetta (headlines) + General Sans (body), from Fontshare. Script wordmark: Mrs Saint Delafield.
- Palette: sand #E8DCC4, ivory #F5F1E8, sage #A7B89A, matcha #677D6A, almond #D6BD98, forest #40534C (+ #4A5F57), eclipse #1A3636 (+ #234341). No terracotta.
- Dark green areas are two-tone: a lighter panel on the left with a straight slanted edge (`.tone` class in `styles.css`).
- Nav: see-through on Home, solid two-tone forest on all other pages.
- Corners 10–16px. Buttons have no arrows.
- Piece page: up to 4 steps (wood → size → finish → delivery) with a live total. "Request this piece" opens `contact.html` with all choices pre-filled. The visitor fills in name, email, address and message, then sends.
- Contact: "Send request" stays disabled until every field marked * is filled in. "A piece of furniture" has no photo upload; the other 3 topics do.

## Open to-dos
1. Confirm a real inquiry arrives after deployment. The Resend endpoint is now `api/contact.mjs` and uses the existing Vercel variables `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` and `RESEND_FROM_EMAIL`.
2. Replace the 3 placeholder testimonials with real ones, and add customer photos if available.
3. Confirm the piece keywords: Magnetic door, Dimmable, Seats 4–8, No visible legs, Steel tension wire.

## Branch workflow
`git checkout -b redesign` → copy the files in → commit → `git push -u origin redesign` → check the preview → open a Pull Request into `main` → merge (this goes live) → **Revert** on the PR if needed.
