import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://busa-cybersecurity.vercel.app"),
  title: {
    default: "BUSA Cybersecurity | Portafolio y blog de ciberseguridad de Pedro Bustamante",
    template: "%s",
  },
  description:
    "Portafolio y blog de ciberseguridad de Pedro Bustamante: writeups, pentesting, Red Team, herramientas, programación y análisis de malware.",
  keywords: [
    "ciberseguridad",
    "hacking ético",
    "Red Team",
    "pentesting",
    "writeups",
    "Hack The Box",
    "malware",
    "Pedro Bustamante",
    "BUSA Cybersecurity",
  ],
  authors: [{ name: "Pedro Bustamante" }],
  creator: "Pedro Bustamante",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "BUSA Cybersecurity | Portafolio y blog de ciberseguridad",
    description:
      "Writeups, pentesting, Red Team, herramientas, programación y análisis de malware por Pedro Bustamante.",
    siteName: "BUSA Cybersecurity",
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${plexSans.variable} ${plexMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
