// Non-translatable data only. Translatable strings (name, title, bio, availability) live in messages/
export const profile = {
  name: "Lim Mengty",
  location: "Phnom Penh, Cambodia",
  email: "limmengti@gmail.com",
  phone: "015607244",
  website: "https://mt-mengty.netlify.app",
  stats: [
    { key: "yrs_exp", value: "2+" },
    { key: "stacks", value: "15+" },
    { key: "projects", value: "5+" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/limmengty", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/limmengty", icon: "linkedin" },
    { label: "Facebook", href: "https://facebook.com/lim.mengty.2025/", icon: "facebook" },
    // { label: "Instagram", href: "https://instagram.com/limmengty", icon: "instagram" },
    { label: "Telegram", href: "https://t.me/limmengty", icon: "telegram" },
    { label: "YouTube", href: "https://youtube.com/@limmengti8989", icon: "youtube" },
  ],
  resumeUrl: "/resume.pdf",
} as const

export type SocialLink = (typeof profile.social)[number]
