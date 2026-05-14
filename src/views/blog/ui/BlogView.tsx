"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SectionEntrance } from "@/shared/ui/SectionEntrance"
import { SectionHeading } from "@/shared/ui/SectionHeading"
import { EmptyState } from "@/shared/ui/EmptyState"
import { cn } from "@/lib/utils"
import { FileText } from "lucide-react"
import type { Post } from "@/shared/lib/mdx"

const TYPE_KEYS = ["all", "personal", "tech", "research", "event"] as const
const TYPE_VALUES = ["All", "personal", "tech", "research", "event"] as const

export function BlogView({ posts }: Readonly<{ posts: Post[] }>) {
  const t = useTranslations("blog")
  const locale = useLocale()
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? posts : posts.filter((p) => p.type === active)

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16">
      <SectionEntrance>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mb-8 flex flex-wrap gap-2">
          {TYPE_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setActive(TYPE_VALUES[i])}
              aria-pressed={active === TYPE_VALUES[i]}
              className={cn(
                "h-9 rounded-full px-4 text-sm transition-colors",
                active === TYPE_VALUES[i]
                  ? "bg-foreground text-background"
                  : "border border-primary/10 text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`types.${key}`)}
            </button>
          ))}
        </div>
      </SectionEntrance>
      <div className="flex flex-col">
        {filtered.length === 0 ? (
          <EmptyState icon={FileText} title={t("empty_title")} subtitle={t("empty_subtitle")} />
        ) : (
          filtered.map((post, i) => (
            <div key={post.slug}>
              {i > 0 && <Separator />}
              <SectionEntrance delay={i * 0.04}>
                <motion.div whileTap={{ scale: 0.99 }}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="group block -mx-4 rounded-lg px-4 py-5 transition-colors hover:bg-muted/40"
                  >
                    <p className="font-medium underline-offset-4 group-hover:underline">{post.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="mr-2 text-xs capitalize">
                        {post.type}
                      </Badge>
                      {post.readTime} ·{" "}
                      {new Date(post.date).toLocaleDateString(locale === "km" ? "km-KH" : "en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </Link>
                </motion.div>
              </SectionEntrance>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
