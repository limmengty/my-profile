"use client"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { researchProjects } from "@/data/experience"

export function ResearchGrid() {
  const t = useTranslations("research")
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {researchProjects.map((r, i) => (
        <div
          key={r.key}
          className="rounded-xl border bg-card p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <p className="mb-2 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
          <p className="text-sm font-medium text-foreground">{t(`${r.key}.title`)}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{r.period}</p>
          <p className="mt-2 text-xs text-muted-foreground">{t(`${r.key}.description`)}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-[10px]">
              Research
            </Badge>
            {r.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
