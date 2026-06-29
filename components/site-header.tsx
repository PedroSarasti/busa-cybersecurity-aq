"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, ChevronDown, Menu, X } from "lucide-react"
import { sections } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)

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

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.map((section) => {
              const active = isActive(section.href)

              if (!section.subsections) {
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
              }

              return (
                <div key={section.slug} className="relative group">
                  <Link
                    href={section.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      active ? "text-red-400" : "text-gray-300 hover:text-red-400",
                    )}
                  >
                    {section.name}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                    <div className="w-64 rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-xl shadow-black/40">
                      {section.subsections.map((sub) => {
                        const SubIcon = sub.icon
                        return (
                          <Link
                            key={sub.slug}
                            href={`${section.href}/${sub.slug}`}
                            className="flex items-start gap-3 rounded-md p-2.5 transition-colors hover:bg-gray-800 group/item"
                          >
                            <SubIcon className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                            <span>
                              <span className="block text-sm font-medium text-white group-hover/item:text-red-400 transition-colors">
                                {sub.name}
                              </span>
                              <span className="block text-xs text-gray-500 leading-snug">{sub.description}</span>
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-900 max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {sections.map((section) => {
              const active = isActive(section.href)

              if (!section.subsections) {
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
              }

              const expanded = openSection === section.slug
              return (
                <div key={section.slug}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={section.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex-1 px-3 py-2.5 text-sm font-medium rounded-md",
                        active ? "text-red-400" : "text-gray-300 hover:text-red-400",
                      )}
                    >
                      {section.name}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Mostrar subsecciones de ${section.name}`}
                      onClick={() => setOpenSection(expanded ? null : section.slug)}
                      className="p-2.5 text-gray-400 hover:text-red-400"
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                    </button>
                  </div>
                  {expanded && (
                    <div className="ml-4 mb-2 space-y-0.5 border-l border-gray-800 pl-3">
                      {section.subsections.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`${section.href}/${sub.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-gray-400 rounded-md hover:text-red-400 hover:bg-gray-800"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
