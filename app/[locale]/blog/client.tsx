"use client"
import dynamic from "next/dynamic"
import BlogLoading from "./loading"

export const BlogViewDynamic = dynamic(() => import("@/views/blog").then((m) => m.BlogView), {
  ssr: false,
  loading: () => <BlogLoading />,
})
