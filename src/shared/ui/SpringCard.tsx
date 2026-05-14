"use client"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

const spring = { type: "spring", stiffness: 300, damping: 24 } as const

export function SpringCard({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
      whileTap={{ scale: 0.98 }}
      transition={spring}
      className={className}
    >
      {children}
    </motion.div>
  )
}
