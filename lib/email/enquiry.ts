import { site } from "@/lib/site";

/**
 * The email the team receives for each message sent through the contact form
 * on /contact. Built as old-fashioned table HTML with inline styles, because
 * that is what renders the same in Zoho Mail, Gmail, Outlook and Apple Mail.
 * A plain-text version goes along for mail apps that prefer it.
 */

export type Enquiry = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  receivedAt: Date;
};

/**
 * Content-ID of the logo attached to the email (public/brand/sauti-logo-full.png,
 * read in app/api/contact/route.ts); the HTML shows it as cid:…
 */
export const LOGO_CID = "logo@sautihealth.com";
/** Used when the attached logo is not available. */
export const LOGO_URL = `${site.url}/brand/sauti-logo-full.png`;

const colour = {
  ink: "#0a0a0a",
  text: "#161618",
  soft: "#55595e",
  line: "#e4e4e0",
  paper: "#f5f5f3",
  white: "#ffffff",
  green: "#059153",
  greenDark: "#046b3d",
  greenTint: "#e7f5ed",
};

const fonts = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Inline style from an object, e.g. { fontSize: "15px" } → "font-size:15px". */
const css = (rules: Record<string, string | number>) =>
  Object.entries(rules)
    .map(([key, value]) => `${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${value}`)
    .join(";");

const text = (size: number, extra: Record<string, string | number> = {}) =>
  css({ fontFamily: fonts, fontSize: `${size}px`, lineHeight: 1.6, color: colour.text, ...extra });

/** "20 November 2026 at 20:12" in Kampala time. */
function kampalaTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Kampala",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * wa.me link for a number written with its country code (+256…, 00256…).
 * A local number such as 0772… could belong to any country, so it gets none.
 */
function whatsappLink(phone: string) {
  const compact = phone.replace(/[\s().-]/g, "");
  const match = compact.match(/^(?:\+|00)(\d{8,15})$/);
  return match ? `https://wa.me/${match[1]}` : "";
}

const firstName = (name: string) => name.split(" ")[0] || name;

export function enquirySubject(enquiry: Enquiry) {
  const who = enquiry.organisation ? `${enquiry.name}, ${enquiry.organisation}` : enquiry.name;
  return `Website enquiry · ${enquiry.topic} · ${who}`;
}

/** A pill-shaped button that also works in Outlook. */
function button(href: string, label: string, variant: "dark" | "green") {
  const background = variant === "dark" ? colour.ink : colour.green;
  return `<td style="${css({ borderRadius: "999px", background, paddingRight: 0 })}" bgcolor="${background}">
      <a href="${escape(href)}" target="_blank" style="${css({
        display: "inline-block",
        padding: "13px 24px",
        fontFamily: fonts,
        fontSize: "15px",
        fontWeight: 600,
        lineHeight: 1.2,
        color: colour.white,
        textDecoration: "none",
        borderRadius: "999px",
      })}">${escape(label)}</a>
    </td>`;
}

function detailRow(label: string, valueHtml: string, first = false) {
  const border = first ? "" : `border-top:1px solid ${colour.line};`;
  return `<tr>
      <td class="detail-label" width="150" valign="top" style="${border}${text(13, { color: colour.soft, padding: "14px 0 14px 20px", width: "150px" })}">${escape(label)}</td>
      <td class="detail-value" valign="top" style="${border}${text(15, { color: colour.ink, padding: "14px 20px 14px 12px", wordBreak: "break-word" })}">${valueHtml}</td>
    </tr>`;
}

const link = (href: string, label: string) =>
  `<a href="${escape(href)}" style="${css({ color: colour.greenDark, textDecoration: "underline" })}">${escape(label)}</a>`;

