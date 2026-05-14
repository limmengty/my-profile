"use client"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { workExperience } from "@/data/experience"

export function StepTimeline() {
  const reduced = useReducedMotion()
  const t = useTranslations("experience")
  const tw = useTranslations("work")

  return (
    <div className="relative ml-4">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
      <div className="flex flex-col">
        {workExperience.map((item, i) => {
          const badgeLabel =
            item.badge === "current" ? t("current") : item.badge === "completed" ? t("completed") : null
          const bullets = Array.from({ length: item.bulletCount }, (_, j) => tw(`${item.key}.bullets.${j}`))

          return (
            <motion.div
              key={item.key}
              initial={reduced ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
              className="relative flex gap-6 pb-10"
            >
              {/* Node */}
              <div className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
                <span className="font-mono text-[10px] font-bold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">{tw(`${item.key}.role`)}</p>
                  {badgeLabel && (
                    <Badge variant="secondary" className="rounded-full text-[10px]">
                      {badgeLabel}
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.company}
                  {item.location ? ` · ${item.location}` : ""}
                  <span className="ml-2 font-mono text-xs">{item.period}</span>
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
