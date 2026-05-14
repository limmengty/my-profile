export function SectionHeading({
  title,
  subtitle,
}: Readonly<{
  title: string
  subtitle?: string
}>) {
  return (
    <div className="mb-10">
      <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
