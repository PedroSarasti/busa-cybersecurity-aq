"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Award, ExternalLink, FileBadge, Medal, Star, Trophy } from "lucide-react"
import { achievementTypeLabels, achievementTypes, type Achievement } from "@/lib/achievements"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const typeIcons = { certificacion: Award, diploma: FileBadge, ctf: Trophy, insignia: Medal, reconocimiento: Star }
const typeDots = { certificacion: "bg-red-400", diploma: "bg-amber-400", ctf: "bg-cyan-400", insignia: "bg-fuchsia-400", reconocimiento: "bg-emerald-400" }

function AchievementRow({ achievement, onOpen, featured = false }: { achievement: Achievement; onOpen: () => void; featured?: boolean }) {
  const Icon = typeIcons[achievement.type]
  const content = (
    <div className={cn("flex min-h-[76px] items-center gap-3 rounded-lg border bg-gray-900/70 px-3 py-2.5 transition-colors", featured ? "border-red-500/35 hover:border-red-500/60" : "border-gray-800", achievement.file && "hover:bg-gray-900") }>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-400"><Icon className="size-4" aria-hidden="true" /></span>
      <span className="min-w-0 flex-1">
        <span className="block line-clamp-2 text-sm font-semibold leading-tight text-white">{achievement.name}</span>
        <span className="mt-1 block truncate text-xs text-gray-500">{achievement.issuer}{achievement.date && ` · ${achievement.date}`}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-gray-600"><span className={cn("size-1.5 rounded-full", typeDots[achievement.type])} />{!achievement.file && <span className="rounded-full border border-gray-700 px-1.5 py-0.5 text-gray-500">Próximamente</span>}</span>
    </div>
  )
  return achievement.file ? <button type="button" onClick={onOpen} className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950">{content}</button> : content
}

function AchievementDialog({ selected, onClose }: { selected: Achievement | null; onClose: () => void }) {
  return <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && onClose()}><DialogContent className="max-h-[90vh] overflow-y-auto border-gray-800 bg-gray-950 text-white sm:max-w-3xl">{selected && <><DialogHeader><DialogTitle>{selected.name}</DialogTitle><DialogDescription className="text-gray-400">{selected.issuer}{selected.date && ` · ${selected.date}`}</DialogDescription></DialogHeader><div className="flex flex-col gap-5">{selected.description && <p className="text-sm leading-relaxed text-gray-300">{selected.description}</p>}{selected.credentialId && <p className="text-xs text-gray-500">ID de credencial: <span className="font-mono text-gray-300">{selected.credentialId}</span></p>}{selected.file && (selected.isPdf ? <iframe title={`Documento de ${selected.name}`} src={selected.file} className="h-[55vh] w-full rounded-lg border border-gray-800 bg-white" /> : <img src={selected.file} alt={`Documento de ${selected.name}`} className="max-h-[55vh] w-full rounded-lg border border-gray-800 object-contain" />)}<div className="flex flex-wrap gap-3">{selected.credentialUrl && <Button asChild className="bg-red-600 hover:bg-red-500"><Link href={selected.credentialUrl} target="_blank" rel="noopener noreferrer">Verificar credencial <ExternalLink data-icon="inline-end" /></Link></Button>}{selected.file && <Button asChild variant="outline" className="border-gray-700 text-gray-300"><Link href={selected.file} target="_blank" rel="noopener noreferrer">Abrir documento <ExternalLink data-icon="inline-end" /></Link></Button>}</div></div></>}</DialogContent></Dialog>
}

export function FeaturedAchievements({ items }: { items: Achievement[] }) {
  const [selected, setSelected] = useState<Achievement | null>(null)
  const featured = items.filter((item) => item.highlight).slice(0, 2)
  return <><div className="grid grid-cols-1 gap-3 md:grid-cols-3">{featured.map((item) => <AchievementRow key={item.id} achievement={item} featured onOpen={() => setSelected(item)} />)}<Link href="/logros" className="flex min-h-[76px] items-center gap-3 rounded-lg border border-dashed border-red-500/60 bg-gray-900/60 px-3 py-2.5 transition-colors hover:border-red-400 hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"><span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-red-500/10 text-red-400"><Trophy className="size-4" /></span><span><span className="block text-sm font-semibold text-white">Ver todos los logros</span><span className="block text-xs text-gray-500">{items.length} en total</span></span></Link></div><AchievementDialog selected={selected} onClose={() => setSelected(null)} /></>
}

export function AchievementsGrid({ items }: { items: Achievement[] }) {
  const [activeType, setActiveType] = useState<"todos" | Achievement["type"]>("todos")
  const [selected, setSelected] = useState<Achievement | null>(null)
  const sorted = useMemo(() => [...items].sort((a, b) => b.sortDate.localeCompare(a.sortDate)), [items])
  const filtered = useMemo(() => activeType === "todos" ? sorted : sorted.filter((item) => item.type === activeType), [activeType, sorted])
  const featured = activeType === "todos" ? sorted.filter((item) => item.highlight).slice(0, 2) : []
  const visible = activeType === "todos" ? filtered.filter((item) => !item.highlight) : filtered
  return <div className="flex flex-col gap-6">{featured.length > 0 && <section aria-labelledby="destacados-title"><div className="mb-3 flex items-center gap-2"><Trophy className="size-4 text-red-400" /><h2 id="destacados-title" className="text-lg font-semibold text-white">Destacados</h2></div><div className="grid grid-cols-1 gap-3 md:grid-cols-2">{featured.map((item) => <AchievementRow key={item.id} achievement={item} featured onOpen={() => setSelected(item)} />)}</div></section>}<section aria-labelledby="mas-logros-title"><div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 id="mas-logros-title" className="text-lg font-semibold text-white">{activeType === "todos" ? "Más logros" : achievementTypeLabels[activeType]}</h2><div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar logros"><Button type="button" size="sm" variant={activeType === "todos" ? "default" : "outline"} onClick={() => setActiveType("todos")} className={cn("h-7 px-2.5 text-xs", activeType === "todos" ? "bg-red-600 hover:bg-red-500" : "border-gray-700 text-gray-300")}>Todos ({items.length})</Button>{achievementTypes.map((type) => { const count = items.filter((item) => item.type === type).length; return count > 0 && <Button key={type} type="button" size="sm" variant={activeType === type ? "default" : "outline"} onClick={() => setActiveType(type)} className={cn("h-7 px-2.5 text-xs", activeType === type ? "bg-red-600 hover:bg-red-500" : "border-gray-700 text-gray-300")}>{achievementTypeLabels[type]} ({count})</Button> })}</div></div><div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <AchievementRow key={item.id} achievement={item} onOpen={() => setSelected(item)} />)}</div></section><AchievementDialog selected={selected} onClose={() => setSelected(null)} /></div>
}

export default AchievementsGrid
