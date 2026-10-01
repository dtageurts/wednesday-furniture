import Link from "next/link";

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const CONTACT_EMAIL = "contact@wednesdayfurniture.com";
const INSTAGRAM_URL = "https://instagram.com/wednesdayfurniture";

function FooterNav() {
  return (
    <nav className="footer-nav">
      <Link href="/pieces">Pieces</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}

export function SiteFooter({ services = false }: { services?: boolean }) {
  return (
    <>
      {services ? (
        <p className="services">
          Also available for maintenance, DIY, and hanging &amp; mounting work.{" "}
          <Link href="/contact?topic=small-job">Contact me.</Link>
        </p>
      ) : (
        <div className="footer-gap" />
      )}
      <footer className="footer tone tone-eclipse">
        <div className="footer-brand">
          <img src="/brand/mark-white.png" alt="" />
          <div className="footer-text">
            <span className="footer-name">Wednesday Furniture</span>
            <span className="footer-city">Amsterdam</span>
          </div>
        </div>
        <div className="footer-links">
          <FooterNav />
          <div className="icons">
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email">
              <MailIcon />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
