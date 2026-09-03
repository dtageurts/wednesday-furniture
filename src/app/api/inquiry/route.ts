import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

interface InquiryPayload {
  name: string;
  email: string;
  city: string;
  dimensions?: string;
  message: string;
  pieceSlug?: string;
  pieceName?: string;
  source: "home" | "piece-detail" | "services" | "contact";
  // honeypot — real users never fill this in
  company?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: InquiryPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: if filled in, silently pretend success.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  if (!body.city?.trim()) {
    return NextResponse.json({ error: "Please add your city." }, { status: 400 });
  }
  if (!body.message || body.message.trim().length < 10) {
    return NextResponse.json({ error: "A sentence or two helps a lot." }, { status: 400 });
  }

  const record = {
    name: body.name.trim(),
    email: body.email.trim(),
    city: body.city.trim(),
    dimensions: body.dimensions?.trim() || null,
    message: body.message.trim(),
    pieceSlug: body.pieceSlug ?? null,
    pieceName: body.pieceName ?? null,
    imageUrl: null as string | null,
    source: body.source,
    userAgent: req.headers.get("user-agent") ?? null,
  };

  if (!isFirebaseConfigured()) {
    // Local/dev fallback so the form is testable before Firebase is wired up.
    console.log("[inquiry] Firebase not configured — logging inquiry instead:", record);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const db = getDb();
    await db.collection("inquiries").add({
      ...record,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.error("[inquiry] Failed to write to Firestore", err);
    return NextResponse.json({ error: "Something went wrong on our end. Please try again." }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const to = process.env.INQUIRY_TO_EMAIL || "contact@wednesdayfurniture.com";
      await resend.emails.send({
        from: "Wednesday website <inquiries@wednesdayfurniture.com>",
        to,
        replyTo: record.email,
        subject: `New inquiry — ${record.pieceName ?? record.source}`,
        text: [
          `Name: ${record.name}`,
          `Email: ${record.email}`,
          `City: ${record.city}`,
          record.dimensions ? `Dimensions: ${record.dimensions}` : null,
          record.pieceName ? `Piece: ${record.pieceName}` : null,
          `Source: ${record.source}`,
          "",
          record.message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (err) {
      // Don't fail the request if the notification email fails — the inquiry is already saved.
      console.error("[inquiry] Failed to send notification email", err);
    }
  }

  return NextResponse.json({ ok: true, stored: true });
}
