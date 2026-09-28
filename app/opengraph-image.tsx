import { ImageResponse } from "next/og";

export const alt = "Alongside in Oman. Trans Ocean Maritime Services";
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
          background: "#F6F4EF",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flex: 1, alignItems: "flex-end", padding: "48px", fontSize: 92, color: "#10161C", letterSpacing: -2 }}>
          Alongside
        </div>
        <div style={{ display: "flex", height: "46%", background: "#0B2942", color: "#F6F4EF", padding: "36px 48px", fontSize: 92, letterSpacing: -2 }}>
          in Oman.
        </div>
      </div>
    ),
    size,
  );
}
