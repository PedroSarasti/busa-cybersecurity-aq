import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { AchievementsGrid } from "@/components/achievements_grid"
import { getAchievements } from "@/lib/achievements_files"

export const metadata: Metadata = {
  title: "Logros | BUSA Cybersecurity",
  description: "Certificaciones, diplomas, competencias CTF y reconocimientos de Pedro Bustamante.",
}

export default function LogrosPage() {
  const achievements = getAchievements()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <SiteHeader />
      <main>
        <section className="border-b border-gray-900 bg-gradient-to-b from-red-950/20 via-gray-950 to-gray-950 px-4 py-8">
          <div className="container mx-auto max-w-4xl">
            <Link href="/sobre-mi" className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400">
              <ArrowLeft className="size-4" />
              Volver a Sobre mí
            </Link>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-400">Sala de trofeos</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Logros</h1>
            <p className="mt-2 text-sm text-gray-400">
              Certificaciones, diplomas, competencias y reconocimientos · {achievements.length} logros
            </p>
          </div>
        </section>
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-4xl">
            <AchievementsGrid items={achievements} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
