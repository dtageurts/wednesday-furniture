// Placeholder testimonials — replace with real ones as they come in via the
// "Share a testimonial" path on the contact page. Flagged as placeholders,
// same three used in the earlier mockup.
export interface Testimonial {
  quote: string;
  who: string;
  piece: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "It's the first piece of furniture that's made me want people over.",
    who: "Sanne, Amsterdam",
    piece: "TV Cabinet · March 2026",
  },
  {
    quote: "No showroom gloss — just a table that gets more use than I expected.",
    who: "Rutger, Utrecht",
    piece: "Dining Table · January 2026",
  },
  {
    quote: "He asked more questions about how we actually live than any shop ever has.",
    who: "Fleur, Haarlem",
    piece: "Floating Bed Frame · November 2025",
  },
];
