import { getTranslations } from "next-intl/server"
import { SectionEntrance } from "@/shared/ui/SectionEntrance"
import { SectionHeading } from "@/shared/ui/SectionHeading"
import { StepTimeline } from "./StepTimeline"
import { EducationTimeline } from "./EducationTimeline"

export default async function ExperienceView() {
  const t = await getTranslations("experience")
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-16">
      <SectionEntrance>
        <SectionHeading title={t("title")} />
      </SectionEntrance>

      <SectionEntrance delay={0.1}>
        <h2 className="mb-8 font-heading text-xl font-semibold">{t("work")}</h2>
        <StepTimeline />
      </SectionEntrance>

      <SectionEntrance delay={0.2} className="mt-16">
        <h2 className="mb-8 font-heading text-xl font-semibold">{t("education")}</h2>
        <EducationTimeline />
      </SectionEntrance>
    </div>
  )
}
