import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { getPiece, pieces, euro } from "@/lib/pieces";

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

const galleryLabels = ["detail — closeup", "detail — joinery", "in situ — full room"];

export default function PieceDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { option?: string };
}) {
  const piece = getPiece(params.slug);
  if (!piece) notFound();

  const optIdx = searchParams.option ? parseInt(searchParams.option, 10) : -1;
  const preselected = piece.options[optIdx];
  const initialDimensions = preselected?.dims ?? "";
  const initialMessage = preselected
    ? `Hi, I am interested in ${piece.name} (${preselected.dims}).`
    : "";

  const others = pieces.filter((p) => p.slug !== piece.slug);

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
          padding: "clamp(24px, 4vw, 40px) clamp(20px, 4vw, 40px) clamp(32px, 5vw, 48px)",
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(10px, 1.5vw, 14px)" }}>
            {galleryLabels.map((label) => (
              <div
                key={label}
                style={{
                  aspectRatio: "1",
                  background: "var(--rule)",
                  backgroundImage:
                    "repeating-linear-gradient(102deg, rgba(255,255,255,0.5) 0 3px, rgba(35,32,27,0.05) 3px 9px)",
                  display: "grid",
                  placeItems: "center",
                  padding: 10,
                  textAlign: "center",
                }}
              >
                <span className="label" style={{ fontSize: 9, color: "var(--muted)", lineHeight: 1.5 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
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

          <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid var(--rule)", paddingTop: 22 }}>
            {piece.options.map((opt, i) => (
              <Link
                key={i}
                href={`/pieces/${piece.slug}?option=${i}#inquiry`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid #cfc6b4",
                  background: i === optIdx ? "#dce0d0" : "#f3eee3",
                  padding: "12px 16px",
                }}
              >
                <span style={{ fontSize: 14, color: "var(--ink)" }}>
                  {opt.dims} <span style={{ color: "var(--muted)" }}>·</span> <strong>{euro(opt.price)}</strong>
                </span>
                <span
                  className="label"
                  style={{ fontSize: 10, color: "var(--green)", whiteSpace: "nowrap" }}
                >
                  Request →
                </span>
              </Link>
            ))}
            <div style={{ fontSize: 13, color: "var(--muted)", padding: "2px 2px 0" }}>
              + Add a painted finish — {euro(piece.finishPrice)}
            </div>
          </div>
        </div>
      </div>

      <div id="inquiry" style={{ padding: "0 clamp(20px, 4vw, 40px) clamp(48px, 8vw, 80px)" }}>
        <div style={{ background: "var(--sage)", padding: "clamp(28px, 5vw, 52px) clamp(20px, 4vw, 40px)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(24px, 4vw, 56px)",
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif), serif",
                  fontWeight: 300,
                  fontSize: "clamp(27px, 4.2vw, 34px)",
                  color: "#24301f",
                }}
              >
                Want this made for your space? Get in touch with your dimensions
              </h2>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "#4a5545" }}>
                Rough measurements are fine — width, height, depth, or just a photo of the wall. I
                reply within a couple of days with a drawing and a price. No obligation.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#5e6e58",
                  paddingTop: 8,
                }}
              >
                <span>Regarding: {piece.name}</span>
                <span>contact@wednesdayfurniture.com</span>
              </div>
            </div>

            <InquiryForm
              source="piece-detail"
              pieceSlug={piece.slug}
              pieceName={piece.name}
              initialDimensions={initialDimensions}
              initialMessage={initialMessage}
            />
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
