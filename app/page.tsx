import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { sections } from "@/lib/navigation"

export default function HomePage() {
  const featuredPosts = [
    {
      id: 1,
      title: "Técnicas Avanzadas de Reconocimiento en Red Team",
      excerpt:
        "Exploramos las metodologías más efectivas para la fase de reconocimiento en operaciones de Red Team, incluyendo OSINT y técnicas de enumeración.",
      category: "Red Team",
      href: "/red-team",
      date: "2024-01-15",
      readTime: "8 min",
      views: 1250,
      comments: 23,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Análisis de Vulnerabilidades en Aplicaciones Web",
      excerpt:
        "Guía completa sobre identificación y explotación de vulnerabilidades comunes en aplicaciones web modernas.",
      category: "Pentesting",
      href: "/pentesting",
      date: "2024-01-12",
      readTime: "12 min",
      views: 890,
      comments: 15,
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Herramientas Esenciales para Pentesting 2024",
      excerpt: "Revisión actualizada de las herramientas más importantes que todo pentester debe conocer y dominar.",
      category: "Herramientas",
      href: "/herramientas",
      date: "2024-01-10",
      readTime: "6 min",
      views: 2100,
      comments: 31,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  // Secciones de contenido para la cuadrícula de categorías (excluye Inicio y Sobre mí).
  const categories = sections.filter((s) => s.slug !== "inicio" && s.slug !== "sobre-mi")

  return (
    <div className="min-h-screen bg-gray-950">
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
              Dominando el
              <span className="text-red-500 block">Hacking Ético</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed text-pretty">
              Documentación técnica, análisis de vulnerabilidades y metodologías avanzadas en ciberseguridad ofensiva.
              Tu base de conocimiento en hacking ético y Red Team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3" asChild>
                <Link href="/writeups">
                  Explorar Contenido
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 bg-transparent"
                asChild
              >
                <Link href="/sobre-mi">Sobre mí</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Explora por Categoría</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.slug} href={category.href} className="group">
                  <Card className="h-full bg-gray-800 border-gray-700 hover:border-red-500 transition-all duration-300">
                    <CardHeader className="text-center">
                      <IconComponent className="h-12 w-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-white">{category.name}</CardTitle>
                      <CardDescription className="text-gray-400 leading-relaxed">
                        {category.subsections
                          ? `${category.subsections.length} categorías`
                          : category.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Posts Destacados</h2>
            <Button variant="ghost" className="text-red-400 hover:text-red-300" asChild>
              <Link href="/writeups">
                Ver todo el contenido
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={post.href} className="group">
                <Card className="h-full bg-gray-900 border-gray-800 hover:border-red-500 transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 text-white">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString("es-ES")}
                        </span>
                        <span>{post.readTime} lectura</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-900/20 to-gray-900">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Mantente Actualizado</h2>
            <p className="text-gray-300 mb-8">
              Recibe las últimas técnicas, herramientas y análisis de ciberseguridad directamente en tu correo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3">Suscribirse</Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
