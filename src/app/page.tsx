import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { pieces, euro } from "@/lib/pieces";
import { DIAGONAL_GREEN_WIDE } from "@/lib/ui";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <HeroCarousel pieces={pieces} />

      <div
        style={{
          background: DIAGONAL_GREEN_WIDE,
          color: "#fff",
          minHeight: "35svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "clamp(16px, 4vw, 28px)",
          paddingTop: "clamp(10px, 2.2vw, 20px)",
          paddingBottom: "clamp(28px, 6vw, 48px)",
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
        }}
      >
        <p
          style={{
            margin: 0,
            maxWidth: "72ch",
            fontSize: "clamp(15px, 2.6vw, 20px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          <strong style={{ fontWeight: 600, color: "#fff" }}>
            Everything here is made by hand
          </strong>
          , no factory to pump out the same thing. Solid wood, no wood pulp. I prefer wood
          joints over screws. Wood varies by piece, but I mainly use oak, beech, spruce and
          pine; I pick what suits the piece, but if there&rsquo;s more than one option,
          it&rsquo;s up to you. That means no two pieces are ever quite the same.
        </p>
        <p
          style={{
            margin: 0,
            maxWidth: "72ch",
            fontSize: "clamp(15px, 2.6vw, 20px)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Every piece comes in two or three fixed sizes. If you need something different, get
          in touch and we&rsquo;ll talk about it.
        </p>
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" aria-hidden="true" style={{ opacity: 0.75 }}>
          <path d="M1 1L9 9L17 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div>
        {pieces.map((p) => (
          <Link
            key={p.slug}
            href={`/pieces/${p.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "96px minmax(0, 1fr)",
              alignItems: "center",
              columnGap: "clamp(16px, 3vw, 24px)",
              rowGap: 4,
              padding: "16px clamp(20px, 4vw, 40px)",
              borderTop: "1px solid var(--rule)",
            }}
          >
            <div style={{ gridRow: "span 3", position: "relative", aspectRatio: "4 / 3" }}>
              <Image
                src={p.images[0].src}
                alt={p.images[0].alt}
                fill
                sizes="96px"
                style={{ objectFit: "cover", objectPosition: p.images[0].position }}
              />
            </div>
            <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(21px, 3.4vw, 24px)" }}>
              {p.name}
            </span>
            <span style={{ fontSize: 14, color: "#6b5f50" }}>{p.note}</span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                color: "var(--green)",
                whiteSpace: "nowrap",
              }}
            >
              from {euro(p.startingFrom)}
            </span>
          </Link>
        ))}
      </div>

      <SiteFooter />
    </div>
  );
}
