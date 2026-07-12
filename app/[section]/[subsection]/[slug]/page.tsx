import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ChevronRight, CalendarDays, ArrowLeft, Tag } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getMdxComponents } from "@/components/mdx-components"
import { getSubSection, getAccent } from "@/lib/navigation"
import { getArticle, getAllArticleParams } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Formatea una fecha ISO (YYYY-MM-DD) a un texto legible en español. */
function formatDate(date: string): string {
  if (!date) return ""
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
}

export function generateStaticParams() {
  return getAllArticleParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; subsection: string; slug: string }>
}): Promise<Metadata> {
  const { section: sectionSlug, subsection: subSlug, slug } = await params
  const article = getArticle(sectionSlug, subSlug, slug)
  if (!article) return { title: "Artículo no encontrado | BUSA Cybersecurity" }
  return {
    title: `${article.title} | BUSA Cybersecurity`,
    description: article.description,
    keywords: article.tags,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ section: string; subsection: string; slug: string }>
}) {
  const { section: sectionSlug, subsection: subSlug, slug } = await params
  const { section, subsection } = getSubSection(sectionSlug, subSlug)

  if (!section || !subsection) {
    notFound()
  }

  const article = getArticle(sectionSlug, subSlug, slug)
  if (!article) {
    notFound()
  }

  const accent = getAccent(section)
  const mdxComponents = getMdxComponents(accent.text)

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero del artículo */}
      <section className={cn("border-b border-gray-800 px-4 py-14 bg-gradient-to-br", accent.heroGradient)}>
        <div className="container mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-6" aria-label="Migas de pan">
            <Link href="/" className={cn("transition-colors", accent.titleHover)}>
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={section.href} className={cn("transition-colors", accent.titleHover)}>
              {section.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`${section.href}/${subsection.slug}`} className={cn("transition-colors", accent.titleHover)}>
              {subsection.name}
            </Link>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white text-balance">{article.title}</h1>
          {article.description && (
            <p className="mt-4 text-lg text-gray-300 leading-relaxed text-pretty">{article.description}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
            {article.date && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
            )}
            {article.tags.length > 0 && (
              <span className="inline-flex flex-wrap items-center gap-2">
                <Tag className={cn("h-4 w-4", accent.text)} />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-800 bg-gray-950 px-2.5 py-0.5 text-xs text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Cuerpo del artículo */}
      <section className="py-12 px-4 flex-1">
        <article className="container mx-auto max-w-3xl">
          <MDXRemote source={article.content} components={mdxComponents} />

          <div className="mt-12 border-t border-gray-800 pt-6">
            <Link
              href={`${section.href}/${subsection.slug}`}
              className={cn("inline-flex items-center gap-2 text-sm font-medium transition-colors", accent.text)}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a {subsection.name}
            </Link>
          </div>
        </article>
      </section>

      <SiteFooter />
    </div>
  )
}
