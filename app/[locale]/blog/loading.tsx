import { Skeleton } from "@/components/ui/skeleton"
import { useId } from "react"

export default function Loading() {
  const id = useId()
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16">
      {/* Heading */}
      <Skeleton className="mb-2 h-8 w-32" />
      <Skeleton className="mb-8 h-4 w-72" />

      {/* Filter pills */}
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i + id} className="h-9 w-20 rounded-full" />
        ))}
      </div>

      {/* Post rows */}
      <div className="flex flex-col divide-y">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i + id} className="py-5">
            <Skeleton className="mb-2 h-5 w-3/4" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>
    </div>
  )
}
