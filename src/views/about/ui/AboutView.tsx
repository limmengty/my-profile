"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { SocialLinks } from "@/shared/ui/SocialLinks"
import { ResearchGrid } from "@/views/experience/ui/ResearchGrid"
import { StepTimeline } from "@/views/experience/ui/StepTimeline"
import { EducationTimeline } from "@/views/experience/ui/EducationTimeline"
import { profile } from "@/data/profile"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 200, damping: 24, delay },
})

const skills = [
  "Next.js",
  "React",
  "NestJS",
  "Spring Boot",
  "TypeScript",
  "React Native",
  "PostgreSQL",
  "Docker",
  "GitHub Actions",
  "Vercel",
  "GraphQL",
  "TypeORM",
  "Tailwind CSS",
  "CI/CD",
]

export default function AboutView() {
  const t = useTranslations("about")
  const tp = useTranslations("profile")

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[360px_1fr]">
        <motion.div {...fadeUp(0)} className="flex justify-center md:sticky md:top-24">
          <div className="relative w-full max-w-[280px] md:max-w-[360px]">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-primary/10 dark:bg-primary/8" />
            <div className="relative aspect-3/4 overflow-hidden rounded-2xl border bg-muted shadow-lg">
              <Image
                src="/avatar.png"
                alt={t("photo_alt")}
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} />
              {profile.location}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-8">
          <motion.div {...fadeUp(0.08)}>
            <p className="mb-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">{t("label")}</p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">{tp("name")}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{tp("title")}</p>
          </motion.div>

          <motion.p {...fadeUp(0.14)} className="text-base leading-relaxed text-foreground">
            {tp("bio")}
          </motion.p>

          <motion.blockquote
            {...fadeUp(0.18)}
            className="border-l-2 border-primary/40 pl-4 italic text-muted-foreground"
          >
            "{t("quote1")}"
          </motion.blockquote>

          <motion.p {...fadeUp(0.22)} className="text-base leading-relaxed text-muted-foreground">
            {t("story")}
          </motion.p>

          <motion.blockquote
            {...fadeUp(0.26)}
            className="border-l-2 border-primary/40 pl-4 italic text-muted-foreground"
          >
            "{t("quote2")}"
          </motion.blockquote>

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.34)}>
            <SocialLinks links={profile.social} />
          </motion.div>
        </div>
      </div>

      <motion.div {...fadeUp(0.4)} className="mt-20">
        <h2 className="mb-8 font-heading text-xl font-semibold">{t("work")}</h2>
        <StepTimeline />
      </motion.div>

      <motion.div {...fadeUp(0.45)} className="mt-20">
        <h2 className="mb-8 font-heading text-xl font-semibold">{t("education")}</h2>
        <EducationTimeline />
      </motion.div>

      <motion.div {...fadeUp(0.5)} className="mt-20">
        <h2 className="mb-8 font-heading text-xl font-semibold">{t("research")}</h2>
        <ResearchGrid />
      </motion.div>
    </div>
  )
}
