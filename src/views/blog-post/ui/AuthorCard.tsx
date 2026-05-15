import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SocialLinks } from "@/shared/ui/SocialLinks"
import type { Author } from "@/data/authors"

interface AuthorCardProps {
  author: Author
  showSocial?: boolean
}

export function AuthorCard({ author, showSocial = true }: Readonly<AuthorCardProps>) {
  const initials = author.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 shrink-0">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold">{author.name}</p>
          {(author.title || author.location) && (
            <p className="text-sm text-muted-foreground">
              {[author.title, author.location].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>
      {showSocial && author.social && author.social.length > 0 && <SocialLinks links={author.social} />}
    </div>
  )
}
