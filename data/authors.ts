import { profile } from "./profile"

export interface Author {
  id: string
  name: string
  title?: string
  location?: string
  avatar?: string
  social?: { label: string; href: string; icon: string }[]
}

/** Registry keyed by author id (matches frontmatter `author` value). */
export const authors: Record<string, Author> = {
  limmengty: {
    id: "limmengty",
    name: profile.name,
    avatar: "/avatar.png",
    title: "Fullstack Dev",
    location: profile.location,
    social: [...profile.social],
  },
  "porhong-keat": {
    id: "porhong-keat",
    name: "Porhong Keat",
    title: "Fullstack Dev",
    location: "Phnom Penh, Cambodia",
    avatar: "/images/author/porhong-keat.jpg",
    social: [
      { label: "GitHub", href: "https://github.com/porhong", icon: "github" },
      { label: "Facebook", href: "https://facebook.com/kporhong", icon: "facebook" },
      { label: "LinkedIn", href: "https://kh.linkedin.com/in/porhong-keat-22b4251a8", icon: "linkedin" },
    ],
  },
}

/** Resolve one or more author ids/names to Author objects. Falls back to a minimal Author when unknown. */
export function resolveAuthors(author: string | string[] | undefined): Author[] {
  if (!author) return [authors.limmengty]
  const ids = Array.isArray(author) ? author : [author]
  return ids.map((id) => authors[id] ?? { id, name: id })
}
