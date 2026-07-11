import Link from "next/link"
import { Shield, Github, Linkedin } from "lucide-react"
import { sections } from "@/lib/navigation"

export function SiteFooter() {
  const contentSections = sections.filter((s) => s.slug !== "inicio" && s.slug !== "sobre-mi")
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold">
                <span className="text-red-500">BUSA</span> <span className="text-white">Cybersecurity</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
              Base de conocimiento personal sobre hacking ético y seguridad ofensiva: writeups, pentesting, Red Team,
              herramientas, programación y malware.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-md border border-gray-800 text-gray-400 hover:text-red-400 hover:border-red-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-md border border-gray-800 text-gray-400 hover:text-red-400 hover:border-red-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contenido</h3>
            <ul className="space-y-2 text-gray-400">
              {contentSections.map((section) => (
                <li key={section.slug}>
                  <Link href={section.href} className="hover:text-red-400 transition-colors">
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Perfil</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/sobre-mi" className="hover:text-red-400 transition-colors">
                  Sobre mí
                </Link>
              </li>
              <li>
                <Link href="/writeups" className="hover:text-red-400 transition-colors">
                  Writeups
                </Link>
              </li>
              <li>
                <Link href="/herramientas" className="hover:text-red-400 transition-colors">
                  Herramientas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-sm text-gray-500">
          © {year} BUSA Cybersecurity. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
