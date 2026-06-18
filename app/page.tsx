import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Terminal, Users, Calendar, ArrowRight, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredPosts = [
    {
      id: 1,
      title: "Técnicas Avanzadas de Reconocimiento en Red Team",
      excerpt:
        "Exploramos las metodologías más efectivas para la fase de reconocimiento en operaciones de Red Team, incluyendo OSINT y técnicas de enumeración.",
      category: "Red Team",
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
      category: "Red Team",
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
      date: "2024-01-10",
      readTime: "6 min",
      views: 2100,
      comments: 31,
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const categories = [
    { name: "Red Team", count: 15, icon: Users },
    { name: "Herramientas", count: 18, icon: Terminal },
    { name: "Labs & Máquinas", count: 12, icon: Eye },
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">
                <span className="text-red-500">BUSA</span> <span className="text-white">Cybersecurity</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-red-400 transition-colors">
                Inicio
              </Link>
              <Link href="/red-team" className="text-gray-300 hover:text-red-400 transition-colors">
                Red Team
              </Link>
              <Link href="/herramientas" className="text-gray-300 hover:text-red-400 transition-colors">
                Herramientas
              </Link>
              <Link href="/contacto" className="text-gray-300 hover:text-red-400 transition-colors">
                Contacto
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Dominando el
              <span className="text-red-500 block">Hacking Ético</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Documentación técnica, análisis de vulnerabilidades y metodologías avanzadas en ciberseguridad ofensiva.
              Tu repositorio de conocimiento en Red Team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                Explorar Contenido
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 bg-transparent"
              >
                Últimos Posts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Categorías Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer group"
                >
                  <CardHeader className="text-center">
                    <IconComponent className="h-12 w-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-white">{category.name}</CardTitle>
                    <CardDescription className="text-gray-400">{category.count} artículos</CardDescription>
                  </CardHeader>
                </Card>
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
            <Button variant="ghost" className="text-red-400 hover:text-red-300">
              Ver todos los posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-gray-900 border-gray-800 hover:border-red-500 transition-all duration-300 overflow-hidden group cursor-pointer"
              >
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

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-red-500" />
                <span className="text-xl font-bold text-white">BUSA Cybersecurity</span>
              </div>
              <p className="text-gray-400 mb-4">
                Repositorio personal de conocimiento en ciberseguridad ofensiva, hacking ético y metodologías de Red
                Team.
              </p>
              <p className="text-sm text-gray-500">© 2024 BUSA Cybersecurity. Todos los derechos reservados.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Categorías</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/red-team" className="hover:text-red-400 transition-colors">
                    Red Team
                  </Link>
                </li>
                <li>
                  <Link href="/herramientas" className="hover:text-red-400 transition-colors">
                    Herramientas
                  </Link>
                </li>
                <li>
                  <Link href="/labs-maquinas" className="hover:text-red-400 transition-colors">
                    Labs & Máquinas
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/sobre-mi" className="hover:text-red-400 transition-colors">
                    Sobre Mí
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-red-400 transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/recursos" className="hover:text-red-400 transition-colors">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="hover:text-red-400 transition-colors">
                    Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
