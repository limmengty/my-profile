import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import AboutView from "@/views/about"
import { profile } from "@/data/profile"

export const metadata: Metadata = {
  title: "About",
  description: "Software Engineer from Phnom Penh.",
}

export default async function Page() {
  const tp = await getTranslations("profile")
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: tp("name"),
    jobTitle: tp("title"),
    url: "https://limmengty.dev",
    sameAs: profile.social.map((s) => s.href),
    address: { "@type": "PostalAddress", addressLocality: profile.location },
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutView />
    </>
  )
}
