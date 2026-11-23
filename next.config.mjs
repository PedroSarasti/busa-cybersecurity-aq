const isDev = process.env.NODE_ENV !== "production"

/**
 * Content-Security-Policy construida a partir de lo que el sitio usa de verdad:
 * - Fuentes: next/font/google se descarga en el build y se sirve desde el propio dominio.
 * - Analytics: @vercel/analytics carga /_vercel/insights/script.js y envía datos a /_vercel/insights/*
 *   (mismo dominio en Vercel). Speed Insights no está instalado.
 * - Imágenes: todas locales (images.unoptimized, sin dominios remotos).
 * - Scripts: Next.js (App Router) inyecta scripts inline de arranque/hidratación; con cabeceras estáticas
 *   no se pueden usar nonces, por eso script-src lleva 'unsafe-inline' (sin 'unsafe-eval' en producción).
 * - Los diplomas en PDF se muestran en un <iframe> del mismo dominio (frame-src cae en default-src 'self').
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ")

const baseSecurityHeaders = [
  // SAMEORIGIN (no DENY): el sitio muestra los diplomas PDF en un iframe propio; terceros siguen bloqueados.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async redirects() {
    // "Herramientas" pasó de ser un menú propio a una subsección de Pentesting.
    return [
      { source: "/herramientas", destination: "/pentesting/herramientas", permanent: true },
      { source: "/herramientas/:path*", destination: "/pentesting/herramientas", permanent: true },
    ]
  },

  async headers() {
    return [
      {
        // Todas las rutas, salvo los diplomas (ver abajo).
        source: "/((?!certificados/).*)",
        headers: [...baseSecurityHeaders, { key: "Content-Security-Policy", value: csp }],
      },
      {
        // Los PDF de /certificados se muestran con el visor del navegador, que se rompe con
        // object-src 'none'; aquí solo se limita quién puede incrustarlos.
        source: "/certificados/:path*",
        headers: [
          ...baseSecurityHeaders,
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ]
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
