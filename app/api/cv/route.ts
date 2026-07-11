import { readFile } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * Código de acceso requerido para descargar el CV.
 * Se puede sobreescribir con la variable de entorno CV_ACCESS_CODE.
 * Cambia este valor por defecto o define la variable en el proyecto.
 */
const ACCESS_CODE = process.env.CV_ACCESS_CODE ?? "BUSA2026"

export async function POST(request: Request) {
  let code = ""
  try {
    const body = await request.json()
    code = typeof body?.code === "string" ? body.code : ""
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }

  // Comparación normalizada (sin espacios y sin distinción de mayúsculas).
  const normalized = code.trim().toLowerCase()
  const expected = ACCESS_CODE.trim().toLowerCase()

  if (!normalized || normalized !== expected) {
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
