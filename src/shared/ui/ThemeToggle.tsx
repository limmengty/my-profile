"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      suppressHydrationWarning
      className={`flex cursor-pointer h-14 w-12 items-center justify-center overflow-hidden rounded-r-full border-y border-r transition-[width] duration-300 hover:w-16 text-primary ${
        isDark ? "border-muted shadow-md" : "border-primary/20"
      }`}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
