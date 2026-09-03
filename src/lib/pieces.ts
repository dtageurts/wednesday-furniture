import piecesData from "../../content/pieces.json";

export interface PieceOption {
  dims: string;
  price: number;
}

export interface PieceSpec {
  label: string;
  value: string;
}

export interface PieceImage {
  src: string;
  position: string;
  alt: string;
}

export interface Piece {
  slug: string;
  no: string;
  name: string;
  note: string;
  startingFrom: number;
  description: string;
  materials: string[];
  specs: PieceSpec[];
  options: PieceOption[];
  finishPrice: number;
  images: PieceImage[];
}

export const pieces: Piece[] = piecesData as Piece[];

export function getPiece(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}

export function euro(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
