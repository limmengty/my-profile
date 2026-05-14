"use client"
import dynamic from "next/dynamic"
import ProjectsLoading from "./loading"

export default dynamic(() => import("@/views/projects"), {
  ssr: false,
  loading: () => <ProjectsLoading />,
})
