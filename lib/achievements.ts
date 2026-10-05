export type AchievementType =
  | "certificacion"
  | "diploma"
  | "ctf"
  | "insignia"
  | "reconocimiento"

export type Achievement = {
  id: string
  name: string
  issuer: string
  date: string
  sortDate: string
  type: AchievementType
  description?: string
  credentialId?: string
  credentialUrl?: string
  file?: string
  isPdf?: boolean
  highlight?: boolean
}

export const achievementTypeLabels: Record<AchievementType, string> = {
  certificacion: "Certificación",
  diploma: "Diploma",
  ctf: "CTF",
  insignia: "Insignia",
  reconocimiento: "Reconocimiento",
}

export const achievements: Achievement[] = [
  { id: "ewpt", name: "eWPT", issuer: "INE Security", date: "Jun. 2026", sortDate: "2026-06-01", type: "certificacion", description: "Certificación profesional de penetration testing web.", credentialId: "185433777", highlight: true },
  { id: "diplomado-hacking-etico", name: "Diplomado en Hacking Ético y Riesgos Cibernéticos", issuer: "Universidad Sergio Arboleda & Colsubsidio", date: "Mar. – May. 2026", sortDate: "2026-05-01", type: "diploma", description: "Programa académico de 80 horas sobre hacking ético y gestión de riesgos cibernéticos.", highlight: true },
  { id: "ccst-cybersecurity", name: "CCST Cybersecurity", issuer: "Cisco", date: "Ago. 2024", sortDate: "2024-08-01", type: "certificacion", description: "Certificación de fundamentos de ciberseguridad de Cisco." },
  { id: "ctf-tercer-puesto", name: "3er puesto en competencia CTF", issuer: "Participación individual", date: "", // TODO: sustituir por la fecha real de la competencia.
    sortDate: "2020-01", // TODO: sustituir por el mes real de la competencia.
    type: "ctf", description: "Reconocimiento por obtener el tercer puesto en una competencia Capture The Flag.", // TODO: completar con los detalles reales del reconocimiento.
  },
]

export function getAchievementTypeCount(type: AchievementType) {
  return achievements.filter((achievement) => achievement.type === type).length
}

export const achievementTypes = Object.keys(achievementTypeLabels) as AchievementType[]
