"use client"

import { useState } from "react"
import {
  units,
  getStaffByUnit,
  getShiftsByUnit,
  getTasksByUnit,
  assignments,
  categoryColors,
  getServiceUserById,
  getStaffById,
} from "../data/demo-data"
import { Card, CardContent } from "../components/card"

// Färg-logik för lag-badgen (bemanning)
const teamColorStyles: Record<string, string> = {
  Röd: "bg-red-100 text-red-700 border-red-300",
  Blå: "bg-blue-100 text-blue-700 border-blue-300",
  Lila: "bg-purple-100 text-purple-700 border-purple-300",
  Vit: "bg-slate-100 text-slate-700 border-slate-300",
}

// Hjälpare för att hitta assignment per task
function getAssignmentForTask(taskId: string) {
  return assignments.find((a) => a.taskId === taskId)
}

// Ordning vi vill visa kategorier i
const CATEGORY_ORDER = ["HSL", "Brukarnära", "Praktisk", "Administrativ"] as const

export default function AdminPage() {
  // 1. State för vilken enhet vi tittar på
  const [unitId, setUnitId] = useState("u2") // SÄBO Källstorp

  // 2. Datum (både tekniskt värde + fin label)
  const todayDate = new Date()
  const today = todayDate.toISOString().split("T")[0]
  const todayLabel = todayDate.toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // 3. Hämta data för vald enhet
  const currentUnit = units.find((u) => u.id === unitId)
  const staffOnUnit = getStaffByUnit(unitId)
  const shiftsToday = getShiftsByUnit(unitId, today)
  const tasksForUnit = getTasksByUnit(unitId)

  // 4. Gruppera tasks per kategori
  const tasksByCategory = {
    Brukarnära: tasksForUnit.filter((t) => t.category === "Brukarnära"),
    HSL: tasksForUnit.filter((t) => t.category === "HSL"),
    Praktisk: tasksForUnit.filter((t) => t.category === "Praktisk"),
    Administrativ: tasksForUnit.filter((t) => t.category === "Administrativ"),
  }

  const hslCount = tasksByCategory.HSL.length

  return (
    <div className="min-h-screen bg-muted px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Schema &amp; bemanning</h1>
            <p className="text-sm text-muted-foreground">
              {currentUnit?.name} · {today}
            </p>
          </div>

          <div className="flex flex-col text-sm">
            <label htmlFor="unit" className="mb-1 font-medium">
              Välj enhet
            </label>
            <select
              id="unit"
              value={unitId}
              onChange={(e) => setUnitId(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 6️⃣ ÖVERSIKT IDAG */}
        <Card>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Idag
              </p>
              <p className="text-sm font-medium">{todayLabel}</p>
              <p className="text-xs text-muted-foreground">
                {currentUnit?.name}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs">
              <div className="rounded-lg bg-background px-3 py-2">
                <p className="text-muted-foreground">Pass idag</p>
                <p className="text-lg font-semibold">{shiftsToday.length}</p>
              </div>
              <div className="rounded-lg bg-background px-3 py-2">
                <p className="text-muted-foreground">Uppgifter</p>
                <p className="text-lg font-semibold">{tasksForUnit.length}</p>
              </div>
              <div className="rounded-lg bg-background px-3 py-2">
                <p className="text-muted-foreground">HSL-uppgifter</p>
                <p className="text-lg font-semibold">{hslCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🔵 BEMANNING IDAG */}
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Bemanning idag</h2>
              <p className="text-xs text-muted-foreground">
                {staffOnUnit.length} personer · {shiftsToday.length} pass
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {staffOnUnit.map((staff) => {
                // alla pass för den här personen idag
                const shiftsForStaff = shiftsToday.filter(
                  (sh) => sh.staffId === staff.id
                )

                // ta första passet som huvudpass
                const mainShift = shiftsForStaff[0]

                return (
                  <div
                    key={staff.id}
                    className="flex items-start justify-between gap-3 rounded-lg border bg-card/60 p-3"
                  >
                    {/* VÄNSTER: namn + roll + tider */}
                    <div>
                      <p className="font-medium leading-tight">
                        {staff.fullName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {staff.profession ?? "Personal"}
                      </p>

                      {mainShift ? (
                        <p className="mt-1 text-xs">
                          Pass:{" "}
                          <span className="font-semibold">
                            {mainShift.startTime}–{mainShift.endTime}
                          </span>
                        </p>
                      ) : (
                        <p className="mt-1 text-xs italic text-muted-foreground">
                          Ingen tur idag (i demo-datan)
                        </p>
                      )}
                    </div>

                    {/* HÖGER: lagfärg + sida */}
                    {mainShift && (mainShift.teamColor || mainShift.wing) && (
                      <div className="space-y-1 text-right text-xs">
                        {mainShift.teamColor && (
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 font-medium ${
                              teamColorStyles[mainShift.teamColor] ?? ""
                            }`}
                          >
                            {mainShift.teamColor} lag
                          </span>
                        )}

                        {mainShift.wing && (
                          <p className="text-muted-foreground">
                            {mainShift.wing}-sida
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 🟣 DAGENS UPPGIFTER */}
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Dagens uppgifter</h2>
              <p className="text-xs text-muted-foreground">
                Totalt {tasksForUnit.length} uppgifter
              </p>
            </div>

            <div className="space-y-6">
              {CATEGORY_ORDER.map((categoryKey) => {
                const catTasks = tasksByCategory[categoryKey]
                if (!catTasks.length) return null

                const color = categoryColors[categoryKey]

                return (
                  <div key={categoryKey} className="space-y-2">
                    {/* kategori-rubrik med färg */}
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${color.bg} ${color.text} ${color.border}`}
                    >
                      <span>{categoryKey}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {catTasks.length} uppgifter
                      </span>
                    </div>

                    <div className="space-y-2">
                      {catTasks.map((task) => {
                        const assignment = getAssignmentForTask(task.id)
                        const serviceUser = task.serviceUserId
                          ? getServiceUserById(task.serviceUserId)
                          : undefined

                        // Status-text
                        let statusLabel = "Ej planerad"
                        if (assignment) {
                          if (assignment.status === "planned") {
                            statusLabel = "Planerad"
                          } else if (assignment.status === "inProgress") {
                            statusLabel = "Pågår"
                          } else if (assignment.status === "done") {
                            const signer = assignment.signedBy
                              ? getStaffById(assignment.signedBy)
                              : undefined
                            statusLabel = `Klar ${
                              assignment.completedAt ?? ""
                            }${signer ? ` (${signer.initials})` : ""}`
                          }
                        }

                        return (
                          <div
                            key={task.id}
                            className="flex items-start justify-between gap-3 rounded-lg border bg-card/60 p-3 text-xs"
                          >
                            {/* VÄNSTER: tid, titel, ev brukare */}
                            <div className="space-y-1">
                              <p className="font-medium">
                                {task.startTime}–{task.endTime} · {task.title}
                              </p>

                              {serviceUser && (
                                <p className="text-muted-foreground">
                                  {serviceUser.fullName}
                                  {serviceUser.roomNumber && (
                                    <>
                                      {" "}
                                      (
                                      {`Rum ${serviceUser.roomNumber}${
                                        serviceUser.wing
                                          ? `, ${serviceUser.wing}`
                                          : ""
                                      }${
                                        serviceUser.floorLabel
                                          ? `, ${serviceUser.floorLabel}`
                                          : ""
                                      }`}
                                      )
                                    </>
                                  )}
                                </p>
                              )}

                              {task.description && (
                                <p className="text-[11px] text-muted-foreground">
                                  {task.description}
                                </p>
                              )}
                            </div>

                            {/* HÖGER: status + små labels */}
                            <div className="flex flex-col items-end gap-1">
                              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px]">
                                {statusLabel}
                              </span>

                              <div className="flex flex-wrap justify-end gap-1">
                                {task.requiresSignature && (
                                  <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700">
                                    Signering krävs
                                  </span>
                                )}
                                {task.requiresTwoStaff && (
                                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                                    2 personal
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Debug-info medan du bygger (kan tas bort sen) */}
        <pre className="rounded-md bg-background p-3 text-xs">
          {JSON.stringify(
            {
              unitId,
              staffCount: staffOnUnit.length,
              shiftsToday: shiftsToday.length,
              tasksForUnit: tasksForUnit.length,
              hslCount,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}
