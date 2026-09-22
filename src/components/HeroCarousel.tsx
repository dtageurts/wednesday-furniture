"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { DIAGONAL_WHITE_GLASS } from "@/lib/ui";

interface CarouselPiece {
  no: string;
  name: string;
  note: string;
  images: { src: string; position: string; alt: string }[];
}

export function HeroCarousel({ pieces }: { pieces: CarouselPiece[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setIndex((i) => (i + 1) % pieces.length);
      }, 8000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, pieces.length]);

  const current = pieces[index];

  return (
    <div
      style={{
        position: "relative",
        height: "65svh",
        minHeight: 340,
        overflow: "hidden",
      }}
    >
      {pieces.map((p, i) => (
        <Image
          key={p.no}
          src={p.images[0].src}
          alt={p.images[0].alt}
          fill
          priority={i === 0}
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: p.images[0].position,
            opacity: i === index ? 1 : 0,
            transition: "opacity 900ms ease",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(20,17,13,0.3) 0%, rgba(20,17,13,0.08) 22%, rgba(20,17,13,0.1) 60%, rgba(20,17,13,0.55) 100%)",
        }}
      />

      <Nav variant="transparent" />

      {/* buttons — vertically centered, left-aligned, sized to content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "clamp(20px, 4vw, 40px)",
          transform: "translateY(-50%)",
          width: "fit-content",
          maxWidth: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 10,
        }}
      >
        <Link
          href="/pieces"
          className="btn btn-primary"
          style={{
            boxShadow: "0 6px 18px rgba(20,17,13,0.3)",
            justifyContent: "flex-start",
            minHeight: "clamp(48px, 5.6vw, 72px)",
            padding: "clamp(14px, 1.8vw, 22px) clamp(22px, 2.6vw, 40px)",
            fontSize: "clamp(13px, 1.3vw, 18px)",
          }}
        >
          See all pieces
        </Link>
        <Link
          href="/contact?topic=own-idea"
          className="btn"
          style={{
            background: DIAGONAL_WHITE_GLASS,
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.8)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            justifyContent: "flex-start",
            minHeight: "clamp(48px, 5.6vw, 72px)",
            padding: "clamp(14px, 1.8vw, 22px) clamp(22px, 2.6vw, 40px)",
            fontSize: "clamp(13px, 1.3vw, 18px)",
          }}
        >
          I have my own idea
        </Link>
      </div>

      {/* piece label — bottom left */}
      <div
        style={{
          position: "absolute",
          left: "clamp(20px, 4vw, 40px)",
          bottom: "clamp(18px, 3.5vw, 26px)",
          right: 64,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <span
          className="label"
          style={{ color: "#fff", fontSize: 11, textShadow: "0 1px 4px rgba(0,0,0,0.45)" }}
        >
          No.{current.no} · {current.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif), serif",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 4px rgba(0,0,0,0.45)",
          }}
        >
          {current.note}
        </span>
      </div>

      {/* play / pause — bottom right, icon only */}
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause carousel" : "Play carousel"}
        style={{
          position: "absolute",
          right: "clamp(16px, 3.5vw, 28px)",
          bottom: "clamp(18px, 3.5vw, 26px)",
          background: "none",
          border: "none",
          padding: 6,
          cursor: "pointer",
          filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))",
        }}
      >
        {playing ? (
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
            <rect x="0" y="0" width="3" height="15" fill="#fff" opacity="0.85" />
            <rect x="10" y="0" width="3" height="15" fill="#fff" opacity="0.85" />
          </svg>
        ) : (
          <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
            <path d="M0 0L12 7.5L0 15V0Z" fill="#fff" opacity="0.85" />
          </svg>
        )}
      </button>
    </div>
  );
}
