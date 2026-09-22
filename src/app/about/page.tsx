import Image from "next/image";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { DIAGONAL_GREEN_WIDE } from "@/lib/ui";

export const metadata: Metadata = {
  title: "About",
  description: "The workshop behind Wednesday — one maker, evenings and Wednesdays.",
};

export default function AboutPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <div
        style={{
          position: "relative",
          height: "55svh",
          minHeight: 300,
          overflow: "hidden",
        }}
      >
        <Image
          src="/photos/wednesday-01.jpeg"
          alt="Wednesday Furniture maker's mark burned into a tabletop corner"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 38%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(20,17,13,0.3) 0%, rgba(20,17,13,0.08) 22%, rgba(20,17,13,0.1) 60%, rgba(20,17,13,0.55) 100%)",
          }}
        />
        <Nav variant="transparent" active="about" />
      </div>

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
          gap: 16,
          padding: "clamp(28px, 6vw, 48px) clamp(20px, 4vw, 40px)",
        }}
      >
        <p style={{ margin: 0, maxWidth: "72ch", fontSize: "clamp(15px, 2.6vw, 26px)", lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
          I build furniture on my own, in a small workshop, mostly in the evenings and on
          Wednesdays — which is where the name comes from. Solid spruce and pine, cut and joined
          by hand, finished with hardwax oil.
        </p>
        <p style={{ margin: 0, maxWidth: "72ch", fontSize: "clamp(15px, 2.6vw, 26px)", lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
          <strong style={{ fontWeight: 600, color: "#fff" }}>One maker, one workshop.</strong>{" "}
          Every piece is measured, drawn, cut and finished by hand — no factory, no
          outsourcing, just one person and one bench.
        </p>
      </div>

      <SiteFooter />
    </div>
  );
}
