// src/pages/admin/components/TodayOverviewCard.tsx
import { Card, CardContent } from "../../../components/card"

interface TodayOverviewCardProps {
  todayLabel: string
  currentUnitName: string
  shiftsCount: number
  tasksCount: number
  hslCount: number
}

export function TodayOverviewCard({
  todayLabel,
  currentUnitName,
  shiftsCount,
  tasksCount,
  hslCount,
}: TodayOverviewCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-start gap-6 text-sm">
        <div className="flex-1 min-w-[180px]">
          <p className="text-xs text-muted-foreground uppercase">
            Idag
          </p>
          <p className="text-base font-semibold">
            {todayLabel}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {currentUnitName}
          </p>
        </div>

        <div className="flex gap-6 flex-wrap">
          <div>
            <p className="text-xs text-muted-foreground uppercase">
              Pass idag
            </p>
            <p className="text-2xl font-semibold">{shiftsCount}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase">
              Uppgifter idag
            </p>
            <p className="text-2xl font-semibold">{tasksCount}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase">
              HSL–uppgifter
            </p>
            <p className="text-2xl font-semibold">{hslCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
