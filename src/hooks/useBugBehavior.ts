"use client"
import { useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const MARGIN = 60
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

export function useBugBehavior(config: {
  fleeRadius: number
  fleeDistance: number
  stiffness: number
  damping: number
  initialX: number
  initialY: number
}) {
  // Track the TARGET position (where bug is heading), not the animated position
  const targetRef = useRef({ x: config.initialX, y: config.initialY })
  const rawX = useMotionValue(config.initialX)
  const rawY = useMotionValue(config.initialY)
  const x = useSpring(rawX, { stiffness: config.stiffness, damping: config.damping })
  const y = useSpring(rawY, { stiffness: config.stiffness, damping: config.damping })

  const cursor = useRef({ x: -9999, y: -9999 })
  const [near, setNear] = useState(false)
  const [fleeing, setFleeing] = useState(false)

  // Cursor tracking
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY }
    }
    const onTouch = (e: TouchEvent) => {
      cursor.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("touchmove", onTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
    }
  }, [])

  // Main tick — check cursor vs TARGET position
  useEffect(() => {
    const id = setInterval(() => {
      const t = targetRef.current
      const c = cursor.current
      const d = Math.hypot(t.x - c.x, t.y - c.y)

      setNear(d < config.fleeRadius * 1.5)

      if (d < config.fleeRadius) {
        setFleeing(true)
        const dx = t.x - c.x
        const dy = t.y - c.y
        const len = Math.sqrt(dx * dx + dy * dy) || 1
        const angle = (Math.random() - 0.5) * 0.4
        const rx = (dx / len) * Math.cos(angle) - (dy / len) * Math.sin(angle)
        const ry = (dx / len) * Math.sin(angle) + (dy / len) * Math.cos(angle)
        const nx = clamp(t.x + rx * config.fleeDistance, MARGIN, window.innerWidth - MARGIN)
        const ny = clamp(t.y + ry * config.fleeDistance, MARGIN, window.innerHeight - MARGIN)
        targetRef.current = { x: nx, y: ny }
        rawX.set(nx)
        rawY.set(ny)
      } else {
        setFleeing(false)
      }
    }, 80)
    return () => clearInterval(id)
  }, [rawX, rawY, config.fleeRadius, config.fleeDistance])

  // Slow idle wander — small nudge every 3s when not fleeing
  useEffect(() => {
    const id = setInterval(() => {
      const t = targetRef.current
      const c = cursor.current
      const d = Math.hypot(t.x - c.x, t.y - c.y)
      if (d >= config.fleeRadius) {
        const nx = clamp(t.x + (Math.random() - 0.5) * 60, MARGIN, window.innerWidth - MARGIN)
        const ny = clamp(t.y + (Math.random() - 0.5) * 60, MARGIN, window.innerHeight - MARGIN)
        targetRef.current = { x: nx, y: ny }
        rawX.set(nx)
        rawY.set(ny)
      }
    }, 3000)
    return () => clearInterval(id)
  }, [rawX, rawY, config.fleeRadius])

  return { x, y, near, fleeing }
}
