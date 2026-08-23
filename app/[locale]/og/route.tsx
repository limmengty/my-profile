import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get("title") ?? "Lim Mengty"
  const subtitle = searchParams.get("subtitle") ?? "Full Stack Engineer · Phnom Penh"

  return new ImageResponse(
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <p style={{ fontSize: 24, color: "#71717a", margin: 0 }}>{subtitle}</p>
      <h1 style={{ fontSize: 64, fontWeight: 800, color: "#09090b", margin: "16px 0 0", lineHeight: 1.1 }}>{title}</h1>
    </div>,
    { width: 1200, height: 630 }
  )
}
