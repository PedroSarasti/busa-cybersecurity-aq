"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen, CalendarDays, ArrowRight, FlaskConical } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { portswiggerCategories } from "@/lib/portswigger_categories"
import type { ArticleMeta } from "@/lib/content"
import type { AccentTheme } from "@/lib/navigation"
import { cn } from "@/lib/utils"

function formatDate(date: string): string {
  if (!date) return ""
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
}

interface PortswiggerLabsLayoutProps {
  articles: ArticleMeta[]
  accent: AccentTheme
  basePath: string
  backHref: string
}

export function PortswiggerLabsLayout({ articles, accent, basePath, backHref }: PortswiggerLabsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Cuenta cuántos labs tiene cada categoría, para mostrarlo en la barra lateral.
  const countByCategory = useMemo(() => {
    const counts = new Map<string, number>()
    for (const article of articles) {
      if (!article.category) continue
      counts.set(article.category, (counts.get(article.category) ?? 0) + 1)
    }
    return counts
  }, [articles])

  // Selecciona por defecto la primera categoría que ya tenga labs publicados.
  const firstWithContent = portswiggerCategories.find((c) => (countByCategory.get(c.slug) ?? 0) > 0)
  const [selected, setSelected] = useState<string>(firstWithContent?.slug ?? portswiggerCategories[0].slug)

  const selectedCategory = portswiggerCategories.find((c) => c.slug === selected)
  const visibleArticles = articles.filter((a) => a.category === selected)

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6">
      {/* Sidebar de categorías */}
      <aside
        className={cn(
          "shrink-0 border border-gray-800 rounded-xl bg-gray-900 transition-all duration-300 overflow-hidden",
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
              const isActive = cat.slug === selected
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelected(cat.slug)}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm border-l-2 transition-colors flex items-center gap-2",
                    isActive
                      ? "border-l-current bg-gray-800/70 text-white"
                      : "border-l-transparent text-gray-400 hover:bg-gray-800/40 hover:text-gray-200",
                    isActive && accent.text,
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", isActive ? accent.dot : "bg-gray-700")} />
                  <span className="flex-1">{cat.name}</span>
                  {count > 0 && (
                    <span className="text-xs text-gray-500 shrink-0">{count}</span>
                  )}
                </button>
              )
            })}
          </nav>
        )}
      </aside>

      {/* Columna principal: labs de la categoría seleccionada */}
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold text-white mb-6">{selectedCategory?.name}</h2>

        {visibleArticles.length > 0 ? (
          <div className="flex flex-col gap-4">
            {visibleArticles.map((article) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 rounded-xl border border-dashed border-gray-800 bg-gray-900/30">
            <FlaskConical className="h-10 w-10 text-gray-700 mb-3" />
            <p className="text-gray-400 max-w-md">
              Aún no hay labs publicados en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}