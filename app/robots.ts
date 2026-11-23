import type { MetadataRoute } from "next"

/** URL base del sitio. Ajusta a tu dominio de producción. */
const BASE_URL = "https://busa-cybersecurity.vercel.app"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
