import type { LanguageCode, Task, TaskCategory } from "./types"

// 🔹 Vad vi vill kunna översätta för AdminPage just nu
export interface UiTranslations {
    titleDay: string
    titleWeek: string
    datePrefix: string
    filterLabel: string
    newTask: string
    missedTitle: string
    missedButton: string
    clearFilters: string
    vikarieMode?: string
    shift?: string
    noTasks?: string
    youAreOff?: string
    logout?: string
}

const UI_STRINGS: Record<string, UiTranslations> = {
    sv: {
        titleDay: "Dagsschema",
        titleWeek: "Veckoöversikt",
        datePrefix: "Idag:",
        filterLabel: "Filtrera",
        newTask: "Ny uppgift",
        missedTitle: "3 missade uppgifter igår",
        missedButton: "Visa rapport",
        clearFilters: "Rensa filter",
        vikarieMode: 'Vikarieläge',
        shift: 'Pass',
        noTasks: 'Inga uppgifter planerade för denna dag.',
        youAreOff: 'Du är ledig!',
        logout: 'Logga ut'
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
        vikarieMode: 'Substitute Mode',
        shift: 'Shift',
        noTasks: 'No tasks planned for this day.',
        youAreOff: 'You are off!',
        logout: 'Log out'
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
        vikarieMode: 'Modo Suplente',
        shift: 'Turno',
        noTasks: 'No hay tareas planificadas para hoy.',
        youAreOff: '¡Estás libre!',
        logout: 'Cerrar sesión'
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
        vikarieMode: 'وضع البديل',
        shift: 'وردية',
        noTasks: 'لا توجد مهام مخططة لهذا اليوم.',
        youAreOff: 'أنت في عطلة!',
        logout: 'تسجيل الخروج'
    }
}

export function getUITranslations(lang: string): UiTranslations {
    return UI_STRINGS[lang] ?? UI_STRINGS.sv
}

export function getCategoryLabel(category: TaskCategory, lang: string): string {
    const labels: Record<string, Record<TaskCategory, string>> = {
        sv: {
            hsl: 'HSL',
            care: 'Omsorg',
            service: 'Service',
            social: 'Socialt',
            admin: 'Admin'
        },
        en: {
            hsl: 'Medical',
            care: 'Care',
            service: 'Service',
            social: 'Social',
            admin: 'Admin'
        },
        es: {
            hsl: 'Salud',
            care: 'Cuidado',
            service: 'Servicio',
            social: 'Social',
            admin: 'Admin'
        },
        ar: {
            hsl: 'صحي',
            care: 'رعاية',
            service: 'خدمة',
            social: 'اجتماعي',
            admin: 'إداري'
        }
    };
    return labels[lang]?.[category] ?? labels.sv[category];
}

export function translateTasks(tasks: Task[], lang: string): Task[] {
    // In a real app, this would replace titles/descriptions with translated versions.
    // For this prototype, we return as-is, or could try basic mapping.
    return tasks;
}
