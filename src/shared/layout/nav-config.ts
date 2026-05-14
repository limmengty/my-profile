import { BookOpen, Home, Mail, User, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

type NavKey = "home" | "about" | "blog" | "contact"

const RAW_NAV: { href: string; key: NavKey; icon: LucideIcon }[] = [
  { href: "/", key: "home", icon: Home },
  { href: "/about", key: "about", icon: User },
  { href: "/blog", key: "blog", icon: BookOpen },
  { href: "/contact", key: "contact", icon: Mail },
]

export function useNavItems(): NavItem[] {
  const t = useTranslations("nav")
  return RAW_NAV.map(({ href, key, icon }) => ({ href, label: t(key), icon }))
}

/** Desktop navbar — excludes home (shown via logo link) */
export function useDesktopNavItems(): NavItem[] {
  return useNavItems().filter((i) => i.href !== "/")
}

/** Bottom nav — excludes contact */
export function useBottomNavItems(): NavItem[] {
  return useNavItems().filter((i) => i.href !== "/contact")
}
