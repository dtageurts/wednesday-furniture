import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { pieces, euro } from "@/lib/pieces";

export const metadata: Metadata = {
  title: "Pieces",
  description: "Four pieces, made once and made again to your measurements.",
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
          <span className="label" style={{ color: "var(--green)" }}>
            Four pieces
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(34px, 6vw, 52px)",
              lineHeight: 1.04,
            }}
          >
            Pieces
          </h1>
        </div>
        <p style={{ margin: 0, alignSelf: "end", fontSize: 15, lineHeight: 1.75, color: "var(--ink-soft)" }}>
          Everything here has been built once, for a specific room. Pick the size that&rsquo;s
          closest to yours below, or tell me your own dimensions and I&rsquo;ll come back with a
          plan and a price.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "clamp(24px, 3vw, 36px)",
          padding: "0 clamp(20px, 4vw, 40px) clamp(48px, 8vw, 88px)",
        }}
      >
        {pieces.map((p) => (
          <div key={p.slug} style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
            <Link href={`/pieces/${p.slug}`} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ position: "relative", aspectRatio: "4 / 5" }}>
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: p.images[0].position }}
                />
              </div>
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

            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 8 }}>
              {p.options.map((opt, i) => (
                <Link
                  key={i}
                  href={`/pieces/${p.slug}?option=${i}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 10,
                    border: "1px solid #cfc6b4",
                    background: "#f3eee3",
                    padding: "11px 14px",
                  }}
                >
                  <span style={{ fontSize: 13, color: "var(--ink)" }}>
                    {opt.dims} <span style={{ color: "var(--muted)" }}>·</span> <strong>{euro(opt.price)}</strong>
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--green)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Request →
                  </span>
                </Link>
              ))}
              <div style={{ fontSize: 12, color: "var(--muted)", padding: "2px 2px 0" }}>
                + Add a painted finish — {euro(p.finishPrice)}
              </div>
            </div>

            <Link
              href={`/pieces/${p.slug}`}
              className="btn btn-outline"
              style={{ minHeight: 46, fontSize: 12, padding: "12px 16px" }}
            >
              See the details
            </Link>
          </div>
        ))}

        <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingTop: 4 }}>
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
          <div style={{ flex: 1 }} />
          <Link
            href="/contact?topic=own-idea"
            className="btn btn-outline"
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
