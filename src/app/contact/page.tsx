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
        className="contact-grid"
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
            Tell me about the job.
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
            I will reply within 2 working days.
          </h1>
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
