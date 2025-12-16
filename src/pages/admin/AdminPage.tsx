"use client"

import { useMemo, useState } from "react"
import {
  units,
  getStaffByUnit,
  getShiftsByUnit,
  getTasksByUnit,
} from "../../lib/demo-data"
import { getUITranslations } from "../../lib/translation"
import { LanguageCode, TaskCategory, Unit, ViewMode } from "../../lib/types"

import { AdminHeader } from "./components/AdminHeader"
import { MissedTaskAlert } from "./components/MissedTaskAlert"
import { DaySchedule } from "./components/DaySchedule"
import { StaffingTodayCard } from "./components/StaffingTodayCard"
import { TasksTodayCard } from "./components/TasksTodayCard"
import { AdminToolbar } from "./components/AdminToolbar"
import { ReportModal } from "./modals/ReportModal"


export default function AdminPage() {
  const [unitId, setUnitId] = useState("u2")
  const [viewMode, setViewMode] = useState<ViewMode>("day")
  const [activeLang, setActiveLang] = useState<LanguageCode>("sv")

  // UI
  const [isReportModalOpen, setReportModalOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<TaskCategory[]>([])
  const [activeStaffFilters, setActiveStaffFilters] = useState<string[]>([])

  const t = getUITranslations(activeLang)
  const isRtl = activeLang === "ar"

  // Datum
  const [currentDate, setCurrentDate] = useState(new Date())

  const navigateDate = (direction: "prev" | "next" | "today") => {
    if (direction === "today") {
      setCurrentDate(new Date())
      return
    }

  const d = new Date(currentDate)
  const step = viewMode === "week" ? 7 : 1

  d.setDate(d.getDate() + (direction === "next" ? step : -step))
  setCurrentDate(d)
}


  const todayDate = new Date()
  const todayIso = todayDate.toISOString().split("T")[0]
  const todayLabel = todayDate.toLocaleDateString("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const weekdayIndex = (todayDate.getDay() + 6) % 7

  // Data
  const currentUnit: Unit | undefined = units.find((u) => u.id === unitId)
  const staffOnUnit = getStaffByUnit(unitId)
  const shiftsToday = getShiftsByUnit(unitId, todayIso)
  const tasksForUnit = getTasksByUnit(unitId)

  const tasksTodayBase = tasksForUnit.filter((t) => t.dayOfWeek === weekdayIndex)

  // Visuella filter (bara för UI-känslan nu)
  const visibleStaff = useMemo(() => {
    if (activeStaffFilters.length === 0) return staffOnUnit
    return staffOnUnit.filter((s) => activeStaffFilters.includes(s.id))
  }, [staffOnUnit, activeStaffFilters])

  const tasksToday = useMemo(() => {
    let list = tasksTodayBase
    if (activeFilters.length > 0) {
      list = list.filter((t) => activeFilters.includes(t.category))
    }
    // vi filtrerar INTE tasks på staff ännu (autopilot/assignments-logik kommer sen)
    return list
  }, [tasksTodayBase, activeFilters])

  const hslCount = tasksToday.filter((t) => t.category === "HSL").length

  const pageTitle = viewMode === "day" ? t.titleDay : t.titleWeek
  const toolbarTitle = `${pageTitle} - ${currentUnit?.name ?? ""}`

  const toggleCategory = (cat: TaskCategory) => {
    setActiveFilters((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
  }

  const toggleStaff = (staffId: string) => {
    setActiveStaffFilters((prev) => (prev.includes(staffId) ? prev.filter((id) => id !== staffId) : [...prev, staffId]))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setActiveStaffFilters([])
  }

  // “Ny uppgift” – UI nu, funktion sen
  const handleNewTask = () => {
    // Sprint senare: öppna TaskModal + skapa/edit
    // Nu: vi lämnar bara grunden för klick
    console.log("New task (UI only)")
  }

  const renderMissedDescription = () => {
    if (activeLang === "ar")
      return (
        <span>
          لم يتم تسجيل مهام مهمة لـ <span className="font-semibold">Maria C</span> و{" "}
          <span className="font-semibold">Johan B</span>.
        </span>
      )
    if (activeLang === "en")
      return (
        <span>
          Important tasks for <span className="font-semibold">Maria C</span> and{" "}
          <span className="font-semibold">Johan B</span> were not registered.
        </span>
      )
    if (activeLang === "es")
      return (
        <span>
          No se registraron tareas importantes para <span className="font-semibold">Maria C</span> y{" "}
          <span className="font-semibold">Johan B</span>.
        </span>
      )
    return (
      <span>
        Viktiga insatser för <span className="font-semibold">Maria C</span> och{" "}
        <span className="font-semibold">Johan B</span> registrerades ej.
      </span>
    )
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Top header (din befintliga) */}
      <div className="max-w-[1800px] mx-auto w-full px-4 sm:px-6 py-6">
        <AdminHeader
        units={units}
        unitId={unitId}
        onUnitChange={setUnitId}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeLang={activeLang}
        onLangChange={setActiveLang}
        currentDate={currentDate}
        onNavigate={navigateDate}
      />



        {/* Toolbar (prototyp-känsla) */}
        <AdminToolbar
          title={toolbarTitle}
          viewMode={viewMode}
          activeLang={activeLang}
          filterLabel={t.filterLabel}
          clearFiltersLabel={t.clearFilters}
          newTaskLabel={t.newTask}
          staff={staffOnUnit}
          activeFilters={activeFilters}
          activeStaffFilters={activeStaffFilters}
          onToggleCategory={toggleCategory}
          onToggleStaff={toggleStaff}
          onClearAll={clearAllFilters}
          onNewTask={handleNewTask}
        />

        {/* Alert (prototyp) */}
        <MissedTaskAlert
          title={t.missedTitle}
          description={renderMissedDescription()}
          buttonText={t.missedButton}
          onShowReport={() => setReportModalOpen(true)}
        />

        {/* CONTENT – vi behåller dina cards nu (funktioner/schedule kommer sen) */}
        <div className="mt-6 space-y-6">
          <DaySchedule
            todayLabel={todayLabel}
            currentUnitName={currentUnit?.name ?? ""}
            shiftsCount={shiftsToday.length}
            tasksCount={tasksToday.length}
            hslCount={hslCount}
          />

          {/* Bemanning (vi skickar visibleStaff för att matcha filter-UI) */}
          <StaffingTodayCard staff={visibleStaff} shifts={shiftsToday} />

          <TasksTodayCard tasks={tasksToday} />
        </div>
      </div>

      <ReportModal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} />
    </div>
  )
}
