import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { pieces, euro, optionPrice } from "@/lib/pieces";

export const metadata: Metadata = {
  title: "Pieces",
  description: "Four pieces, each available in two fixed sizes.",
};

export default function PiecesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <Nav active="pieces" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(24px, 4vw, 56px)",
          padding: "clamp(44px, 7vw, 80px) clamp(20px, 4vw, 40px) clamp(32px, 5vw, 48px)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(34px, 6vw, 52px)",
              lineHeight: 1.04,
            }}
          >
            All Pieces
          </h1>
        </div>
      </div>

      <div
        className="pieces-grid"
        style={
          {
            display: "grid",
            gap: "clamp(24px, 3vw, 36px)",
            padding: "0 clamp(20px, 4vw, 40px) clamp(48px, 8vw, 88px)",
            "--card-count": pieces.length + 1,
          } as React.CSSProperties
        }
      >
        {pieces.map((p) => (
          <div key={p.slug} className="piece-card">
            <Link href={`/pieces/${p.slug}`} className="piece-card-media">
              <div style={{ position: "relative", aspectRatio: "4 / 5" }}>
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: p.images[0].position }}
                />
              </div>
            </Link>

            <Link href={`/pieces/${p.slug}`} className="piece-card-meta">
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span className="label" style={{ color: "var(--muted)" }}>
                  No. {p.no}
                </span>
                <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(22px, 3.2vw, 25px)", lineHeight: 1.15 }}>
                  {p.name}
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.6, color: "#6b5f50" }}>{p.note}</span>
              </div>
            </Link>

            <div className="piece-card-sizes" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 3 }}>
              {p.options.map((opt, i) => (
                <span key={i} style={{ fontSize: 13, color: "var(--ink)" }}>
                  {opt.dims} <span style={{ color: "var(--muted)" }}>·</span> From{" "}
                  <strong>{euro(optionPrice(opt))}</strong>
                </span>
              ))}
            </div>

            <Link
              href={`/pieces/${p.slug}`}
              className="btn btn-outline piece-card-action"
              style={{ minHeight: 46, fontSize: 12, padding: "12px 16px" }}
            >
              See the details
            </Link>
          </div>
        ))}

        <div className="piece-card">
          <div className="piece-card-media" style={{ position: "relative", aspectRatio: "4 / 5", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Photo coming soon
            </span>
          </div>

          <div className="piece-card-meta">
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span className="label" style={{ color: "var(--muted)" }}>
                No. 05
              </span>
              <span style={{ fontFamily: "var(--font-serif), serif", fontSize: "clamp(22px, 3.2vw, 25px)", lineHeight: 1.15 }}>
                I have my own idea
              </span>
              <span style={{ fontSize: 14, lineHeight: 1.6, color: "#6b5f50" }}>
                A cabinet, a shelf, a repair — describe it and I&rsquo;ll tell you if and how I can
                build it.
              </span>
            </div>
          </div>

          <div className="piece-card-sizes" style={{ flex: 1 }} />

          <Link
            href="/contact?topic=own-idea"
            className="btn btn-outline piece-card-action"
            style={{ minHeight: 46, fontSize: 12, padding: "12px 16px" }}
          >
            Contact me directly
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
