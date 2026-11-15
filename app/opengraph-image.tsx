import { ImageResponse } from "next/og";

export const alt = "Sauti Health: every call counts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link-preview picture for WhatsApp, LinkedIn and similar: the mark, the name and the line. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#100d10",
          color: "#f7f4e8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#c9f44b" />
            <path
              d="M7 34 H22 L25.5 27 L30.5 9 L36.5 55 L41.5 29 L44.5 39 L47.5 34 H57"
              fill="none"
              stroke="#100d10"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -3 }}>sauti</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 1, letterSpacing: -4, textTransform: "uppercase" }}>Every call counts</div>
          <div style={{ marginTop: 28, fontSize: 36, color: "#c9f44b" }}>Emergency help from any phone. Piloting in Kampala, Uganda.</div>
        </div>
      </div>
    ),
    size,
  );
}
