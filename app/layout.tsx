import type { Metadata } from "next"
import { Inter, Bricolage_Grotesque, JetBrains_Mono, Kantumruy_Pro } from "next/font/google"
import "./globals.css"
import "flag-icons/css/flag-icons.min.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/shared/ui/ThemeProvider"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-khmer",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://limlengty.dev"),
  title: { default: "Lim Mengty", template: "%s · Lim Mengty" },
  description: "Full Stack Engineer based in Phnom Penh. Building enterprise systems and modern web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://limmengty.dev",
    siteName: "Lim Mengty",
    images: [{ url: "/og?title=Lim+Mengty&subtitle=Full+Stack+Engineer+%C2%B7+Phnom+Penh", width: 1200, height: 630 }],
  },
}

import { getLocale } from "next-intl/server"

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  return (
    <html
      lang={locale}
      className={cn(inter.variable, bricolage.variable, jetbrains.variable, kantumruy.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
