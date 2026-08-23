"use client"

import { useTheme } from "next-themes"
import Script from "next/script"
import { useCallback, useRef, useState, useSyncExternalStore } from "react"

const verifiedListeners = new Set<() => void>()

function subscribeVerified(listener: () => void) {
  verifiedListeners.add(listener)
  return () => {
    verifiedListeners.delete(listener)
  }
}

function getVerifiedSnapshot(): boolean {
  return sessionStorage.getItem("turnstile-verified") === "true"
}

function getServerSnapshot(): boolean {
  return true
}

export function TurnstileGate({ children }: Readonly<{ children: React.ReactNode }>) {
  const verified = useSyncExternalStore(subscribeVerified, getVerifiedSnapshot, getServerSnapshot)
  const [fading, setFading] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  const renderWidget = useCallback(() => {
    if (!widgetRef.current || !globalThis.window.turnstile) return
    globalThis.window.turnstile.render(widgetRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
      theme: resolvedTheme === "dark" ? "dark" : "light",
      callback: async (token: string) => {
        const res = await fetch("/api/verify-turnstile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
        const { success } = await res.json()
        if (success) {
          setFading(true)
          setTimeout(() => {
            sessionStorage.setItem("turnstile-verified", "true")
            for (const listener of verifiedListeners) listener()
          }, 400)
        }
      },
    })
  }, [resolvedTheme])

  if (verified) return <>{children}</>

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div
        className={`fixed inset-0 z-9999 flex flex-col items-center justify-center gap-6 bg-background transition-opacity duration-400 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div>
          <h1 className="text-center text-2xl font-bold tracking-tight">Lim Mengty</h1>
          <p className="text-center text-sm text-muted-foreground">Verify you&apos;re human to continue</p>
        </div>
        <div ref={widgetRef} />
      </div>
    </>
  )
}

declare global {
  interface Window {
    turnstile: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string
          theme?: "light" | "dark" | "auto"
          callback: (token: string) => void
        }
      ) => void
    }
  }
}
