"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { euro, optionPrice, type Piece, type Wood } from "@/lib/pieces";
import { varnishPrice, DELIVERY_PRICE } from "@/lib/pricing";

type StepKey = "wood" | "size" | "fin" | "del";
type Delivery = "pickup" | "deliver";

interface StepOpt {
  v: string | number;
  label: string;
  sub?: string;
}
interface StepDef {
  key: StepKey;
  title: string;
  row?: boolean;
  opts: StepOpt[];
}

export function PieceOrderPanel({ piece }: { piece: Piece }) {
  const router = useRouter();
  const [wood, setWood] = useState<Wood | null>(piece.woodOptions ? piece.woodOptions[0].key : null);
  const [size, setSize] = useState<number | null>(null);
  const [fin, setFin] = useState<"raw" | "varnish" | null>(null);
  const [del, setDel] = useState<Delivery | null>(null);

  const showFinish = piece.varnishable !== false;

  const steps: StepDef[] = [];
  if (piece.woodOptions) {
    steps.push({
      key: "wood",
      title: "Wood",
      row: true,
      opts: piece.woodOptions.map((w) => ({ v: w.key, label: w.label })),
    });
  }
  steps.push({
    key: "size",
    title: "Size",
    opts: piece.options.map((o, i) => ({ v: i, label: o.dims, sub: euro(optionPrice(o, wood ?? undefined)) })),
  });
  if (showFinish) {
    steps.push({
      key: "fin",
      title: "Finish",
      opts: [
        { v: "raw", label: "Unfinished", sub: "+ " + euro(0) },
        { v: "varnish", label: "Varnished", sub: "+ " + euro(varnishPrice(piece.size)) },
      ],
    });
  }
  steps.push({
    key: "del",
    title: "Delivery",
    opts: [
      { v: "pickup", label: "I'll pick it up", sub: "+ " + euro(0) },
      { v: "deliver", label: "Deliver in Amsterdam, please", sub: "+ " + euro(DELIVERY_PRICE) },
    ],
  });

  const sel: Record<StepKey, string | number | null> = { wood, size, fin, del };

  function labelOf(key: StepKey): string | null {
    const v = sel[key];
    if (v === null) return null;
    if (key === "wood") return piece.woodOptions?.find((w) => w.key === v)?.label ?? null;
    if (key === "size") return piece.options[v as number].dims;
    if (key === "fin") return v === "varnish" ? "Varnished" : "Unfinished";
    return v === "deliver" ? `Amsterdam + ${euro(DELIVERY_PRICE)}` : "Pick up";
  }

  function setValue(key: StepKey, v: string | number) {
    if (key === "wood") setWood(v as Wood);
    else if (key === "size") setSize(v as number);
    else if (key === "fin") setFin(v as "raw" | "varnish");
    else setDel(v as Delivery);
  }

  const ready = steps.every((s) => sel[s.key] !== null);
  const hasSize = size !== null;
  const total = hasSize
    ? optionPrice(piece.options[size], wood ?? undefined) + (fin === "varnish" ? varnishPrice(piece.size) : 0) + (del === "deliver" ? DELIVERY_PRICE : 0)
    : piece.startingFrom;

  function requestPiece() {
    const q = new URLSearchParams({ topic: "furniture", piece: piece.slug });
    if (wood) q.set("wood", wood);
    if (size !== null) q.set("size", String(size));
    if (fin) q.set("fin", fin);
    if (del) q.set("del", del);
    router.push(`/contact?${q.toString()}`);
  }

  let open = true;

  return (
    <div className="build">
      <h2 className="h h-l">
        Build <em>yours</em>
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {steps.map((s, i) => {
          const locked = !open;
          const val = sel[s.key];
          if (val === null) open = false;
          const status = val !== null ? labelOf(s.key) : locked ? `After ${steps[i - 1].title.toLowerCase()}` : "Choose one";
          const optsEl = s.opts.map((o) => (
            <button
              key={String(o.v)}
              type="button"
              className={`opt${val === o.v ? " on" : ""}`}
              aria-pressed={val === o.v}
              onClick={() => setValue(s.key, o.v)}
            >
              <span>{o.label}</span>
              {o.sub && <b>{o.sub}</b>}
            </button>
          ));
          return (
            <div key={s.key} className={`step${locked ? " locked" : ""}`} aria-disabled={locked}>
              <div className="step-head">
                <div className="step-title">
                  <span className="step-num">0{i + 1}</span>
                  <span>{s.title}</span>
                </div>
                <span className="step-status">{status}</span>
              </div>
              {s.row ? <div className="opts-row">{optsEl}</div> : optsEl}
            </div>
          );
        })}
      </div>

      <div className="summary tone tone-eclipse">
        <span className="label">Your {piece.name}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {steps.map((s) => (
            <div className="sum-row" key={s.key}>
              <span>{s.title}</span>
              <span>{labelOf(s.key) ?? "—"}</span>
            </div>
          ))}
        </div>
        <div className="sum-total">
          <span>{hasSize ? "Total" : "From"}</span>
          <strong>{euro(total)}</strong>
        </div>
        <button type="button" className="btn btn-request" disabled={!ready} onClick={requestPiece}>
          {ready ? "Request this piece" : `Complete the ${steps.length} steps`}
        </button>
        <p className="fine">No payment yet. Delivery in Amsterdam {euro(DELIVERY_PRICE)}, or pick up for free. I&rsquo;ll reply within 2 working days.</p>
      </div>
    </div>
  );
}
