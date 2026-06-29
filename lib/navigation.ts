import {
  Home,
  FileText,
  Crosshair,
  Swords,
  Wrench,
  Code2,
  Bug,
  User,
  Box,
  ScrollText,
  Flag,
  Server,
  Globe,
  Plug,
  Network,
  Terminal,
  AppWindow,
  Smartphone,
  Cloud,
  EyeOff,
  Radio,
  ShieldOff,
  Anchor,
  Fish,
  Users,
  Radar,
  PawPrint,
  Package,
  SquareTerminal,
  Hash,
  Code,
  Microscope,
  FlaskConical,
  GitFork,
  ScanSearch,
  ShieldCheck,
  FileCode,
  type LucideIcon,
} from "lucide-react"

export interface SubSection {
  name: string
  slug: string
  description: string
  icon: LucideIcon
}

export interface Section {
  name: string
  slug: string
  href: string
  description: string
  icon: LucideIcon
  subsections?: SubSection[]
}

/**
 * Fuente única de verdad para toda la navegación del sitio.
 *
 * Para agregar una nueva sección o subsección en el futuro basta con
 * añadir un objeto a este arreglo: el navbar, las páginas de sección y
 * las páginas de subsección se generan automáticamente a partir de aquí.
 */
export const sections: Section[] = [
  {
    name: "Inicio",
    slug: "inicio",
    href: "/",
    description: "Página principal de BUSA Cybersecurity.",
    icon: Home,
  },
  {
    name: "Writeups",
    slug: "writeups",
    href: "/writeups",
    description:
      "Resoluciones detalladas de máquinas, retos y plataformas de hacking, junto con cheatsheets de referencia rápida.",
    icon: FileText,
    subsections: [
      { name: "Hack The Box", slug: "hack-the-box", description: "Writeups de máquinas y retos de HTB.", icon: Box },
      { name: "Cheatsheets", slug: "cheatsheets", description: "Hojas de referencia rápida y comandos clave.", icon: ScrollText },
      { name: "TryHackMe", slug: "tryhackme", description: "Resoluciones de salas y rutas de THM.", icon: Flag },
      { name: "VulnHub", slug: "vulnhub", description: "Soluciones de máquinas vulnerables de VulnHub.", icon: Server },
    ],
  },
  {
    name: "Pentesting",
    slug: "pentesting",
    href: "/pentesting",
    description:
      "Metodologías y técnicas de pruebas de penetración organizadas por dominio: web, APIs, redes y sistemas operativos.",
    icon: Crosshair,
    subsections: [
      { name: "Seguridad Web", slug: "seguridad-web", description: "OWASP, vulnerabilidades web y explotación.", icon: Globe },
      { name: "Seguridad de APIs", slug: "seguridad-apis", description: "Pruebas y abuso de APIs REST y GraphQL.", icon: Plug },
      { name: "Active Directory", slug: "active-directory", description: "Enumeración y ataques en entornos AD.", icon: Network },
      { name: "Linux", slug: "linux", description: "Escalada de privilegios y hardening en Linux.", icon: Terminal },
      { name: "Windows", slug: "windows", description: "Técnicas de explotación y privesc en Windows.", icon: AppWindow },
      { name: "Mobile", slug: "mobile", description: "Pentesting de aplicaciones Android e iOS.", icon: Smartphone },
      { name: "Cloud", slug: "cloud", description: "Seguridad ofensiva en AWS, Azure y GCP.", icon: Cloud },
    ],
  },
  {
    name: "Red Team",
    slug: "red-team",
    href: "/red-team",
    description:
      "Operaciones ofensivas avanzadas: sigilo, comando y control, evasión, persistencia e ingeniería social.",
    icon: Swords,
    subsections: [
      { name: "OPSEC", slug: "opsec", description: "Seguridad operacional para operaciones ofensivas.", icon: EyeOff },
      { name: "Command & Control (C2)", slug: "c2", description: "Infraestructura y frameworks de C2.", icon: Radio },
      { name: "Evasión de defensas", slug: "evasion", description: "Bypass de EDR, AV y mecanismos de detección.", icon: ShieldOff },
      { name: "Persistencia", slug: "persistencia", description: "Técnicas para mantener el acceso.", icon: Anchor },
      { name: "Phishing", slug: "phishing", description: "Campañas y pretextos de phishing.", icon: Fish },
      { name: "Ingeniería Social", slug: "ingenieria-social", description: "Manipulación del factor humano.", icon: Users },
      { name: "Active Directory Avanzado", slug: "active-directory-avanzado", description: "Ataques avanzados sobre AD.", icon: Network },
    ],
  },
  {
    name: "Herramientas",
    slug: "herramientas",
    href: "/herramientas",
    description: "Guías y notas de uso de las herramientas esenciales del arsenal ofensivo.",
    icon: Wrench,
    subsections: [
      { name: "Burp Suite", slug: "burp-suite", description: "Proxy y análisis de aplicaciones web.", icon: Bug },
      { name: "Nmap", slug: "nmap", description: "Escaneo de red y descubrimiento de servicios.", icon: Radar },
      { name: "BloodHound", slug: "bloodhound", description: "Análisis de rutas de ataque en AD.", icon: PawPrint },
      { name: "Impacket", slug: "impacket", description: "Colección de scripts para protocolos de red.", icon: Package },
      { name: "NetExec", slug: "netexec", description: "Post-explotación y movimiento lateral.", icon: SquareTerminal },
      { name: "Metasploit", slug: "metasploit", description: "Framework de explotación y payloads.", icon: Crosshair },
    ],
  },
  {
    name: "Programación",
    slug: "programacion",
    href: "/programacion",
    description: "Lenguajes y scripting aplicados a la seguridad ofensiva y la automatización.",
    icon: Code2,
    subsections: [
      { name: "Python", slug: "python", description: "Scripting ofensivo y automatización.", icon: FileCode },
      { name: "Bash", slug: "bash", description: "Automatización y scripting en Linux.", icon: SquareTerminal },
      { name: "PowerShell", slug: "powershell", description: "Scripting y ofensiva en Windows.", icon: Terminal },
      { name: "C#", slug: "csharp", description: "Desarrollo de herramientas para .NET.", icon: Hash },
      { name: "Go", slug: "go", description: "Tooling rápido y multiplataforma.", icon: Code },
    ],
  },
  {
    name: "Malware",
    slug: "malware",
    href: "/malware",
    description:
      "Análisis, desarrollo educativo y detección de malware, incluyendo ingeniería inversa y reglas YARA.",
    icon: Bug,
    subsections: [
      { name: "Análisis de malware", slug: "analisis", description: "Análisis estático y dinámico de muestras.", icon: Microscope },
      { name: "Desarrollo de malware", slug: "desarrollo", description: "Desarrollo con fines educativos y de investigación.", icon: FlaskConical },
      { name: "Ingeniería inversa", slug: "ingenieria-inversa", description: "Reverse engineering de binarios.", icon: GitFork },
      { name: "Reglas YARA", slug: "yara", description: "Creación de reglas de detección YARA.", icon: ScanSearch },
      { name: "Técnicas de detección", slug: "deteccion", description: "Indicadores y estrategias de detección.", icon: ShieldCheck },
    ],
  },
  {
    name: "Sobre mí",
    slug: "sobre-mi",
    href: "/sobre-mi",
    description: "Perfil profesional, habilidades, certificaciones y experiencia.",
    icon: User,
  },
]

/** Devuelve una sección por su slug. */
export function getSection(slug: string): Section | undefined {
  return sections.find((section) => section.slug === slug)
}

/** Devuelve una subsección dentro de una sección por sus slugs. */
export function getSubSection(sectionSlug: string, subSlug: string) {
  const section = getSection(sectionSlug)
  const subsection = section?.subsections?.find((sub) => sub.slug === subSlug)
  return { section, subsection }
}
