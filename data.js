/* ---------- SETTINGS: edit these ---------- */
// The Vercel Function at this address sends requests through Resend.
const FORM_ENDPOINT = "/api/contact";
const CONTACT_EMAIL = "contact@wednesdayfurniture.com";
const INSTAGRAM_URL = "https://instagram.com/wednesdayfurniture";
const DELIVERY_PRICE = 40;

/* ---------- PIECES ---------- */
const PIECES = [
  {
    slug: "slatted-tv-cabinet",
    no: "01",
    name: "TV Cabinet",
    keyword: "Magnetic door",
    note: "Tapered pine legs, hand-slatted pine door, frame in oak or beech.",
    startingFrom: 445,
    varnishPrice: 50,
    description: "A low cabinet that sits under a television, with a hand-slatted pine door that folds open and closes with magnets. It hides your cables, media and devices out of view and off the ground. The legs and door slats are always pine. The frame it sits on, the base, is oak or beech, your choice.",
    specs: [
      { label: "Wood", value: "Frame oak or beech · legs and slats pine" },
      { label: "Finish", value: "Unfinished · varnish on request" },
      { label: "Lead time", value: "3–5 weeks" }
    ],
    woodOptions: [
      { key: "eiken", label: "Oak" },
      { key: "beuken", label: "Beech" }
    ],
    options: [
      { dims: "120 × 45 × 40 cm", price: { eiken: 500, beuken: 445 } },
      { dims: "200 × 45 × 40 cm", price: { eiken: 600, beuken: 510 } }
    ],
    img: "photos/slatted-tv-cabinet-01.jpeg",
    images: [
      { src: "photos/slatted-tv-cabinet-01.jpeg", caption: "In the room" },
      { src: "photos/slatted-tv-cabinet-02.jpeg", caption: "In the room, evening" },
      { src: "photos/slatted-tv-cabinet-03.jpeg", caption: "Joinery detail" },
      { src: "photos/slatted-tv-cabinet-04.jpeg", caption: "Grain detail" }
    ]
  },
  {
    slug: "pendant-beam",
    no: "02",
    name: "Pendant Light Beam",
    keyword: "Dimmable",
    note: "One beam. Philips light, adjustable in brightness and colour.",
    startingFrom: 380,
    varnishPrice: 30,
    description: "A solid pine beam that hangs over your dining table, suspended from a shorter mounting beam fixed to the ceiling by two rope-wrapped cables. One of them carries the power line. The light is recessed into the underside of the long beam, so you see light, not fittings. Brightness and colour temperature are both adjustable, from warm to neutral, so one beam covers your table, dinner, games and work.",
    specs: [
      { label: "Wood", value: "Solid pine (both beams)" },
      { label: "Finish", value: "Unfinished · varnish on request" },
      { label: "Electrics", value: "Dimmable Philips LED strip, NL-certified fittings" }
    ],
    options: [
      { dims: "120 cm", price: 380 },
      { dims: "200 cm", price: 390 }
    ],
    img: "photos/pendant-beam-01.jpeg",
    images: [
      { src: "photos/pendant-beam-01.jpeg", caption: "In the room" },
      { src: "photos/pendant-beam-02.jpeg", caption: "Ceiling mount" },
      { src: "photos/pendant-beam-03.jpeg", caption: "Grain detail" },
      { src: "photos/pendant-beam-04.jpeg", caption: "End detail" }
    ]
  },
  {
    slug: "table",
    no: "03",
    name: "Dining Table",
    keyword: "Seats 4–8",
    note: "Made in pine, oak or beech, with room for four to eight.",
    startingFrom: 670,
    varnishPrice: 100,
    description: "A dining table built for daily use: plates, elbows, homework, not just special occasions. The top is a glued-up solid wood panel on a sturdy frame. It seats 4 to 8, depending on the size you choose. Made in oak or beech, whichever you prefer.",
    specs: [
      { label: "Wood", value: "Solid oak or beech, your choice" },
      { label: "Finish", value: "Unfinished · varnish on request" },
      { label: "Lead time", value: "4–6 weeks" }
    ],
    woodOptions: [
      { key: "eiken", label: "Oak" },
      { key: "beuken", label: "Beech" }
    ],
    options: [
      { dims: "180 × 100 cm", price: { eiken: 740, beuken: 670 } },
      { dims: "200 × 100 cm", price: { eiken: 765, beuken: 690 } }
    ],
    img: "photos/table-01.jpeg",
    images: [
      { src: "photos/table-01.jpeg", caption: "In the room" },
      { src: "photos/table-02.jpeg", caption: "With pendant beam" },
      { src: "photos/table-03.jpeg", caption: "In the room" },
      { src: "photos/table-04.jpeg", caption: "Tabletop detail" }
    ]
  },
  {
    slug: "floating-bed-frame",
    no: "04",
    name: "Floating Bed Frame",
    keyword: "No visible legs",
    note: "Douglas fir frame, no visible legs.",
    startingFrom: 595,
    varnishPrice: 75,
    description: "A platform bed with a visible Douglas fir frame and no visible legs. The support structure sits underneath, out of sight. Built in the three most common Dutch bed widths, all at the standard 200 cm length. Frame in Douglas fir with grenen (spruce) support underneath.",
    specs: [
      { label: "Wood", value: "Douglas fir frame, spruce support" },
      { label: "Finish", value: "Unfinished · varnish on request" },
      { label: "Lead time", value: "4–6 weeks" }
    ],
    options: [
      { dims: "140 × 200 cm", price: 595 },
      { dims: "160 × 200 cm", price: 620 },
      { dims: "180 × 200 cm", price: 640 }
    ],
    img: "photos/floating-bed-01.jpg",
    images: [
      { src: "photos/floating-bed-01.jpg", caption: "In the room" },
      { src: "photos/floating-bed-02.jpg", caption: "Support structure" }
    ]
  },
  {
    slug: "glass-coffee-table",
    no: "05",
    name: "Glass Coffee Table",
    keyword: "10 mm thick glass",
    note: "Two angled beech frames suspending a 10 mm thick glass plate.",
    startingFrom: 375,
    description: "A low coffee table built from two angled beech frames that never quite touch, suspending a 10 mm thick glass plate between them. Finished dark to read like walnut. Low enough to sit beside a sofa without blocking the TV.",
    specs: [
      { label: "Wood", value: "Solid beech, dark walnut-tone oil finish" },
      { label: "Glass", value: "10 mm tempered glass, polished edges" },
      { label: "Lead time", value: "1–2 weeks" }
    ],
    options: [
      { dims: "80 × 40 × 38 cm", price: 375 }
    ],
    img: "photos/coffee-table-01.jpg",
    images: [
      { src: "photos/coffee-table-01.jpg", caption: "Front view" },
      { src: "photos/coffee-table-02.jpg", caption: "Top view" }
    ]
  }
];

