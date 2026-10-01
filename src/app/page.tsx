import Link from "next/link";
import { SiteFooter } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PiecesCarousel } from "@/components/PiecesCarousel";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { pieces } from "@/lib/pieces";
import { testimonials } from "@/lib/testimonials";

export default function HomePage() {
  const heroPieces = pieces.slice(0, 4);

  return (
    <div className="page">
      <HeroCarousel pieces={heroPieces} />

      <section className="banner tone tone-forest">
        <h1 className="h">
          Solid wood, <em>made by hand.</em>
        </h1>
        <div className="banner-side">
          <p>No factory, no wood pulp. Every piece comes in two or three fixed sizes. Need something different? Get in touch.</p>
          <div className="group">
            <span className="label">How I work</span>
            <div className="tags">
              <span className="tag tag-outline">Wood joints over screws</span>
              <span className="tag tag-outline">Solid wood only</span>
              <span className="tag tag-outline">One maker</span>
              <span className="tag tag-outline">Made to order</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="h h-l">Pieces</h2>
          <Link className="link" href="/pieces">
            All pieces
          </Link>
        </div>
        <PiecesCarousel pieces={pieces} />
      </section>

      <section className="banner banner-sage">
        <h2 className="h">
          Also available for <em>maintenance.</em>
        </h2>
        <div className="banner-side">
          <p>DIY, and hanging &amp; mounting work too. Tell me what needs doing.</p>
          <Link className="btn btn-ivory" href="/contact?topic=small-job">
            Contact me
          </Link>
        </div>
      </section>

      <TestimonialCarousel testimonials={testimonials} />

      <SiteFooter />
    </div>
  );
}
