import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/shared/lib/mdx"
import { BlogPostView } from "@/views/blog-post"
import { profile } from "@/data/profile"
import routing from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getAllPosts(locale).map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)
  if (!post) return {}
  return {
    title: post.title,
    description: `${post.readTime} read · ${post.type}`,
  }
}

function extractToc(content: string) {
  return [...content.matchAll(/^(#{1,3})\s+(.+)$/gm)].map((m) => ({
    level: m[1].length,
    text: m[2],
    id: encodeURIComponent(m[2].trim().toLowerCase().replace(/\s+/g, "-")),
  }))
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)
  if (!post) notFound()

  const toc = extractToc(post.content)
  const allPosts = getAllPosts(locale)
  const relatedPosts = (post.related ?? [])
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter(Boolean) as typeof allPosts

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: profile?.name },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostView post={post} toc={toc} relatedPosts={relatedPosts} />
    </>
  )
}
