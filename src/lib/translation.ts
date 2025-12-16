// src/lib/translation.ts
import type { LanguageCode } from "./types"

// 🔹 Vad vi vill kunna översätta för AdminPage just nu
export interface UiTranslations {
  titleDay: string
  titleWeek: string
  datePrefix: string          // t.ex. "Idag:" / "Today:"
  filterLabel: string         // label ovanför filterbaren (senare)
  newTask: string             // text på "Ny uppgift"-knappen
  missedTitle: string         // rubrik för "missade uppgifter"
  missedButton: string        // text på knappen i alerten
  clearFilters: string        // text för "rensa filter"
}

// 🆕 Sprint 3: central tabell med UI-strängar per språk
const UI_STRINGS: Record<LanguageCode, UiTranslations> = {
  sv: {
    titleDay: "Dagsschema",
    titleWeek: "Veckoöversikt",
    datePrefix: "Idag:",
    filterLabel: "Filtrera",
    newTask: "Ny uppgift",
    missedTitle: "3 missade uppgifter igår",
    missedButton: "Visa rapport",
    clearFilters: "Rensa filter",
  },
  en: {
    titleDay: "Day schedule",
    titleWeek: "Week overview",
    datePrefix: "Today:",
    filterLabel: "Filter",
    newTask: "New task",
    missedTitle: "3 missed tasks yesterday",
    missedButton: "View report",
    clearFilters: "Clear filters",
  },
  es: {
    titleDay: "Horario diario",
    titleWeek: "Resumen semanal",
    datePrefix: "Hoy:",
    filterLabel: "Filtrar",
    newTask: "Nueva tarea",
    missedTitle: "3 tareas no registradas ayer",
    missedButton: "Ver informe",
    clearFilters: "Quitar filtros",
  },
  ar: {
    titleDay: "جدول اليوم",
    titleWeek: "نظرة أسبوعية",
    datePrefix: "اليوم:",
    filterLabel: "تصفية",
    newTask: "مهمة جديدة",
    missedTitle: "٣ مهام مهمة لم تُسجّل أمس",
    missedButton: "عرض التقرير",
    clearFilters: "مسح الفلاتر",
  },
}

// 🔹 Publik helper – används i AdminPage (och senare fler sidor)
export function getUITranslations(lang: LanguageCode): UiTranslations {
  // Fallback till svenska om något skulle bli fel
  return UI_STRINGS[lang] ?? UI_STRINGS.sv
}
