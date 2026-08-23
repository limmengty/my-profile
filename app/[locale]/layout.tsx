import type { Metadata } from "next"
import localFont from "next/font/local"
import { JetBrains_Mono } from "next/font/google"
import "../globals.css"
import "flag-icons/css/flag-icons.min.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/shared/ui/ThemeProvider"
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Navbar } from "@/shared/layout/Navbar"
import { Footer } from "@/shared/layout/Footer"
import { BottomNav } from "@/shared/layout/BottomNav"
import { CursorDot } from "@/shared/ui/CursorDot"
import { ThemeToggle } from "@/shared/ui/ThemeToggle"
import { TurnstileGate } from "@/shared/ui/TurnstileGate"
import routing from "@/i18n/routing"

const googleSans = localFont({
  src: [
    {
      path: "../../public/Google_Sans/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/Google_Sans/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-sans",
})
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://limmengty.com"),
  title: { default: "Lim Mengty", template: "%s · Lim Mengty" },
  description:
    "Full Stack Engineer based in Phnom Penh. Building enterprise systems and modern web applications.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://limmengty.com",
    siteName: "Lim Mengty",
    images: [{ url: "/og?title=Lim+Mengty&subtitle=Full+Stack+Engineer+%C2%B7+Phnom+Penh", width: 1200, height: 630 }],
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} className={cn(googleSans.variable, jetbrains.variable)} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <TurnstileGate>
              <TooltipProvider>
                <CursorDot />
                <Navbar />
                <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2">
                  <ThemeToggle />
                </div>
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <Footer className="hidden md:block" />
                <BottomNav />
              </TooltipProvider>
            </TurnstileGate>
          </ThemeProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
