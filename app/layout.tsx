import type { Metadata } from "next"
import localFont from "next/font/local"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import "flag-icons/css/flag-icons.min.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/shared/ui/ThemeProvider"
import { Analytics } from "@vercel/analytics/react"

const googleSans = localFont({
  src: [
    {
      path: "../public/Google_Sans/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../public/Google_Sans/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-sans",
})
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://limmengty.com"),
  title: { default: "Lim Mengty", template: "%s · Lim Mengty" },
  description: "Full Stack Engineer based in Phnom Penh. Building enterprise systems and modern web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://limmengty.com",
    siteName: "Lim Mengty",
    images: [{ url: "/og?title=Lim+Mengty&subtitle=Full+Stack+Engineer+%C2%B7+Phnom+Penh", width: 1200, height: 630 }],
  },
}

import { getLocale } from "next-intl/server"

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  return (
    <html lang={locale} className={cn(googleSans.variable, jetbrains.variable)} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
