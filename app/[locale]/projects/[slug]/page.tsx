import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { projects } from "@/data/projects"
import { ProjectDetailView } from "@/views/project-detail"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const t = await getTranslations("projects_data")
  return { title: t(`${slug}.title`), description: t(`${slug}.description`) }
}

export default async function Page({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()
  return <ProjectDetailView project={project} />
}
