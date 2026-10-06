const MAX_FILES = 4;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function field(form, name, maxLength = 5000) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function safeSubject(value) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function safeFilename(value, index) {
  const cleaned = String(value || "photo")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
  return cleaned || `photo-${index + 1}`;
}

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405);
    }

    let form;
    try {
      form = await request.formData();
    } catch {
      return json({ error: "The form could not be read. Please try again." }, 400);
    }

    // Honeypot: bots often fill hidden inputs. Pretend it worked without sending.
    if (field(form, "company", 200)) return json({ ok: true });

    const name = field(form, "name", 200);
    const email = field(form, "email", 320).toLowerCase();
    const address = field(form, "address", 500);
    const dimensions = field(form, "dimensions", 300);
    const message = field(form, "message", 10000);
    const topic = field(form, "topic", 200) || "Website request";
    const summary = field(form, "summary", 5000);

    if (!name) return json({ error: "Please add your name." }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "That email address doesn't look right." }, 400);
    if (!address) return json({ error: "Please add your address." }, 400);
    if (!message) return json({ error: "Please add a message." }, 400);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is missing.");
      return json({ error: "Email is temporarily unavailable. Please try again later." }, 503);
    }

    const files = form.getAll("photos").filter((file) => file && typeof file !== "string" && file.size > 0);
    const totalBytes = files.reduce((total, file) => total + file.size, 0);
    if (files.length > MAX_FILES || files.some((file) => file.size > MAX_FILE_BYTES || !file.type.startsWith("image/")) || totalBytes > MAX_TOTAL_BYTES) {
      return json({ error: "Please add up to 4 images and keep the total below 4 MB." }, 400);
    }

    const attachments = await Promise.all(files.map(async (file, index) => ({
      filename: safeFilename(file.name, index),
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      content_type: file.type || "application/octet-stream",
    })));

    const recipients = (process.env.INQUIRY_TO_EMAIL || "contact@wednesdayfurniture.com")
      .split(/[;,]/)
      .map((value) => value.trim())
      .filter(Boolean);
    const from = process.env.RESEND_FROM_EMAIL || "Wednesday website <onboarding@resend.dev>";
    const subject = safeSubject(field(form, "_subject", 200) || `Wednesday — ${topic}`);
    const text = [
      summary,
      `Name: ${name}`,
      `Email: ${email}`,
      `Address: ${address}`,
      dimensions ? `Dimensions: ${dimensions}` : "",
      "",
      message,
    ].filter((line, index, lines) => line || lines[index - 1] !== "").join("\n");

    const payload = {
      from,
      to: recipients,
      reply_to: email,
      subject,
      text,
    };
    if (attachments.length) payload.attachments = attachments;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("[contact] Resend rejected the email:", response.status, result);
        return json({ error: "The email could not be sent. Please try again or email contact@wednesdayfurniture.com." }, 502);
      }
      return json({ ok: true, id: result.id });
    } catch (error) {
      console.error("[contact] Failed to reach Resend:", error);
      return json({ error: "The email service could not be reached. Please try again." }, 502);
    }
  },
};
