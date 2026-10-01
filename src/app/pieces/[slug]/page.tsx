import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { PieceOrderPanel } from "@/components/PieceOrderPanel";
import { PieceGallery } from "@/components/PieceGallery";
import { getPiece, pieces, euro } from "@/lib/pieces";
import { DELIVERY_PRICE } from "@/lib/pricing";

export function generateStaticParams() {
  return pieces.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const piece = getPiece(params.slug);
  if (!piece) return {};
  return {
    title: piece.name,
    description: piece.note,
    openGraph: {
      title: piece.name,
      description: piece.note,
      images: [{ url: piece.images[0].src, width: 1200, height: 630 }],
    },
  };
}

export default function PieceDetailPage({ params }: { params: { slug: string } }) {
  const piece = getPiece(params.slug);
  if (!piece) notFound();

  return (
    <div className="page">
      <Nav active="pieces" />
      <div className="crumbs">
        <Link href="/pieces">Pieces</Link>
        <span>/</span>
        <span>{piece.name}</span>
      </div>

      <div className="piece">
        <div className="piece-head">
          <span className="label muted">No. {piece.no}</span>
          <h1 className="h">{piece.name}</h1>
        </div>

        <div className="piece-media">
          <PieceGallery images={piece.images} name={piece.name} />
          <div className="piece-tags">
            <span className="tag tag-almond tag-lg">From {euro(piece.startingFrom)}</span>
            {piece.keyword && <span className="tag tag-sage tag-lg">{piece.keyword}</span>}
          </div>
          <p className="piece-desc">{piece.description}</p>
        </div>

        <div className="piece-info">
          <dl className="specs">
            {piece.specs.concat([{ label: "Delivery", value: `Amsterdam ${euro(DELIVERY_PRICE)} · pick up free` }]).map((s) => (
              <div className="spec" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          <PieceOrderPanel piece={piece} />

          <Link className="ask" href="/contact?topic=custom">
            Need another size? <span>Ask me</span>
          </Link>
        </div>
      </div>

      <SiteFooter services />
    </div>
  );
}
