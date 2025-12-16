// src/pages/admin/components/AdminToolbar.tsx
"use client"

import React from "react"
import { Filter, Plus, Users, X } from "lucide-react"
import { Button } from "../../../components/button"
import { cn } from "../../../lib/utils"
import { Person, TaskCategory, ViewMode } from "../../../lib/types"
import { categoryColors } from "../../../lib/demo-data"

const TASK_CATEGORIES: TaskCategory[] = ["HSL", "Brukarnära", "Praktisk", "Administrativ"]

const CATEGORY_LABELS: Record<TaskCategory, string> = {
  HSL: "HSL / medicinskt",
  Brukarnära: "Brukarnära",
  Praktisk: "Praktiskt",
  Administrativ: "Administrativt",
}

type Props = {
  title: string
  viewMode: ViewMode
  activeLang: string
  filterLabel: string
  clearFiltersLabel: string
  newTaskLabel: string

  staff: Person[]
  activeFilters: TaskCategory[]
  activeStaffFilters: string[]

  onToggleCategory: (cat: TaskCategory) => void
  onToggleStaff: (staffId: string) => void
  onClearAll: () => void
  onNewTask: () => void
}

export function AdminToolbar(props: Props) {
  const {
    title,
    viewMode,
    activeLang,
    filterLabel,
    clearFiltersLabel,
    newTaskLabel,
    staff,
    activeFilters,
    activeStaffFilters,
    onToggleCategory,
    onToggleStaff,
    onClearAll,
    onNewTask,
  } = props

  const hasActiveFilters = activeFilters.length > 0 || activeStaffFilters.length > 0
  const isRtl = activeLang === "ar"

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>

        {viewMode === "day" && (
          <div className="text-gray-500 text-sm flex gap-4 mt-1">
            <span>{isRtl ? "الليل" : "Natt"} 23:00 - 05:59</span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span>{isRtl ? "الصباح" : "Morgon"} 06:00 - 11:59</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm overflow-x-auto max-w-full">
          <span className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">
            <Filter size={10} className={isRtl ? "ml-1" : "mr-1"} />
            {filterLabel}
          </span>

          {TASK_CATEGORIES.map((cat) => {
            const active = activeFilters.includes(cat)
            const colors = categoryColors[cat]

            return (
              <button
                key={cat}
                onClick={() => onToggleCategory(cat)}
                className={cn(
                  "px-3 py-1 text-xs rounded-md font-bold transition-all whitespace-nowrap border",
                  active
                    ? `${colors.bg} ${colors.text} shadow-sm border-transparent transform scale-[1.03]`
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
                )}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            )
          })}

          <div className="w-px h-5 bg-gray-200 mx-1"></div>

          <span className="px-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">
            <Users size={12} className={isRtl ? "ml-1" : "mr-1"} />
          </span>

          <div className="flex -space-x-1.5 hover:space-x-1 transition-all">
            {staff.map((person) => {
              const isActive = activeStaffFilters.includes(person.id)
              const isDimmed = activeStaffFilters.length > 0 && !isActive

              return (
                <button
                  key={person.id}
                  onClick={() => onToggleStaff(person.id)}
                  className={cn(
                    "relative rounded-full transition-all duration-200 focus:outline-none",
                    isActive ? "z-10 ring-2 ring-offset-1 ring-municipal-500 scale-110" : "hover:scale-110 hover:z-10",
                    isDimmed && "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                  )}
                  title={person.fullName}
                >
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.fullName}
                      className="w-7 h-7 rounded-full border border-white shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full border border-white shadow-sm bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                      {person.initials}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {hasActiveFilters && (
            <>
              <div className="h-4 w-px bg-gray-200 mx-1"></div>
              <button
                onClick={onClearAll}
                className="px-2 py-1 text-xs text-gray-500 font-medium hover:text-red-600 hover:bg-red-50 rounded flex items-center gap-1 transition-colors"
              >
                <X size={12} /> {clearFiltersLabel}
              </button>
            </>
          )}
        </div>

        <Button onClick={onNewTask} className="shadow-lg shadow-municipal-500/20 gap-2 text-sm">
          <Plus size={16} /> {newTaskLabel}
        </Button>
      </div>
    </div>
  )
}
