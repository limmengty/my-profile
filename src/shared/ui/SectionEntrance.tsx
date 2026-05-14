"use client"
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

export function SectionEntrance({
  children,
  delay = 0,
  className,
}: Readonly<{
  children: ReactNode
  delay?: number
  className?: string
}>) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 180, damping: 26, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
