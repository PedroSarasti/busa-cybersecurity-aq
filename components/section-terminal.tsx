"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SectionTerminalProps {
  /** Nombre de la sección (se usa como módulo). */
  moduleName: string
  /** Nombres de subsecciones que se listan como módulos cargados. */
  items: string[]
  /** Clase de color de texto del acento (p. ej. "text-red-500"). */
  accentText: string
  /** Clase de color de fondo del acento para el punto/cursor. */
  accentDot: string
}

/**
 * Terminal animada que "escribe" una secuencia de comandos temáticos de la
 * sección. Es puramente decorativa/innovadora y se genera a partir del nombre
 * de la sección y sus subsecciones, por lo que cualquier sección nueva obtiene
 * su propia terminal automáticamente.
 */
export function SectionTerminal({ moduleName, items, accentText, accentDot }: SectionTerminalProps) {
  const slug = moduleName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")

  const lines = [
    { prompt: true, text: `busa --module ${slug} --init` },
    { prompt: false, text: `[*] Inicializando entorno de ${moduleName}...` },
    { prompt: false, text: `[+] Módulos disponibles: ${items.join(", ")}` },
    { prompt: false, text: `[✓] ${items.length} categorías cargadas correctamente.` },
    { prompt: true, text: `busa --list --status ready` },
    { prompt: false, text: `[✓] Entorno listo. Selecciona una categoría para continuar.` },
  ]

  const [visibleLines, setVisibleLines] = useState(0)
  const [typed, setTyped] = useState("")

  useEffect(() => {
    if (visibleLines >= lines.length) return
    const current = lines[visibleLines].text
    let i = 0
    const speed = lines[visibleLines].prompt ? 28 : 12
    const interval = setInterval(() => {
      i++
      setTyped(current.slice(0, i))
      if (i >= current.length) {
        clearInterval(interval)
        setTimeout(() => {
          setVisibleLines((v) => v + 1)
          setTyped("")
        }, lines[visibleLines].prompt ? 250 : 120)
      }
    }, speed)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleLines])

  const done = visibleLines >= lines.length

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-800 bg-gray-950/90 shadow-2xl">
      {/* Barra de título */}
      <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900/80 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 font-mono text-xs text-gray-500">busa@cybersecurity:~</span>
      </div>

      {/* Cuerpo */}
      <div className="min-h-[180px] p-4 font-mono text-sm leading-relaxed">
        {lines.slice(0, visibleLines).map((line, idx) => (
          <p key={idx} className="whitespace-pre-wrap break-words">
            {line.prompt ? (
              <>
                <span className={accentText}>$ </span>
                <span className="text-gray-200">{line.text}</span>
              </>
            ) : (
              <span className="text-gray-400">{line.text}</span>
            )}
          </p>
        ))}

        {!done && (
          <p className="whitespace-pre-wrap break-words">
            {lines[visibleLines].prompt ? (
              <>
                <span className={accentText}>$ </span>
                <span className="text-gray-200">{typed}</span>
              </>
            ) : (
              <span className="text-gray-400">{typed}</span>
            )}
            <span className={cn("ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse", accentDot)} />
          </p>
        )}
      </div>
    </div>
  )
}
