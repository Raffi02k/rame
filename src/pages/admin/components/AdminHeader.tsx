// src/pages/admin/components/AdminHeader.tsx
import { LanguageCode, Unit, ViewMode } from "../../../lib/types"

interface AdminHeaderProps {
  units: Unit[]
  unitId: string
  onUnitChange: (id: string) => void
  title: string
  subtitle: string

  // 🆕 Sprint 3: vy-läge & språk
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  activeLang: LanguageCode
  onLangChange: (lang: LanguageCode) => void
}

export function AdminHeader({
  units,
  unitId,
  onUnitChange,
  title,
  subtitle,
  viewMode,
  onViewModeChange,
  activeLang,
  onLangChange,
}: AdminHeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Vänster: rubrik + datum/enhet */}
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Höger: enhet + vy-läge + språk */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {/* Enhetsval (som innan) */}
        <div className="flex flex-col">
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

        {/* 🆕 Vy-läge: DAG / VECKA */}
        <div className="flex flex-col">
          <span className="mb-1 font-medium">Vy</span>
          <div className="inline-flex overflow-hidden rounded-md border border-border bg-background">
            <button
              type="button"
              onClick={() => onViewModeChange("day")}
              className={`px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                viewMode === "day"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Dag
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("week")}
              className={`px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                viewMode === "week"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Vecka
            </button>
          </div>
        </div>

        {/* 🆕 Språkval */}
        <div className="flex flex-col">
          <label htmlFor="lang" className="mb-1 font-medium">
            Språk
          </label>
          <select
            id="lang"
            value={activeLang}
            onChange={(e) => onLangChange(e.target.value as LanguageCode)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            {/* Här kan du senare lägga flagg-ikoner om du vill */}
            <option value="sv">SV</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="ar">AR</option>
          </select>
        </div>
      </div>
    </header>
  )
}
