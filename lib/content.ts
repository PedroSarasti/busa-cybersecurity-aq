import fs from "fs"
import path from "path"
import matter from "gray-matter"

/** Carpeta raíz donde viven los artículos MDX, organizados por sección/subsección. */
const CONTENT_DIR = path.join(process.cwd(), "content")

/** Separador usado en el nombre de archivo para distinguir una sub-página de un artículo principal. */
const SUBPAGE_SEPARATOR = "__"

/** Metadatos de un artículo (frontmatter + slug). */
export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category?: string
  difficulty?: "apprentice" | "practitioner" | "expert"
}

/** Artículo completo, incluyendo el cuerpo MDX sin procesar. */
export interface Article extends ArticleMeta {
  content: string
}

function getSubDir(section: string, subsection: string) {
  return path.join(CONTENT_DIR, section, subsection)
}

/** true si el nombre de archivo (sin .mdx) corresponde a una sub-página (contiene el separador "__"). */
function isSubpageFile(fileNameWithoutExt: string): boolean {
  return fileNameWithoutExt.includes(SUBPAGE_SEPARATOR)
}

/**
 * Normaliza el valor de `difficulty` del frontmatter a minúsculas, para que
 * no importe si en el .mdx se escribió "APPRENTICE", "Apprentice" o "apprentice".
 * Si el valor no coincide con ninguno de los 3 válidos, devuelve undefined.
 */
function normalizeDifficulty(value: unknown): "apprentice" | "practitioner" | "expert" | undefined {
  if (typeof value !== "string") return undefined
  const normalized = value.trim().toLowerCase()
  if (normalized === "apprentice" || normalized === "practitioner" || normalized === "expert") {
    return normalized
  }
  return undefined
}

function toMeta(fileName: string, data: Record<string, unknown>): ArticleMeta {
  return {
    slug: fileName.replace(/\.mdx$/, ""),
    title: typeof data.title === "string" ? data.title : fileName.replace(/\.mdx$/, ""),
    description: typeof data.description === "string" ? data.description : "",
    date: typeof data.date === "string" ? data.date : "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    category: typeof data.category === "string" ? data.category : undefined,
    difficulty: normalizeDifficulty(data.difficulty),
  }
}

/**
 * Lista los artículos MDX de una subsección, ordenados por fecha descendente.
 * Excluye archivos de sub-página (los que tienen "__" en el nombre, ej. "slug__explicacion.mdx"),
 * esos no son artículos independientes y no deben aparecer en el listado.
 * Devuelve un arreglo vacío si la carpeta no existe o no tiene archivos.
 */
export function getArticles(section: string, subsection: string): ArticleMeta[] {
  const dir = getSubDir(section, subsection)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !isSubpageFile(file.replace(/\.mdx$/, "")))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8")
      const { data } = matter(raw)
      return toMeta(file, data)
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)))
}

/** Devuelve un artículo individual (frontmatter + contenido) o null si no existe. */
export function getArticle(section: string, subsection: string, slug: string): Article | null {
  const filePath = path.join(getSubDir(section, subsection), `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { ...toMeta(`${slug}.mdx`, data), content }
}

/**
 * Recorre toda la carpeta /content y devuelve los parámetros de cada artículo principal.
 * Excluye archivos de sub-página (ver getAllSubArticleParams para esos).
 * Se usa para generar las rutas estáticas de los artículos individuales.
 */
export function getAllArticleParams(): { section: string; subsection: string; slug: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const params: { section: string; subsection: string; slug: string }[] = []

  for (const section of fs.readdirSync(CONTENT_DIR)) {
    const sectionDir = path.join(CONTENT_DIR, section)
    if (!fs.statSync(sectionDir).isDirectory()) continue

    for (const subsection of fs.readdirSync(sectionDir)) {
      const subDir = path.join(sectionDir, subsection)
      if (!fs.statSync(subDir).isDirectory()) continue

      for (const file of fs.readdirSync(subDir)) {
        if (!file.endsWith(".mdx")) continue
        const nameWithoutExt = file.replace(/\.mdx$/, "")
        if (isSubpageFile(nameWithoutExt)) continue
        params.push({ section, subsection, slug: nameWithoutExt })
      }
    }
  }

  return params
}

/**
 * Lista las sub-páginas de un artículo (ej. "explicación a fondo" de un script),
 * buscando archivos con el patrón {slug}__*.mdx en la misma carpeta del artículo principal.
 * Devuelve un arreglo vacío si no tiene ninguna.
 */
export function getSubArticles(section: string, subsection: string, slug: string): ArticleMeta[] {
  const dir = getSubDir(section, subsection)
  if (!fs.existsSync(dir)) return []

  const prefix = `${slug}${SUBPAGE_SEPARATOR}`

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && file.startsWith(prefix))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8")
      const { data } = matter(raw)
      const subslug = file.replace(/\.mdx$/, "").slice(prefix.length)
      return toMeta(`${subslug}.mdx`, data)
    })
}

/** Devuelve una sub-página individual (frontmatter + contenido) o null si no existe. */
export function getSubArticle(section: string, subsection: string, slug: string, subslug: string): Article | null {
  const filePath = path.join(getSubDir(section, subsection), `${slug}${SUBPAGE_SEPARATOR}${subslug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { ...toMeta(`${subslug}.mdx`, data), content }
}

/**
 * Recorre toda la carpeta /content y devuelve los parámetros de cada sub-página.
 * Se usa para generar las rutas estáticas de las sub-páginas (ej. /writeups/portswigger/{slug}/{subslug}).
 */
export function getAllSubArticleParams(): { section: string; subsection: string; slug: string; subslug: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const params: { section: string; subsection: string; slug: string; subslug: string }[] = []

  for (const section of fs.readdirSync(CONTENT_DIR)) {
    const sectionDir = path.join(CONTENT_DIR, section)
    if (!fs.statSync(sectionDir).isDirectory()) continue

    for (const subsection of fs.readdirSync(sectionDir)) {
      const subDir = path.join(sectionDir, subsection)
      if (!fs.statSync(subDir).isDirectory()) continue

      for (const file of fs.readdirSync(subDir)) {
        if (!file.endsWith(".mdx")) continue
        const nameWithoutExt = file.replace(/\.mdx$/, "")
        if (!isSubpageFile(nameWithoutExt)) continue
        const [slug, subslug] = nameWithoutExt.split(SUBPAGE_SEPARATOR)
        params.push({ section, subsection, slug, subslug })
      }
    }
  }

  return params
}