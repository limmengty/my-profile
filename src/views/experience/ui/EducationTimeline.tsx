"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"
import { education } from "@/data/experience"

export function EducationTimeline() {
  const reduced = useReducedMotion()
  const t = useTranslations("education")

  return (
    <div className="relative ml-4">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
      <div className="flex flex-col">
        {education.map((item, i) => (
          <motion.div
            key={item.key}
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
            className="relative flex gap-6 pb-8"
          >
            {/* Node */}
            <div className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
              <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
            </div>

            {/* Content */}
            <div className="flex flex-1 items-start justify-between gap-4 pt-0.5">
              <div>
                <p className="font-semibold leading-snug text-foreground">{t(`${item.key}.degree`)}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{t(`${item.key}.institution`)}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{item.period}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
