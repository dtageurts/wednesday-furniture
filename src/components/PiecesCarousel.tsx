"use client";

import { useEffect, useRef, useState } from "react";
import { PieceCard } from "@/components/PieceCard";
import type { Piece } from "@/lib/pieces";

export function PiecesCarousel({ pieces }: { pieces: Piece[] }) {
  const carRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [current, setCurrent] = useState(0);

  function step() {
    const c = carRef.current?.firstElementChild as HTMLElement | null;
    if (!c || !carRef.current) return 1;
    const gap = parseFloat(getComputedStyle(carRef.current).columnGap || "0") || 0;
    return c.offsetWidth + gap;
  }

  function recompute() {
    const car = carRef.current;
    const c = car?.firstElementChild as HTMLElement | null;
    if (!car || !c) return;
    const vis = Math.max(1, Math.round((car.clientWidth - 24) / c.offsetWidth));
    const n = Math.max(1, pieces.length - vis + 1);
    setPageCount(n);
    setCurrent(Math.min(n - 1, Math.round(car.scrollLeft / step())));
  }

  useEffect(() => {
    recompute();
    const car = carRef.current;
    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recompute);
    };
    car?.addEventListener("scroll", onScroll);
    window.addEventListener("resize", recompute);
    return () => {
      car?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieces.length]);

  return (
    <>
      <div className="carousel" ref={carRef}>
        {pieces.map((p) => (
          <PieceCard key={p.slug} piece={p} />
        ))}
      </div>
      <div className="dots">
        {Array.from({ length: pageCount }, (_, j) => (
          <button
            key={j}
            type="button"
            className={`dot${j === current ? " on" : ""}`}
            aria-label={`Show piece ${j + 1}`}
            onClick={() => carRef.current?.scrollTo({ left: j * step(), behavior: "smooth" })}
          />
        ))}
      </div>
    </>
  );
}
