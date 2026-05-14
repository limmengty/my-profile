import { Skeleton } from "@/components/ui/skeleton"
import { useId } from "react"

export default function Loading() {
  const id = useId()
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16">
      {/* Back button */}
      <Skeleton className="mb-8 h-8 w-24 rounded-full" />

      {/* Badge + title + meta */}
      <Skeleton className="mb-3 h-5 w-16 rounded-full" />
      <Skeleton className="mb-2 h-9 w-3/4" />
      <Skeleton className="mb-10 h-4 w-40" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_220px]">
        {/* Article content */}
        <div className="flex flex-col gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i + id} className="h-4" style={{ width: `${85 - (i % 3) * 15}%` }} />
          ))}
          <Skeleton className="mt-4 h-32 w-full rounded-lg" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i + id} className="h-4" style={{ width: `${90 - (i % 2) * 10}%` }} />
          ))}
        </div>

        {/* TOC sidebar */}
        <div className="hidden md:flex flex-col gap-2">
          <Skeleton className="mb-3 h-3 w-24" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i + id} className="h-4" style={{ width: `${70 - (i % 3) * 10}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
