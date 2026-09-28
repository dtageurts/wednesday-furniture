# Wednesday — build spec for Claude Code

Furniture portfolio + inquiry site for a solo furniture maker in Utrecht, NL.
Brand name: **Wednesday**. Domain: wednesdayfurniture.com. Most traffic arrives
from Instagram, so mobile-first is non-negotiable.

The approved design is `Homepage Directions.dc.html`, option **5a** (last section
added, top of the file). Read that markup for exact spacing, type sizes and
colours — it is the source of truth, this file is the summary.

---

## 1. Stack

- Next.js (App Router), TypeScript, deployed on Vercel
- No CSS framework required; plain CSS modules or Tailwind, either is fine
- Firebase: Firestore (inquiries) + Storage (user-uploaded room photos)
- Email notification on submit (Resend recommended — simplest with Vercel)
- No payment/checkout. Inquiry-based only. (See §8 for the e-commerce question.)

## 2. Design tokens

| Token | Value | Use |
|---|---|---|
| `--off-white` | `#FAF7F1` | page background |
| `--ink` | `#23201B` | body text, hairline rules |
| `--ink-soft` | `#55493B` | secondary paragraphs |
| `--muted` | `#8A7B67` | labels, meta, footer text |
| `--rule` | `#E6DED0` | row dividers |
| `--green` | `#3C5142` | primary buttons, intro band, footer, prices |
| `--green-fg` | `#EFF1E8` | text on green |
| `--sage` | `#E9EBE0` | tinted band (inquiry CTA on detail pages) |

Type:
- **Newsreader** (serif, weight 300/400) — wordmark, headlines, piece names
- **Archivo** (sans, 400/500/600) — body, nav, buttons
- **IBM Plex Mono** (400/500) — labels, prices, numbers, uppercase meta
  (`letter-spacing: 0.14em; text-transform: uppercase; font-size: 11px`)

Rules of the look: off-white page, hairline rules instead of cards/shadows,
generous whitespace, no rounded corners, no gradients except the photo scrim,
green used sparingly and only on actions + the two full-width bands.

## 3. Layout system

- Content padding `40px` desktop / `20px` mobile; nav height ~72px
- Body copy 15px/1.75; section headlines 34px; piece names 24px
- Mobile: all two-column grids collapse to one column, hero becomes 4:5,
  hero buttons stack full-width, min tap target 44px

## 4. Pages

### Home (`/`)
1. **Hero, full-bleed, runs to the very top of the page** — no header bar behind
   it. Height ~700px desktop / 4:5 on mobile. `background-position: center 62%`.
   Scrim: `linear-gradient(180deg, rgba(20,17,13,.44) 0%, rgba(20,17,13,.06) 30%, rgba(20,17,13,.55) 100%)`.
2. **Transparent nav overlaid top** — "Wednesday" wordmark (Newsreader 22px,
   off-white) left; `Pieces / About / Contact` right, uppercase 13px, off-white.
   On scroll past the hero it may become a solid `--green` sticky bar (optional).
3. **Hero overlay bottom**: left = two stacked buttons, 320px wide —
   "See all pieces →" (solid green) and "Request a piece →" (1px off-white
   outline, transparent). Right, right-aligned = mono caption `No. 04 · Slatted
   TV Cabinet & wall shelves` + serif line `Spruce, hand-slatted doors, oiled`.
4. **Green intro band** (`--green`, 88px padding) — two columns: serif 34px
   statement left, 15px paragraph right.
5. **Piece ledger** — mono column headers `Made so far` / `Starting from`, then
   one row per piece: 96px 4:3 thumbnail, serif name, one-line note, mono
   "from €X" in green, right-aligned. Rows separated by 1px `--rule`, whole row
   is the link to the detail page. On mobile the row becomes photo-left /
   text-right, price under the note.
6. **Services strip** — understated, one line above the footer, NOT in the nav:
   "Also available for home maintenance, DIY jobs and hanging & mounting work."
   + mono "ask →" link to the contact form.
7. **Footer** — `--green` band: "Wednesday · Utrecht, NL" left, Instagram +
   contact@wednesdayfurniture.com right.

### Pieces (`/pieces`)
Grid of piece cards from the config (photo 4:5, serif name, one-line
description, mono "Starting from €X"). 3 up desktop, 2 up tablet, 1 up mobile.
Same hairline-and-whitespace treatment — no card borders or shadows.

