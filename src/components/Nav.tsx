import Link from "next/link";
import { DIAGONAL_NAV } from "@/lib/ui";

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
    gap: "clamp(10px, 2.2vw, 22px)",
    padding: "clamp(13px, 3.2vw, 26px) clamp(14px, 4vw, 56px)",
    fontSize: "clamp(12px, 3.2vw, 20px)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    position: variant === "transparent" ? "absolute" : "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    background: variant === "transparent" ? "transparent" : DIAGONAL_NAV,
    color: variant === "transparent" ? "#fff" : "var(--green-fg)",
  };
  const textShadow = variant === "transparent" ? { textShadow: "0 1px 4px rgba(0,0,0,0.45)" } : {};

  return (
    <div style={base}>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-brand), cursive",
          fontWeight: 400,
          fontSize: "clamp(26px, 6.4vw, 54px)",
          letterSpacing: "0.01em",
          textTransform: "none",
          flexShrink: 0,
          color: "#fff",
          ...textShadow,
        }}
      >
        Wednesday
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(9px, 2.2vw, 38px)" }}>
        <Link
          href="/pieces"
          style={{
            flexShrink: 0,
            ...textShadow,
            ...(active === "pieces"
              ? { borderBottom: "1px solid rgba(239,241,232,0.6)", paddingBottom: 2 }
              : {}),
          }}
        >
          Pieces
        </Link>
        <Link href="/about" style={{ flexShrink: 0, ...textShadow }}>
          About
        </Link>
        <Link href="/contact" style={{ flexShrink: 0, ...textShadow }}>
          Get in touch
        </Link>
      </div>
    </div>
  );
}
