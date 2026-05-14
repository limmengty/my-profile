"use client"
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { useTranslations } from "next-intl"
import { profile } from "@/data/profile"

const stack = ["Next.js", "NestJS", "GraphQL", "Docker"]

export function RotatingCard() {
  const tp = useTranslations("profile")
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 30 })
  const glossX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"])
  const glossY = useTransform(my, [-0.5, 0.5], ["20%", "80%"])

  function track(clientX: number, clientY: number) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((clientX - rect.left) / rect.width - 0.5)
    my.set((clientY - rect.top) / rect.height - 0.5)
  }
  function reset() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div //NOSONAR
      ref={ref}
      onMouseMove={(e) => track(e.clientX, e.clientY)}
      onMouseLeave={reset}
      onTouchMove={(e) => {
        e.preventDefault()
        const t = e.touches[0]
        track(t.clientX, t.clientY)
      }}
      onTouchEnd={reset}
      className="w-52 cursor-pointer select-none"
      style={{ perspective: "900px" }}
    >
      <motion.div
        style={reduced ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full rounded-2xl border bg-card shadow-xl overflow-hidden p-5"
      >
        {/* Gloss */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.28) 0%, transparent 60%)",
              // @ts-expect-error css custom props
              "--gx": glossX,
              "--gy": glossY,
            }}
          />
        )}

        {/* Avatar initials */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="font-heading text-lg font-bold">LM</span>
        </div>

        {/* Name + title */}
        <p className="font-heading text-base font-bold leading-tight">{tp("name")}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{tp("title")}</p>
        <p className="text-xs text-muted-foreground">{profile.location}</p>

        {/* Divider */}
        <div className="my-3 h-px bg-border" />

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {s}
            </span>
          ))}
        </div>

        {/* Available dot */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          <span className="text-[11px] text-muted-foreground">{tp("availability")}</span>
        </div>
      </motion.div>
    </div>
  )
}
