import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Navbar } from "@/shared/layout/Navbar"
import { Footer } from "@/shared/layout/Footer"
import { BottomNav } from "@/shared/layout/BottomNav"
import { CursorDot } from "@/shared/ui/CursorDot"
import { ThemeToggle } from "@/shared/ui/ThemeToggle"
import { TurnstileGate } from "@/shared/ui/TurnstileGate"
import routing from "@/i18n/routing"

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

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
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
    </NextIntlClientProvider>
  )
}
