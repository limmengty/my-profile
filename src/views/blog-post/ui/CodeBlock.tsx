import { codeToHtml } from "shiki"
import { CopyCodeButton } from "./CopyCodeButton"

interface Props {
  code: string
  lang?: string
}

export async function CodeBlock({ code, lang = "typescript" }: Readonly<Props>) {
  const [lightHtml, darkHtml] = await Promise.all([
    codeToHtml(code.trim(), { lang, theme: "github-light" }),
    codeToHtml(code.trim(), { lang, theme: "github-dark" }),
  ])

  const lines = code.trim().split("\n")

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border text-sm font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <span className="text-xs text-muted-foreground">{lang}</span>
        <CopyCodeButton code={code.trim()} />
      </div>

      <div className="flex overflow-x-auto">
        {/* Line numbers */}
        <div className="select-none border-r border-border bg-muted/30 px-3 py-4 text-right text-xs leading-6 text-muted-foreground/40">
          {lines.map((_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Light theme — hidden in dark */}
        <div
          className="flex-1 overflow-x-auto py-4 pl-4 leading-6 dark:hidden [&>pre]:bg-transparent! [&>pre]:p-0! [&>pre]:m-0!"
          dangerouslySetInnerHTML={{ __html: lightHtml }}
        />
        {/* Dark theme — hidden in light */}
        <div
          className="hidden flex-1 overflow-x-auto py-4 pl-4 leading-6 dark:block [&>pre]:bg-transparent! [&>pre]:p-0! [&>pre]:m-0!"
          dangerouslySetInnerHTML={{ __html: darkHtml }}
        />
      </div>
    </div>
  )
}
