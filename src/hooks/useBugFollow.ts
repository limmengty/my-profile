"use client"
import { useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

export function useBugFollow(stiffness: number, damping: number, offsetX = 0, offsetY = 0) {
  const rawX = useMotionValue(offsetX)
  const rawY = useMotionValue(offsetY)
  const x = useSpring(rawX, { stiffness, damping })
  const y = useSpring(rawY, { stiffness, damping })

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      rawX.set(e.clientX + offsetX)
      rawY.set(e.clientY + offsetY)
    }
    const onTouch = (e: TouchEvent) => {
      rawX.set(e.touches[0].clientX + offsetX)
      rawY.set(e.touches[0].clientY + offsetY)
    }
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("touchmove", onTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
    }
  }, [rawX, rawY, offsetX, offsetY])

  return { x, y }
}
