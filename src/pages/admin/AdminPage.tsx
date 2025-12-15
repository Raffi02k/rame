// src/pages/admin/AdminPage.tsx
"use client"

import { useState } from "react"
import {
  units,
  getStaffByUnit,
  getShiftsByUnit,
  getTasksByUnit,
} from "../../lib/demo-data"
import { Unit } from "../../lib/types"
import { AdminHeader } from "./components/AdminHeader"
import { StaffingTodayCard } from "./components/StaffingTodayCard"
import { TodayOverviewCard } from "./components/TodayOverviewCard"
import { TasksTodayCard } from "./components/TasksTodayCard"

export default function AdminPage() {
  // 1. State
  const [unitId, setUnitId] = useState("u2") // SÄBO Källstorp i demon

  // 2. Datum
  const todayDate = new Date()
  const todayIso = todayDate.toISOString().split("T")[0]
  const todayLabel = todayDate.toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Justera så att måndag = 0 (som i demo-data)
  const weekdayIndex = (todayDate.getDay() + 6) % 7

  // 3. Data för vald enhet
  const currentUnit: Unit | undefined = units.find((u) => u.id === unitId)
  const staffOnUnit = getStaffByUnit(unitId)
  const shiftsToday = getShiftsByUnit(unitId, todayIso)
  const tasksForUnit = getTasksByUnit(unitId)

  // Dagens uppgifter (inte hela veckan)
  const tasksToday = tasksForUnit.filter(
    (t) => t.dayOfWeek === weekdayIndex
  )
  const hslCount = tasksToday.filter((t) => t.category === "HSL").length

  return (
    <div className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col space-y-6">
        {/* HEADER */}
        <AdminHeader
          units={units}
          unitId={unitId}
          onUnitChange={setUnitId}
          title="Schema & bemanning"
          subtitle={`${currentUnit?.name ?? ""} · ${todayLabel}`}
        />

        {/* Översikt idag */}
        <TodayOverviewCard
          todayLabel={todayLabel}
          currentUnitName={currentUnit?.name ?? ""}
          shiftsCount={shiftsToday.length}
          tasksCount={tasksToday.length}
          hslCount={hslCount}
        />

        {/* Bemanning idag */}
        <StaffingTodayCard staff={staffOnUnit} shifts={shiftsToday} />

        {/* Dagens uppgifter */}
        <TasksTodayCard tasks={tasksToday} />
      </div>
    </div>
  )
}
