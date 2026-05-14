"use client"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopyButton({ code }: Readonly<{ code: string }>) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      variant="ghost"
      size="sm"
      className="absolute right-2 top-2 h-7 px-2"
      onClick={() => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </Button>
  )
}

export function CopyLinkButton() {
  return (
    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href)}>
      Copy Link
    </Button>
  )
}
