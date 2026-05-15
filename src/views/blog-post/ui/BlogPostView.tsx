import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SpringButton } from "@/shared/ui/SpringButton"
import { ScrollProgress } from "@/shared/ui/ScrollProgress"
import { CodeBlock } from "./CodeBlock"
import { TocNav } from "./TocNav"
import { getTranslations } from "next-intl/server"
import { CopyLinkButton } from "./CopyButtons"
import { SectionEntrance } from "@/shared/ui/SectionEntrance"
import { resolveAuthors } from "@/data/authors"
import { AuthorCard } from "./AuthorCard"
import type { Post } from "@/shared/lib/mdx"

interface TocItem {
  id: string
  text: string
  level: number
}

function slugify(text: string) {
  return encodeURIComponent(text.trim().toLowerCase().replace(/\s+/g, "-"))
}

const mdxComponents = {
  h2: ({ children, ...props }: React.ComponentProps<"h2">) => {
    const id = slugify(typeof children === "string" ? children : "")
    return (
      <h2 id={id} className="mt-10 mb-4 scroll-mt-36 text-xl font-semibold text-foreground" {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }: React.ComponentProps<"h3">) => {
    const id = slugify(typeof children === "string" ? children : "")
    return (
      <h3 id={id} className="mt-6 mb-2 scroll-mt-36 text-base font-semibold text-foreground/80" {...props}>
        {children}
      </h3>
    )
  },
  pre: ({ children }: React.ComponentProps<"pre">) => {
    const child = children as React.ReactElement<{ className?: string; children?: string }>
    const lang = child?.props?.className?.replace("language-", "") ?? "text"
    const code = child?.props?.children ?? ""
    return <CodeBlock code={String(code)} lang={lang} />
  },
  code: ({ children, ...props }: React.ComponentProps<"code">) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground dark:bg-muted/60" {...props}>
      {children}
    </code>
  ),
  blockquote: ({ children }: React.ComponentProps<"blockquote">) => (
    <blockquote className="my-4 border-l-4 border-border pl-4 italic text-muted-foreground">{children}</blockquote>
  ),
}

export async function BlogPostView({
  post,
  toc,
  relatedPosts,
}: Readonly<{
  post: Post
  toc: TocItem[]
  relatedPosts: Post[]
}>) {
  const tb = await getTranslations("blog_post")
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16">
      <ScrollProgress />

      {/* Sticky header — must be direct child, no motion wrapper */}
      <div className="sticky top-14 z-40 -mx-4 mb-8 bg-background/80 px-4 py-3 backdrop-blur-sm md:max-w-[calc(100%-220px-3rem)]">
        <SpringButton asChild variant="ghost" size="lg" className="-ml-3 text-base">
          <Link href="/blog">
            <ArrowLeft size={20} className="mr-2" /> {tb("back")}
          </Link>
        </SpringButton>
        <p className="mt-2 truncate text-sm font-medium text-foreground">{post.title}</p>
      </div>
      <SectionEntrance delay={0.06}>
        <div className="mb-8 md:pr-[260px]">
          <Badge variant="secondary" className="mb-3 capitalize">
            {post.type}
          </Badge>
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {post.readTime} ·{" "}
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </SectionEntrance>

      {toc.length > 0 && (
        <SectionEntrance delay={0.1}>
          <Accordion type="single" collapsible className="mb-8 md:hidden">
            <AccordionItem value="toc">
              <AccordionTrigger className="text-sm font-medium">{tb("on_this_page")}</AccordionTrigger>
              <AccordionContent>
                <TocNav items={toc} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SectionEntrance>
      )}

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_220px]">
        <article className="prose prose-zinc min-w-0 max-w-[65ch] animate-in fade-in slide-in-from-bottom-4 duration-500 text-base leading-[1.8] dark:prose-invert">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />

          <Separator className="my-10 not-prose" />

          <div className="not-prose flex gap-2">
            <CopyLinkButton />
          </div>

          {relatedPosts.length > 0 && (
            <div className="not-prose mt-8">
              <p className="mb-3 text-sm font-semibold">{tb("related")}</p>
              <div className="flex flex-col gap-2">
                {relatedPosts.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="flex items-center gap-2 text-sm hover:underline"
                  >
                    <Badge variant="outline" className="capitalize text-xs">
                      {r.type}
                    </Badge>
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="not-prose mt-12 rounded-xl border p-6 flex flex-col gap-4">
            {resolveAuthors(post.author).map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </article>

        {toc.length > 0 && (
          <aside className="hidden md:sticky md:top-36 md:block md:self-start md:max-h-[calc(100vh-10rem)] md:overflow-y-auto">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {tb("on_this_page")}
            </p>
            <TocNav items={toc} />
          </aside>
        )}
      </div>
    </div>
  )
}
