import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { PieceCard } from "@/components/PieceCard";
import { pieces } from "@/lib/pieces";
import { DELIVERY_PRICE } from "@/lib/pricing";
import { euro } from "@/lib/pieces";

export const metadata: Metadata = {
  title: "Pieces",
  description: "Five designs, each in fixed sizes.",
};

export default function PiecesPage() {
  return (
    <div className="page">
      <Nav active="pieces" />
      <div className="page-head">
        <h1 className="h h-xl">All pieces</h1>
        <p className="lead">
          {pieces.length} designs, each in fixed sizes. Made to order in 3–5 weeks. Delivery in Amsterdam {euro(DELIVERY_PRICE)}, or pick up for free.
        </p>
      </div>
      <div className="grid">
        {pieces.map((p) => (
          <PieceCard key={p.slug} piece={p} />
        ))}
        <a className="card-custom tone tone-forest" href="/contact?topic=custom">
          <span className="card-title">
            Something else <em>in mind?</em>
          </span>
          <span className="card-note">Send a photo and I&rsquo;ll tell you if I can build it.</span>
          <span className="btn btn-sand">Request</span>
        </a>
      </div>
      <SiteFooter services />
    </div>
  );
}
