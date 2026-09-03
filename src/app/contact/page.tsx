import { Suspense } from "react";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about the job — a piece you saw, your own idea, or a small job around the house.",
};

export default function ContactPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <Nav active="contact" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(28px, 5vw, 64px)",
          padding: "clamp(44px, 7vw, 80px) clamp(20px, 4vw, 40px) clamp(32px, 5vw, 48px)",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span className="label" style={{ color: "var(--green)" }}>
            Utrecht · replies within a few days
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-serif), serif",
              fontWeight: 300,
              fontSize: "clamp(32px, 5.4vw, 48px)",
              lineHeight: 1.05,
            }}
          >
            Tell me about the job.
          </h1>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "var(--ink-soft)", maxWidth: "44ch" }}>
            A piece you saw, something you sketched on paper, or a shelf that needs putting up —
            all of it lands in the same inbox. Rough dimensions and a photo are enough to start.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid var(--rule)", paddingTop: 20, fontSize: 14, color: "var(--ink-soft)" }}>
            <span className="label" style={{ fontSize: 10, color: "var(--muted)" }}>
              Or directly
            </span>
            <a href="mailto:contact@wednesdayfurniture.com" style={{ color: "var(--green)" }}>
              contact@wednesdayfurniture.com
            </a>
            <a href="https://instagram.com/wednesdayfurniture" target="_blank" rel="noreferrer" style={{ color: "var(--green)" }}>
              Instagram — @wednesdayfurniture
            </a>
          </div>
        </div>

        <div style={{ background: "var(--sage)", padding: "clamp(24px, 4vw, 40px)" }}>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
