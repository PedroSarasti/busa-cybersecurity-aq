import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CvDownload } from "@/components/cv-download"
import { sections, getAccent } from "@/lib/navigation"
import { getArticles, getLatestArticles } from "@/lib/content"
import { cn } from "@/lib/utils"

function formatDate(date: string): string {
  const parsed = new Date(date)
  if (!date || Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
}

export default function HomePage() {
  // Secciones de contenido (excluye Inicio, Sobre mí).
  const categories = sections.filter((s) => s.slug !== "inicio" && s.slug !== "sobre-mi")

  // Conteos reales leídos de /content.
  const counts = categories.map((section) => {
    const perSub = (section.subsections ?? []).map((sub) => ({
      sub,
      total: getArticles(section.slug, sub.slug).length,
    }))
    return { section, perSub, total: perSub.reduce((sum, item) => sum + item.total, 0) }
  })
  const writeups = counts.find((c) => c.section.slug === "writeups")
  const published = counts.filter((c) => c.total > 0)
  const totalArticles = counts.reduce((sum, c) => sum + c.total, 0)

  const latest = getLatestArticles(
    categories.map((s) => ({ section: s.slug, subsections: (s.subsections ?? []).map((sub) => sub.slug) })),
    6,
  )
  const lastUpdate = latest[0]

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero: texto a la izquierda, estado real del sitio a la derecha */}
      <section className="border-b border-gray-800 px-4 py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white text-balance leading-[1.05]">
              Dominando el <span className="text-red-500">Hacking Ético</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gray-300 leading-relaxed text-pretty">
              Writeups de laboratorios, técnicas de pentesting y Red Team, y lo que casi nadie documenta: cómo se
              corrige cada vulnerabilidad después de explotarla.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/writeups"
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Ver writeups
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/sobre-mi"
                className="text-sm font-medium text-gray-300 underline-offset-4 hover:text-white hover:underline"
              >
                Quién escribe esto
              </Link>
            </div>
          </div>

          {/* Panel con datos reales del contenido */}
          <div className="rounded-md border border-gray-800 bg-black/60 font-mono text-sm">
            <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-2.5 text-xs text-gray-500">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              estado del sitio
            </div>
            <div className="space-y-4 p-5 text-gray-300">
              <div>
                <p className="text-gray-500">artículos publicados</p>
                <p className="text-3xl font-medium text-white">{totalArticles}</p>
              </div>
              {writeups && (
                <ul className="space-y-1.5">
                  {writeups.perSub
                    .filter((item) => item.total > 0)
                    .map((item) => (
                      <li key={item.sub.slug} className="flex justify-between gap-4">
                        <span>{item.sub.name}</span>
                        <span className="text-white">{item.total}</span>
                      </li>
                    ))}
                </ul>
              )}
              <p className="border-t border-gray-800 pt-4 text-gray-400">
                {published.length} de {categories.length} secciones con contenido
              </p>
              {lastUpdate && (
                <p className="text-gray-400">
                  último: <span className="text-gray-200">{lastUpdate.title}</span>
                  <span className="block text-xs text-gray-500">{formatDate(lastUpdate.date)}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Últimos artículos: lista, no tarjetas */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold text-white">Últimos writeups</h2>
            <Link href="/writeups" className="text-sm text-red-400 hover:text-red-300">
              Ver todos
            </Link>
          </div>
          {latest.length > 0 ? (
            <ul className="divide-y divide-gray-800 border-y border-gray-800">
              {latest.map((article) => {
                const section = sections.find((s) => s.slug === article.section)
                const sub = section?.subsections?.find((s) => s.slug === article.subsection)
                return (
                  <li key={`${article.section}/${article.subsection}/${article.slug}`}>
                    <Link
                      href={`/${article.section}/${article.subsection}/${article.slug}`}
                      className="group grid gap-1 py-4 md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-6"
                    >
                      <time dateTime={article.date} className="font-mono text-xs text-gray-500">
                        {formatDate(article.date)}
                      </time>
                      <span className="text-gray-100 transition-colors group-hover:text-red-400">{article.title}</span>
                      <span className="text-xs text-gray-500">{sub?.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-gray-400">Todavía no hay artículos publicados.</p>
          )}
        </div>
      </section>

      {/* Secciones: jerarquía real, no una cuadrícula uniforme */}
      <section className="border-t border-gray-800 bg-gray-900/40 px-4 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-white mb-2">Qué hay en cada sección</h2>
          <p className="text-gray-400 mb-8 max-w-2xl">
            Las que ya tienen artículos van primero. El resto está en preparación y se activa solo con el primer
            artículo.
          </p>
          <ul className="divide-y divide-gray-800 border-y border-gray-800">
            {[...counts]
              .sort((a, b) => Number(b.total > 0) - Number(a.total > 0))
              .map(({ section, total }) => {
                const accent = getAccent(section)
                const Icon = section.icon
                const live = total > 0
                return (
                  <li key={section.slug}>
                    <Link
                      href={section.href}
                      className="group flex items-start gap-4 py-4 transition-colors hover:bg-gray-900/60"
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
                          accent.iconBox,
                        )}
                      >
                        <Icon className={cn("h-4 w-4", accent.text)} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block font-medium transition-colors",
                            live ? "text-white" : "text-gray-300",
                            accent.titleHover,
                          )}
                        >
                          {section.name}
                        </span>
                        <span className="block text-sm text-gray-400 leading-relaxed">{section.description}</span>
                      </span>
                      <span className="shrink-0 pt-0.5 font-mono text-xs text-gray-500">
                        {live ? `${total} artículos` : "en construcción"}
                      </span>
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
      </section>

      {/* Contacto */}
      <section className="border-t border-gray-800 px-4 py-16">
        <div className="container mx-auto max-w-4xl grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Hablemos</h2>
            <p className="text-gray-400 max-w-xl leading-relaxed">
              Si buscas a alguien que encuentre fallas y también ayude a corregirlas, escríbeme o descarga mi hoja de
              vida.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                href="https://www.linkedin.com/in/pedro-jose-bustamante-sarasti/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/PedroSarasti"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="mailto:pedrojbs1704@outlook.com"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400"
              >
                <Mail className="h-4 w-4" /> Correo
              </a>
            </div>
          </div>
          <CvDownload />
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
