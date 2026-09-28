# Wednesday — furniture portfolio & inquiry site

Furniture portfolio + inquiry site for a solo furniture maker in Utrecht, NL.
Built from the design brief in `design-handoff/BUILD-SPEC.md` and the approved
mockups in `design-handoff/mockups/`.

## Stack

- Next.js 14 (App Router), TypeScript
- Plain CSS (design tokens in `src/app/globals.css`), no CSS framework
- Firebase Admin (Firestore) for inquiry storage — optional at dev time
- Resend for inquiry email notifications — optional at dev time

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Firebase + Resend credentials
npm run dev
```

Without `.env.local` configured, the inquiry form still works end-to-end —
submissions are logged to the server console instead of written to Firestore,
so you can develop and test the UI before wiring up real credentials.

## Content

Pieces (name, price, description, photos) live in `content/pieces.json` and
can be edited without touching any component code.

## Environment variables

See `.env.example`. Required for inquiries to be stored and emailed:

- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`,
  `FIREBASE_STORAGE_BUCKET` — from a Firebase service account key
- `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` — for the notification email

## Open questions carried over from the design brief

1. Site is inquiry-only by design; no checkout is built. See
   `design-handoff/BUILD-SPEC.md` §8 for the e-commerce recommendation.
2. Piece names, prices and materials in `content/pieces.json` are
   placeholders — confirm with the maker before launch.
3. KvK number, VAT (BTW) number, and whether prices are incl./excl. BTW are
   not yet reflected anywhere on the site.
4. Real Instagram handle and preferred contact email display should be
   double-checked (currently `@wednesdayfurniture` / `contact@wednesdayfurniture.com`).

## Not yet done

- Photo upload on the inquiry form (spec'd, not implemented — needs a
  Firebase Storage signed-URL flow)
- Dutch translation (spec calls for copy to go through a single content file
  so this can be added later)
- Deployment to Vercel + domain (`wednesdayfurniture.com`)
