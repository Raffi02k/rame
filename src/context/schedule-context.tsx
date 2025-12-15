import React, { createContext, useContext } from "react"
import {
  units,
  staff,
  serviceUsers,
  tasks,
  assignments,
  getTaskById,
  getAssignmentsByStaff,
  categoryColors,
} from "../data/demo-data"

const ScheduleContext = createContext<ScheduleContextValue | undefined>(undefined)

type ScheduleContextValue = {
  units: typeof units
  staff: typeof staff
  serviceUsers: typeof serviceUsers
  tasks: typeof tasks
  assignments: typeof assignments
  getTaskById: typeof getTaskById
  getAssignmentsByStaff: typeof getAssignmentsByStaff
  categoryColors: typeof categoryColors
}

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const value: ScheduleContextValue = {
    units,
    staff,
    serviceUsers,
    tasks,
    assignments,
    getTaskById,
    getAssignmentsByStaff,
    categoryColors,
  }

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  )
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext)
  if (!ctx) throw new Error("useSchedule must be used inside ScheduleProvider")
  return ctx
}
