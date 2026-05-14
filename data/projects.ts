export interface Project {
  slug: string // also used as i18n key: messages projects.items.<slug>
  category: "Web App" | "Research" | "Freelance" | "Internship"
  tech: string[]
  thumbnail?: string
  githubUrl?: string
  demoUrl?: string
  period: string
}

export const projects: Project[] = [
  {
    slug: "rural-lodge",
    category: "Web App",
    tech: ["Next.js", "NestJS", "GraphQL", "TypeORM", "BullMQ", "Docker", "TanStack Query", "ShadCN"],
    period: "2024 – Present",
  },
  {
    slug: "digital-approval",
    category: "Internship",
    tech: ["Next.js", "TypeScript", "ShadCN", "Java Spring Boot", "RabbitMQ", "Keycloak", "Camunda", "Docker"],
    period: "2023 – 2024",
  },
  {
    slug: "hrm-mobile",
    category: "Internship",
    tech: ["React", "TypeScript", "REST API"],
    period: "2023",
  },
  {
    slug: "portfolio-blog",
    category: "Web App",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MDX"],
    period: "2026",
    githubUrl: "https://github.com/limmengty/my-infor",
    demoUrl: "https://mt-mengty.netlify.app",
  },
]
