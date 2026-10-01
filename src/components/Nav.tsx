import Link from "next/link";

export function Nav({
  variant = "solid",
  active,
}: {
  variant?: "solid" | "overlay";
  active?: "pieces" | "about" | "contact";
}) {
  return (
    <header className={`nav ${variant === "overlay" ? "nav-overlay" : "nav-solid tone tone-forest"}`}>
      <Link href="/" className="wordmark" aria-label="Wednesday, home">
        Wednesday
      </Link>
      <nav className="nav-links">
        <Link href="/pieces" className={active === "pieces" ? "active" : undefined} aria-current={active === "pieces" ? "page" : undefined}>
          Pieces
        </Link>
        <Link href="/about" className={active === "about" ? "active" : undefined} aria-current={active === "about" ? "page" : undefined}>
          About
        </Link>
        <Link href="/contact" className={active === "contact" ? "active" : undefined} aria-current={active === "contact" ? "page" : undefined}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
