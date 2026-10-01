"use client";

import { useState } from "react";
import Link from "next/link";
import type { Testimonial } from "@/lib/testimonials";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [i, setI] = useState(0);
  const t = testimonials[i];

  return (
    <section className="testi-wrap">
      <h2 className="h h-l">What people say</h2>
      <div className="testi">
        <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
        <div className="testi-meta">
          <div className="testi-who">
            <strong>{t.who}</strong>
            <span>{t.piece}</span>
          </div>
          <div className="dots">
            {testimonials.map((_, j) => (
              <button
                key={j}
                type="button"
                className={`dot${j === i ? " on" : ""}`}
                aria-label={`Show testimonial ${j + 1}`}
                onClick={() => setI(j)}
              />
            ))}
          </div>
        </div>
      </div>
      <Link className="share" href="/contact?topic=testimonial">
        Own a piece? <span>Share yours</span>
      </Link>
    </section>
  );
}
