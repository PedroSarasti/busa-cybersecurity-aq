"use client"

import { useState } from "react"
import Image from "next/image"
import { Award, ExternalLink, ImageOff, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialId?: string
  /**
   * Ruta al diploma (imagen o PDF). Coloca tus archivos en
   * /public/certificados/ y actualiza esta ruta.
   * Déjalo vacío ("") si aún no tienes el archivo.
   */
  file?: string
  /** true si el archivo es un PDF (se abre en visor embebido). */
  isPdf?: boolean
}

export function Certifications({ items }: { items: Certification[] }) {
  const [selected, setSelected] = useState<Certification | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((cert) => {
          const hasFile = Boolean(cert.file)
          return (
            <Card
              key={cert.name}
              onClick={() => hasFile && setSelected(cert)}
              className={`group bg-gray-900 border-gray-800 transition-colors ${
                hasFile ? "cursor-pointer hover:border-red-500" : "opacity-90"
              }`}
            >
              <CardContent className="pt-6 pb-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 border border-red-600/30">
                    <Award className="h-6 w-6 text-red-500" />
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
                <p className="font-bold text-white mt-4">{cert.name}</p>
                <p className="text-sm text-gray-400">{cert.issuer}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{cert.date}</span>
                  {cert.credentialId && (
                    <span className="text-[10px] text-gray-600 font-mono">ID: {cert.credentialId}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(v) => !v && setSelected(null)}>
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
                <iframe
                  src={selected.file}
                  title={`Diploma ${selected.name}`}
                  className="w-full h-[60vh]"
                />
              ) : (
                <div className="relative w-full h-[60vh]">
                  <Image
                    src={selected.file || "/placeholder.svg"}
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

          {selected?.file && (
            <div className="flex justify-end">
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
