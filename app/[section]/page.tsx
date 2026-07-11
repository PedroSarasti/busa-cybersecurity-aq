import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FolderOpen } from "lucide-react"
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

          {subsections.length > 0 && (
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
          {subsections.length > 0 && (
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
      <section id="categorias" className="py-16 px-4 flex-1 scroll-mt-20">
        <div className="container mx-auto">
          {subsections.length > 0 ? (
            <>
              <h2 className="text-3xl font-bold text-white text-center mb-3">Categorías Principales</h2>
              <p className="text-center text-gray-400 mb-12">
                Explora el contenido organizado de {section.name}.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {subsections.map((sub) => {
                  const SubIcon = sub.icon
                  return (
                    <Link key={sub.slug} href={`${section.href}/${sub.slug}`} className="group">
                      <Card
                        className={cn(
                          "h-full bg-gray-900 border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                          accent.cardHover,
                          accent.glow,
                        )}
                      >
                        <CardHeader className="items-center text-center">
                          <span
                            className={cn(
                              "flex h-14 w-14 items-center justify-center rounded-xl border transition-colors mb-2",
                              accent.iconBox,
                              accent.iconHoverBg,
                            )}
                          >
                            <SubIcon className={cn("h-7 w-7", accent.text)} />
                          </span>
                          <CardTitle className={cn("text-white transition-colors", accent.titleHover)}>
                            {sub.name}
                          </CardTitle>
                          <CardDescription className="text-gray-400 leading-relaxed">
                            {sub.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  )
                })}
              </div>
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

      <SiteFooter />
    </div>
  )
}
