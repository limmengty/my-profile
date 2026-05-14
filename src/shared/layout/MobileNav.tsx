"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { profile } from "@/data/profile"
import { SocialLinks } from "@/shared/ui/SocialLinks"

export function MobileNav() {
  const t = useTranslations("nav")
  const tp = useTranslations("profile")
  const locale = useLocale()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "/about", label: t("about") },
    // { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden" aria-label="Open menu">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-8 pt-12">
        <p className="font-heading font-bold text-lg">{tp("name")}</p>
        <nav className="flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={`/${locale}${href}`}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <SocialLinks links={profile.social} />
      </SheetContent>
    </Sheet>
  )
}
