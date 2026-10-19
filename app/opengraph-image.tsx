import { ImageResponse } from "next/og";

export const alt = "Ma'akum";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f8f5ee",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#172923",
        }}
      >
        <div style={{ fontSize: 72 }}>{"Ma'akum"}</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#204c40" }}>You are not alone.</div>
      </div>
    ),
    { ...size },
  );
}
