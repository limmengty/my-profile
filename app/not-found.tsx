import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1100px] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl font-bold text-muted-foreground/30">404</p>
      <h1 className="font-heading text-2xl font-bold">Page not found</h1>
      <Button asChild variant="outline">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
