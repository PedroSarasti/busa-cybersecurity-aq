"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Menu, X } from "lucide-react"
import { sections } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <Shield className="h-7 w-7 text-red-500" />
            <span className="text-xl font-bold whitespace-nowrap">
              <span className="text-red-500">BUSA</span> <span className="text-white">Cybersecurity</span>
            </span>
          </Link>

          {/* Desktop nav: botones simples, sin desplegables */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.map((section) => {
              const active = isActive(section.href)
              return (
                <Link
                  key={section.slug}
                  href={section.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    active ? "text-red-400" : "text-gray-300 hover:text-red-400",
                  )}
                >
                  {section.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden text-gray-300 hover:text-red-400 transition-colors"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu: enlaces simples */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-900 max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {sections.map((section) => {
              const active = isActive(section.href)
              return (
                <Link
                  key={section.slug}
                  href={section.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-md",
                    active ? "text-red-400 bg-gray-800" : "text-gray-300 hover:text-red-400 hover:bg-gray-800",
                  )}
                >
                  {section.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
