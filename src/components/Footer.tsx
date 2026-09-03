import Link from "next/link";

export function ServicesStrip() {
  return (
    <div
      style={{
        background: "var(--sage)",
        borderTop: "1px solid var(--green)",
        padding: "clamp(26px, 4vw, 34px) clamp(20px, 4vw, 40px)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-serif), serif",
          fontSize: "clamp(18px, 2.6vw, 22px)",
          color: "#24301f",
          textWrap: "pretty",
        }}
      >
        Also available for home maintenance, DIY jobs and hanging &amp; mounting work.
      </span>
      <Link
        href="/contact?topic=small-job"
        className="label"
        style={{
          background: "var(--green)",
          color: "var(--green-fg)",
          padding: "12px 20px",
          whiteSpace: "nowrap",
        }}
      >
        Ask about it →
      </Link>
    </div>
  );
}

export function Footer() {
  return (
    <div
      style={{
        background: "var(--green)",
        color: "rgba(239,241,232,0.78)",
        padding: "clamp(28px, 5vw, 34px) clamp(20px, 4vw, 40px) clamp(34px, 6vw, 44px)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 16,
        fontSize: 12,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      <span>Wednesday · Utrecht, NL</span>
      <div style={{ display: "flex", gap: 20 }}>
        <a href="https://instagram.com/wednesdayfurniture" target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href="mailto:contact@wednesdayfurniture.com">contact@wednesdayfurniture.com</a>
      </div>
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
