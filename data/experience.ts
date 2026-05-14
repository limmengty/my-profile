export interface WorkEntry {
  key: string // maps to messages experience.work.<key>
  company: string
  location?: string
  period: string
  badge?: "current" | "completed"
  bulletCount: number // how many bullets to render: experience.work.<key>.bullets.<0..n>
}

export interface ResearchEntry {
  key: string // maps to messages experience.research.<key>
  period: string
  tags?: string[]
}

export const workExperience: WorkEntry[] = [
  {
    key: "allweb_nodejs",
    company: "Allweb",
    location: "Phnom Penh, Cambodia",
    period: "2024 – Present",
    badge: "current",
    bulletCount: 5,
  },
  {
    key: "allweb_intern",
    company: "Allweb",
    location: "Phnom Penh, Cambodia",
    period: "Oct 2024 – Dec 2024",
    bulletCount: 4,
  },
]

export const education = [
  { key: "born", institution: "Kampong Cham Province, Cambodia", period: "2003", type: "milestone" },
  { key: "highschool", institution: "Srey Sonthor High School", period: "2015 – 2021", type: "school" },
  { key: "norton", institution: "Norton University", period: "2021 – 2025", type: "university" },
  { key: "tfd_fullstack", institution: "TFD", period: "2024", type: "course" },
  { key: "tfd_nestjs", institution: "TFD", period: "2024", type: "course" },
  { key: "salacyber_devops_edu", institution: "SalaCyber Academy", period: "2026", type: "course" },
]

export const researchProjects: ResearchEntry[] = [
  { key: "react_nextjs_arch", period: "2024", tags: ["React", "Next.js", "TypeScript"] },
  { key: "ui_component_systems", period: "2024", tags: ["ShadCN", "Material UI", "Figma"] },
  { key: "cicd_orchestration", period: "2025", tags: ["Kubernetes", "Ansible", "Jenkins", "GitLab CI"] },
]
