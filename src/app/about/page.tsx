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
          It started with a toolbox my grandpa gave me when I was young. I used it to build
          birdhouses for the birds in our backyard and tiny villas for my hamsters.
        </p>
        <p style={{ margin: 0, maxWidth: "72ch", fontSize: "clamp(15px, 2.6vw, 26px)", lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
          Over the years I&rsquo;ve built office desks, closets, kitchens, beds and much more.
          Three years ago I built a table for our boardgaming group. We meet on Wednesdays, and
          the name stuck.
        </p>
        <p style={{ margin: 0, maxWidth: "72ch", fontSize: "clamp(15px, 2.6vw, 26px)", lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
          <strong style={{ fontWeight: 600, color: "#fff" }}>Wednesday is one maker, one workshop.</strong>{" "}
          Working with my hands is what I needed in a screen-filled world. It now not only
          makes me happy, but also those who use my creations daily.
        </p>
      </div>

      <SiteFooter />
    </div>
  );
}
