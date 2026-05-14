"use client"
import { useBugBehavior } from "@/src/hooks/useBugBehavior"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { Sluggo } from "./bugs/Sluggo"
import { Zippy } from "./bugs/Zippy"

const SLUGGO_MSGS = [
  "Bug caught. Commit message: 'fix: removed bug'.",
  "✓ Squashed. No regression testing needed. Probably.",
  "That one lived in production for 3 months. Good catch.",
  "You caught the slow one. In real life it's called debugging.",
]
const ZIPPY_MSGS = [
  "You got Zippy?! That's statistically improbable.",
  "Caught. Stack trace: luck → your cursor → Zippy → null.",
  "The fast bug is caught. Ship it. No tests needed.",
  "Impossible. Are you using DevTools to cheat?",
]

function CatchToast({ message, side }: Readonly<{ message: string; side: "left" | "right" }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`fixed bottom-28 max-w-[240px] rounded-2xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm md:bottom-20 ${side === "left" ? "left-6" : "right-6"}`}
      style={{ zIndex: 99999 }}
    >
      <p className="text-sm font-medium leading-snug">{message}</p>
    </motion.div>
  )
}

export function BugCatchGame() {
  const reduced = useReducedMotion()

  // Sluggo — slow flee, catchable
  const sluggo = useBugBehavior({
    fleeRadius: 120,
    fleeDistance: 150,
    stiffness: 30,
    damping: 14,
    initialX: 300,
    initialY: 250,
  })

  // Zippy — fast flee, hard to catch
  const zippy = useBugBehavior({
    fleeRadius: 180,
    fleeDistance: 280,
    stiffness: 140,
    damping: 10,
    initialX: 650,
    initialY: 400,
  })

  const [sluggoCaught, setSluggoCaught] = useState(false)
  const [zippyCaught, setZippyCaught] = useState(false)
  const [sluggoMsg, setSluggoMsg] = useState("")
  const [zippyMsg, setZippyMsg] = useState("")
  const [sluggoN, setSluggoN] = useState(0)
  const [zippyN, setZippyN] = useState(0)

  const catchSluggo = () => {
    setSluggoMsg(SLUGGO_MSGS[sluggoN % SLUGGO_MSGS.length])
    setSluggoN((n) => n + 1)
    setSluggoCaught(true)
    setTimeout(() => setSluggoCaught(false), 3000)
  }
  const catchZippy = () => {
    setZippyMsg(ZIPPY_MSGS[zippyN % ZIPPY_MSGS.length])
    setZippyN((n) => n + 1)
    setZippyCaught(true)
    setTimeout(() => setZippyCaught(false), 3000)
  }

  if (reduced) {
    return (
      <div className="pointer-events-none fixed inset-0" style={{ zIndex: 99999 }}>
        <button
          onClick={catchSluggo}
          aria-label="Catch the slow bug"
          className="pointer-events-auto fixed top-1/3 left-1/4 h-4 w-4 rounded-full border border-border bg-foreground/20"
        />
        <button
          onClick={catchZippy}
          aria-label="Catch the fast bug"
          className="pointer-events-auto fixed bottom-1/3 right-1/4 h-3 w-3 rounded-full border border-border bg-foreground/30"
        />
      </div>
    )
  }

  const bugBase = { position: "fixed" as const, top: 0, left: 0, translateX: "-50%", translateY: "-50%", zIndex: 99999 }

  return (
    <>
      <AnimatePresence>
        {!sluggoCaught && (
          <motion.button
            key="sluggo"
            className="cursor-pointer focus:outline-none"
            style={{ ...bugBase, x: sluggo.x, y: sluggo.y }}
            whileTap={{ scale: 0.1 }}
            onClick={catchSluggo}
            onTouchStart={(e) => {
              e.preventDefault()
              catchSluggo()
            }}
            aria-label="Catch the slow bug"
          >
            <div
              className={`flex items-center justify-center rounded-full transition-all duration-200 ${sluggo.near ? "bg-foreground/8 p-3" : "p-1"}`}
            >
              <Sluggo fleeing={sluggo.fleeing} caught={sluggoCaught} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!zippyCaught && (
          <motion.button
            key="zippy"
            className="cursor-pointer focus:outline-none"
            style={{ ...bugBase, x: zippy.x, y: zippy.y }}
            whileTap={{ scale: 0.1 }}
            onClick={catchZippy}
            onTouchStart={(e) => {
              e.preventDefault()
              catchZippy()
            }}
            aria-label="Catch the fast bug"
          >
            <div
              className={`flex items-center justify-center rounded-full transition-all duration-200 ${zippy.near ? "bg-foreground/8 p-3" : "p-1"}`}
            >
              <Zippy fleeing={zippy.fleeing} caught={zippyCaught} />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sluggoCaught && <CatchToast key="sluggo-msg" message={sluggoMsg} side="left" />}
        {zippyCaught && <CatchToast key="zippy-msg" message={zippyMsg} side="right" />}
      </AnimatePresence>
    </>
  )
}
