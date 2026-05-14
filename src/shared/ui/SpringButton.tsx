"use client"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

const spring = { type: "spring", stiffness: 400, damping: 20 } as const

export function SpringButton({ children, className, ...props }: ComponentProps<typeof Button>) {
  const reduced = useReducedMotion()

  if (reduced)
    return (
      <Button className={cn("rounded-full", className)} {...props}>
        {children}
      </Button>
    )

  return (
    <motion.div whileTap={{ scale: 0.96 }} transition={spring} className="inline-flex">
      <Button className={cn("rounded-full", className)} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}
