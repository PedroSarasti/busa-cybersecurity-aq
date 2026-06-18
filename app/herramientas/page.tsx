import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, Download, Star, ExternalLink, Code, Zap, Search, Lock } from "lucide-react"
import Link from "next/link"

export default function HerramientasPage() {
  const toolCategories = [
    { name: "Reconocimiento", description: "Herramientas de OSINT y enumeración", icon: Search, count: 12 },
    { name: "Explotación", description: "Frameworks y exploits", icon: Zap, count: 8 },
    { name: "Post-Explotación", description: "Herramientas de persistencia", icon: Lock, count: 6 },
    { name: "Análisis", description: "Herramientas de análisis forense", icon: Code, count: 10 },
  ]

  const featuredTools = [
    {
      name: "Nmap",
      description: "Scanner de red y auditoría de seguridad",
      category: "Reconocimiento",
      rating: 5,
      downloads: "10M+",
      link: "https://nmap.org",
      features: ["Port Scanning", "OS Detection", "Service Enumeration", "NSE Scripts"],
    },
    {
      name: "Metasploit",
      description: "Framework de penetration testing",
      category: "Explotación",
      rating: 5,
      downloads: "5M+",
      link: "https://metasploit.com",
      features: ["Exploit Database", "Payload Generation", "Post-Exploitation", "Automation"],
    },
    {
      name: "Burp Suite",
      description: "Plataforma de testing de aplicaciones web",
      category: "Análisis",
      rating: 5,
      downloads: "2M+",
      link: "https://portswigger.net",
      features: ["Web Proxy", "Scanner", "Intruder", "Repeater"],
    },
    {
      name: "Wireshark",
      description: "Analizador de protocolos de red",
      category: "Análisis",
      rating: 5,
      downloads: "8M+",
      link: "https://wireshark.org",
      features: ["Packet Capture", "Protocol Analysis", "Deep Inspection", "Live Capture"],
    },
    {
      name: "Cobalt Strike",
      description: "Plataforma de adversary simulation",
      category: "Post-Explotación",
      rating: 4,
      downloads: "100K+",
      link: "#",
      features: ["Beacon", "Malleable C2", "Team Server", "Social Engineering"],
    },
    {
      name: "OWASP ZAP",
      description: "Proxy de seguridad para aplicaciones web",
      category: "Análisis",
      rating: 4,
      downloads: "3M+",
      link: "https://zaproxy.org",
      features: ["Automated Scanner", "Manual Tools", "API Testing", "Authentication"],
    },
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
              <Link href="/red-team" className="text-gray-300 hover:text-red-400 transition-colors">
                Red Team
              </Link>
              <Link href="/herramientas" className="text-white hover:text-red-400 transition-colors">
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
      <section className="py-20 px-4 bg-gradient-to-br from-green-900/20 via-gray-950 to-black">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-green-400">Herramientas</span> de Ciberseguridad
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Arsenal completo de herramientas para pentesting, análisis forense y operaciones de ciberseguridad.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              Explorar Arsenal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Categorías de Herramientas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card
                  key={index}
                  className="bg-gray-800 border-gray-700 hover:border-green-500 transition-all duration-300 cursor-pointer group"
                >
                  <CardHeader className="text-center">
                    <IconComponent className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-white">{category.name}</CardTitle>
                    <CardDescription className="text-gray-400">{category.description}</CardDescription>
                    <Badge variant="secondary" className="mt-2">
                      {category.count} herramientas
                    </Badge>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Herramientas Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-green-500 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white group-hover:text-green-400 transition-colors">
                      {tool.name}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < tool.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-600 text-white">{tool.category}</Badge>
                    <span className="text-sm text-gray-400 flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {tool.downloads}
                    </span>
                  </div>
                  <CardDescription className="text-gray-400">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Características:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tool.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white bg-transparent"
                      asChild
                    >
                      <Link href={tool.link} target="_blank" rel="noopener noreferrer">
                        Ver Herramienta
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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
