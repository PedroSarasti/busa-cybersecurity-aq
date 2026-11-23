import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight, FileText, CalendarDays, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { sections, getSubSection, getAccent } from "@/lib/navigation"
import { getArticles } from "@/lib/content"
import { cn } from "@/lib/utils"
import { UnderConstruction } from "@/components/under_construction"
import { PortswiggerLabsLayout } from "@/components/portswigger_labs_layout"

/** Formatea una fecha ISO (YYYY-MM-DD) a un texto legible en español. */
function formatDate(date: string): string {
  if (!date) return ""
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
}

export function generateStaticParams() {
  return sections.flatMap((section) =>
    (section.subsections ?? []).map((sub) => ({
      section: section.slug,
      subsection: sub.slug,
    })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; subsection: string }>
}): Promise<Metadata> {
  const { section: sectionSlug, subsection: subSlug } = await params
  const { section, subsection } = getSubSection(sectionSlug, subSlug)
  if (!section || !subsection) return { title: "No encontrado | BUSA Cybersecurity" }
  return {
    title: `${subsection.name} · ${section.name} | BUSA Cybersecurity`,
    description: subsection.description,
  }
}

export default async function SubSectionPage({
  params,
}: {
  params: Promise<{ section: string; subsection: string }>
}) {
  const { section: sectionSlug, subsection: subSlug } = await params
  const { section, subsection } = getSubSection(sectionSlug, subSlug)

  if (!section || !subsection) {
    notFound()
  }

  const accent = getAccent(section)
  const Icon = subsection.icon
  const articles = getArticles(sectionSlug, subSlug)

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section
        className={cn("border-b border-gray-800 px-4 py-16 bg-gradient-to-br", accent.heroGradient)}
      >
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="Migas de pan">
            <Link href="/" className={cn("transition-colors", accent.titleHover)}>
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={section.href} className={cn("transition-colors", accent.titleHover)}>
              {section.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-200">{subsection.name}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span
              className={cn("flex h-12 w-12 items-center justify-center rounded-lg border", accent.iconBox)}
            >
              <Icon className={cn("h-6 w-6", accent.text)} />
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{subsection.name}</h1>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed text-pretty max-w-3xl">{subsection.description}</p>
        </div>
      </section>

      {articles.length === 0 ? (
        <UnderConstruction title={subsection.name} moduleSlug={`${section.slug}/${subsection.slug}`} accent={accent} />
      ) : sectionSlug === "writeups" && subSlug === "portswigger" ? (
        <section className="py-16 px-4 flex-1">
          <PortswiggerLabsLayout
            articles={articles}
            accent={accent}
            basePath={`${section.href}/${subsection.slug}`}
            backHref={section.href}
          />
        </section>
      ) : (
      /* Content list: artículos MDX o estado vacío */
      <section className="py-16 px-4 flex-1">
        <div className="container mx-auto">
          {articles.length > 0 ? (
            <ul className="mx-auto max-w-4xl divide-y divide-gray-800 border-y border-gray-800">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`${section.href}/${subsection.slug}/${article.slug}`}
                    className="group block py-5 transition-colors hover:bg-gray-900/60"
                  >
                    <time dateTime={article.date} className="font-mono text-xs text-gray-500">
                      {formatDate(article.date)}
                    </time>
                    <h2 className={cn("mt-1 text-lg font-semibold text-white transition-colors", accent.titleHover)}>
                      {article.title}
                    </h2>
                    {article.description && (
                      <p className="mt-1 text-gray-400 leading-relaxed line-clamp-2">{article.description}</p>
                    )}
                    {article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {article.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-gray-800 px-2.5 py-0.5 font-mono text-xs text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 rounded-xl border border-dashed border-gray-800 bg-gray-900/30">
              <FileText className="h-12 w-12 text-gray-700 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Aún no hay artículos publicados</h2>
              <p className="text-gray-400 max-w-md">
                Esta categoría está lista para recibir contenido. Pronto encontrarás aquí writeups, notas y guías sobre{" "}
                <span className={accent.text}>{subsection.name}</span>.
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
