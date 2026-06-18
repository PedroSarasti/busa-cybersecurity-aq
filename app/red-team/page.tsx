import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, ArrowRight, Calendar, Eye, MessageCircle, Target, Zap, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RedTeamPage() {
  const redTeamPosts = [
    {
      id: 1,
      title: "Metodologías de Reconocimiento Avanzado",
      excerpt: "Técnicas OSINT y enumeración para operaciones de Red Team efectivas.",
      date: "2024-01-15",
      readTime: "10 min",
      views: 1250,
      comments: 23,
      image: "/placeholder.svg?height=200&width=400&text=Reconocimiento",
    },
    {
      id: 2,
      title: "Evasión de EDR y Técnicas Anti-Forenses",
      excerpt: "Estrategias para evitar detección en entornos corporativos modernos.",
      date: "2024-01-12",
      readTime: "15 min",
      views: 890,
      comments: 15,
      image: "/placeholder.svg?height=200&width=400&text=Evasión+EDR",
    },
    {
      id: 3,
      title: "Lateral Movement en Active Directory",
      excerpt: "Técnicas de movimiento lateral y escalación de privilegios en AD.",
      date: "2024-01-10",
      readTime: "12 min",
      views: 2100,
      comments: 31,
      image: "/placeholder.svg?height=200&width=400&text=Active+Directory",
    },
  ]

  const redTeamTechniques = [
    { name: "OSINT", description: "Recopilación de información de fuentes abiertas", icon: Target },
    { name: "Social Engineering", description: "Técnicas de ingeniería social", icon: Users },
    { name: "Payload Development", description: "Desarrollo de cargas útiles personalizadas", icon: Zap },
    { name: "Post-Exploitation", description: "Técnicas de post-explotación", icon: Lock },
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
              <Link href="/" className="text-gray-300 hover:text-red-400 transition-colors">
                Inicio
              </Link>
              <Link href="/red-team" className="text-white hover:text-red-400 transition-colors">
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
      <section className="py-20 px-4 bg-gradient-to-br from-red-900/20 via-gray-950 to-black">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-red-500">Red Team</span> Operations
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Metodologías ofensivas, técnicas de evasión y estrategias avanzadas para operaciones de Red Team
              efectivas.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
              Explorar Técnicas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Red Team Techniques */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Técnicas Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {redTeamTechniques.map((technique, index) => {
              const IconComponent = technique.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 hover:border-red-500 transition-all duration-300 cursor-pointer group"
                >
                  <CardHeader className="text-center">
                    <IconComponent className="h-12 w-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-white">{technique.name}</CardTitle>
                    <CardDescription className="text-gray-400">{technique.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Red Team Posts */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Artículos de Red Team</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {redTeamPosts.map((post) => (
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
                    <Badge className="bg-red-600 text-white">Red Team</Badge>
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
    </div>
  )
}
