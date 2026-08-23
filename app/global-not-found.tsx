import "./globals.css"
import Link from "next/link"

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <body style={{ background: "#09090b", color: "#fafafa", fontFamily: "system-ui, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", textAlign: "center" }}>
        <p style={{ fontSize: "60px", fontWeight: 700, opacity: 0.3, margin: 0 }}>404</p>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Page not found</h1>
        <Link href="/" style={{ color: "#a1a1aa", textDecoration: "underline" }}>
          Go home
        </Link>
      </body>
    </html>
  )
}
