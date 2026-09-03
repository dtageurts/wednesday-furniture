import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { pieces, euro } from "@/lib/pieces";

const hero = pieces[0];

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <div
        style={{
          position: "relative",
          minHeight: "min(700px, 92svh)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Image
          src={hero.images[0].src}
          alt={hero.images[0].alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: hero.images[0].position, zIndex: -2 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(20,17,13,0.2) 0%, rgba(20,17,13,0.08) 34%, rgba(20,17,13,0.62) 100%)",
          }}
        />
        <Nav variant="transparent" />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 28,
            padding: "clamp(40px, 8vw, 56px) clamp(20px, 4vw, 40px) clamp(28px, 5vw, 40px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: "1 1 300px", maxWidth: 340 }}>
            <Link
              href="/pieces"
              className="btn btn-primary"
              style={{ justifyContent: "space-between", boxShadow: "0 6px 18px rgba(20,17,13,0.28)" }}
            >
              <span>See all pieces</span>
              <span>→</span>
            </Link>
            <Link
              href="/contact?topic=own-idea"
              className="btn"
              style={{
                justifyContent: "space-between",
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
            >
              <span>I have my own idea</span>
              <span>→</span>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 7,
              textAlign: "right",
              paddingBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              No. {hero.no} · {hero.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif), serif",
                fontWeight: 300,
                fontSize: 16,
                whiteSpace: "nowrap",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {hero.note}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "var(--green)",
          color: "#fff",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(28px, 5vw, 64px)",
          padding: "clamp(48px, 8vw, 88px) clamp(20px, 4vw, 40px)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-serif), serif",
            fontWeight: 300,
            fontSize: "clamp(27px, 4.5vw, 34px)",
            lineHeight: 1.25,
          }}
        >
          Wednesday is one maker, one workshop — furniture built for the room it goes in.
        </p>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.82)" }}>
          I work mostly in solid spruce and pine: cabinets, tables, shelves and light fittings, cut
          and joined by hand and finished with hardwax oil. Nothing is a fixed catalogue — every
          piece below has been made once, and can be made again to your measurements.
        </p>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            padding: "clamp(24px, 5vw, 32px) clamp(20px, 4vw, 40px) 12px",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          <span>Made so far</span>
          <span>Starting from</span>
        </div>
        {pieces.map((p) => (
          <Link
            key={p.slug}
            href={`/pieces/${p.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "96px minmax(0, 1fr) auto",
              alignItems: "center",
              columnGap: "clamp(16px, 3vw, 24px)",
              rowGap: 4,
              padding: "16px clamp(20px, 4vw, 40px)",
              borderTop: "1px solid var(--rule)",
            }}
          >
            <div style={{ gridRow: "span 2", position: "relative", aspectRatio: "4 / 3" }}>
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
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                textAlign: "right",
                color: "var(--green)",
                whiteSpace: "nowrap",
              }}
            >
              from {euro(p.startingFrom)}
            </span>
            <span style={{ gridColumn: "2 / span 2", fontSize: 14, color: "#6b5f50" }}>{p.note}</span>
          </Link>
        ))}
        <div style={{ borderTop: "1px solid var(--rule)", padding: "clamp(24px, 4vw, 32px) clamp(20px, 4vw, 40px)" }}>
          <Link
            href="/pieces"
            className="label"
            style={{ color: "var(--green)", borderBottom: "1px solid var(--green)", paddingBottom: 3 }}
          >
            See every piece →
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
