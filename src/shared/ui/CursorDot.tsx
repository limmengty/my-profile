"use client"
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function CursorDot() {
  const reduced = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  // Dot — instant
  const dx = useSpring(x, { stiffness: 800, damping: 40 })
  const dy = useSpring(y, { stiffness: 800, damping: 40 })

  // Ring — magnetic lag
  const rx = useSpring(x, { stiffness: 100, damping: 18, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 100, damping: 18, mass: 0.5 })

  useEffect(() => {
    if (reduced) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovered(!!el.closest("a, button, [role=button], input, textarea, select"))
    }

    const down = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 400)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    window.addEventListener("mousedown", down)
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("mouseenter", enter)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
      window.removeEventListener("mousedown", down)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("mouseenter", enter)
    }
  }, [x, y, reduced, visible])

  if (reduced) return null

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Dot */}
          <motion.div
            key="dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
            style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%" }}
          >
            <motion.div
              className="rounded-full bg-foreground"
              animate={{
                width: hovered ? 6 : clicked ? 16 : 8,
                height: hovered ? 6 : clicked ? 16 : 8,
                opacity: hovered ? 0.4 : 1,
              }}
              transition={{ type: "spring", stiffness: 600, damping: 30 }}
            />
          </motion.div>

          {/* Ring */}
          <motion.div
            key="ring"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
            style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
          >
            <motion.div
              className="rounded-full"
              animate={{
                width: hovered ? 44 : clicked ? 20 : 32,
                height: hovered ? 44 : clicked ? 20 : 32,
                borderWidth: hovered ? 2 : 1,
                borderColor: hovered ? "var(--primary)" : "color-mix(in srgb, var(--foreground) 50%, transparent)",
                backgroundColor: hovered ? "color-mix(in srgb, var(--primary) 10%, transparent)" : "transparent",
              }}
              style={{ border: "1px solid" }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            />
          </motion.div>

          {/* Click burst */}
          <AnimatePresence>
            {clicked && (
              <motion.div
                key="burst"
                className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
                style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%" }}
                initial={{ opacity: 0.6, scale: 0.5 }}
                animate={{ opacity: 0, scale: 2.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="h-8 w-8 rounded-full border border-foreground/30" />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
