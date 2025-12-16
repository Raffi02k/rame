// src/lib/types.ts

// 🔹 Grundtyper (som innan)
export type ServiceType = "LSS" | "SÄBO" | "Hemtjänst"
export type RoleType = "Staff" | "ServiceUser"
export type TaskCategory = "Brukarnära" | "HSL" | "Praktisk" | "Administrativ"
export type AssignmentStatus = "planned" | "inProgress" | "done"

// 🆕 Sprint 3: separat TaskStatus-typ
// (just nu samma som AssignmentStatus + "sign" för signeringsläge)
export type TaskStatus = "planned" | "inProgress" | "done" | "sign"

// 🆕 Sprint 3: vy-läge (dag/vecka) för admin-schemat
export type ViewMode = "day" | "week"

// 🆕 Sprint 3: språk-koder för UI-översättning
export type LanguageCode = "sv" | "en" | "es" | "ar"

export interface Unit {
  id: string
  name: string
  serviceType: ServiceType
}

export interface Person {
  id: string
  fullName: string
  initials: string
  photo: string
  roleType: RoleType
  profession?: string
  unitId?: string

  // 🆕 Sprint 2–3: extra fält för SÄBO-struktur
  roomNumber?: string
  floorLabel?: string
  wing?: "Norr" | "Söder"
}

export interface Shift {
  id: string
  unitId: string
  staffId: string
  startTime: string
  endTime: string
  date: string

  // 🆕 Sprint 2–3: färg-lag + sida (Norr/Söder)
  teamColor?: "Röd" | "Blå" | "Lila" | "Vit"
  wing?: "Norr" | "Söder"
}

export interface Task {
  id: string
  unitId: string
  title: string
  description: string
  category: TaskCategory
  requiresSignature: boolean
  startTime: string
  endTime: string
  serviceUserId?: string
  isFixedTime: boolean
  dayOfWeek?: number

  // 🆕 Sprint 2–3: markera uppgifter som kräver två personal
  requiresTwoStaff?: boolean
}

export interface Assignment {
  taskId: string
  staffId: string
  status: AssignmentStatus
  completedAt?: string
  signedBy?: string
}
