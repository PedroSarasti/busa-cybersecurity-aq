"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExpandableGridProps {
  /** Tarjetas visibles desde el inicio. */
  children: ReactNode
  /** Tarjetas que aparecen al pulsar el botón. */
  extra: ReactNode
  /** Texto del botón. */
  label: string
}

/** Cuadrícula de 3 columnas con un botón que despliega el resto de las opciones. */
export function ExpandableGrid({ children, extra, label }: ExpandableGridProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
        {open && extra}
      </div>
      {!open && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800"
            onClick={() => setOpen(true)}
            aria-expanded={open}
          >
            {label}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}
