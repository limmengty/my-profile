import HomeView from "@/src/views/home"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lim Mengty",
  description: "Full-Stack Developer based in Phnom Penh. Orchestrating the full stack — from modern Next.js UIs to enterprise backend architecture and DevOps.",
  keywords: [
    "Lim Mengty",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "Java Spring Boot",
    "DevOps",
    "Phnom Penh"
  ],
  openGraph: {
    title: "Lim Mengty",
    description: "Orchestrating the full stack — from modern Next.js UIs to enterprise backend architecture and DevOps.",
    url: "https://limmengty.com",
    siteName: "Lim Mengty Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lim Mengty — Full-Stack Developer",
    description: "Orchestrating the full stack — from modern Next.js UIs to enterprise backend architecture and DevOps.",
  },
}

export default HomeView