const TESTIMONIALS = [
  { quote: "It's the first piece of furniture that's made me want people over.", who: "Sanne, Amsterdam", piece: "TV Cabinet · March 2026" },
  { quote: "No showroom gloss — just a table that gets more use than I expected.", who: "Rutger, Utrecht", piece: "Dining Table · January 2026" },
  { quote: "He asked more questions about how we actually live than any shop ever has.", who: "Fleur, Haarlem", piece: "Floating Bed Frame · November 2025" }
];

/* ---------- HELPERS ---------- */
function euro(n){ return "€ " + n.toLocaleString("nl-NL"); }
function qs(k){ return new URLSearchParams(window.location.search).get(k); }
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function optionPrice(opt, wood){
  if (typeof opt.price === "number") return opt.price;
  if (wood && opt.price[wood] !== undefined) return opt.price[wood];
  return Math.min.apply(null, Object.values(opt.price));
}
function sizesLabel(p){ return p.options.length === 1 ? "1 size" : p.options.length + " sizes"; }
function pieceImages(p){ return p.images && p.images.length ? p.images : [{ src: p.img, caption: p.name }]; }

function pieceCard(p, href){
  return '<a class="card" href="' + (href || "piece.html?slug=" + p.slug) + '">' +
    '<img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy">' +
    '<div class="card-body">' +
      '<span class="label">No.' + p.no + ' · ' + sizesLabel(p) + '</span>' +
      '<span class="card-title">' + esc(p.name) + '</span>' +
      '<span class="card-note">' + esc(p.note) + '</span>' +
      '<span class="card-price">From ' + euro(p.startingFrom) + '</span>' +
    '</div></a>';
}

const ICON_MAIL = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></svg>';
const ICON_IG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>';

function navLinks(active){
  return [["Pieces", "pieces.html"], ["About", "about.html"], ["Contact", "contact.html"]]
    .map(([n, h]) => '<a href="' + h + '"' + (n === active ? ' class="active" aria-current="page"' : "") + '>' + n + '</a>').join("");
}

function renderNav(active, overlay){
  return '<header class="nav ' + (overlay ? "nav-overlay" : "nav-solid tone tone-forest") + '">' +
    '<a class="wordmark" href="index.html" aria-label="Wednesday, home">Wednesday</a>' +
    '<nav class="nav-links">' + navLinks(active) + '</nav></header>';
}

function renderFooter(withServices){
  return '<footer class="footer tone tone-wood tone-flat">' +
    '<div class="footer-top">' +
      '<div class="footer-brand"><img src="brand/mark-white.png" alt=""><div class="footer-text"><span class="footer-name">Wednesday Furniture</span><span class="footer-city">Amsterdam</span></div></div>' +
      '<div class="footer-links"><nav class="footer-nav" aria-label="Footer">' + navLinks("") + '</nav>' +
        '<div class="icons"><a href="mailto:' + CONTACT_EMAIL + '" aria-label="Email">' + ICON_MAIL + '</a>' +
        '<a href="' + INSTAGRAM_URL + '" target="_blank" rel="noreferrer" aria-label="Instagram">' + ICON_IG + '</a></div></div>' +
    '</div>' +
    (withServices ? '<p class="footer-bottom">Also available for maintenance, DIY, and hanging &amp; mounting work. <a href="contact.html?topic=small-job">Ask about a job</a></p>' : '') +
  '</footer>';
}

function mountChrome(active, opts){
  opts = opts || {};
  const n = document.getElementById("nav");
  if (n) n.outerHTML = renderNav(active, opts.overlay);
  const f = document.getElementById("footer");
  if (f) f.outerHTML = renderFooter(opts.services);
}
