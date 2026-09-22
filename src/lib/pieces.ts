import piecesData from "../../content/pieces.json";

export type Wood = "eiken" | "beuken";

export interface PieceOption {
  dims: string;
  // A plain number for pieces with one material. For pieces with a wood
  // choice (see Piece.woodOptions), this is keyed by wood instead.
  price: number | Record<Wood, number>;
}

export interface PieceSpec {
  label: string;
  value: string;
}

export interface PieceImage {
  src: string;
  position: string;
  alt: string;
  caption?: string;
}

export interface WoodOption {
  key: Wood;
  label: string;
}

export interface Piece {
  slug: string;
  no: string;
  name: string;
  note: string;
  startingFrom: number;
  size: "small" | "big";
  description: string;
  materials: string[];
  specs: PieceSpec[];
  options: PieceOption[];
  images: PieceImage[];
  woodOptions?: WoodOption[];
}

export const pieces: Piece[] = piecesData as Piece[];

export function getPiece(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}

// Resolve an option's price. When the piece has wood choices, `wood` picks
// which one; falls back to the cheapest wood so a price can always be shown
// even before the customer has chosen.
export function optionPrice(option: PieceOption, wood?: Wood): number {
  if (typeof option.price === "number") return option.price;
  if (wood && option.price[wood] !== undefined) return option.price[wood];
  return Math.min(...Object.values(option.price));
}

export function euro(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
