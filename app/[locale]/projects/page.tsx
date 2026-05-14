import type { Metadata } from "next"
import ProjectsViewDynamic from "./client"

export const metadata: Metadata = {
  title: "Projects",
  description: "Web apps and freelance work by Lim Mengty.",
}

export default function Page() {
  return <ProjectsViewDynamic />
}
