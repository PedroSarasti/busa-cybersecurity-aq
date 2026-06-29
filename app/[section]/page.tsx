import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FolderOpen } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { sections, getSection } from "@/lib/navigation"

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

  const Icon = section.icon
  const subsections = section.subsections ?? []

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-900/20 via-gray-950 to-black border-b border-gray-800">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10 border border-red-600/30">
                <Icon className="h-6 w-6 text-red-500" />
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{section.name}</h1>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed text-pretty">{section.description}</p>
          </div>
        </div>
      </section>

      {/* Subsections */}
      <section className="py-16 px-4 flex-1">
        <div className="container mx-auto">
          {subsections.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-8">Categorías</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subsections.map((sub) => {
                  const SubIcon = sub.icon
                  return (
                    <Link key={sub.slug} href={`${section.href}/${sub.slug}`} className="group">
                      <Card className="h-full bg-gray-900 border-gray-800 hover:border-red-500 transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-800 group-hover:bg-red-600/10 transition-colors">
                              <SubIcon className="h-5 w-5 text-red-500" />
                            </span>
                            <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                          </div>
                          <CardTitle className="text-white group-hover:text-red-400 transition-colors">
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
