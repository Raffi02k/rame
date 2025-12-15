// src/pages/admin/components/StaffingTodayCard.tsx
import { Person, Shift } from "../../../lib/types"
import { Card, CardContent } from "../../../components/card"

const TEAM_COLOR_STYLES: Record<string, string> = {
  Röd: "bg-red-100 text-red-700 border-red-300",
  Blå: "bg-blue-100 text-blue-700 border-blue-300",
  Lila: "bg-purple-100 text-purple-700 border-purple-300",
  Vit: "bg-slate-100 text-slate-700 border-slate-300",
}

interface StaffingTodayCardProps {
  staff: Person[]
  shifts: Shift[]
}

export function StaffingTodayCard({ staff, shifts }: StaffingTodayCardProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Titelrad */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Bemanning idag</h2>
          <p className="text-xs text-muted-foreground">
            {staff.length} personer · {shifts.length} pass
          </p>
        </div>

        {/* Lista med personal */}
        <div className="grid gap-3 md:grid-cols-2">
          {staff.map((person) => {
            const shiftsForStaff = shifts.filter((sh) => sh.staffId === person.id)
            const mainShift = shiftsForStaff[0]

            return (
              <div
                key={person.id}
                className="flex items-start justify-between gap-3 rounded-lg border bg-card/60 p-3"
              >
                {/* VÄNSTER: namn, roll, tid */}
                <div>
                  <p className="font-medium leading-tight">{person.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {person.profession ?? "Personal"}
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

                {/* HÖGER: färg + sida */}
                {mainShift && (mainShift.teamColor || mainShift.wing) && (
                  <div className="text-right text-xs space-y-1">
                    {mainShift.teamColor && (
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 font-medium ${
                          TEAM_COLOR_STYLES[mainShift.teamColor] ?? ""
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
  )
}
