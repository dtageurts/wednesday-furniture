"use client";

import Link from "next/link";

export function ServicesStrip() {
  return (
    <div
      style={{
        background: "var(--sage)",
        borderTop: "1px solid var(--green)",
        padding: "clamp(26px, 4vw, 34px) clamp(20px, 4vw, 40px)",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <span
        className="services-text"
        style={{
          fontFamily: "var(--font-serif), serif",
          color: "#24301f",
        }}
      >
        Also available for maintenance, DIY, and hanging &amp; mounting work.{" "}
        <Link
          href="/contact?topic=small-job"
          style={{
            fontWeight: 700,
            color: "var(--green)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          Contact me.
        </Link>
      </span>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-2px" }}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "-2px" }}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 6L12 13L20.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  return (
    <div
      className="footer-inner"
      style={{
        background: "var(--green)",
        color: "#fff",
        padding: "clamp(24px, 5vw, 30px) clamp(20px, 4vw, 40px) clamp(30px, 6vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 8,
        fontSize: 13,
        letterSpacing: "0.02em",
      }}
    >
      <Link
        href="/"
        onClick={(e) => {
          if (window.location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#fff" }}
      >
        <img src="/logo/mark-white.png" alt="" style={{ height: 14, width: "auto", display: "inline-block" }} />
        Wednesday Furniture · Amsterdam
      </Link>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", color: "#fff" }}>
        <a href="mailto:contact@wednesdayfurniture.com" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <EmailIcon /> Email
        </a>
        <span>–</span>
        <a
          href="https://instagram.com/wednesdayfurniture"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
        >
          <InstagramIcon /> Instagram
        </a>
      </span>
    </div>
  );
}

export function SiteFooter() {
  return (
    <div style={{ marginTop: "auto" }}>
      <ServicesStrip />
      <Footer />
    </div>
  );
}
