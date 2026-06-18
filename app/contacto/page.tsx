import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Mail, MessageSquare, Send, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function ContactoPage() {
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
              <Link href="/herramientas" className="text-gray-300 hover:text-red-400 transition-colors">
                Herramientas
              </Link>
              <Link href="/contacto" className="text-white hover:text-red-400 transition-colors">
                Contacto
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900/20 via-gray-950 to-black">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-purple-400">Contacto</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              ¿Tienes preguntas sobre ciberseguridad? ¿Necesitas consultoría especializada? Estoy aquí para ayudarte.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4 bg-gray-950">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="h-6 w-6 text-purple-400 mr-2" />
                  Envía un Mensaje
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Completa el formulario y te responderé lo antes posible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-white mb-2">
                      Nombre
                    </label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-white mb-2">
                    Asunto
                  </label>
                  <Input
                    id="asunto"
                    placeholder="¿En qué puedo ayudarte?"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-white mb-2">
                    Mensaje
                  </label>
                  <Textarea
                    id="mensaje"
                    placeholder="Describe tu consulta o proyecto..."
                    rows={6}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Enviar Mensaje
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Mail className="h-6 w-6 text-purple-400 mr-2" />
                    Información de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Email</h3>
                      <p className="text-gray-400">contacto@busacybersecurity.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Horario de Respuesta</h3>
                      <p className="text-gray-400">24-48 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Ubicación</h3>
                      <p className="text-gray-400">Remoto / Global</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Servicios de Consultoría</CardTitle>
                  <CardDescription className="text-gray-400">
                    Especializado en los siguientes servicios:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Penetration Testing
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Red Team Operations
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Security Assessments
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Incident Response
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      Security Training
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
