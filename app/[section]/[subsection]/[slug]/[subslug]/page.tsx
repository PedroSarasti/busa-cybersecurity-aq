import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ChevronRight, CalendarDays, ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getMdxComponents } from "@/components/mdx-components"
import { getSubSection, getAccent } from "@/lib/navigation"
import { getArticle, getSubArticle, getAllSubArticleParams } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Formatea una fecha ISO (YYYY-MM-DD) a un texto legible en español. */
function formatDate(date: string): string {
  if (!date) return ""
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
}

export function generateStaticParams() {
  return getAllSubArticleParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; subsection: string; slug: string; subslug: string }>
}): Promise<Metadata> {
  const { section: sectionSlug, subsection: subSlug, slug, subslug } = await params
  const subArticle = getSubArticle(sectionSlug, subSlug, slug, subslug)
  if (!subArticle) return { title: "Página no encontrada | BUSA Cybersecurity" }
  return {
    title: `${subArticle.title} | BUSA Cybersecurity`,
    description: subArticle.description,
    keywords: subArticle.tags,
  }
}

export default async function SubArticlePage({
  params,
}: {
  params: Promise<{ section: string; subsection: string; slug: string; subslug: string }>
}) {
  const { section: sectionSlug, subsection: subSlug, slug, subslug } = await params
  const { section, subsection } = getSubSection(sectionSlug, subSlug)

  if (!section || !subsection) {
    notFound()
  }

  const parentArticle = getArticle(sectionSlug, subSlug, slug)
  const subArticle = getSubArticle(sectionSlug, subSlug, slug, subslug)
  if (!parentArticle || !subArticle) {
    notFound()
  }

  const accent = getAccent(section)
  const mdxComponents = getMdxComponents(accent.text)
  const parentHref = `${section.href}/${subsection.slug}/${slug}`

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero de la sub-página */}
      <section className={cn("border-b border-gray-800 px-4 py-14 bg-gradient-to-br", accent.heroGradient)}>
        <div className="container mx-auto max-w-3xl">
          {/* Breadcrumb, incluyendo el artículo principal como paso intermedio */}
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
            <ChevronRight className="h-4 w-4" />
            <Link href={parentHref} className={cn("transition-colors", accent.titleHover)}>
              {parentArticle.title}
            </Link>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white text-balance">{subArticle.title}</h1>
          {subArticle.description && (
            <p className="mt-4 text-lg text-gray-300 leading-relaxed text-pretty">{subArticle.description}</p>
          )}

          {subArticle.date && (
            <div className="mt-6 flex items-center gap-1.5 text-sm text-gray-400">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={subArticle.date}>{formatDate(subArticle.date)}</time>
            </div>
          )}
        </div>
      </section>

      {/* Cuerpo de la sub-página */}
      <section className="py-12 px-4 flex-1">
        <article className="container mx-auto max-w-3xl">
          <MDXRemote source={subArticle.content} components={mdxComponents} />

          <div className="mt-12 border-t border-gray-800 pt-6">
            <Link
              href={parentHref}
              className={cn("inline-flex items-center gap-2 text-sm font-medium transition-colors", accent.text)}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a {parentArticle.title}
            </Link>
          </div>
        </article>
      </section>

      <SiteFooter />
    </div>
  )
}
