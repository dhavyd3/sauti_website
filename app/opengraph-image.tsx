import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Sauti Health: every voice counts. AI emergency dispatch in 50+ languages, on any phone.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK_PULSE = "M7 34 H22 L25.5 27 L30.5 9 L36.5 55 L41.5 29 L44.5 39 L47.5 34 H57";

/** Link-preview picture for WhatsApp, LinkedIn and similar: logo, slogan and a Sauti Command screenshot. */
export default async function OpengraphImage() {
  const shot = `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public/images/command/voice.jpg"))).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0a0a", color: "#ffffff" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <rect width="64" height="64" rx="14" fill="#c9f44b" />
              <path d={MARK_PULSE} fill="none" stroke="#0a0a0a" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -2 }}>sauti</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 78, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
              Every voice&nbsp;<span style={{ color: "#20b56c" }}>counts.</span>
            </div>
            <div style={{ marginTop: 24, fontSize: 34, lineHeight: 1.3, color: "#9a9aa1" }}>
              AI emergency dispatch in 50+ languages, on any phone.
            </div>
          </div>
          <div style={{ fontSize: 24, color: "#ffffff", fontWeight: 700 }}>sautihealth.com</div>
        </div>
        <div style={{ display: "flex", flex: 1, paddingTop: 56, paddingRight: 56 }}>
          <div style={{ display: "flex", width: "100%", height: 640, overflow: "hidden", background: "#fff", borderRadius: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot} width={412} height={771} alt="" style={{ objectFit: "cover", objectPosition: "top" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
