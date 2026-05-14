"use client"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { MobileNav } from "./MobileNav"

export function Navbar() {
  const t = useTranslations("nav")
  const tp = useTranslations("profile")
  const locale = useLocale()
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  const navLinks = [
    { href: "/about", label: t("about") },
    // { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ]

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const activeEl = nav.querySelector<HTMLElement>("[data-active=true]")
    if (!activeEl) {
      setPill(null)
      return
    }
    const navRect = nav.getBoundingClientRect()
    const elRect = activeEl.getBoundingClientRect()
    setPill({ left: elRect.left - navRect.left, width: elRect.width })
  }, [pathname])

  // Strip locale prefix to get bare path for locale switching
  const segments = pathname.split("/")
  const pathWithoutLocale = "/" + segments.slice(2).join("/")

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="relative mx-auto flex h-14 max-w-[1100px] items-center justify-between px-4">
        <Link href={`/${locale}`} className="font-heading text-base font-bold">
          {tp("name")}
        </Link>

        <nav ref={navRef} className="relative hidden items-center gap-1 md:flex">
          <AnimatePresence>
            {pill && (
              <motion.span
                className="absolute top-0 h-full rounded-full bg-primary"
                initial={false}
                animate={{ left: pill.left, width: pill.width }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                style={{ pointerEvents: "none" }}
              />
            )}
          </AnimatePresence>

          {navLinks.map(({ href, label }) => {
            const fullHref = `/${locale}${href}`
            const active = pathname.startsWith(fullHref)
            return (
              <Link
                key={href}
                href={fullHref}
                data-active={active}
                className={cn(
                  "relative z-10 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Locale switcher */}
          {(() => {
            const nextLocale = locale === "km" ? "en" : "km"
            const flagClass = locale === "km" ? "fi fi-kh" : "fi fi-gb"
            const nextPath = `/${nextLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
            return (
              <Link
                href={nextPath}
                title={locale === "km" ? "Switch to English" : "ប្តូរទៅភាសាខ្មែរ"}
                className="flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              >
                <span className={flagClass} style={{ fontSize: 18 }} />
                <span>{locale === "km" ? "KH" : "EN"}</span>
              </Link>
            )
          })()}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