### Piece detail (`/pieces/[slug]`)
- Photo gallery (first image large, rest as a strip/grid; lightbox optional)
- Materials / finish notes as a small mono-labelled definition list
- Sage-tinted inquiry band: heading "Want this made for your space?", sub
  "Send your dimensions and a photo of the room — I'll reply with a plan and a
  price." then the form.
- Form fields: **name*, email*, city*, dimensions (optional), message*,
  image upload (optional)**. Hidden field: piece slug + name.
- Submit → Firestore + email. Inline validation, disabled button while sending,
  a plain in-page success state (no modal).

### About (`/about`)
Workshop story, process photos, craftsmanship angle. Reuse the green band for
one pull-quote so it rhymes with home. Keep it to one screen of reading.

## 5. Data — `content/pieces.json`

Pieces must be addable without touching code.

```json
[
  {
    "slug": "slatted-tv-cabinet",
    "no": "01",
    "name": "Slatted TV Cabinet",
    "note": "Spruce, slatted doors, tapered legs",
    "startingFrom": 890,
    "description": "…longer paragraph for the detail page…",
    "materials": ["Solid spruce", "Hardwax oil finish", "Hand-slatted doors"],
    "images": [
      { "src": "/photos/slatted-tv-cabinet-01.jpeg", "position": "62% 68%", "alt": "…" }
    ]
  }
]
```

Current four pieces (names/prices are placeholders the maker should confirm):

| no | slug | name | from | note |
|---|---|---|---|---|
| 01 | slatted-tv-cabinet | Slatted TV Cabinet | €890 | Spruce, slatted doors, tapered legs |
| 02 | pendant-beam | Pendant Beam | €240 | 1,8 m solid pine light over your table |
| 03 | pool-table-dining-top | Pool Table Dining Top | €420 | Two-part top, lifts off in a minute |
| 04 | floating-wall-shelves | Floating Wall Shelves | €120 | Full-wall pine, hidden fixings |

Photos are in `handoff/photos/` in this project — copy them to `public/photos/`.
Run them through `next/image` with `sizes` set; the hero should be `priority`.

## 6. Firestore + email

`inquiries/{autoId}`:
```
name, email, city, dimensions, message, pieceSlug, pieceName,
imageUrl (Storage path or null), createdAt (serverTimestamp),
userAgent, source ("piece-detail" | "services" | "contact")
```
- Write from a **Next.js route handler** (`app/api/inquiry/route.ts`) using the
  Firebase Admin SDK with a service-account key in Vercel env vars — do not
  write to Firestore from the client, and lock Firestore rules to deny all
  client writes.
- Image upload: client → Firebase Storage via a signed URL, or multipart to the
  route handler; cap at 10 MB, accept jpeg/png/webp/heic only.
- Then send the notification email (Resend) to contact@wednesdayfurniture.com
  with all fields and a link to the uploaded photo. Send the customer a short
  confirmation too.
- Add a honeypot field + basic rate limit; no captcha unless spam appears.

Env vars: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`,
`FIREBASE_STORAGE_BUCKET`, `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`.

## 7. Instagram / launch details

- Open Graph + Twitter card images per piece (the hero photo, 1200×630)
- `metadataBase`, per-page titles, JSON-LD `LocalBusiness` for Utrecht
- Instagram in-app browser is the main entry: test on iOS Safari + the IG
  webview specifically; avoid `100vh` (use `100svh`)
- Analytics: Vercel Analytics is enough to start
- Dutch/English: build copy through a single content file so NL can be added
  later without restructuring

## 8. Open questions for the maker

1. **E-commerce contradicts the current brief.** The site as designed is
   inquiry-only. If pieces should be buyable, the honest options are:
   (a) keep inquiry-only and send a Mollie/Stripe payment link by email after
   agreeing on dimensions — least work, fits made-to-measure; (b) add Stripe
   Checkout for a deposit (e.g. 30%) on the detail page; (c) full product
   catalogue with stock — only sensible for repeatable items like the shelves
   and the pendant. Recommendation: (a) now, (b) once there is volume.
2. Real piece names, prices and materials.
3. KvK number, VAT (BTW) number, and whether prices are incl. or excl. BTW.
4. Instagram handle and preferred contact email display.
