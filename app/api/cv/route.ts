import { readFile } from "fs/promises"
import path from "path"
import { timingSafeEqual } from "crypto"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * Código de acceso requerido para descargar el CV.
 * DEBE definirse en la variable de entorno CV_ACCESS_CODE.
 * No existe ningún valor por defecto embebido: si no está configurada,
 * el endpoint responde con un error 500 controlado.
 */
const ACCESS_CODE = process.env.CV_ACCESS_CODE

// --- Rate limit simple en memoria (por IP) ---
const MAX_ATTEMPTS = 5
const WINDOW_MS = 10 * 60 * 1000 // 10 minutos

interface RateEntry {
  count: number
  resetAt: number
}

const attempts = new Map<string, RateEntry>()

/** Registra un intento para la IP y devuelve si ha superado el límite. */
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > MAX_ATTEMPTS
}

/** Comparación de strings en tiempo constante para evitar ataques de temporización. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf-8")
  const bufB = Buffer.from(b, "utf-8")
  // timingSafeEqual exige buffers de la misma longitud.
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

/** Obtiene la IP del cliente a partir de las cabeceras de proxy. */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

export async function POST(request: Request) {
  // Sin código configurado no se permite ninguna descarga.
  if (!ACCESS_CODE) {
    console.error("[v0] CV_ACCESS_CODE no está definida; descarga de CV deshabilitada.")
    return NextResponse.json(
      { error: "La descarga no está disponible en este momento." },
      { status: 500 },
    )
  }

  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Inténtalo de nuevo en unos minutos." },
      { status: 429 },
    )
  }

  let code = ""
  try {
    const body = await request.json()
    code = typeof body?.code === "string" ? body.code : ""
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }

  const normalized = code.trim()
  const expected = ACCESS_CODE.trim()

  if (!normalized || !safeEqual(normalized, expected)) {
    return NextResponse.json({ error: "Código de acceso incorrecto." }, { status: 401 })
  }

  try {
    const filePath = path.join(process.cwd(), "private", "cv-pedro-bustamante-2026.pdf")
    const file = await readFile(filePath)

    return new NextResponse(file as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="CV-Pedro-Bustamante-2026.pdf"',
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return NextResponse.json({ error: "No se pudo cargar el archivo." }, { status: 500 })
  }
}
