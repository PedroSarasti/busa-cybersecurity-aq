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
  Terminal,
  AppWindow,
  Smartphone,
  ShieldOff,
  Anchor,
  Users,
  Network,
  Radar,
  KeyRound,
  FileCode,
  SquareTerminal,
  Code,
  Microscope,
  FlaskConical,
  GitFork,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

export type Accent = "red" | "emerald" | "sky" | "amber" | "cyan" | "fuchsia"

export interface AccentTheme {
  /** Color de texto para el acento del título y los iconos. */
  text: string
  /** Gradiente de fondo del hero. */
  heroGradient: string
  /** Clases del botón CTA. */
  button: string
  /** Contenedor del icono (fondo + borde). */
  iconBox: string
  /** Borde de la tarjeta al hacer hover. */
  cardHover: string
  /** Fondo del icono al hacer hover dentro de una tarjeta. */
  iconHoverBg: string
  /** Sombra/glow al hacer hover. */
  glow: string
  /** Color de fondo para puntos/acentos pequeños. */
  dot: string
  /** Color del título de la tarjeta al hacer hover (clase literal group-hover). */
  titleHover: string
}

/**
 * Mapa de temas por acento. Se definen como strings literales completos
 * para que Tailwind los detecte en el escaneo de clases.
 */
export const accentThemes: Record<Accent, AccentTheme> = {
  red: {
    text: "text-red-500",
    heroGradient: "from-red-900/25 via-gray-950 to-black",
    button: "bg-red-600 hover:bg-red-700 text-white",
    iconBox: "bg-red-600/10 border-red-600/30",
    cardHover: "hover:border-red-500/70",
    iconHoverBg: "group-hover:bg-red-600/20",
    glow: "group-hover:shadow-red-600/20",
    dot: "bg-red-500",
    titleHover: "group-hover:text-red-400",
  },
  emerald: {
    text: "text-emerald-500",
    heroGradient: "from-emerald-900/25 via-gray-950 to-black",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    iconBox: "bg-emerald-600/10 border-emerald-600/30",
    cardHover: "hover:border-emerald-500/70",
    iconHoverBg: "group-hover:bg-emerald-600/20",
    glow: "group-hover:shadow-emerald-600/20",
    dot: "bg-emerald-500",
    titleHover: "group-hover:text-emerald-400",
  },
  sky: {
    text: "text-sky-500",
    heroGradient: "from-sky-900/25 via-gray-950 to-black",
    button: "bg-sky-600 hover:bg-sky-700 text-white",
    iconBox: "bg-sky-600/10 border-sky-600/30",
    cardHover: "hover:border-sky-500/70",
    iconHoverBg: "group-hover:bg-sky-600/20",
    glow: "group-hover:shadow-sky-600/20",
    dot: "bg-sky-500",
    titleHover: "group-hover:text-sky-400",
  },
  amber: {
    text: "text-amber-500",
    heroGradient: "from-amber-900/25 via-gray-950 to-black",
    button: "bg-amber-500 hover:bg-amber-600 text-black",
    iconBox: "bg-amber-500/10 border-amber-500/30",
    cardHover: "hover:border-amber-500/70",
    iconHoverBg: "group-hover:bg-amber-500/20",
    glow: "group-hover:shadow-amber-500/20",
    dot: "bg-amber-500",
    titleHover: "group-hover:text-amber-400",
  },
  cyan: {
    text: "text-cyan-400",
    heroGradient: "from-cyan-900/25 via-gray-950 to-black",
    button: "bg-cyan-500 hover:bg-cyan-600 text-black",
    iconBox: "bg-cyan-500/10 border-cyan-500/30",
    cardHover: "hover:border-cyan-400/70",
    iconHoverBg: "group-hover:bg-cyan-500/20",
    glow: "group-hover:shadow-cyan-500/20",
    dot: "bg-cyan-400",
    titleHover: "group-hover:text-cyan-300",
  },
  fuchsia: {
    text: "text-fuchsia-500",
    heroGradient: "from-fuchsia-900/25 via-gray-950 to-black",
    button: "bg-fuchsia-600 hover:bg-fuchsia-700 text-white",
    iconBox: "bg-fuchsia-600/10 border-fuchsia-600/30",
    cardHover: "hover:border-fuchsia-500/70",
    iconHoverBg: "group-hover:bg-fuchsia-600/20",
    glow: "group-hover:shadow-fuchsia-600/20",
    dot: "bg-fuchsia-500",
    titleHover: "group-hover:text-fuchsia-400",
  },
}

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
  /** Color de acento de la sección. */
  accent?: Accent
  /** Palabra/sufijo en blanco que acompaña al título de dos tonos. */
  heroSuffix?: string
  /** Etiqueta del botón principal del hero. */
  ctaLabel?: string
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
    accent: "red",
  },
  {
    name: "Writeups",
    slug: "writeups",
    href: "/writeups",
    description:
      "Resoluciones detalladas de máquinas, retos y plataformas de hacking, junto con cheatsheets de referencia rápida.",
    icon: FileText,
    accent: "sky",
    heroSuffix: "& Soluciones",
    ctaLabel: "Ver Writeups",
    subsections: [
      { name: "Hack The Box", slug: "hack-the-box", description: "Writeups de máquinas y retos de HTB.", icon: Box },
      { name: "TryHackMe", slug: "tryhackme", description: "Resoluciones de salas y rutas de THM.", icon: Flag },
      { name: "PortSwigger", slug: "portswigger", description: "Soluciones de labs de PortSwigger Web Security Academy.", icon: Bug },
      { name: "Cheatsheets", slug: "cheatsheets", description: "Hojas de referencia rápida y comandos clave.", icon: ScrollText },
    ],
  },
  {
    name: "Pentesting",
    slug: "pentesting",
    href: "/pentesting",
    description:
      "Metodologías y técnicas de pruebas de penetración organizadas por dominio: web, sistemas operativos y móviles.",
    icon: Crosshair,
    accent: "amber",
    heroSuffix: "Offensive",
    ctaLabel: "Explorar Técnicas",
    subsections: [
      { name: "Seguridad Web", slug: "seguridad-web", description: "OWASP, vulnerabilidades web y explotación.", icon: Globe },
      { name: "Linux", slug: "linux", description: "Escalada de privilegios y hardening en Linux.", icon: Terminal },
      { name: "Windows", slug: "windows", description: "Técnicas de explotación y privesc en Windows.", icon: AppWindow },
      { name: "Mobile", slug: "mobile", description: "Pentesting de aplicaciones Android e iOS.", icon: Smartphone },
    ],
  },
  {
    name: "Red Team",
    slug: "red-team",
    href: "/red-team",
    description:
      "Operaciones ofensivas avanzadas: evasión de defensas, persistencia, ingeniería social y ataques sobre Active Directory.",
    icon: Swords,
    accent: "red",
    heroSuffix: "Operations",
    ctaLabel: "Explorar Técnicas",
    subsections: [
      { name: "Evasión de defensas", slug: "evasion", description: "Bypass de EDR, AV y mecanismos de detección.", icon: ShieldOff },
      { name: "Persistencia", slug: "persistencia", description: "Técnicas para mantener el acceso.", icon: Anchor },
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
    accent: "emerald",
    heroSuffix: "Arsenal",
    ctaLabel: "Explorar Arsenal",
    subsections: [
      { name: "Burp Suite", slug: "burp-suite", description: "Proxy y análisis de aplicaciones web.", icon: Bug },
      { name: "Nmap", slug: "nmap", description: "Escaneo de red y descubrimiento de servicios.", icon: Radar },
      { name: "Metasploit", slug: "metasploit", description: "Framework de explotación y payloads.", icon: Crosshair },
      { name: "John the Ripper", slug: "john-the-ripper", description: "Cracking de contraseñas y hashes.", icon: KeyRound },
    ],
  },
  {
    name: "Programación",
    slug: "programacion",
    href: "/programacion",
    description: "Lenguajes y scripting aplicados a la seguridad ofensiva y la automatización.",
    icon: Code2,
    accent: "cyan",
    heroSuffix: "& Scripting",
    ctaLabel: "Ver Lenguajes",
    subsections: [
      { name: "Python", slug: "python", description: "Scripting ofensivo y automatización.", icon: FileCode },
      { name: "Bash", slug: "bash", description: "Automatización y scripting en Linux.", icon: SquareTerminal },
      { name: "PowerShell", slug: "powershell", description: "Scripting y ofensiva en Windows.", icon: Terminal },
      { name: "Go", slug: "go", description: "Tooling rápido y multiplataforma.", icon: Code },
    ],
  },
  {
    name: "Malware",
    slug: "malware",
    href: "/malware",
    description:
      "Análisis, desarrollo educativo y detección de malware, incluyendo ingeniería inversa y estrategias de detección.",
    icon: Bug,
    accent: "fuchsia",
    heroSuffix: "Research",
    ctaLabel: "Explorar Research",
    subsections: [
      { name: "Análisis de malware", slug: "analisis", description: "Análisis estático y dinámico de muestras.", icon: Microscope },
      { name: "Desarrollo de malware", slug: "desarrollo", description: "Desarrollo con fines educativos y de investigación.", icon: FlaskConical },
      { name: "Ingeniería inversa", slug: "ingenieria-inversa", description: "Reverse engineering de binarios.", icon: GitFork },
      { name: "Técnicas de detección", slug: "deteccion", description: "Indicadores y estrategias de detección.", icon: ShieldCheck },
    ],
  },
  {
    name: "Sobre mí",
    slug: "sobre-mi",
    href: "/sobre-mi",
    description: "Perfil profesional, habilidades, certificaciones y experiencia.",
    icon: User,
    accent: "red",
  },
]

/** Devuelve el tema de acento de una sección (rojo por defecto). */
export function getAccent(section?: Section): AccentTheme {
  return accentThemes[section?.accent ?? "red"]
}

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
