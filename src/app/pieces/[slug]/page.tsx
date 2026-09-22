import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { PieceOrderPanel } from "@/components/PieceOrderPanel";
import { getPiece, pieces, euro } from "@/lib/pieces";
import { varnishPrice } from "@/lib/pricing";

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

  const others = pieces.filter((p) => p.slug !== piece.slug);
  const galleryImages = piece.images.slice(1, 4);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <Nav active="pieces" />

      <div
        className="label"
        style={{
          padding: "clamp(20px, 3vw, 28px) clamp(20px, 4vw, 40px) 0",
          display: "flex",
          gap: 10,
          color: "var(--muted)",
        }}
      >
        <Link href="/pieces">Pieces</Link>
        <span>/</span>
        <span style={{ color: "var(--ink)" }}>{piece.name}</span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(24px, 4vw, 56px)",
          padding: "clamp(24px, 4vw, 40px) clamp(20px, 4vw, 40px) clamp(48px, 8vw, 80px)",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.5vw, 14px)" }}>
          <div style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--rule)" }}>
            <Image
              src={piece.images[0].src}
              alt={piece.images[0].alt}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: piece.images[0].position }}
            />
          </div>
          {galleryImages.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(10px, 1.5vw, 14px)" }}>
              {galleryImages.map((img) => (
                <div key={img.src} style={{ position: "relative", aspectRatio: "1", background: "var(--rule)" }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 700px) 33vw, 17vw"
                    style={{ objectFit: "cover", objectPosition: img.position }}
                  />
                  {img.caption && (
                    <span
                      className="label"
                      style={{
                        position: "absolute",
                        left: 6,
                        bottom: 6,
                        fontSize: 9,
                        color: "#fff",
                        background: "rgba(35,32,27,0.55)",
                        padding: "3px 6px",
                        lineHeight: 1.4,
                      }}
                    >
                      {img.caption}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="label" style={{ color: "var(--green)" }}>
              No. {piece.no}
            </span>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-serif), serif",
                fontWeight: 300,
                fontSize: "clamp(32px, 5vw, 46px)",
                lineHeight: 1.06,
              }}
            >
              {piece.name}
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "var(--ink-soft)" }}>{piece.description}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 20,
              borderTop: "1px solid var(--rule)",
              paddingTop: 22,
            }}
          >
            {piece.specs.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span className="label" style={{ fontSize: 10, color: "var(--muted)" }}>
                  {s.label}
                </span>
                <span style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)" }}>{s.value}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
            Optional varnished finish available for +{euro(varnishPrice(piece.size))}.
          </p>

          <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 22 }}>
            <PieceOrderPanel slug={piece.slug} options={piece.options} woodOptions={piece.woodOptions} />
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--rule)",
          padding: "clamp(36px, 6vw, 64px) clamp(20px, 4vw, 40px) clamp(40px, 6vw, 72px)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 300, fontSize: "clamp(24px, 3.6vw, 30px)" }}>
            Other pieces
          </h3>
          <Link href="/pieces" className="label" style={{ color: "var(--green)" }}>
            All pieces →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "clamp(18px, 3vw, 28px)" }}>
          {others.map((o) => (
            <Link key={o.slug} href={`/pieces/${o.slug}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ position: "relative", aspectRatio: "4 / 5", background: "var(--rule)" }}>
                <Image
                  src={o.images[0].src}
                  alt={o.images[0].alt}
                  fill
                  sizes="(max-width: 700px) 50vw, 25vw"
                  style={{ objectFit: "cover", objectPosition: o.images[0].position }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontFamily: "var(--font-serif), serif", fontSize: 21 }}>{o.name}</span>
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: "var(--green)" }}>
                  from {euro(o.startingFrom)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