export function enquiryHtml(enquiry: Enquiry, logoSrc: string) {
  const { name, organisation, email, phone, topic, message } = enquiry;
  const subject = enquirySubject(enquiry);
  const received = kampalaTime(enquiry.receivedAt);
  const whatsapp = phone ? whatsappLink(phone) : "";
  const replyHref = `mailto:${email}?subject=${encodeURIComponent("Re: Your message to Sauti Health")}`;
  const preheader = message.replace(/\s+/g, " ").slice(0, 120);
  const messageHtml = escape(message).replace(/\r?\n/g, "<br>");

  const rows = [
    detailRow("Name", escape(name), true),
    organisation ? detailRow("Organisation", escape(organisation)) : "",
    detailRow("Email", link(`mailto:${email}`, email)),
    phone
      ? detailRow(
          "Phone",
          `${link(`tel:${phone.replace(/[^\d+]/g, "")}`, phone)}${whatsapp ? ` &nbsp;·&nbsp; ${link(whatsapp, "WhatsApp")}` : ""}`,
        )
      : "",
    detailRow("Topic", escape(topic)),
    detailRow("Received", `${escape(received)} <span style="color:${colour.soft}">(Kampala time)</span>`),
  ].join("");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${escape(subject)}</title>
<style>
  body { margin: 0; padding: 0; }
  @media (max-width: 620px) {
    .card { width: 100% !important; }
    .pad { padding-left: 24px !important; padding-right: 24px !important; }
    .detail-label, .detail-value { display: block !important; width: auto !important; }
    .detail-label { padding: 14px 16px 0 16px !important; }
    .detail-value { padding: 2px 16px 14px 16px !important; border-top: 0 !important; }
    .button-gap { display: block !important; height: 10px !important; width: auto !important; }
    h1 { font-size: 23px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${colour.paper};" bgcolor="${colour.paper}">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;">${escape(preheader)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${colour.paper}" style="background:${colour.paper};">
  <tr>
    <td align="center" style="padding:32px 12px;">

      <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${colour.white}" style="width:600px;max-width:600px;background:${colour.white};border:1px solid ${colour.line};border-radius:20px;border-collapse:separate;overflow:hidden;">
        <tr>
          <td class="pad" style="padding:28px 40px 24px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="middle">
                  <a href="${site.url}" target="_blank" style="text-decoration:none;">
                    <img src="${escape(logoSrc)}" width="172" height="60" alt="Sauti Health" style="display:block;width:172px;height:auto;border:0;outline:none;text-decoration:none;">
                  </a>
                </td>
                <td valign="middle" align="right" style="${text(12, { color: colour.soft, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" })}">Website enquiry</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid ${colour.line};font-size:0;line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td class="pad" style="padding:28px 40px 4px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="${colour.greenTint}" style="${text(13, { background: colour.greenTint, color: colour.greenDark, fontWeight: 600, lineHeight: 1, padding: "7px 13px", borderRadius: "999px" })}">${escape(topic)}</td>
              </tr>
            </table>
            <h1 style="margin:16px 0 8px 0;${text(26, { color: colour.ink, fontWeight: 700, lineHeight: 1.25 })}">New message from ${escape(name)}</h1>
            <p style="margin:0;${text(15, { color: colour.soft })}">Sent through the contact form on ${link(`${site.url}/contact`, "sautihealth.com")}.</p>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:24px 40px 0 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${colour.line};border-radius:14px;border-collapse:separate;">
              ${rows}
            </table>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:28px 40px 0 40px;">
            <p style="margin:0 0 10px 0;${text(12, { color: colour.soft, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" })}">Message</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="${colour.paper}" style="${text(16, { background: colour.paper, border: `1px solid ${colour.line}`, borderRadius: "12px", padding: "20px 22px", lineHeight: 1.65, wordBreak: "break-word" })}">${messageHtml}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:28px 40px 36px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${button(replyHref, `Reply to ${firstName(name)}`, "dark")}
                ${whatsapp ? `<td class="button-gap" width="10" style="width:10px;font-size:0;line-height:0;">&nbsp;</td>${button(whatsapp, "Message on WhatsApp", "green")}` : ""}
              </tr>
            </table>
            <p style="margin:16px 0 0 0;${text(14, { color: colour.soft })}">Pressing Reply in your mail app also answers ${escape(firstName(name))} directly at ${link(`mailto:${email}`, email)}.</p>
          </td>
        </tr>
      </table>

      <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
        <tr>
          <td class="pad" align="center" style="padding:24px 40px 8px 40px;${text(12, { color: colour.soft, lineHeight: 1.7, textAlign: "center" })}">
            <strong style="color:${colour.ink};">${escape(site.name)}</strong> &nbsp;·&nbsp; ${escape(site.slogan)}<br>
            ${escape(site.legalName)} &nbsp;·&nbsp; ${site.address.map(escape).join(", ")}<br>
            ${link(site.url, "sautihealth.com")}
          </td>
        </tr>
        <tr>
          <td class="pad" align="center" style="padding:8px 40px 0 40px;${text(11, { color: colour.soft, lineHeight: 1.6, textAlign: "center" })}">
            Sent automatically by the website because someone used the contact form. It contains personal details: handle it under the Sauti Health privacy notice.
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
</body>
</html>`;
}

export function enquiryText(enquiry: Enquiry) {
  const { name, organisation, email, phone, topic, message } = enquiry;
  return [
    `New website enquiry: ${topic}`,
    "",
    `Name:          ${name}`,
    organisation ? `Organisation:  ${organisation}` : null,
    `Email:         ${email}`,
    phone ? `Phone:         ${phone}` : null,
    `Topic:         ${topic}`,
    `Received:      ${kampalaTime(enquiry.receivedAt)} (Kampala time)`,
    "",
    "Message:",
    message,
    "",
    `Press Reply to answer ${firstName(name)} directly.`,
    "",
    "--",
    `${site.name} · ${site.url}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
