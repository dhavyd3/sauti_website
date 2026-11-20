import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { contact } from "@/lib/content";
import { LOGO_CID, LOGO_URL, enquiryHtml, enquirySubject, enquiryText, type Enquiry } from "@/lib/email/enquiry";

/**
 * Contact form endpoint (components/ContactForm.tsx posts here). Emails each
 * message to the team through the company's Zoho Mail account and stores
 * nothing. Settings come from environment variables, see .env.example:
 * SMTP_USER and SMTP_PASS are required; without them it answers 503 and the
 * form asks the visitor to email or WhatsApp instead.
 */

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 20_000;
const recent = new Map<string, number[]>();

/** Up to five messages per address per ten minutes (per server instance). */
function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

/** One line of text: trimmed, inner whitespace and line breaks collapsed. */
const line = (value: unknown, max: number) => (typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "");
/** Several lines of text: trimmed, line breaks kept. */
const block = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\r\n?/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim().slice(0, max) : "";

function smtpSettings() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!user || !pass) return null;
  const host = process.env.SMTP_HOST?.trim() || "smtppro.zoho.eu";
  const port = Number(process.env.SMTP_PORT) || 465;
  return {
    transport: {
      host,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: { user, pass },
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 10_000,
    },
    user,
    to: process.env.CONTACT_TO?.trim() || user,
    fromName: process.env.CONTACT_FROM_NAME?.trim() || "Sauti Health website",
    fromAddress: process.env.CONTACT_FROM?.trim() || user,
  };
}

/** The logo goes along as an attachment so it shows even when remote images are blocked. */
let logo: Promise<Buffer | null> | undefined;
function loadLogo() {
  // A fixed path, so the build ships only this file with the function.
  logo ??= readFile(path.join(process.cwd(), "public", "brand", "sauti-logo-full.png")).catch(() => null);
  return logo;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return Response.json({ error: "invalid_request" }, { status: 400 });

  // Honeypot: people never see or fill this field, simple bots do. Pretend it worked.
  if (line(body.website, 200)) return Response.json({ ok: true });

  const topic = contact.topics.find((item) => item.value === body.topic) ?? contact.topics[contact.topics.length - 1];
  const enquiry: Enquiry = {
    name: line(body.name, 120),
    organisation: line(body.organisation, 160),
    email: line(body.email, 200),
    phone: line(body.phone, 40),
    topic: topic.label,
    message: block(body.message, 5000),
    receivedAt: new Date(),
  };

  if (!enquiry.name || !EMAIL.test(enquiry.email) || enquiry.message.length < 10) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (limited(ip)) return Response.json({ error: "too_many_requests" }, { status: 429 });

  const smtp = smtpSettings();
  if (!smtp) {
    console.error("Contact form: SMTP_USER and SMTP_PASS are not set, message not sent.");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const logoFile = await loadLogo();

  try {
    await nodemailer.createTransport(smtp.transport).sendMail({
      from: { name: smtp.fromName, address: smtp.fromAddress },
      to: smtp.to,
      replyTo: { name: enquiry.name, address: enquiry.email },
      subject: enquirySubject(enquiry),
      text: enquiryText(enquiry),
      html: enquiryHtml(enquiry, logoFile ? `cid:${LOGO_CID}` : LOGO_URL),
      attachments: logoFile
        ? [{ filename: "sauti-logo.png", content: logoFile, contentType: "image/png", cid: LOGO_CID, contentDisposition: "inline" }]
        : [],
    });
  } catch (error) {
    // Log what went wrong for the Netlify function log, without the visitor's details.
    const { code, responseCode, response, message } = (error ?? {}) as Record<string, unknown>;
    console.error("Contact form: sending failed", { code, responseCode, response, message });
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
