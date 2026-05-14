"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TocNav({ items }: Readonly<{ items: TocItem[] }>) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const headingEls = items.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!headingEls.length) return

    const onClick = (id: string) => setActiveId(id)

    const observer = new IntersectionObserver(
      () => {
        // Find the last heading that has passed the top threshold
        const scrollY = window.scrollY + 160
        let current = headingEls[0].id
        for (const el of headingEls) {
          if (el.offsetTop <= scrollY) current = el.id
        }
        setActiveId(current)
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    )

    headingEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const active = activeId === item.id
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
            className={`relative py-1 text-sm transition-colors duration-150 ${
              active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="toc-pill"
                className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {item.text}
          </a>
        )
      })}
    </nav>
  )
}
