"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SectionEntrance } from "@/shared/ui/SectionEntrance"
import { SectionHeading } from "@/shared/ui/SectionHeading"
import { SpringCard } from "@/shared/ui/SpringCard"
import { EmptyState } from "@/shared/ui/EmptyState"
import { cn } from "@/lib/utils"
import { FolderOpen } from "lucide-react"
import { projects } from "@/data/projects"
import type { Project } from "@/data/projects"

const CATEGORY_VALUES = ["All", "Web App", "Research", "Freelance", "Internship"] as const
const CATEGORY_KEYS = ["all", "web_app", "research", "freelance", "internship"] as const

export default function ProjectsView() {
  const t = useTranslations("projects")
  const tp = useTranslations("projects_data")
  const locale = useLocale()
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active)

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16">
      <SectionEntrance>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORY_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setActive(CATEGORY_VALUES[i])}
              aria-pressed={active === CATEGORY_VALUES[i]}
              className={cn(
                "h-9 rounded-full px-4 text-sm transition-colors",
                active === CATEGORY_VALUES[i]
                  ? "bg-foreground text-background"
                  : "border border-primary/10 text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`categories.${key}`)}
            </button>
          ))}
        </div>
      </SectionEntrance>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="col-span-2">
            <EmptyState icon={FolderOpen} title={t("empty_title")} subtitle={t("empty_subtitle")} />
          </div>
        ) : (
          filtered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              delay={i * 0.05}
              locale={locale}
              viewDetails={t("view_details")}
              tp={tp}
            />
          ))
        )}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  delay,
  locale,
  viewDetails,
  tp,
}: {
  project: Project
  delay: number
  locale: string
  viewDetails: string
  tp: ReturnType<typeof useTranslations>
}) {
  return (
    <SectionEntrance delay={delay}>
      <SpringCard>
        <Card className="overflow-hidden">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {project.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={tp(`${project.slug}.title`)}
                fill
                className="object-cover grayscale transition-transform duration-500 hover:scale-[1.04] hover:grayscale-0"
              />
            )}
            <Badge variant="secondary" className="absolute right-2 top-2 text-xs">
              {project.category}
            </Badge>
          </div>
          <CardContent className="p-4">
            <p className="text-base font-semibold">{tp(`${project.slug}.title`)}</p>
            <p className="mt-1 text-sm text-muted-foreground">{tp(`${project.slug}.description`)}</p>
            <ScrollArea className="mt-3">
              <div className="flex gap-1.5 pb-1">
                {project.tech.map((t) => (
                  <Badge key={t} variant="outline" className="shrink-0 text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              {viewDetails} <ArrowUpRight size={14} />
            </Link>
          </CardContent>
        </Card>
      </SpringCard>
    </SectionEntrance>
  )
}
