"use client"

import { useState } from "react"
import { useSchedule } from "../../context/schedule-context"
import { Card, CardContent } from "../../components/card"
import { categoryColors } from "../../lib/demo-data"

export default function PersonalPage() {
  const { staff, assignments, getTaskById } = useSchedule()

  // till att börja med: hårdkoda "måndag" (0)
  const DAY_OF_WEEK = 0

  const [selectedStaffId, setSelectedStaffId] = useState(staff[0]?.id ?? "")

  const myAssignments = assignments.filter((a) => a.staffId === selectedStaffId)
  const myTasksToday = myAssignments
    .map((a) => getTaskById(a.taskId))
    .filter((task) => task && task.dayOfWeek === DAY_OF_WEEK)

  const selectedStaff = staff.find((s) => s.id === selectedStaffId)

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Din dag – {selectedStaff?.fullName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Visar måndag (demo). Senare kopplar vi riktig datumlogik.
            </p>
          </div>

          <select
            className="border border-border rounded-lg px-3 py-2 text-sm bg-background"
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
          >
            {staff.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.profession})
              </option>
            ))}
          </select>
        </header>

        <section className="space-y-3">
          {myTasksToday.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Inga uppgifter hittades för den här dagen i demo-datan.
            </p>
          )}

          {myTasksToday.map((task) => {
            if (!task) return null
            const colors = categoryColors[task.category]
            return (
              <Card key={task.id} className="border-l-4" >
                <CardContent className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">{task.title}</h2>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {task.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {task.startTime} – {task.endTime}
                    {task.requiresSignature && " · Kräver signering"}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </section>
      </div>
    </div>
  )
}
