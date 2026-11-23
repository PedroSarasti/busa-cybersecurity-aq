import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Mail,
  Award,
  Briefcase,
  GraduationCap,
  Terminal,
  ShieldCheck,
  Crosshair,
  Bug,
  Code2,
  MessageCircle,
  MapPin,
  Phone,
  Target,
  Search,
  FileSearch,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CvDownload } from "@/components/cv-download"
import { FeaturedAchievements } from "@/components/achievements_grid"
import { getAchievements } from "@/lib/achievements_files"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Sobre mí | BUSA Cybersecurity",
  description:
    "Pedro José Bustamante Sarasti — Ingeniero de Software especializado en ciberseguridad ofensiva y penetration testing.",
}

const specializations = [
  { name: "Penetration Testing Web", icon: Crosshair },
  { name: "Análisis de Vulnerabilidades", icon: ShieldCheck },
  { name: "Análisis de Código (SAST)", icon: FileSearch },
  { name: "Automatización Ofensiva", icon: Terminal },
]

const skills = [
  "Burp Suite",
  "OWASP Top 10",
  "Nmap",
  "sqlmap",
  "Metasploit",
  "Postman",
  "SQL / NoSQL Injection",
  "XSS / CSRF",
  "Clickjacking",
  "CxOne (SAST)",
  "Análisis CVSS",
  "APIs REST",
]

const languages = [
  { name: "Python", icon: Code2 },
  { name: "Bash", icon: Terminal },
  { name: "PowerShell", icon: Terminal },
  { name: "C# / .NET", icon: Code2 },
  { name: "SQL", icon: Code2 },
  { name: "JavaScript", icon: Code2 },
]

const education = [
  {
    title: "Diplomado en Hacking Ético y Riesgos Cibernéticos",
    org: "Univ. Sergio Arboleda & Colsubsidio",
    period: "Mar. — May. 2026 · 80h",
  },
  {
    title: "Ingeniería de Software",
    org: "UNINPAHU, Bogotá",
    period: "Ene. 2019 — Nov. 2023",
  },
]

const experience = [
  {
    role: "Junior Engineer — Ciberseguridad Ofensiva",
    org: "NTT DATA · Bogotá, D.C.",
    period: "Oct. 2023 — Actualidad",
    bullets: [
      "Pruebas de penetración web manuales sobre aplicaciones en producción aplicando OWASP Top 10: inyecciones SQL/NoSQL, XSS, Clickjacking, CSRF y fallos de autenticación/autorización.",
      "Interceptación y manipulación de tráfico HTTP/S con Burp Suite y Postman para explotación manual en APIs REST y aplicaciones web.",
      "Pentests completos y retests semanales: reconocimiento con Nmap, análisis de superficie de ataque y reportes técnicos.",
      "Análisis estático (SAST) con CxOne sobre Java, JSP, JavaScript y HTML; acompañamiento a desarrollo en remediación.",
      "Clasificación de vulnerabilidades con CVSS para priorización de remediaciones.",
    ],
  },
  {
    role: "Software Developer — Backend",
    org: "SOFTTEK · Bogotá, D.C.",
    period: "Jul. 2022 — Jun. 2023",
    bullets: [
      "Desarrollo e implementación de funcionalidades empresariales sobre .NET / C#.",
      "Soporte y mantenimiento de plataformas en producción; corrección de bugs y optimización de rendimiento.",
      "Gestión de bases de datos con SQL Server: scripting, procedimientos almacenados y tuning de consultas.",
    ],
  },
]

const objectives = [
  "Iniciarme activamente en Bug Bounty (Bugcrowd & HackerOne).",
  "Obtener certificaciones avanzadas: eWPTX, OSCP / CPTS.",
  "Desarrollar herramientas de hacking propias en Python y Bash.",
  "Profundizar en Red Team, explotación avanzada y evasión de defensas.",
]

