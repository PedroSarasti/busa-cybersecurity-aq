import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FolderOpen } from "lucide-react"
import { UnderConstruction } from "@/components/under_construction"
import { hasContent, getArticles } from "@/lib/content"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SectionTerminal } from "@/components/section-terminal"
import { sections, getSection, getAccent } from "@/lib/navigation"
import { cn } from "@/lib/utils"

// Slugs que tienen su propia página dedicada y no deben usar esta ruta dinámica.
const RESERVED = new Set(["inicio", "sobre-mi"])

export function generateStaticParams() {
  return sections.filter((s) => !RESERVED.has(s.slug) && s.href !== "/").map((s) => ({ section: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>
}): Promise<Metadata> {
  const { section: slug } = await params
  const section = getSection(slug)
  if (!section) return { title: "No encontrado | BUSA Cybersecurity" }
  return {
    title: `${section.name} | BUSA Cybersecurity`,
    description: section.description,
  }
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section: slug } = await params
  const section = getSection(slug)

  if (!section || RESERVED.has(slug) || section.href === "/") {
    notFound()
  }

  const accent = getAccent(section)
  const subsections = section.subsections ?? []
  const published = hasContent(
    section.slug,
    subsections.map((s) => s.slug),
  )

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section
        className={cn(
          "relative overflow-hidden border-b border-gray-800 px-4 py-20 bg-gradient-to-br",
          accent.heroGradient,
        )}
      >
        {/* Rejilla decorativa de fondo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="container relative mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            <span className={accent.text}>{section.name}</span>{" "}
            {section.heroSuffix && <span className="text-white">{section.heroSuffix}</span>}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-300 leading-relaxed text-pretty">
            {section.description}
          </p>

          {published && subsections.length > 0 && (
            <div className="mt-8 flex justify-center">
              <a
                href="#categorias"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors",
                  accent.button,
                )}
              >
                {section.ctaLabel ?? "Explorar"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Elemento innovador: terminal animada temática */}
          {published && subsections.length > 0 && (
            <div className="mt-12">
              <SectionTerminal
                moduleName={section.name}
                items={subsections.map((s) => s.name)}
                accentText={accent.text}
                accentDot={accent.dot}
              />
            </div>
          )}
        </div>
      </section>

      {/* Subsections */}
      {!published ? (
        <UnderConstruction title={section.name} moduleSlug={section.slug} accent={accent} upcoming={subsections} />
      ) : (
      <section id="categorias" className="py-16 px-4 flex-1 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          {subsections.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold text-white mb-2">Categorías de {section.name}</h2>
              <p className="text-gray-400 mb-8">Entra a una categoría para ver sus artículos.</p>
              <ul className="divide-y divide-gray-800 border-y border-gray-800">
                {subsections.map((sub) => {
                  const SubIcon = sub.icon
                  const total = getArticles(section.slug, sub.slug).length
                  return (
                    <li key={sub.slug}>
                      <Link
                        href={`${section.href}/${sub.slug}`}
                        className="group flex items-start gap-4 py-4 transition-colors hover:bg-gray-900/60"
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border",
                            accent.iconBox,
                          )}
                        >
                          <SubIcon className={cn("h-5 w-5", accent.text)} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block font-medium text-white transition-colors", accent.titleHover)}>
                            {sub.name}
                          </span>
                          <span className="block text-sm text-gray-400 leading-relaxed">{sub.description}</span>
                        </span>
                        <span className="shrink-0 pt-0.5 font-mono text-xs text-gray-500">
                          {total > 0 ? `${total} artículos` : "en construcción"}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <FolderOpen className="h-12 w-12 text-gray-700 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Contenido próximamente</h2>
              <p className="text-gray-400 max-w-md">
                Esta sección aún no tiene categorías publicadas. Vuelve pronto para ver nuevo contenido.
              </p>
            </div>
          )}
        </div>
      </section>
      )}

      <SiteFooter />
    </div>
  )
}
