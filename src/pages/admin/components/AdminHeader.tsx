import { ChevronLeft, ChevronRight, Calendar, Languages, MapPin, Settings } from "lucide-react"
import { LanguageCode, Unit, ViewMode } from "../../../types"
import { cn } from "../../../lib/utils"

interface AdminHeaderProps {
  units: Unit[]
  unitId: string
  onUnitChange: (id: string) => void

  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void

  activeLang: LanguageCode
  onLangChange: (lang: LanguageCode) => void

  currentDate: Date
  onNavigate: (direction: "prev" | "next" | "today") => void

  userInitials?: string
}

export function AdminHeader({
  units,
  unitId,
  onUnitChange,
  viewMode,
  onViewModeChange,
  activeLang,
  onLangChange,
  currentDate,
  onNavigate,
  userInitials = "AD",
}: AdminHeaderProps) {
  const isRTL = activeLang === "ar"

  const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  }

  // Prototypen klarar full text i sin layout, men i din setup blir det lätt för långt.
  const getHeaderDateString = () => {
    if (viewMode === "week") {
      const weekNo = getWeekNumber(currentDate)
      if (activeLang === "en") return `Week ${weekNo}, ${currentDate.getFullYear()}`
      if (activeLang === "es") return `Semana ${weekNo}, ${currentDate.getFullYear()}`
      if (activeLang === "ar") return `الأسبوع ${weekNo}, ${currentDate.getFullYear()}`
      return `Vecka ${weekNo}, ${currentDate.getFullYear()}`
    }

    const locale =
      activeLang === "ar" ? "ar-EG" : activeLang === "en" ? "en-US" : activeLang === "es" ? "es-ES" : "sv-SE"

    // ✅ Kortare så den får plats i mitten-pill: "Tor 25 dec 2025"
    const dateStr = currentDate.toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })

    // ✅ snyggare: stor bokstav
    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
  }

  const todayLabel =
    activeLang === "sv" ? "Idag" : activeLang === "en" ? "Today" : activeLang === "es" ? "Hoy" : "اليوم"

  const dayLabel =
    activeLang === "sv" ? "Dag" : activeLang === "en" ? "Day" : activeLang === "es" ? "Día" : "يوم"

  const weekLabel =
    activeLang === "sv" ? "Vecka" : activeLang === "en" ? "Week" : activeLang === "es" ? "Semana" : "أسبوع"

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[9999] shadow-sm">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* =========================
            LEFT: Logo + Unit
            (Matcha prototyp: INGEN extra sidoknapp här)
        ========================== */}
        <div className="flex items-center gap-6 min-w-0">
          <div className="text-xl font-bold text-municipal-900 flex items-center gap-2 hover:opacity-80 transition-opacity select-none">
            <div className="w-8 h-8 bg-municipal-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-municipal-900/20">
              <Settings size={18} />
            </div>
            <span className="hidden lg:inline">Autopilot</span>
          </div>

          <div className="h-8 w-px bg-gray-200 hidden md:block" />

          <div className="relative group min-w-[200px] hidden md:block">
            <div className="absolute left-3 top-2.5 text-municipal-600">
              <MapPin size={16} />
            </div>

            <select
              value={unitId}
              onChange={(e) => onUnitChange(e.target.value)}
              className="w-full appearance-none bg-municipal-50 pl-10 pr-10 py-2 rounded-lg text-sm font-bold text-municipal-900 border-none focus:ring-2 focus:ring-municipal-500 cursor-pointer hover:bg-municipal-100 transition-colors"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            {/* ✅ chevron (som prototypens select) */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-municipal-700 text-xs">
              ▾
            </div>
          </div>
        </div>

        {/* =========================
            CENTER: Date Navigation
            (matcha prototyp: width 200 + samma textstil)
        ========================== */}
        <div className="flex items-center gap-4 bg-gray-50/50 p-1.5 rounded-xl border border-gray-100 absolute left-1/2 transform -translate-x-1/2 hidden xl:flex">
          <button
            type="button"
            onClick={() => onNavigate("prev")}
            className="p-1.5 hover:bg-white rounded-lg text-gray-500 hover:text-municipal-600 hover:shadow-sm transition-all"
            aria-label="Föregående"
          >
            <ChevronLeft size={18} className={isRTL ? "rotate-180" : ""} />
          </button>

          <div className="flex items-center gap-2 px-4 font-bold text-gray-800 w-[200px] justify-center capitalize select-none">
            <Calendar size={16} className="text-municipal-500 mb-0.5" />
            {/* ✅ Om den blir för lång ändå: lägg till "truncate" här */}
            {getHeaderDateString()}
          </div>

          <button
            type="button"
            onClick={() => onNavigate("next")}
            className="p-1.5 hover:bg-white rounded-lg text-municipal-600 hover:shadow-sm transition-all"
            aria-label="Nästa"
          >
            <ChevronRight size={18} className={isRTL ? "rotate-180" : ""} />
          </button>
        </div>

        {/* =========================
            RIGHT: Controls
        ========================== */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
            <Languages size={16} className={cn("text-gray-500", isRTL ? "mr-2 ml-1" : "ml-2 mr-1")} />
            <select
              value={activeLang}
              onChange={(e) => onLangChange(e.target.value as LanguageCode)}
              className="bg-transparent text-xs font-bold text-gray-700 py-1 pr-2 focus:outline-none cursor-pointer uppercase"
            >
              <option value="sv">🇸🇪 SV</option>
              <option value="en">🇬🇧 EN</option>
              <option value="ar">🇦🇪 AR</option>
              <option value="es">🇪🇸 ES</option>
            </select>
          </div>

          {/* ✅ Outline-ish knapp (din Button saknar variant, så vi gör det som prototypen med klasser) */}
          <button
            type="button"
            onClick={() => onNavigate("today")}
            className="hidden sm:block rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {todayLabel}
          </button>

          <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              type="button"
              onClick={() => onViewModeChange("day")}
              className={cn(
                "px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-all",
                viewMode === "day"
                  ? "bg-municipal-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              )}
            >
              {dayLabel}
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("week")}
              className={cn(
                "px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-all",
                viewMode === "week"
                  ? "bg-municipal-600 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              )}
            >
              {weekLabel}
            </button>
          </div>

          <div className="h-6 w-px bg-gray-300 hidden sm:block mx-1" />

          <div className="h-9 w-9 rounded-full bg-municipal-900 text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white cursor-pointer hover:bg-municipal-800 transition-colors">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  )
}
