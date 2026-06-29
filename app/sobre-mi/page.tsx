import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Award,
  Briefcase,
  GraduationCap,
  Terminal,
  ShieldCheck,
  Crosshair,
  Network,
  Bug,
  Code2,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Sobre mí | BUSA Cybersecurity",
  description:
    "Perfil profesional: especialista en hacking ético y Red Team. Habilidades, certificaciones y experiencia.",
}

const specializations = [
  { name: "Red Team Operations", icon: Crosshair },
  { name: "Penetration Testing", icon: ShieldCheck },
  { name: "Active Directory", icon: Network },
  { name: "Análisis de Malware", icon: Bug },
]

const skills = [
  "Penetration Testing",
  "Red Teaming",
  "OSINT",
  "Web App Security",
  "API Security",
  "Active Directory",
  "Privilege Escalation",
  "Evasión de EDR/AV",
  "Post-Explotación",
  "Ingeniería Social",
  "Reverse Engineering",
  "Threat Hunting",
]

const languages = [
  { name: "Python", icon: Code2 },
  { name: "Bash", icon: Terminal },
  { name: "PowerShell", icon: Terminal },
  { name: "C#", icon: Code2 },
  { name: "Go", icon: Code2 },
]

const certifications = [
  { name: "OSCP", issuer: "OffSec" },
  { name: "eJPT", issuer: "INE / eLearnSecurity" },
  { name: "CRTP", issuer: "Altered Security" },
  { name: "CEH", issuer: "EC-Council" },
  { name: "PNPT", issuer: "TCM Security" },
  { name: "CompTIA Security+", issuer: "CompTIA" },
]

const experience = [
  {
    role: "Red Team Operator",
    org: "Empresa de Ciberseguridad",
    period: "2023 — Actualidad",
    description:
      "Ejecución de operaciones de Red Team, simulación de adversarios y evaluación de la postura de seguridad de clientes corporativos.",
  },
  {
    role: "Pentester",
    org: "Consultora de Seguridad",
    period: "2021 — 2023",
    description:
      "Pruebas de penetración en aplicaciones web, APIs e infraestructura interna, con elaboración de reportes técnicos y ejecutivos.",
  },
  {
    role: "Analista de Seguridad Junior",
    org: "Departamento de TI",
    period: "2020 — 2021",
    description:
      "Monitoreo de seguridad, gestión de vulnerabilidades y soporte en la respuesta a incidentes.",
  },
]

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <SiteHeader />

      {/* Hero / presentación */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-900/20 via-gray-950 to-black border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-red-600/10 border border-red-600/30">
              <span className="text-4xl font-bold text-red-500">BU</span>
            </div>
            <div className="text-center md:text-left">
              <p className="text-red-400 font-medium mb-2">Ethical Hacker · Red Team Operator</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Sobre mí</h1>
              <p className="text-lg text-gray-300 leading-relaxed text-pretty">
                Especialista en seguridad ofensiva apasionado por el hacking ético, el Red Team y la investigación de
                vulnerabilidades. Documento aquí mi aprendizaje diario, laboratorios y experiencias en el mundo
                ofensivo.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
                  <Link href="/cv/BUSA-CV.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar CV
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  asChild
                >
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  asChild
                >
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  asChild
                >
                  <Link href="mailto:contacto@busacybersecurity.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
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
            <h2 className="text-2xl font-bold text-white mb-4">Quién soy</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Soy un profesional de la ciberseguridad enfocado en la seguridad ofensiva. Mi trabajo combina la
                ejecución de operaciones de Red Team con la investigación constante de nuevas técnicas de intrusión,
                evasión y post-explotación.
              </p>
              <p>
                Creé BUSA Cybersecurity como mi base de conocimiento personal: un espacio donde documento writeups de
                máquinas y laboratorios, metodologías de pentesting, desarrollo de herramientas y análisis de malware,
                con el objetivo de aprender en público y compartir con la comunidad.
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
                Lenguajes de programación
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
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="h-6 w-6 text-red-500" />
            Certificaciones
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert) => (
              <Card
                key={cert.name}
                className="bg-gray-900 border-gray-800 hover:border-red-500 transition-colors text-center"
              >
                <CardContent className="pt-6 pb-5">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 border border-red-600/30">
                    <Award className="h-6 w-6 text-red-500" />
                  </div>
                  <p className="font-bold text-white">{cert.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{cert.issuer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
                <p className="text-gray-400 font-medium mb-2">{exp.org}</p>
                <p className="text-gray-400 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-gray-600">
            <GraduationCap className="h-4 w-4" />
            Formación y aprendizaje continuo en plataformas como Hack The Box, TryHackMe y OffSec.
          </p>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}
