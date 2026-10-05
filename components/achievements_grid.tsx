"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, Eye, ExternalLink, Flag, GraduationCap, ImageOff, Medal, Star, Trophy } from "lucide-react"
import { achievementTypeLabels, achievementTypes, type Achievement } from "@/lib/achievements"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const typeIcons = {
  certificacion: Award,
  diploma: GraduationCap,
  ctf: Flag,
  insignia: Medal,
  reconocimiento: Star,
}

type AchievementCardProps = {
  achievement: Achievement
  onOpen: () => void
  variant?: "featured"
}

export function AchievementCard({ achievement, onOpen, variant }: AchievementCardProps) {
  const Icon = typeIcons[achievement.type]
  const hasFile = Boolean(achievement.file)

  return (
    <Card
      onClick={() => hasFile && onOpen()}
      className={cn(
        "group h-full flex flex-col bg-gray-900 border-gray-800 transition-colors",
        variant === "featured" && "border-red-500/40 shadow-[0_0_24px_rgba(220,38,38,0.08)]",
        hasFile ? "cursor-pointer hover:border-red-500" : "opacity-90",
      )}
    >
      <CardContent className="flex flex-1 flex-col pt-6 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 border border-red-600/30">
            <Icon className="h-6 w-6 text-red-500" />
          </div>
          {hasFile ? (
            <span className="flex items-center gap-1 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="h-3.5 w-3.5" />
              Ver diploma
            </span>
          ) : (
            <Badge className="bg-gray-800 text-gray-500 border border-gray-700 text-[10px]">
              Próximamente
            </Badge>
          )}
        </div>
        <p className="font-bold text-white mt-4">{achievement.name}</p>
        <p className="text-sm text-gray-400">{achievement.issuer}</p>
        {variant === "featured" && achievement.description && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-400">{achievement.description}</p>
        )}
        {(achievement.date || achievement.credentialId) && (
          <div className="mt-auto flex items-center justify-between pt-3">
            {achievement.date ? <span className="text-xs text-gray-500">{achievement.date}</span> : <span />}
            {achievement.credentialId && (
              <span className="text-xs text-gray-500 font-mono">ID: {achievement.credentialId}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AchievementDialog({ selected, onClose }: { selected: Achievement | null; onClose: () => void }) {
  return (
    <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-red-500" />
            {selected?.name}
            <span className="text-sm font-normal text-gray-400">· {selected?.issuer}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-lg border border-gray-800 bg-gray-950 overflow-hidden">
          {selected?.file ? (
            selected.isPdf ? (
              <iframe src={selected.file} title={`Diploma ${selected.name}`} className="w-full h-[60vh]" />
            ) : (
              <div className="relative w-full h-[60vh]">
                <Image
                  src={selected.file}
                  alt={`Diploma de ${selected.name} emitido por ${selected.issuer}`}
                  fill
                  className="object-contain"
                />
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-gray-500">
              <ImageOff className="h-10 w-10" />
              <p>Diploma no disponible todavía.</p>
            </div>
          )}
        </div>
        {(selected?.file || selected?.credentialUrl) && (
          <div className="flex flex-wrap justify-end gap-3">
            {selected?.credentialUrl && (
              <Button asChild className="bg-red-600 hover:bg-red-500">
                <Link href={selected.credentialUrl} target="_blank" rel="noopener noreferrer">
                  Verificar credencial
                  <ExternalLink data-icon="inline-end" />
                </Link>
              </Button>
            )}
            {selected?.file && (
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                asChild
              >
                <a href={selected.file} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Abrir en pestaña nueva
                </a>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function FeaturedAchievements({ items }: { items: Achievement[] }) {
  const [selected, setSelected] = useState<Achievement | null>(null)
  const featured = items.filter((item) => item.highlight).slice(0, 2)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((item) => (
          <AchievementCard key={item.id} achievement={item} onOpen={() => setSelected(item)} />
        ))}
        <Link
          href="/logros"
          className="group flex h-full min-h-full flex-col rounded-lg border border-dashed border-red-500/60 bg-gray-900/60 p-6 transition-colors hover:border-red-400 hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 border border-red-600/30">
              <Trophy className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <p className="font-bold text-white mt-4">Ver todos los logros</p>
          <p className="text-sm text-gray-400">{items.length} en total</p>
        </Link>
      </div>
      <AchievementDialog selected={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export function AchievementsGrid({ items }: { items: Achievement[] }) {
  const [activeType, setActiveType] = useState<"todos" | Achievement["type"]>("todos")
  const [selected, setSelected] = useState<Achievement | null>(null)
  const sorted = useMemo(() => [...items].sort((a, b) => b.sortDate.localeCompare(a.sortDate)), [items])
  const filtered = useMemo(
    () => (activeType === "todos" ? sorted : sorted.filter((item) => item.type === activeType)),
    [activeType, sorted],
  )
  const featured = activeType === "todos" ? sorted.filter((item) => item.highlight).slice(0, 2) : []
  const visible = activeType === "todos" ? filtered.filter((item) => !item.highlight) : filtered

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar logros">
        <Button type="button" size="sm" variant={activeType === "todos" ? "default" : "outline"} onClick={() => setActiveType("todos")} className={cn("h-7 px-2.5 text-xs", activeType === "todos" ? "bg-red-600 hover:bg-red-500" : "border-gray-700 text-gray-300")}>Todos ({items.length})</Button>
        {achievementTypes.map((type) => {
          const count = items.filter((item) => item.type === type).length
          return count > 0 ? <Button key={type} type="button" size="sm" variant={activeType === type ? "default" : "outline"} onClick={() => setActiveType(type)} className={cn("h-7 px-2.5 text-xs", activeType === type ? "bg-red-600 hover:bg-red-500" : "border-gray-700 text-gray-300")}>{achievementTypeLabels[type]} ({count})</Button> : null
        })}
      </div>
      {featured.length > 0 && (
        <section aria-labelledby="destacados-title">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="size-4 text-red-400" />
            <h2 id="destacados-title" className="text-lg font-semibold text-white">Destacados</h2>
          </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((item) => (
          <AchievementCard key={item.id} achievement={item} variant="featured" onOpen={() => setSelected(item)} />
            ))}
          </div>
        </section>
      )}
      <section aria-labelledby="mas-logros-title">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="mas-logros-title" className="text-lg font-semibold text-white">
            {activeType === "todos" ? "Más logros" : `${achievementTypeLabels[activeType]} (${filtered.length})`}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visible.map((item) => (
            <AchievementCard key={item.id} achievement={item} onOpen={() => setSelected(item)} />
          ))}
        </div>
      </section>
      <AchievementDialog selected={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default AchievementsGrid
