import Link from "next/link"
import { ArrowLeft, Construction } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AccentTheme, SubSection } from "@/lib/navigation"

interface UnderConstructionProps {
  /** Nombre de la sección o subsección que se está construyendo. */
  title: string
  /** Slug usado en la línea de comando decorativa (p. ej. "red-team"). */
  moduleSlug: string
  accent: AccentTheme
  /** Subsecciones que llegarán; se muestran como vista previa (no clicables). */
  upcoming?: SubSection[]
}

/**
 * Estado "en construcción" para secciones y subsecciones sin artículos.
 * Usa el acento de color del menú y desaparece solo cuando se publica el primer .mdx.
 */
export function UnderConstruction({ title, moduleSlug, accent, upcoming = [] }: UnderConstructionProps) {
  return (
    <section className="py-16 px-4 flex-1">
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col items-center text-center rounded-xl border border-dashed border-gray-800 bg-gray-900/30 px-6 py-14">
          <span
            className={cn("flex h-16 w-16 items-center justify-center rounded-xl border mb-5", accent.iconBox)}
          >
            <Construction className={cn("h-8 w-8", accent.text)} />
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            <span className={accent.text}>{title}</span> está en construcción
          </h2>
          <p className="text-gray-400 max-w-md leading-relaxed text-pretty">
            Estoy preparando este contenido. Todavía no hay artículos publicados aquí, pero pronto vas a encontrar
            material nuevo.
          </p>

          {/* Línea de terminal decorativa */}
          <div className="mt-8 w-full max-w-md rounded-lg border border-gray-800 bg-black/60 px-4 py-3 text-left font-mono text-sm">
            <p className="text-gray-300">
              <span className={accent.text}>$</span> busa --module {moduleSlug} --status
            </p>
            <p className="text-gray-500">
              [!] Módulo en construcción
              <span className={cn("ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse", accent.dot)} />
            </p>
          </div>

          {upcoming.length > 0 && (
            <div className="mt-10 w-full">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-4">Lo que viene</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {upcoming.map((sub) => {
                  const SubIcon = sub.icon
                  return (
                    <li
                      key={sub.slug}
                      className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900 p-3 opacity-80"
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
                          accent.iconBox,
                        )}
                      >
                        <SubIcon className={cn("h-4 w-4", accent.text)} />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-white">{sub.name}</span>
                        <span className="block text-xs text-gray-400 leading-relaxed">{sub.description}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          <Link
            href="/"
            className={cn(
              "mt-10 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors",
              accent.button,
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
