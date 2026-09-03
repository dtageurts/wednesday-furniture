"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { pieces } from "@/lib/pieces";

const TOPICS = ["A piece of furniture", "Something new / my own idea", "A small job"] as const;
type Topic = (typeof TOPICS)[number];

const JOB_NAMES = [
  "Hanging shelves, TV or art",
  "Assembling flat-pack furniture",
  "Small repairs & fixes",
  "Other mounting & installation work",
  "Something else — see my message",
];

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

export function ContactForm() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<Topic>(TOPICS[0]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    dimensions: "",
    message: "",
    piece: "",
    job: "",
    company: "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  useEffect(() => {
    const t = searchParams.get("topic");
    const pieceParam = searchParams.get("piece");
    if (t === "own-idea") setTopic(TOPICS[1]);
    else if (t === "small-job") setTopic(TOPICS[2]);
    else if (pieceParam) {
      const p = pieces.find((p) => p.slug === pieceParam);
      if (p) {
        setTopic(TOPICS[0]);
        setForm((f) => ({ ...f, piece: p.name }));
      }
    }
  }, [searchParams]);

  const field =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          name: form.name,
          email: form.email,
          city: form.city,
          dimensions: form.dimensions,
          message: form.message,
          pieceName: topic === TOPICS[0] ? form.piece : undefined,
          source: "contact",
          company: form.company,
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
    setForm({ name: "", email: "", city: "", dimensions: "", message: "", piece: "", job: "", company: "" });
  }

  if (sent) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <span className="label" style={{ color: "var(--green)" }}>
          Message sent
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-serif), serif",
            fontWeight: 300,
            fontSize: "clamp(26px, 4vw, 32px)",
            color: "#24301f",
          }}
        >
          Thanks — I&rsquo;ve got it.
        </h2>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "#4a5545" }}>
          {`${sentName ? sentName + ", your" : "Your"} message is in — filed under "${topic.toLowerCase()}". I'll reply to ${form.email} within a couple of days.`}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 6 }}>
          <Link href="/pieces" className="btn btn-primary">
            Browse the pieces
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
      <input
        type="text"
        value={form.company}
        onChange={field("company")}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={fieldLabelStyle}>What is it about? *</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              style={{
                minHeight: 44,
                padding: "11px 16px",
                fontSize: 13,
                cursor: "pointer",
                border: "1px solid var(--green)",
                background: topic === t ? "var(--green)" : "transparent",
                color: topic === t ? "var(--green-fg)" : "var(--green)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {topic === TOPICS[0] && (
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={fieldLabelStyle}>Which piece? *</span>
          <select value={form.piece} onChange={field("piece")} style={inputStyle}>
            <option value="">Choose a piece…</option>
            {pieces.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {topic === TOPICS[2] && (
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={fieldLabelStyle}>What kind of job? *</span>
          <select value={form.job} onChange={field("job")} style={inputStyle}>
            <option value="">Choose one…</option>
            {JOB_NAMES.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </label>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
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
          rows={5}
          value={form.message}
          onChange={field("message")}
          placeholder="What you'd like made or done, and where it goes."
          style={{ ...inputStyle, lineHeight: 1.6, resize: "vertical" }}
        />
      </label>

      {error && <span style={{ fontSize: 13, color: "#8c3a2b" }}>{error}</span>}

      <button type="submit" disabled={sending} className="btn btn-primary" style={{ minHeight: 54 }}>
        {sending ? "Sending…" : "Send message"}
      </button>
      <span style={{ fontSize: 12, lineHeight: 1.6, color: "#6e7a68" }}>
        Your details are used only to answer this message.
      </span>
    </form>
  );
}
