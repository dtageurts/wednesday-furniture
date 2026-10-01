"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";

interface CarouselPiece {
  no: string;
  name: string;
  note: string;
  images: { src: string; alt: string }[];
}

export function HeroCarousel({ pieces }: { pieces: CarouselPiece[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setIndex((i) => (i + 1) % pieces.length);
      }, 5000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, pieces.length]);

  const current = pieces[index];

  return (
    <section className="hero" aria-label="Featured pieces">
      <div className="hero-slides">
        {pieces.map((p, i) => (
          <img key={p.no} src={p.images[0].src} alt={p.images[0].alt} className={i === index ? "on" : undefined} loading={i === 0 ? "eager" : "lazy"} />
        ))}
      </div>
      <div className="hero-shade" />
      <Nav variant="overlay" />

      <div className="hero-ctas">
        <Link href="/pieces" className="btn tone tone-eclipse">
          See all pieces
        </Link>
        <Link href="/contact?topic=custom" className="btn btn-ivory">
          I have a piece in mind
        </Link>
      </div>

      <div className="hero-caption" aria-live="polite">
        <span className="label">
          No.{current.no} · {current.name}
        </span>
        <span className="hero-note">{current.note}</span>
      </div>

      <button
        type="button"
        className="hero-toggle"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause carousel" : "Play carousel"}
      >
        {playing ? (
          <>
            <span className="bar" />
            <span className="bar" />
          </>
        ) : (
          <span className="tri" />
        )}
      </button>
    </section>
  );
}
