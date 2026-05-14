"use client"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useLocale } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useBottomNavItems } from "./nav-config"

export function BottomNav() {
  const locale = useLocale()
  const pathname = usePathname()

  const tabs = useBottomNavItems()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-9999 md:hidden"
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
              style={{ flex: active ? "3 1 0%" : "1 1 0%", transition: "flex 0.2s ease-out" }}
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
                      transition={{ duration: 0.15, ease: "easeOut" }}
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
