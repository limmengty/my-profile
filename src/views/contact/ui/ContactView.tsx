"use client"
import { useState, type FormEvent } from "react"
import { CheckCircle, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SpringButton } from "@/shared/ui/SpringButton"
import { SocialLinks } from "@/shared/ui/SocialLinks"
import { profile } from "@/data/profile"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 200, damping: 24, delay },
})

export default function ContactView() {
  const t = useTranslations("contact")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [charCount, setCharCount] = useState(0)

  const contactInfo = [
    { icon: Mail, label: t("info.email"), value: profile.email, href: `mailto:${profile.email}` },
    { icon: MapPin, label: t("info.location"), value: profile.location },
    { icon: Clock, label: t("info.response"), value: t("info.response_value") },
  ]

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const errs: Record<string, string> = {}
    if (!data.get("name")) errs.name = t("errors.name")
    if (!data.get("email")) errs.email = t("errors.email")
    if (!data.get("message")) errs.message = t("errors.message")
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus("success")
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16">
      <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-20 md:items-start">
        <div className="md:sticky md:top-24">
          <motion.div {...fadeUp(0)}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("label")}</p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-5xl">{t("heading")}</h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t("subheading")}</p>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="mt-8 flex flex-col gap-4">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon size={14} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-medium hover:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.18)} className="mt-8">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {t("info.find_me")}
            </p>
            <SocialLinks links={profile.social} />
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.06)}>
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border bg-card p-16 text-center shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle size={26} className="text-green-500" />
              </div>
              <div>
                <p className="text-lg font-semibold">{t("success_title")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("success_body")}</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:p-8"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Input name="name" placeholder={t("name")} className="h-10" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Input name="email" type="email" placeholder={t("email")} className="h-10" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>
              <Select name="subject">
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder={t("subject_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freelance" className="py-2.5 pl-3">
                    {t("subjects.freelance")}
                  </SelectItem>
                  <SelectItem value="collaboration" className="py-2.5 pl-3">
                    {t("subjects.collaboration")}
                  </SelectItem>
                  <SelectItem value="fulltime" className="py-2.5 pl-3">
                    {t("subjects.fulltime")}
                  </SelectItem>
                  <SelectItem value="general" className="py-2.5 pl-3">
                    {t("subjects.general")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <div>
                <Textarea
                  name="message"
                  placeholder={t("message")}
                  className="min-h-[160px] resize-none"
                  maxLength={500}
                  onChange={(e) => setCharCount(e.target.value.length)}
                />
                <div className="mt-1 flex justify-between">
                  {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : <span />}
                  <p className="text-xs text-muted-foreground">{charCount}/500</p>
                </div>
              </div>
              {status === "error" && <p className="text-sm text-destructive">{t("error_generic")}</p>}
              <SpringButton type="submit" size="lg" className="w-full gap-2" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    {t("send")}
                  </>
                )}
              </SpringButton>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
