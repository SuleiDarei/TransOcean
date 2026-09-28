import { ImageResponse } from "next/og";

export const alt = "Alongside in Oman. Logo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#F3F5F2",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flex: 1, alignItems: "flex-end", padding: "48px", fontSize: 92, color: "#0D2136", letterSpacing: -2 }}>
          Alongside
        </div>
        <div style={{ display: "flex", height: "46%", background: "#0D2136", color: "#F3F5F2", padding: "36px 48px", fontSize: 92, letterSpacing: -2 }}>
          in Oman.
        </div>
      </div>
    ),
    size,
  );
}
