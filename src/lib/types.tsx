// src/lib/types.ts

export type ServiceType = "LSS" | "SÄBO" | "Hemtjänst"
export type RoleType = "Staff" | "ServiceUser"
export type TaskCategory = "Brukarnära" | "HSL" | "Praktisk" | "Administrativ"
export type AssignmentStatus = "planned" | "inProgress" | "done"

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

  // Nytt, för SÄBO-strukturen
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

  // Nytt, för “röd/blå/vit” laget
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

  // Nytt, för “2 personal”
  requiresTwoStaff?: boolean
}

export interface Assignment {
  taskId: string
  staffId: string
  status: AssignmentStatus
  completedAt?: string
  signedBy?: string
}
