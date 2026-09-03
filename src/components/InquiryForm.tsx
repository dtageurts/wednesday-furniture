"use client";

import { useState } from "react";
import Link from "next/link";

export interface InquiryFormProps {
  source: "home" | "piece-detail" | "services" | "contact";
  pieceSlug?: string;
  pieceName?: string;
  initialDimensions?: string;
  initialMessage?: string;
  submitLabel?: string;
}

const inputStyle: React.CSSProperties = {
  minHeight: 48,
  background: "var(--off-white)",
  border: "1px solid #cfd3c4",
  padding: "12px 14px",
  fontSize: 15,
};

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono), monospace",
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#5e6e58",
};

export function InquiryForm({
  source,
  pieceSlug,
  pieceName,
  initialDimensions = "",
  initialMessage = "",
  submitLabel = "Send request",
}: InquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    dimensions: initialDimensions,
    message: initialMessage,
    company: "", // honeypot
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  const field =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setError("");
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return setError("That email address doesn't look right.");
    if (!form.city.trim()) return setError("Please add your city.");
    if (form.message.trim().length < 10) return setError("A sentence or two helps a lot.");

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pieceSlug,
          pieceName,
          source,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSending(false);
        return;
      }
      setSentName(form.name.trim().split(" ")[0]);
      setSent(true);
      setSending(false);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setSending(false);
    }
  }

  function reset() {
    setSent(false);
    setError("");
    setForm({ name: "", email: "", city: "", dimensions: "", message: "", company: "" });
  }

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: "60ch" }}>
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--green)",
          }}
        >
          Request sent
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-serif), serif",
            fontWeight: 300,
            fontSize: "clamp(26px, 4vw, 34px)",
            color: "#24301f",
          }}
        >
          Thanks — I&rsquo;ve got it.
        </h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "#4a5545" }}>
          {pieceName
            ? `${sentName ? sentName + ", your" : "Your"} request about the ${pieceName.toLowerCase()} is in. I'll reply to ${form.email} within a couple of days with a drawing and a price.`
            : `${sentName ? sentName + ", your" : "Your"} request is in. I'll reply to ${form.email} within a couple of days with a drawing and a price.`}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 6 }}>
          <Link href="/pieces" className="btn btn-primary">
            Back to pieces
          </Link>
          <button type="button" onClick={reset} className="btn btn-outline">
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Honeypot field — hidden from real visitors */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={field("company")}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={fieldLabelStyle}>Name *</span>
          <input type="text" value={form.name} onChange={field("name")} placeholder="Your name" style={inputStyle} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={fieldLabelStyle}>Email *</span>
          <input type="email" value={form.email} onChange={field("email")} placeholder="you@email.com" style={inputStyle} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={fieldLabelStyle}>City *</span>
          <input type="text" value={form.city} onChange={field("city")} placeholder="Utrecht" style={inputStyle} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={fieldLabelStyle}>Dimensions</span>
          <input
            type="text"
            value={form.dimensions}
            onChange={field("dimensions")}
            placeholder="e.g. 180 × 45 × 40 cm"
            style={inputStyle}
          />
        </label>
      </div>

      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={fieldLabelStyle}>Message *</span>
        <textarea
          rows={4}
          value={form.message}
          onChange={field("message")}
          placeholder="Where it will go, what it needs to hold, anything you like or want changed."
          style={{ ...inputStyle, lineHeight: 1.6, resize: "vertical" }}
        />
      </label>

      {error && <span style={{ fontSize: 13, color: "#8c3a2b" }}>{error}</span>}

      <button type="submit" disabled={sending} className="btn btn-primary">
        {sending ? "Sending…" : submitLabel}
      </button>
      <span style={{ fontSize: 12, lineHeight: 1.6, color: "#6e7a68" }}>
        Your details are used only to answer this request.
      </span>
    </form>
  );
}
