"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Award, ExternalLink, FileBadge, ImageIcon, Medal, Trophy } from "lucide-react"
import { Achievement, achievementTypeLabels, achievementTypes } from "@/lib/achievements"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const typeIcons = {
  certificacion: Award,
  diploma: FileBadge,
  ctf: Trophy,
  insignia: Medal,
  reconocimiento: Medal,
}

const typeStyles = {
  certificacion: "border-red-500/40 text-red-300 bg-red-500/10",
  diploma: "border-amber-500/40 text-amber-300 bg-amber-500/10",
  ctf: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10",
  insignia: "border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-500/10",
  reconocimiento: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
}

function AchievementCard({ achievement, onOpen }: { achievement: Achievement; onOpen: () => void }) {
  const Icon = typeIcons[achievement.type]

  return (
    <button type="button" onClick={onOpen} className="group block w-full text-left">
      <Card className="h-full border-gray-800 bg-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-xl hover:shadow-red-950/30">
        <CardHeader className="items-center text-center">
          <div className="relative mb-2 flex size-24 items-center justify-center rounded-full border-2 border-red-500/70 bg-gray-950 shadow-[0_0_28px_rgba(220,38,38,0.18)] transition-transform duration-300 group-hover:scale-105">
            <div className="absolute inset-2 rounded-full border border-red-500/20" />
            <Icon className="size-10 text-red-400" aria-hidden="true" />
          </div>
          <Badge variant="outline" className={cn("mb-2", typeStyles[achievement.type])}>
            {achievementTypeLabels[achievement.type]}
          </Badge>
          <CardTitle className="text-white transition-colors group-hover:text-red-300">{achievement.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm font-medium text-gray-300">{achievement.issuer}</p>
          <p className="mt-1 text-xs text-gray-500">{achievement.date}</p>
        </CardContent>
        <CardFooter className="justify-center pt-0">
          <span className="text-xs text-gray-600 transition-colors group-hover:text-red-400">Ver detalle</span>
        </CardFooter>
      </Card>
    </button>
  )
}

export function AchievementsGrid({ items }: { items: Achievement[] }) {
  const [activeType, setActiveType] = useState<"todos" | Achievement["type"]>("todos")
  const [selected, setSelected] = useState<Achievement | null>(null)

  const featured = useMemo(() => items.filter((item) => item.highlight), [items])
  const filtered = useMemo(
    () => (activeType === "todos" ? items : items.filter((item) => item.type === activeType)),
    [activeType, items],
  )

  return (
    <div className="flex flex-col gap-10">
      {featured.length > 0 && activeType === "todos" && (
        <section aria-labelledby="destacados-title">
          <div className="mb-5 flex items-center gap-3">
            <Trophy className="size-5 text-red-400" aria-hidden="true" />
            <h2 id="destacados-title" className="text-xl font-semibold text-white">Destacados</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{featured.map((item) => <AchievementCard key={item.id} achievement={item} onOpen={() => setSelected(item)} />)}</div>
        </section>
      )}

      <section aria-labelledby="todos-logros-title">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="todos-logros-title" className="text-xl font-semibold text-white">Todos los logros</h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar logros">
            <Button type="button" size="sm" variant={activeType === "todos" ? "default" : "outline"} onClick={() => setActiveType("todos")} className={activeType === "todos" ? "bg-red-600 hover:bg-red-500" : "border-gray-700 text-gray-300"}>
              Todos ({items.length})
            </Button>
            {achievementTypes.map((type) => (
              <Button key={type} type="button" size="sm" variant={activeType === type ? "default" : "outline"} onClick={() => setActiveType(type)} className={activeType === type ? "bg-red-600 hover:bg-red-500" : "border-gray-700 text-gray-300"}>
                {achievementTypeLabels[type]} ({items.filter((item) => item.type === type).length})
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => <AchievementCard key={item.id} achievement={item} onOpen={() => setSelected(item)} />)}
        </div>
      </section>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-gray-800 bg-gray-950 text-white sm:max-w-3xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription className="text-gray-400">{selected.issuer} · {selected.date}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-5">
                {selected.description && <p className="text-sm leading-relaxed text-gray-300">{selected.description}</p>}
                {selected.credentialId && <p className="text-xs text-gray-500">ID de credencial: <span className="font-mono text-gray-300">{selected.credentialId}</span></p>}
                {selected.file ? (
                  selected.isPdf ? <iframe title={`Documento de ${selected.name}`} src={selected.file} className="h-[55vh] w-full rounded-lg border border-gray-800 bg-white" /> : <img src={selected.file} alt={`Documento de ${selected.name}`} className="max-h-[55vh] w-full rounded-lg border border-gray-800 object-contain" />
                ) : (
                  <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-gray-800 bg-gray-900/60 text-center text-sm text-gray-500">Próximamente estará disponible el diploma o certificado.</div>
                )}
                <div className="flex flex-wrap gap-3">
                  {selected.credentialUrl && <Button asChild className="bg-red-600 hover:bg-red-500"><Link href={selected.credentialUrl} target="_blank" rel="noopener noreferrer">Verificar credencial <ExternalLink data-icon="inline-end" /></Link></Button>}
                  {selected.file && <Button asChild variant="outline" className="border-gray-700 text-gray-300"><Link href={selected.file} target="_blank" rel="noopener noreferrer">Abrir documento <ExternalLink data-icon="inline-end" /></Link></Button>}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
