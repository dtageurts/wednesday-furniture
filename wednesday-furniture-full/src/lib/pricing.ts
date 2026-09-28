// Flat two-tier varnish upcharge — one price for small pieces, one for big pieces.
// Confirmed with Douwe. Base piece prices (in pieces.json) are always for the
// UNVARNISHED piece — this is the add-on when a customer wants it varnished.
export const VARNISH_PRICE: Record<"small" | "big", number> = {
  small: 50,
  big: 100,
};

export function varnishPrice(size: "small" | "big"): number {
  return VARNISH_PRICE[size];
}

// Reference numbers behind every price in pieces.json — kept here so the
// pricing logic (and the reasoning) lives in one place, not just spreadsheet
// history. Prices in pieces.json are computed offline from these and stored
// as plain numbers; nothing here recalculates them at runtime.
//
// Formula: material (+15% waste) + labour hours x hourly rate + flat consumables
//
// Wood (Hornbach BUILDIFY timmerpaneel, 18mm, Sept 2026):
export const WOOD_PRICE_PER_M2: Record<"eiken" | "beuken", number> = {
  eiken: 68,
  beuken: 46,
};

// Poles / battens — vuren/grenen schaaflat, rounded per Douwe's instruction
// (anything between €2-3/m rounds up to €3/m).
export const GRENEN_PRICE_PER_M = 3;

// Bed frame rails/legs — Douglas fir 15x15x300cm post (Hornbach), €48.40 / 3m.
export const DOUGLAS_PRICE_PER_M = 48.4 / 3; // ≈ €16.13/m

// Hourly labour rate — matches the average zzp meubelmaker rate in NL (2026).
export const HOURLY_RATE = 50;

// Pendant Beam electrics (E27 dimmable fittings, wiring, dimmer) — Douwe's number.
export const PENDANT_ELECTRICS = 60;

export const WOOD_LABELS: Record<"eiken" | "beuken", string> = {
  eiken: "Eiken (oak)",
  beuken: "Beuken (beech)",
};
