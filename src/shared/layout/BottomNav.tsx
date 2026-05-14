"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Home, User, Briefcase, FolderOpen, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()

  const tabs = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/about", label: t("about"), icon: User },
    { href: "/experience", label: t("experience"), icon: Briefcase },
    { href: "/projects", label: t("projects"), icon: FolderOpen },
    { href: "/blog", label: t("blog"), icon: BookOpen },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className="mx-4 mb-4 flex h-16 items-center rounded-full px-1.5 gap-1"
        style={{
          background: "color-mix(in srgb, var(--background) 75%, transparent)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          border: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {tabs.map(({ href, label, icon: Icon }) => {
          const fullHref = `/${locale}${href === "/" ? "" : href}`
          const active = href === "/" ? pathname === `/${locale}` : pathname.startsWith(`/${locale}${href}`)
          return (
            <div
              key={href}
              className="relative min-w-0"
              style={{ flex: active ? "3 1 0%" : "1 1 0%", transition: "flex 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
              <Link
                href={fullHref}
                className="flex h-11 w-full items-center justify-center gap-1.5 overflow-hidden rounded-full"
                style={active ? { background: "var(--primary)" } : undefined}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2.2 : 1.7}
                  className={cn(
                    "shrink-0 transition-colors duration-200",
                    active ? "text-primary-foreground" : "text-muted-foreground"
                  )}
                />
                <AnimatePresence>
                  {active && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden whitespace-nowrap text-[13px] font-semibold text-primary-foreground"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
