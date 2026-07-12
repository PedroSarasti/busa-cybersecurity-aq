import fs from "fs"
import path from "path"
import matter from "gray-matter"

/** Carpeta raíz donde viven los artículos MDX, organizados por sección/subsección. */
const CONTENT_DIR = path.join(process.cwd(), "content")

/** Metadatos de un artículo (frontmatter + slug). */
export interface ArticleMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

/** Artículo completo, incluyendo el cuerpo MDX sin procesar. */
export interface Article extends ArticleMeta {
  content: string
}

function getSubDir(section: string, subsection: string) {
  return path.join(CONTENT_DIR, section, subsection)
}

function toMeta(fileName: string, data: Record<string, unknown>): ArticleMeta {
  return {
    slug: fileName.replace(/\.mdx$/, ""),
    title: typeof data.title === "string" ? data.title : fileName.replace(/\.mdx$/, ""),
    description: typeof data.description === "string" ? data.description : "",
    date: typeof data.date === "string" ? data.date : "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
  }
}

/**
 * Lista los artículos MDX de una subsección, ordenados por fecha descendente.
 * Devuelve un arreglo vacío si la carpeta no existe o no tiene archivos.
 */
export function getArticles(section: string, subsection: string): ArticleMeta[] {
  const dir = getSubDir(section, subsection)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
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
 * Recorre toda la carpeta /content y devuelve los parámetros de cada artículo.
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
        params.push({ section, subsection, slug: file.replace(/\.mdx$/, "") })
      }
    }
  }

  return params
}
