import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "José Carlos Pomo González - Full Stack Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "linear-gradient(to bottom right, #1e293b, #334155)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          José Carlos Pomo González
        </div>
        <div
          style={{
            fontSize: 48,
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          Full Stack Web Developer
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#cbd5e1",
            marginTop: 40,
            textAlign: "center",
          }}
        >
          PHP • Laravel • React • Angular • Vue.js • Docker
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
