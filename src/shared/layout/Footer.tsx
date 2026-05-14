"use client"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { useDesktopNavItems } from "./nav-config"

export function Footer({ className }: Readonly<{ className?: string }>) {
  const tf = useTranslations("footer")
  const tp = useTranslations("profile")
  const locale = useLocale()
  const navLinks = useDesktopNavItems()

  return (
    <footer className={cn("mt-auto border-t", className)}>
      <div className="mx-auto max-w-[1100px] px-4 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href={`/${locale}`} className="font-heading text-base font-bold">
              {tp("name")}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{tp("title")}</p>
            <p className="text-sm text-muted-foreground">{tp("location")}</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={`/${locale}${href}`} className="transition-colors hover:text-foreground">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {tp("name")}. {tf("rights")}
        </div>
      </div>
    </footer>
  )
}
