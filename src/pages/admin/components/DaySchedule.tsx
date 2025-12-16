// src/pages/admin/components/DaySchedule.tsx
import { Card, CardContent } from "../../../components/card"

interface DayScheduleProps {
  todayLabel: string
  currentUnitName: string
  shiftsCount: number
  tasksCount: number
  hslCount: number
}

export function DaySchedule({
  todayLabel,
  currentUnitName,
  shiftsCount,
  tasksCount,
  hslCount,
}: DayScheduleProps) {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-start gap-6 text-sm">
        <div className="flex-1 min-w-[180px]">
          {/* ✅ Prototyp-grå label */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Idag
          </p>

          {/* ✅ Prototyp text-färg */}
          <p className="text-base font-semibold text-gray-900">
            {todayLabel}
          </p>

          {/* ✅ Prototyp sekundär text */}
          <p className="text-xs text-gray-500 mt-1">
            {currentUnitName}
          </p>
        </div>

        <div className="flex gap-6 flex-wrap">
          <div>
            {/* ✅ Labels i prototyp-grå */}
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Pass idag
            </p>
            <p className="text-2xl font-semibold text-gray-900">{shiftsCount}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Uppgifter idag
            </p>
            <p className="text-2xl font-semibold text-gray-900">{tasksCount}</p>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              HSL–uppgifter
            </p>
            <p className="text-2xl font-semibold text-gray-900">{hslCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
