"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { pieces, euro, getPiece, optionPrice, type Wood } from "@/lib/pieces";
import { varnishPrice, DELIVERY_PRICE } from "@/lib/pricing";

const TOPICS = [
  { key: "furniture", label: "A piece of furniture", hint: "Anything I should know? Room, colour of the floor, deadline…" },
  { key: "custom", label: "I have a piece in mind", hint: "Describe the piece: what it is for, where it goes, what you like about the photo." },
  { key: "small-job", label: "A small job", hint: "What needs fixing, hanging or mounting?" },
  { key: "testimonial", label: "Share a testimonial", hint: "How is it to live with? What do you use it for?" },
] as const;
type TopicKey = (typeof TOPICS)[number]["key"];

type Delivery = "pickup" | "deliver";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState<TopicKey>("furniture");
  const [pieceSlug, setPieceSlug] = useState("");
  const [wood, setWood] = useState<Wood | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [fin, setFin] = useState<"raw" | "varnish" | null>(null);
  const [del, setDel] = useState<Delivery | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    dimensions: "",
    message: "",
    company: "",
  });
  const [photoCount, setPhotoCount] = useState(0);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");

  const selectedPiece = pieceSlug ? getPiece(pieceSlug) : undefined;

  useEffect(() => {
    const t = searchParams.get("topic") as TopicKey | null;
    if (t && TOPICS.some((x) => x.key === t)) setTopic(t);

    const pieceParam = searchParams.get("piece");
    const p = pieceParam ? pieces.find((x) => x.slug === pieceParam) : undefined;
    if (p) {
      setTopic("furniture");
      setPieceSlug(p.slug);
      const woodParam = searchParams.get("wood") as Wood | null;
      const chosenWood = p.woodOptions ? (woodParam && p.woodOptions.some((w) => w.key === woodParam) ? woodParam : p.woodOptions[0].key) : null;
      setWood(chosenWood);
      const sizeIdx = parseInt(searchParams.get("size") ?? "", 10);
      if (!Number.isNaN(sizeIdx) && p.options[sizeIdx]) setSize(sizeIdx);
      const finParam = searchParams.get("fin");
      if (finParam === "raw" || finParam === "varnish") setFin(finParam);
      const delParam = searchParams.get("del");
      if (delParam === "pickup" || delParam === "deliver") setDel(delParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const field =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setError("");
    };

  const showFinish = !!selectedPiece && selectedPiece.varnishable !== false;
  const basePrice = selectedPiece && size !== null ? optionPrice(selectedPiece.options[size], wood ?? undefined) : 0;
  const varnishSurcharge = selectedPiece && showFinish && fin === "varnish" ? varnishPrice(selectedPiece.size) : 0;
  const deliverySurcharge = del === "deliver" ? DELIVERY_PRICE : 0;
  const total = basePrice + varnishSurcharge + deliverySurcharge;

  function pieceStepsComplete() {
    if (!selectedPiece) return false;
    if (selectedPiece.woodOptions && !wood) return false;
    if (size === null) return false;
    if (showFinish && !fin) return false;
    if (!del) return false;
    return true;
  }

  const isFurniture = topic === "furniture";
  const isTestimonial = topic === "testimonial";
  const currentHint = TOPICS.find((t) => t.key === topic)!.hint;

  function valid() {
    return (
      form.name.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
      form.address.trim() &&
      form.message.trim().length >= 10 &&
      (!isFurniture || pieceStepsComplete())
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return setError("That email address doesn't look right.");
    if (!form.address.trim()) return setError("Please add your address.");
    if (form.message.trim().length < 10) return setError("A sentence or two helps a lot.");
    if (isFurniture && !pieceStepsComplete()) return setError("Please complete the steps above.");

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          address: form.address,
          dimensions: isFurniture && selectedPiece && size !== null ? selectedPiece.options[size].dims : form.dimensions,
          message: form.message,
          topic: TOPICS.find((t) => t.key === topic)!.label,
          pieceSlug: isFurniture ? selectedPiece?.slug : undefined,
          pieceName: isFurniture ? selectedPiece?.name : undefined,
          wood: isFurniture ? wood ?? undefined : undefined,
          varnish: isFurniture ? fin === "varnish" : undefined,
          delivery: isFurniture ? del ?? undefined : undefined,
          total: isFurniture ? total : undefined,
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
    setPieceSlug("");
    setWood(null);
    setSize(null);
    setFin(null);
    setDel(null);
    setPhotoCount(0);
    setForm({ name: "", email: "", address: "", dimensions: "", message: "", company: "" });
  }

  if (sent) {
    return (
      <div className="thanks tone tone-forest">
        <h2 className="h">
          Thanks — <em>got it.</em>
        </h2>
        <p>
          {sentName ? `${sentName}, your` : "Your"} {isTestimonial ? "testimonial" : "message"} is in. I&rsquo;ll read it properly and reply within 2 working days.
        </p>
        <button type="button" className="btn btn-ghost" onClick={reset}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <input
        type="text"
        value={form.company}
        onChange={field("company")}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      <div className="field">
        <span className="field-label">What is it about? *</span>
        <div className="topics">
          {TOPICS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`opt${topic === t.key ? " on" : ""}`}
              aria-pressed={topic === t.key}
              onClick={() => setTopic(t.key)}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {isFurniture && (
        <div className="piece-fields">
          <label className="field">
            <span className="field-label">Which piece? *</span>
            <select
              className="input"
              value={pieceSlug}
              onChange={(e) => {
                const p = pieces.find((x) => x.slug === e.target.value);
                setPieceSlug(e.target.value);
                setWood(p?.woodOptions ? p.woodOptions[0].key : null);
                setSize(null);
                setFin(null);
                setDel(null);
                setError("");
              }}
            >
              <option value="">Choose a piece…</option>
              {pieces.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          {selectedPiece && (() => {
            let n = 0;
            const woodN = selectedPiece.woodOptions ? ++n : 0;
            const sizeN = ++n;
            const finN = showFinish ? ++n : 0;
            const delN = ++n;
            return (
            <>
              {selectedPiece.woodOptions && (
                <div className="field">
                  <span className="field-label">{woodN} · Wood *</span>
                  <div className="opts-row">
                    {selectedPiece.woodOptions.map((w) => (
                      <button key={w.key} type="button" className={`opt${wood === w.key ? " on" : ""}`} aria-pressed={wood === w.key} onClick={() => setWood(w.key)}>
                        <span>{w.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="field">
                <span className="field-label">{sizeN} · Size *</span>
                {selectedPiece.options.map((opt, i) => (
                  <button key={i} type="button" className={`opt${size === i ? " on" : ""}`} aria-pressed={size === i} onClick={() => setSize(i)}>
                    <span>{opt.dims}</span>
                    <b>{euro(optionPrice(opt, wood ?? undefined))}</b>
                  </button>
                ))}
              </div>

              {showFinish && (
                <div className="field">
                  <span className="field-label">{finN} · Finish *</span>
                  <button type="button" className={`opt${fin === "raw" ? " on" : ""}`} aria-pressed={fin === "raw"} onClick={() => setFin("raw")}>
                    <span>Unfinished</span>
                    <b>+ {euro(0)}</b>
                  </button>
                  <button type="button" className={`opt${fin === "varnish" ? " on" : ""}`} aria-pressed={fin === "varnish"} onClick={() => setFin("varnish")}>
                    <span>Varnished</span>
                    <b>+ {euro(varnishPrice(selectedPiece.size))}</b>
                  </button>
                </div>
              )}

              <div className="field">
                <span className="field-label">{delN} · Delivery *</span>
                <button type="button" className={`opt${del === "pickup" ? " on" : ""}`} aria-pressed={del === "pickup"} onClick={() => setDel("pickup")}>
                  <span>I&rsquo;ll pick it up</span>
                  <b>+ {euro(0)}</b>
                </button>
                <button type="button" className={`opt${del === "deliver" ? " on" : ""}`} aria-pressed={del === "deliver"} onClick={() => setDel("deliver")}>
                  <span>Deliver in Amsterdam, please</span>
                  <b>+ {euro(DELIVERY_PRICE)}</b>
                </button>
              </div>

              {size !== null && <div style={{ fontSize: 13, color: "var(--forest)", fontWeight: 600 }}>Total: {euro(total)}</div>}
            </>
            );
          })()}
        </div>
      )}

      <div className="fields">
        <label className="field">
          <span className="field-label">Name *</span>
          <input className="input" type="text" value={form.name} onChange={field("name")} placeholder="Your name" />
        </label>
        <label className="field">
          <span className="field-label">Email *</span>
          <input className="input" type="email" value={form.email} onChange={field("email")} placeholder="you@email.com" />
        </label>
        <label className="field">
          <span className="field-label">Address *</span>
          <input className="input" type="text" value={form.address} onChange={field("address")} placeholder="Street, number, city" />
        </label>
        {(topic === "custom" || topic === "small-job") && (
          <label className="field">
            <span className="field-label">Dimensions</span>
            <input className="input" type="text" value={form.dimensions} onChange={field("dimensions")} placeholder="e.g. 160 × 60 × 75 cm" />
          </label>
        )}
        <label className="field">
          <span className="field-label">Message *</span>
          <textarea className="input" rows={5} value={form.message} onChange={field("message")} placeholder={currentHint} />
        </label>
        {!isFurniture && (
          <label className="field">
            <span className="field-label">Photos (optional)</span>
            <span className="drop">
              <strong>{photoCount ? `${photoCount} photo${photoCount === 1 ? "" : "s"} added` : "+ Add photos"}</strong>
              <span>{isTestimonial ? "A photo of the piece in your home — this is the part people trust most." : "A photo helps — of the space, or of a piece you already own."}</span>
            </span>
            <input type="file" accept="image/*" multiple hidden onChange={(e) => setPhotoCount(e.target.files?.length ?? 0)} />
          </label>
        )}
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn btn-send tone tone-eclipse" disabled={sending || !valid()}>
        {sending ? "Sending…" : valid() ? (isTestimonial ? "Send testimonial" : "Send request") : "Fill in all fields marked *"}
      </button>
      <p className="form-note">Your details are used only to answer this request.</p>
    </form>
  );
}
