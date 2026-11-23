import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { sections } from "@/lib/navigation"
import { getLatestArticles } from "@/lib/content"

function formatDate(date: string): string {
  const parsed = new Date(date)
  if (!date || Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
}

export default function HomePage() {
  // Secciones de contenido (excluye Inicio y Sobre mí).
  const categories = sections.filter((s) => s.slug !== "inicio" && s.slug !== "sobre-mi")
  const mainCategories = categories.slice(0, 3)

  // Últimos artículos reales leídos de /content (3 son suficientes).
  const latest = getLatestArticles(
    categories.map((s) => ({ section: s.slug, subsections: (s.subsections ?? []).map((sub) => sub.slug) })),
    3,
  )

  const renderCategory = (category: (typeof categories)[number]) => {
    const IconComponent = category.icon
    return (
      <Link key={category.slug} href={category.href} className="group">
        <Card className="h-full bg-gray-800 border-gray-700 hover:border-red-500 transition-colors duration-300">
          <CardHeader className="text-center">
            <IconComponent className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-white">{category.name}</CardTitle>
            <CardDescription className="text-gray-400 leading-relaxed">
              {category.subsections ? `${category.subsections.length} categorías` : category.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
              Dominando el
              <span className="text-red-500 block">Hacking Ético</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed text-pretty">
              Documentación técnica, análisis de vulnerabilidades y metodologías avanzadas en ciberseguridad ofensiva.
              Tu base de conocimiento en hacking ético y Red Team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3" asChild>
                <Link href="/writeups">
                  Explorar Contenido
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 bg-transparent"
                asChild
              >
                <Link href="/sobre-mi">Sobre mí</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías: tres a la vista y un botón para el resto */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Categorías Principales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{mainCategories.map(renderCategory)}</div>
        </div>
      </section>

      {/* Últimos writeups: tres tarjetas con datos reales */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Últimos writeups</h2>
            <Button variant="ghost" className="text-red-400 hover:text-red-300" asChild>
              <Link href="/writeups">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {latest.map((article) => {
              const section = sections.find((s) => s.slug === article.section)
              const sub = section?.subsections?.find((s) => s.slug === article.subsection)
              return (
                <Link
                  key={`${article.section}/${article.subsection}/${article.slug}`}
                  href={`/${article.section}/${article.subsection}/${article.slug}`}
                  className="group"
                >
                  <Card className="h-full bg-gray-900 border-gray-800 hover:border-red-500 transition-colors duration-300">
                    <CardHeader>
                      {sub && <Badge className="mb-3 w-fit bg-red-600 text-white">{sub.name}</Badge>}
                      <CardTitle className="text-white group-hover:text-red-400 transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 line-clamp-3">{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
