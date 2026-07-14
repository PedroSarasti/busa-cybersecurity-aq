"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronLeft, PanelLeftClose, PanelLeftOpen, CalendarDays, ArrowRight, FlaskConical } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { portswiggerCategories } from "@/lib/portswigger_categories"
import type { ArticleMeta } from "@/lib/content"
import type { AccentTheme } from "@/lib/navigation"
import { cn } from "@/lib/utils"

const difficultyStyles: Record<string, { label: string; className: string }> = {
  apprentice: { label: "APPRENTICE", className: "bg-green-600 hover:bg-green-600 text-white border-transparent" },
  practitioner: { label: "PRACTITIONER", className: "bg-sky-500 hover:bg-sky-500 text-white border-transparent" },
  expert: { label: "EXPERT", className: "bg-orange-600 hover:bg-orange-600 text-white border-transparent" },
}

function formatDate(date: string): string {
  if (!date) return ""
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
}

/** Extrae el número de secuencia del prefijo "#N - " en el título. Si no lo encuentra, devuelve Infinity para que quede al final. */
function extractLabNumber(title: string): number {
  const match = title.match(/^#(\d+)/)
  return match ? Number.parseInt(match[1], 10) : Number.POSITIVE_INFINITY
}

interface PortswiggerLabsLayoutProps {
  articles: ArticleMeta[]
  accent: AccentTheme
  basePath: string
  backHref: string
}

export function PortswiggerLabsLayout({ articles, accent, basePath, backHref }: PortswiggerLabsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Cuenta cuántos labs tiene cada categoría, y agrupa los artículos por categoría.
  const { countByCategory, articlesByCategory } = useMemo(() => {
    const counts = new Map<string, number>()
    const grouped = new Map<string, ArticleMeta[]>()
    for (const article of articles) {
      if (!article.category) continue
      counts.set(article.category, (counts.get(article.category) ?? 0) + 1)
      const list = grouped.get(article.category) ?? []
      list.push(article)
      grouped.set(article.category, list)
    }
    // Dentro de cada categoría, ordena por el número "#N" del título (ascendente),
    // en vez del orden por fecha que trae getArticles().
    for (const list of grouped.values()) {
      list.sort((a, b) => extractLabNumber(a.title) - extractLabNumber(b.title))
    }
    return { countByCategory: counts, articlesByCategory: grouped }
  }, [articles])

  // Solo se renderizan como sección (con ancla) las categorías que ya tienen labs publicados.
  const categoriesWithContent = portswiggerCategories.filter((c) => (countByCategory.get(c.slug) ?? 0) > 0)
  const hasAnyContent = categoriesWithContent.length > 0

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6">
      {/* Sidebar de categorías: funciona como índice/ancla, no como filtro */}
      <aside
        className={cn(
          "shrink-0 border border-gray-800 rounded-xl bg-gray-900 md:sticky md:top-20 md:self-start transition-all duration-300 overflow-hidden",
          sidebarOpen ? "md:w-72 w-full" : "md:w-14 w-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          {sidebarOpen && (
            <Link href={backHref} className={cn("flex items-center gap-1.5 text-sm text-gray-400 transition-colors", accent.titleHover)}>
              <ChevronLeft className="h-4 w-4" />
              Volver a Writeups
            </Link>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="ml-auto text-gray-500 hover:text-gray-200 transition-colors"
            aria-label={sidebarOpen ? "Colapsar categorías" : "Expandir categorías"}
          >
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </button>
        </div>

        {sidebarOpen && (
          <nav className="py-2 max-h-[70vh] overflow-y-auto">
            {portswiggerCategories.map((cat) => {
              const count = countByCategory.get(cat.slug) ?? 0
              const clickable = count > 0

              if (!clickable) {
                // Sin labs todavía: se muestra en la lista para que se vea la estructura completa,
                // pero deshabilitada porque no hay ninguna sección a la que saltar.
                return (
                  <span
                    key={cat.slug}
                    className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-gray-600 cursor-default"
                  >
                    <span>{cat.name}</span>
                  </span>
                )
              }

              return (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 text-gray-300 hover:bg-gray-800/40 hover:text-white",
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", accent.dot)} />
                  <span className="flex-1">{cat.name}</span>
                  <span className="text-xs text-gray-500 shrink-0">{count}</span>
                </a>
              )
            })}
          </nav>
        )}
      </aside>

      {/* Columna principal: TODAS las categorías con contenido, listadas una tras otra */}
      <div className="flex-1 min-w-0 flex flex-col gap-12">
        {hasAnyContent ? (
          categoriesWithContent.map((cat) => (
            <section key={cat.slug} id={cat.slug} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800">{cat.name}</h2>
              <div className="flex flex-col gap-4">
                {(articlesByCategory.get(cat.slug) ?? []).map((article) => (
                  <Link key={article.slug} href={`${basePath}/${article.slug}`} className="group">
                    <Card
                      className={cn(
                        "bg-gray-900 border-gray-800 transition-all duration-300 hover:shadow-lg",
                        accent.cardHover,
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <time dateTime={article.date}>{formatDate(article.date)}</time>
                        </div>
                        {article.difficulty && difficultyStyles[article.difficulty] && (
                          <Badge className={cn("mb-1.5 w-fit", difficultyStyles[article.difficulty].className)}>
                            {difficultyStyles[article.difficulty].label}
                          </Badge>
                        )}
                        <CardTitle className={cn("text-white transition-colors flex items-center justify-between gap-2", accent.titleHover)}>
                          {article.title}
                          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                        </CardTitle>
                        <CardDescription className="text-gray-400 leading-relaxed">
                          {article.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 rounded-xl border border-dashed border-gray-800 bg-gray-900/30">
            <FlaskConical className="h-10 w-10 text-gray-700 mb-3" />
            <p className="text-gray-400 max-w-md">
              Aún no hay labs publicados en ninguna categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}