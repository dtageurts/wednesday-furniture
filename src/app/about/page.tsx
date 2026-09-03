import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description: "The workshop in Utrecht behind Wednesday — one maker, evenings and Wednesdays.",
};

const steps = [
  {
    label: "01 — Measure",
    text: "You send dimensions and a photo of the space. I come back with a drawing and a price — no charge for that.",
  },
  {
    label: "02 — Build",
    text: "Planks are cut, jointed and assembled by hand. Two to five weeks depending on the piece and the queue.",
  },
  {
    label: "03 — Finish & fit",
    text: "Three coats of hardwax oil, hand-rubbed. I deliver and mount it myself within an hour of Utrecht.",
  },
];

const processShots = [
  "photo — bench with hand tools",
  "photo — planing a shelf edge",
  "photo — stacked planks / offcuts",
];

export default function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <Nav active="about" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(28px, 5vw, 64px)",
          padding: "clamp(44px, 7vw, 84px) clamp(20px, 4vw, 40px) clamp(36px, 6vw, 56px)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span className="label" style={{ color: "var(--green)" }}>
            The workshop · Utrecht
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(32px, 5.4vw, 48px)",
              lineHeight: 1.06,
            }}
          >
            It started with one shelf that nobody sold in the right length.
          </h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignSelf: "end" }}>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "var(--ink-soft)" }}>
            I build furniture on my own, in a small workshop, mostly in the evenings and on
            Wednesdays — which is where the name comes from. It began as a habit: rooms in Dutch
            houses are never standard, and the thing that would actually fit is never the thing in
            the shop.
          </p>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "var(--ink-soft)" }}>
            So I measure, draw, buy planks, and build. Solid spruce and pine, occasionally oak.
            Every piece is one of one, made for a specific wall, alcove or table.
          </p>
        </div>
      </div>

      <div style={{ position: "relative", aspectRatio: "21 / 9" }}>
        <Image
          src="/photos/pool-table-dining-top-01.jpeg"
          alt="The workshop"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 42%" }}
        />
      </div>

      <div
        style={{
          background: "var(--green)",
          color: "var(--green-fg)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "clamp(28px, 4vw, 48px)",
          padding: "clamp(48px, 8vw, 84px) clamp(20px, 4vw, 40px)",
        }}
      >
        {steps.map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="label" style={{ color: "rgba(239,241,232,0.6)" }}>
              {s.label}
            </span>
            <p style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 300, fontSize: 21, lineHeight: 1.5 }}>
              {s.text}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(16px, 2.5vw, 24px)",
          padding: "clamp(40px, 6vw, 64px) clamp(20px, 4vw, 40px) clamp(28px, 4vw, 40px)",
        }}
      >
        {processShots.map((shot) => (
          <div key={shot} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                aspectRatio: "1",
                background: "var(--rule)",
                backgroundImage:
                  "repeating-linear-gradient(102deg, rgba(255,255,255,0.5) 0 3px, rgba(35,32,27,0.05) 3px 9px)",
                display: "grid",
                placeItems: "center",
                padding: 16,
                textAlign: "center",
              }}
            >
              <span className="label" style={{ fontSize: 10, color: "var(--muted)" }}>
                {shot}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 clamp(20px, 4vw, 40px) clamp(48px, 8vw, 80px)" }}>
        <div
          style={{
            background: "var(--sage)",
            padding: "clamp(32px, 5vw, 52px) clamp(24px, 4vw, 40px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(24px, 4vw, 40px)",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-serif), serif", fontWeight: 300, fontSize: "clamp(26px, 4vw, 32px)", color: "#24301f" }}>
              Something in mind for your own room?
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#4a5545" }}>
              Send the dimensions and a photo — I&rsquo;ll reply with a plan and a price.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary" style={{ justifySelf: "start", minHeight: 52, padding: "16px 28px" }}>
            Start an inquiry →
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
