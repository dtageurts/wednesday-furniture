"use client";

import { useState } from "react";
import Link from "next/link";
import { euro, optionPrice, type PieceOption, type Wood, type WoodOption } from "@/lib/pieces";
import { DIAGONAL_GREEN } from "@/lib/ui";

export function PieceOrderPanel({
  slug,
  options,
  woodOptions,
}: {
  slug: string;
  options: PieceOption[];
  woodOptions?: WoodOption[];
}) {
  const [wood, setWood] = useState<Wood | null>(woodOptions ? woodOptions[0].key : null);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {woodOptions && (
        <div style={{ display: "flex", gap: 8, marginBottom: 2 }}>
          {woodOptions.map((w) => (
            <button
              key={w.key}
              type="button"
              onClick={() => setWood(w.key)}
              style={{
                flex: 1,
                minHeight: 44,
                padding: "10px 14px",
                fontSize: 13,
                cursor: "pointer",
                border: "1px solid var(--green)",
                background: wood === w.key ? DIAGONAL_GREEN : "transparent",
                color: wood === w.key ? "var(--green-fg)" : "var(--green)",
              }}
            >
              {w.label}
            </button>
          ))}
        </div>
      )}

      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setSelected(i)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            border: "1px solid #cfc6b4",
            background: selected === i ? "#dce0d0" : "#f3eee3",
            padding: "12px 16px",
            font: "inherit",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 14, color: "var(--ink)" }}>
            {opt.dims} <span style={{ color: "var(--muted)" }}>·</span>{" "}
            <strong>{euro(optionPrice(opt, wood ?? undefined))}</strong>
          </span>
          <span
            className="label"
            style={{ fontSize: 10, color: selected === i ? "var(--green)" : "var(--muted)", whiteSpace: "nowrap" }}
          >
            {selected === i ? "Selected" : "Select"}
          </span>
        </button>
      ))}

      {selected === null ? (
        <button
          type="button"
          disabled
          className="btn"
          style={{ background: "#d9d2c3", color: "#a79c8c", cursor: "not-allowed", border: "none" }}
        >
          Request
        </button>
      ) : (
        <Link
          href={`/contact?piece=${slug}&dimension=${selected}${wood ? `&wood=${wood}` : ""}`}
          className="btn btn-primary"
        >
          Request →
        </Link>
      )}
    </div>
  );
}
