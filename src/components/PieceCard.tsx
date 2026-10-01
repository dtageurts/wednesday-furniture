import Link from "next/link";
import { euro, type Piece } from "@/lib/pieces";

export function sizesLabel(p: Piece) {
  return p.options.length === 1 ? "1 size" : `${p.options.length} sizes`;
}

export function PieceCard({ piece, href }: { piece: Piece; href?: string }) {
  return (
    <Link className="card" href={href ?? `/pieces/${piece.slug}`}>
      <img src={piece.images[0].src} alt={piece.images[0].alt} style={{ objectPosition: piece.images[0].position }} loading="lazy" />
      <div className="card-body">
        <span className="label muted">
          No.{piece.no} · {sizesLabel(piece)}
        </span>
        <span className="card-title">{piece.name}</span>
        <span className="card-note">{piece.note}</span>
        <span className="tag tag-sage">From {euro(piece.startingFrom)}</span>
      </div>
    </Link>
  );
}
