import type { MetadataRoute } from "next"
import { sections } from "@/lib/navigation"
import { getAllArticleParams } from "@/lib/content"

/** URL base del sitio. Ajusta a tu dominio de producción. */
const BASE_URL = "https://busa-cybersecurity.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Página de inicio.
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ]

  // Secciones y subsecciones (excluyendo "Inicio", que ya es la home).
  for (const section of sections) {
    if (section.href === "/") continue

    entries.push({
      url: `${BASE_URL}${section.href}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })

    for (const sub of section.subsections ?? []) {
      entries.push({
        url: `${BASE_URL}${section.href}/${sub.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      })
    }
  }

  // Artículos MDX individuales.
  for (const { section, subsection, slug } of getAllArticleParams()) {
    entries.push({
      url: `${BASE_URL}/${section}/${subsection}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  }

  return entries
}
