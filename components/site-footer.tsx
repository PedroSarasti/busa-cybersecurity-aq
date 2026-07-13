import Link from "next/link"
import { Shield, Github, Linkedin, Flag, Mail } from "lucide-react"
import { sections } from "@/lib/navigation"

export function SiteFooter() {
  const contentSections = sections.filter((s) => s.slug !== "inicio" && s.slug !== "sobre-mi")
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold">
                <span className="text-red-500">BUSA</span> <span className="text-white">Cybersecurity</span>
              </span>
            </div>
            <p className="text-gray-400 mb-3 max-w-md leading-relaxed">
              Base de conocimiento personal sobre hacking ético y seguridad ofensiva: writeups, pentesting, Red Team,
              herramientas, programación y malware.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/PedroSarasti"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-md border border-gray-800 text-gray-400 hover:text-red-400 hover:border-red-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/pedro-jose-bustamante-sarasti/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-md border border-gray-800 text-gray-400 hover:text-red-400 hover:border-red-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://tryhackme.com/p/PedrinhoX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TryHackMe"
                className="p-2 rounded-md border border-gray-800 text-gray-400 hover:text-red-400 hover:border-red-500 transition-colors"
              >
                <Flag className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:pedrojbs1704@outlook.com"
                aria-label="Correo electrónico"
                className="p-2 rounded-md border border-gray-800 text-gray-400 hover:text-red-400 hover:border-red-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Contenido</h3>
            <ul className="space-y-1.5 text-gray-400">
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
            <h3 className="text-white font-semibold mb-3">Perfil</h3>
            <ul className="space-y-1.5 text-gray-400">
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

        <div className="mt-6 pt-4 border-t border-gray-800 text-sm text-gray-500">
          © {year} BUSA Cybersecurity. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}