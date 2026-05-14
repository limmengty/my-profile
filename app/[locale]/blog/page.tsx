import type { Metadata } from "next"
import { getAllPosts } from "@/shared/lib/mdx"
import { BlogViewDynamic } from "./client"

export const metadata: Metadata = {
  title: "Writing",
  description: "Thoughts on engineering and technology.",
}

export default async function Page({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  const posts = getAllPosts(locale)
  return <BlogViewDynamic posts={posts} />
}
