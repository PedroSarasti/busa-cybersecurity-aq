import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Award, BadgeCheck, FileBadge, Trophy } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { AchievementsGrid } from "@/components/achievements_grid"
import { Card, CardContent } from "@/components/ui/card"
import { achievements, getAchievementTypeCount } from "@/lib/achievements"

export const metadata: Metadata = {
  title: "Logros | BUSA Cybersecurity",
  description: "Certificaciones, diplomas, competencias CTF e insignias de Pedro Bustamante.",
}

const statItems = [
  { label: "Total de logros", value: achievements.length, icon: Trophy },
  { label: "Certificaciones", value: getAchievementTypeCount("certificacion"), icon: BadgeCheck },
  { label: "Diplomas", value: getAchievementTypeCount("diploma"), icon: FileBadge },
  { label: "CTF y reconocimientos", value: getAchievementTypeCount("ctf") + getAchievementTypeCount("reconocimiento"), icon: Award },
]

export default function LogrosPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />
      <main>
        <section className="border-b border-gray-900 bg-gradient-to-b from-red-950/20 via-gray-950 to-gray-950 px-4 py-16 sm:py-20">
          <div className="container mx-auto max-w-6xl">
            <Link href="/sobre-mi" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400">
              <ArrowLeft className="size-4" />
              Volver a Sobre mí
            </Link>
            <div className="max-w-3xl">
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-red-500/40 bg-red-500/10 shadow-[0_0_32px_rgba(220,38,38,0.18)]">
                <Trophy className="size-7 text-red-400" />
              </div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-red-400">Trayectoria profesional</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Logros y credenciales</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-400">Una vitrina de certificaciones, formación, competencias y reconocimientos que documentan mi camino en ciberseguridad ofensiva.</p>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-900 bg-gray-950 px-4 py-8">
          <div className="container mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4">
            {statItems.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="border-gray-800 bg-gray-900/70">
                  <CardContent className="flex items-center gap-3 p-4 sm:p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400"><Icon className="size-5" /></div>
                    <div><p className="text-2xl font-bold text-white">{stat.value}</p><p className="text-xs text-gray-500">{stat.label}</p></div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="container mx-auto max-w-6xl">
            <AchievementsGrid items={achievements} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
