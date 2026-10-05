import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Award, BadgeCheck, FileBadge, Trophy } from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { AchievementsGrid } from "@/components/achievements_grid"
import { achievements, getAchievementTypeCount } from "@/lib/achievements"

export const metadata: Metadata = {
  title: "Logros | BUSA Cybersecurity",
  description: "Certificaciones, diplomas, competencias CTF y reconocimientos de Pedro Bustamante.",
}

export default function LogrosPage() {
  const stats = [
    { label: "logros", value: achievements.length, icon: Trophy },
    { label: "certificaciones", value: getAchievementTypeCount("certificacion"), icon: BadgeCheck },
    { label: "diplomas", value: getAchievementTypeCount("diploma"), icon: FileBadge },
    { label: "CTF", value: getAchievementTypeCount("ctf"), icon: Award },
  ].filter((stat) => stat.value > 0)

  return <div className="min-h-screen bg-gray-950 text-white"><SiteHeader /><main><section className="border-b border-gray-900 bg-gradient-to-b from-red-950/20 via-gray-950 to-gray-950 px-4 py-8 sm:py-10"><div className="container mx-auto max-w-5xl"><Link href="/sobre-mi" className="mb-5 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-red-400"><ArrowLeft className="size-4" />Volver a Sobre mí</Link><p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-400">Sala de trofeos</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Logros</h1><p className="mt-2 text-sm text-gray-400">Certificaciones, diplomas, competencias y reconocimientos.</p></div></section><section className="border-b border-gray-900 bg-gray-950 px-4 py-4"><div className="container mx-auto flex max-w-5xl flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-400">{stats.map((stat, index) => { const Icon = stat.icon; return <span key={stat.label} className="inline-flex items-center gap-1.5"><Icon className="size-3.5 text-red-400" /><strong className="text-white">{stat.value}</strong> {stat.label}{index < stats.length - 1 && <span className="ml-1 text-gray-700">·</span>}</span> })}</div></section><section className="px-4 py-8 sm:py-10"><div className="container mx-auto max-w-5xl"><AchievementsGrid items={achievements} /></div></section></main><SiteFooter /></div>
}
