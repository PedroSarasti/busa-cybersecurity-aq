import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight, FileText } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { sections, getSubSection } from "@/lib/navigation"

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

  const Icon = subsection.icon

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-900/20 via-gray-950 to-black border-b border-gray-800">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="Migas de pan">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={section.href} className="hover:text-red-400 transition-colors">
              {section.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-200">{subsection.name}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/10 border border-red-600/30">
              <Icon className="h-6 w-6 text-red-500" />
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{subsection.name}</h1>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed text-pretty max-w-3xl">{subsection.description}</p>
        </div>
      </section>

      {/* Content list (empty state, listo para crecer) */}
      <section className="py-16 px-4 flex-1">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center text-center py-20 rounded-xl border border-dashed border-gray-800 bg-gray-900/30">
            <FileText className="h-12 w-12 text-gray-700 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Aún no hay artículos publicados</h2>
            <p className="text-gray-400 max-w-md">
              Esta categoría está lista para recibir contenido. Pronto encontrarás aquí writeups, notas y guías sobre{" "}
              <span className="text-red-400">{subsection.name}</span>.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
