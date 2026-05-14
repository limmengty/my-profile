import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface PostFrontmatter {
  title: string
  type: "personal" | "tech" | "research" | "event"
  date: string
  readTime: string
  tags: string[]
  related?: string[]
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
}

export function getAllPosts(locale = "en"): Post[] {
  const dir = path.join(BLOG_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(dir, file), "utf8")
      const { data, content } = matter(raw)
      return { slug, content, ...(data as PostFrontmatter) }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string, locale = "en"): Post | null {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { slug, content, ...(data as PostFrontmatter) }
}
