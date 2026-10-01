"use client";

import { useState } from "react";
import type { PieceImage } from "@/lib/pieces";

export function PieceGallery({ images, name }: { images: PieceImage[]; name: string }) {
  const [i, setI] = useState(0);
  const current = images[i];

  return (
    <>
      <img className="main-img" src={current.src} alt={`${name} — ${current.caption ?? name}`} style={{ objectPosition: current.position }} />
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((im, j) => (
            <button key={im.src} type="button" className={j === i ? "on" : undefined} aria-label={im.caption ?? name} onClick={() => setI(j)}>
              <img src={im.src} alt="" style={{ objectPosition: im.position }} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
