import { contact } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Contact form endpoint. Sends the message by email through Resend and stores
 * nothing. Needs RESEND_API_KEY and CONTACT_FROM (see .env.example); without
 * them it answers 503 and the form tells the visitor to use email or WhatsApp.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this field. Pretend it worked.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const organisation = clean(body.organisation, 160);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  const topic = contact.topics.find((item) => item.value === body.topic) ?? contact.topics[contact.topics.length - 1];

  if (!name || !EMAIL.test(email) || message.length < 10) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return Response.json({ error: "too_many_requests" }, { status: 429 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || site.email;
  if (!key || !from) return Response.json({ error: "not_configured" }, { status: 503 });

  const text = [
    `Name: ${name}`,
    `Organisation: ${organisation || "(not given)"}`,
    `Email: ${email}`,
    `Topic: ${topic.label}`,
    "",
    message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Website enquiry (${topic.label}) from ${name}`,
      text,
    }),
  });

  if (!response.ok) return Response.json({ error: "send_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
