import { readdirSync } from "node:fs"
import path from "node:path"
import { achievements, type Achievement } from "@/lib/achievements"

// Carpeta donde se sueltan los diplomas. Solo se usa en el servidor (fs).
const CERTIFICATES_DIR = path.join(process.cwd(), "public", "certificados")

// Orden de preferencia si hay dos archivos con el mismo nombre (imagen antes que PDF).
const EXTENSIONS = ["png", "jpg", "jpeg", "webp", "pdf"]

// "Diplomado-Hacking Etico" y "diplomado_hacking_etico" se consideran el mismo nombre.
function normalize(value: string) {
  return value.toLowerCase().replace(/[\s-]+/g, "_")
}

/**
 * Devuelve los logros con `file` e `isPdf` resueltos automáticamente:
 * si existe public/certificados/<id>.<png|jpg|jpeg|webp|pdf> lo enlaza solo.
 * Si un logro ya trae `file` escrito a mano en lib/achievements.ts, se respeta.
 */
export function getAchievements(): Achievement[] {
  let files: string[]
  try {
    files = readdirSync(CERTIFICATES_DIR)
  } catch {
    return achievements
  }

  return achievements.map((achievement) => {
    if (achievement.file) return achievement

    const wanted = normalize(achievement.id)
    const candidates = files
      .map((name) => ({ name, ext: path.extname(name).slice(1).toLowerCase() }))
      .filter(({ name, ext }) => EXTENSIONS.includes(ext) && normalize(path.parse(name).name) === wanted)
      .sort((a, b) => EXTENSIONS.indexOf(a.ext) - EXTENSIONS.indexOf(b.ext))

    const match = candidates[0]
    if (!match) return achievement

    return {
      ...achievement,
      file: `/certificados/${encodeURIComponent(match.name)}`,
      isPdf: match.ext === "pdf",
    }
  })
}
