import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { DELIVERY_PRICE } from "@/lib/pricing";
import { euro } from "@/lib/pieces";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about the job — a piece you saw, your own idea, or a small job around the house.",
};

export default function ContactPage() {
  return (
    <div className="page">
      <Nav active="contact" />
      <div className="contact">
        <div className="contact-intro">
          <h1 className="h">
            Tell me about <em>the job.</em>
          </h1>
          <p className="lead">I&rsquo;ll reply within 2 working days.</p>
          <dl className="specs desk-only">
            <div className="spec">
              <dt>Delivery</dt>
              <dd>Amsterdam {euro(DELIVERY_PRICE)}</dd>
            </div>
            <div className="spec">
              <dt>Pick up</dt>
              <dd>Free, at the workshop</dd>
            </div>
            <div className="spec">
              <dt>Lead time</dt>
              <dd>3–5 weeks</dd>
            </div>
          </dl>
          <Link className="share desk-only" href="/contact?topic=testimonial">
            Already own a piece? <span>Tell me what it&rsquo;s like to live with</span>
          </Link>
        </div>

        <div>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
          <Link className="share contact-share mob-only" href="/contact?topic=testimonial">
            Already own a piece? <span>Tell me what it&rsquo;s like to live with</span>
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
