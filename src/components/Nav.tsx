import Link from "next/link";

export function Nav({
  variant = "solid",
  active,
}: {
  variant?: "solid" | "transparent";
  active?: "pieces" | "about" | "contact";
}) {
  const base: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: "18px clamp(20px, 4vw, 40px)",
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    position: variant === "transparent" ? "absolute" : "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    background: variant === "transparent" ? "transparent" : "var(--green)",
    color: variant === "transparent" ? "#fff" : "var(--green-fg)",
  };

  return (
    <div style={base}>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-serif), serif",
          fontSize: "clamp(20px, 4vw, 22px)",
          letterSpacing: "0.01em",
          textTransform: "none",
        }}
      >
        Wednesday
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 2.6vw, 26px)" }}>
        <Link
          href="/pieces"
          style={
            active === "pieces"
              ? { borderBottom: "1px solid rgba(239,241,232,0.6)", paddingBottom: 2 }
              : undefined
          }
        >
          Pieces
        </Link>
        <Link href="/about">About</Link>
        <Link
          href="/contact"
          style={{
            background: variant === "transparent" ? "rgba(255,255,255,0.14)" : "var(--green-fg)",
            color: variant === "transparent" ? "#fff" : "var(--green)",
            padding: "10px 16px",
            whiteSpace: "nowrap",
            border: variant === "transparent" ? "1px solid rgba(255,255,255,0.5)" : "none",
          }}
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
