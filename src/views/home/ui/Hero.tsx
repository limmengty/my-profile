"use client"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, Clock, Layers, FolderOpen } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Separator } from "@/components/ui/separator"
import { SpringButton } from "@/shared/ui/SpringButton"
import { SocialLinks } from "@/shared/ui/SocialLinks"
import { profile } from "@/data/profile"

const BugCatchGame = dynamic(() => import("./BugCatchGame").then((m) => m.BugCatchGame), { ssr: false })
const statIcons = [Clock, Layers, FolderOpen]
const statLabelKeys = ["yrs_exp", "stacks", "projects"] as const

function Counter({ target, suffix = "" }: Readonly<{ target: number; suffix?: string }>) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) {
      setCount(target)
      return
    }
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      observer.disconnect()
      let n = 0
      const step = () => {
        n += 1
        setCount(n)
        if (n < target) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, reduced])
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 200, damping: 24, delay },
})

export default function HomeView() {
  const t = useTranslations("hero")
  const locale = useLocale()
  const reduced = useReducedMotion()
  const [roleIdx, setRoleIdx] = useState(0)
  const { scrollY } = useScroll()
  const scrollOpacity = useTransform(scrollY, [0, 120], [1, 0])
  const roles = [t("roles.0"), t("roles.1"), t("roles.2")]

  useEffect(() => {
    const timer = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 3000)
    return () => clearInterval(timer)
  }, [roles.length])

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/4 blur-[100px]" />
      </div>
      <BugCatchGame />
      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-[1100px] flex-col justify-center px-4 py-16">
        <div className="max-w-2xl">
          <motion.h1
            {...(reduced ? {} : fadeUp(0.12))}
            className="font-heading text-[40px] font-extrabold leading-tight tracking-tight md:text-[64px]"
          >
            <span className="relative inline-block overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <span className="text-muted-foreground">{t("location")}</span>
          </motion.h1>

          <motion.p {...(reduced ? {} : fadeUp(0.2))} className="mt-4 text-base text-muted-foreground md:text-lg">
            {t("description")}
            <br className="hidden sm:block" />
            {t("stack")}
          </motion.p>

          <motion.div {...(reduced ? {} : fadeUp(0.26))} className="mt-7 flex flex-wrap gap-3">
            <SpringButton asChild size="lg" className="h-12 px-7 text-base">
              <Link href={`/${locale}/projects`}>{t("cta_work")}</Link>
            </SpringButton>
            <SpringButton asChild variant="outline" size="lg" className="h-12 px-7 text-base">
              <Link href={`/${locale}/blog`}>{t("cta_blog")}</Link>
            </SpringButton>
          </motion.div>

          <Separator className="my-7" />

          <motion.div {...(reduced ? {} : fadeUp(0.32))} className="flex flex-wrap gap-6 text-sm">
            {profile.stats.map(({ value }, i) => {
              const Icon = statIcons[i]
              const num = Number.parseInt(value)
              const suffix = value.replace(String(num), "")
              return (
                <div key={statLabelKeys[i]} className="flex items-center gap-1.5 text-muted-foreground">
                  <Icon size={13} className="shrink-0 opacity-60" />
                  <strong className="text-foreground">
                    <Counter target={num} suffix={suffix} />
                  </strong>
                  <span>{t(`stats.${statLabelKeys[i]}`)}</span>
                </div>
              )
            })}
          </motion.div>

          <motion.div {...(reduced ? {} : fadeUp(0.38))} className="mt-5">
            <SocialLinks links={profile.social} />
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ opacity: scrollOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground/40"
        >
          <span className="text-[10px] tracking-widest uppercase">{t("scroll")}</span>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
