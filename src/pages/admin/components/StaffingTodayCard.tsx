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
        {/* ✅ PROTOTYP: rubrik + grå meta-text */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Bemanning idag</h2>

          {/* ✅ Byter text-muted-foreground -> text-gray-500 */}
          <p className="text-xs text-gray-500">
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
                // ✅ PROTOTYP: vit bakgrund, grå border, subtil hover
                className="flex items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50 transition-colors"
              >
                {/* VÄNSTER: namn, roll, tid */}
                <div>
                  <p className="font-medium leading-tight text-gray-900">
                    {person.fullName}
                  </p>

                  {/* ✅ Byter text-muted-foreground -> text-gray-500 */}
                  <p className="text-xs text-gray-500">
                    {person.profession ?? "Personal"}
                  </p>

                  {mainShift ? (
                    <p className="mt-1 text-xs text-gray-900">
                      {/* ✅ Label lite “prototypig”: grå, bold, uppercase är optional
                          Här håller vi det enkelt men med tydlig gråskala */}
                      <span className="text-gray-500">Pass: </span>
                      <span className="font-semibold">
                        {mainShift.startTime}–{mainShift.endTime}
                      </span>
                    </p>
                  ) : (
                    // ✅ Byter text-muted-foreground -> text-gray-500 (och håller italic)
                    <p className="mt-1 text-xs italic text-gray-500">
                      Ingen tur idag (i demo-datan)
                    </p>
                  )}
                </div>

                {/* HÖGER: färg + sida */}
                {mainShift && (mainShift.teamColor || mainShift.wing) && (
                  <div className="text-right text-xs space-y-1">
                    {mainShift.teamColor && (
                      <span
                        className={
                          // ✅ Team-pill behåller färg men är fortfarande “prototyp” via rounded + border
                          `inline-flex rounded-full border px-2 py-0.5 font-medium ${
                            TEAM_COLOR_STYLES[mainShift.teamColor] ?? ""
                          }`
                        }
                      >
                        {mainShift.teamColor} lag
                      </span>
                    )}

                    {mainShift.wing && (
                      // ✅ Byter text-muted-foreground -> text-gray-500
                      <p className="text-gray-500">{mainShift.wing}-sida</p>
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
