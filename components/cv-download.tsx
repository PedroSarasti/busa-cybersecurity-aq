"use client"

import { useState } from "react"
import { Download, Lock, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CvDownload() {
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error ?? "No se pudo descargar el CV.")
        setLoading(false)
        return
      }

      // Descarga del blob del PDF.
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "CV-Pedro-Bustamante-2026.pdf"
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)

      setLoading(false)
      setCode("")
      setOpen(false)
    } catch {
      setError("Ocurrió un error. Inténtalo de nuevo.")
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
        if (!value) {
          setError(null)
          setCode("")
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Download className="mr-2 h-4 w-4" />
          Descargar CV
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-red-600/10 border border-red-600/30">
              <Lock className="h-5 w-5 text-red-500" />
            </span>
            Descarga protegida
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Este CV está protegido. Ingresa el código de acceso para descargarlo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cv-code" className="text-gray-300">
              Código de acceso
            </Label>
            <Input
              id="cv-code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Introduce el código"
              autoComplete="off"
              className="bg-gray-950 border-gray-700 text-white placeholder:text-gray-600 focus-visible:ring-red-500"
            />
            {error && (
              <p className="flex items-center gap-1.5 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading || code.trim().length === 0}
              className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