const socials = [
  { name: "GitHub", href: "https://github.com/PedroSarasti", icon: Github },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/pedro-josé-bustamante-sarasti",
    icon: Linkedin,
  },
  { name: "TryHackMe", href: "https://tryhackme.com/p/PedrinhoX", icon: ShieldCheck },
  { name: "Hack The Box", href: "#", icon: Target },
  { name: "HackerOne", href: "https://hackerone.com/pedrinhox?type=user", icon: Bug },
  { name: "Bugcrowd", href: "https://bugcrowd.com/h/PedrinhoX", icon: Search },
  { name: "Email", href: "mailto:pedrojbs1704@outlook.com", icon: Mail },

]

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero / presentación */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-900/20 via-gray-950 to-black border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl">
            {/* <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-red-600/10 border border-red-600/30">
              <span className="text-4xl font-bold text-red-500">PB</span>
            </div> */}
            <div className="relative h-60 w-60 shrink-0 overflow-hidden rounded-2xl border border-red-600/30">
              <Image
                src="/images_perfil/pedro_animada.jpeg"
                alt="Pedro José Bustamante Sarasti"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left">
              <p className="text-red-400 font-medium mb-2">
                Ingeniero de Software · Ciberseguridad Ofensiva & Penetration Testing
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
                Pedro José Bustamante Sarasti
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed text-pretty">
                Junior Engineer en seguridad ofensiva con experiencia real en pruebas de penetración sobre aplicaciones
                web en producción. Certificado eWPT (INE Security), documento aquí mi aprendizaje, laboratorios y camino
                hacia el Red Team.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-5 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Bogotá, D.C., Colombia
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-red-500" />
                  pedrojbs1704@outlook.com
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-red-500" />
                  319 637 9242
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                <CvDownload />
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  asChild
                >
                  <Link href="https://github.com/PedroSarasti" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  asChild
                >
                  <Link
                    href="https://linkedin.com/in/pedro-josé-bustamante-sarasti"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 flex-1 space-y-16">
        {/* Biografía + especialización */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Perfil profesional</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Ingeniero de Software con cerca de tres años de experiencia profesional, los últimos dos enfocados en
                ciberseguridad ofensiva dentro de un entorno corporativo real. Me desempeño como Junior Engineer en
                seguridad informática, participando en proyectos de identificación y mitigación de vulnerabilidades en
                código, pruebas de penetración sobre aplicaciones web en producción y acompañamiento técnico a equipos
                de desarrollo.
              </p>
              <p>
                Cuento con la certificación eWPT de INE Security y un Diplomado en Hacking Ético, respaldados por una
                base sólida en desarrollo backend que me permite entender las aplicaciones desde adentro. Mi enfoque
                actual está en consolidar mis habilidades ofensivas, incursionar en bug bounty y desarrollar
                herramientas propias en Python para automatización de procesos de hacking, con miras a crecer hacia Red
                Team.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Especialización</h2>
            <div className="space-y-3">
              {specializations.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 p-3"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-red-600/10">
                      <Icon className="h-5 w-5 text-red-500" />
                    </span>
                    <span className="text-gray-200 font-medium">{item.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Habilidades + lenguajes */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-red-500" />
                Habilidades técnicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} className="bg-gray-800 text-gray-200 hover:bg-red-600/20 border border-gray-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Code2 className="h-5 w-5 text-red-500" />
                Lenguajes & scripting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map((lang) => {
                  const Icon = lang.icon
                  return (
                    <div
                      key={lang.name}
                      className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-950 p-3"
                    >
                      <Icon className="h-4 w-4 text-red-500" />
                      <span className="text-gray-200 text-sm font-medium">{lang.name}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Certificaciones */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Award className="h-6 w-6 text-red-500" />
              Certificaciones & Diplomas
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Haz clic en una certificación para ver el diploma correspondiente.
            </p>
          </div>
          <FeaturedAchievements items={getAchievements()} />
        </section>

        {/* Experiencia (timeline) */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-red-500" />
            Experiencia profesional
          </h2>
          <div className="relative border-l border-gray-800 pl-8 space-y-10">
            {experience.map((exp, index) => (
              <div key={index} className="relative">
                <span className="absolute -left-[2.55rem] flex h-6 w-6 items-center justify-center rounded-full bg-red-600 border-4 border-gray-950">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                  <span className="text-sm text-red-400">{exp.period}</span>
                </div>
                <p className="text-gray-400 font-medium mb-3">{exp.org}</p>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-gray-400 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Formación + objetivos */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-red-500" />
              Formación
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.title} className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                  <h3 className="font-semibold text-white">{edu.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{edu.org}</p>
                  <p className="text-red-400 text-xs mt-1">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-red-500" />
              Objetivos profesionales
            </h2>
            <ul className="space-y-3">
              {objectives.map((obj) => (
                <li
                  key={obj}
                  className="flex gap-3 rounded-lg border border-gray-800 bg-gray-900 p-4 text-gray-300"
                >
                  <Crosshair className="h-5 w-5 shrink-0 text-red-500" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Redes / contacto */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Conecta conmigo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {socials.map((social) => {
              const Icon = social.icon
              const isPlaceholder = social.href === "#"
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 p-4 transition-colors hover:border-red-500 ${
                    isPlaceholder ? "opacity-70" : ""
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-red-600/10">
                    <Icon className="h-5 w-5 text-red-500" />
                  </span>
                  <span className="text-gray-200 font-medium text-sm">{social.name}</span>
                </Link>
              )
            })}
          </div>
          <p className="mt-4 text-xs text-gray-600">
            Los enlaces marcados con # son placeholders. Actualiza las URLs de Discord, Hack The Box, TryHackMe,
            HackerOne y Bugcrowd directamente en el código cuando las tengas.
          </p>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}
