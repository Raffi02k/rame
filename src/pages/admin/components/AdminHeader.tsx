// src/pages/admin/components/AdminHeader.tsx
import { Unit } from "../../../lib/types"

interface AdminHeaderProps {
  units: Unit[]
  unitId: string
  onUnitChange: (id: string) => void
  title: string
  subtitle: string
}

export function AdminHeader({
  units,
  unitId,
  onUnitChange,
  title,
  subtitle,
}: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex flex-col text-sm">
        <label htmlFor="unit" className="mb-1 font-medium">
          Välj enhet
        </label>
        <select
          id="unit"
          value={unitId}
          onChange={(e) => onUnitChange(e.target.value)}
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
  )
}
