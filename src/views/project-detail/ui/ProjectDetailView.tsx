import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SpringButton } from "@/shared/ui/SpringButton"
import { SectionEntrance } from "@/shared/ui/SectionEntrance"
import type { Project } from "@/data/projects"

const GithubIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

export async function ProjectDetailView({ project }: { project: Project }) {
  const t = await getTranslations("projects_data")
  const title = t(`${project.slug}.title`)
  const description = t(`${project.slug}.longDescription`) || t(`${project.slug}.description`)

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16">
      <SectionEntrance>
        <SpringButton asChild variant="ghost" className="mb-8 -ml-2">
          <Link href="/projects">
            <ArrowLeft size={16} className="mr-1" /> Back to Projects
          </Link>
        </SpringButton>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold">{title}</h1>
            <p className="mt-1 text-muted-foreground">{project.period}</p>
          </div>
          <Badge variant="secondary">{project.category}</Badge>
        </div>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} className="mr-2" /> GitHub
              </Link>
            </Button>
          )}
          {project.demoUrl && (
            <Button variant="outline" asChild>
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" /> Live Demo
              </Link>
            </Button>
          )}
        </div>
      </SectionEntrance>

      {project.thumbnail && (
        <SectionEntrance delay={0.1} className="mt-10">
          <Separator className="mb-10" />
          <div className="relative aspect-video overflow-hidden rounded-xl border">
            <Image src={project.thumbnail} alt={title} fill className="object-cover" />
          </div>
        </SectionEntrance>
      )}
    </div>
  )
}
