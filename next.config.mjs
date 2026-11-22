/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/cv": ["./private/**/*"],
  },
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

  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
