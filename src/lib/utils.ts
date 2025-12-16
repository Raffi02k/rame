import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ShiftRole } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'hsl': return 'bg-red-100 text-red-800 border-red-200';
    case 'care': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'service': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'social': return 'bg-green-100 text-green-800 border-green-200';
    case 'admin': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getTeamColorClasses(color?: string) {
  switch (color) {
    case 'red': return 'bg-team-red border-team-redBorder';
    case 'blue': return 'bg-team-blue border-team-blueBorder';
    case 'purple': return 'bg-team-purple border-team-purpleBorder';
    case 'white': return 'bg-team-white border-team-whiteBorder';
    default: return 'bg-white border-gray-200';
  }
}

export function getWeekNumber(d: Date): number {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}

interface ShiftInfo {
  id: ShiftRole;
  type: 'day' | 'eve' | 'night' | 'off';
  label: string;
  color: string;
  time: string;
}

/**
 * Calculates the exact shift ROLE for a person on a specific date.
 * NOW SUPPORTS LANGUAGE TRANSLATION.
 */
export function getShiftForDate(personId: string, date: Date, lang: string = 'sv'): ShiftInfo {
  const dateStr = date.toISOString().split('T')[0];
  const seedString = personId + dateStr;
  const seed = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const rand = seededRandom(seed);

  // Helpers for translation
  const t = (sv: string, en: string, ar: string, es: string) => {
    if (lang === 'en') return en;
    if (lang === 'ar') return ar;
    if (lang === 'es') return es;
    return sv;
  };

  // LOGIC:
  if (rand < 0.15) {
    return {
      id: 'off',
      type: 'off',
      label: t('Ledig', 'Off', 'عطلة', 'Libre'),
      color: 'bg-gray-50 text-gray-400',
      time: ''
    };
  }
  if (rand < 0.35) {
    return {
      id: 'morning_red',
      type: 'day',
      label: t('Dag (Röd)', 'Day (Red)', 'نهار (أحمر)', 'Día (Rojo)'),
      color: 'bg-red-50 text-red-900 border-red-200',
      time: '07:00 - 16:00'
    };
  }
  if (rand < 0.55) {
    return {
      id: 'morning_blue',
      type: 'day',
      label: t('Dag (Blå)', 'Day (Blue)', 'نهار (أزرق)', 'Día (Azul)'),
      color: 'bg-blue-50 text-blue-900 border-blue-200',
      time: '07:00 - 16:00'
    };
  }
  if (rand < 0.70) {
    return {
      id: 'evening_red',
      type: 'eve',
      label: t('Kväll (Röd)', 'Evening (Red)', 'مساء (أحمر)', 'Tarde (Rojo)'),
      color: 'bg-orange-50 text-orange-900 border-orange-200',
      time: '13:30 - 21:00'
    };
  }
  if (rand < 0.85) {
    return {
      id: 'evening_blue',
      type: 'eve',
      label: t('Kväll (Blå)', 'Evening (Blue)', 'مساء (أزرق)', 'Tarde (Azul)'),
      color: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      time: '13:00 - 21:00'
    };
  }
  if (rand < 0.92) {
    return {
      id: 'night_red',
      type: 'night',
      label: t('Natt (Röd)', 'Night (Red)', 'ليل (أحمر)', 'Noche (Rojo)'),
      color: 'bg-slate-800 text-red-200 border-red-900',
      time: '21:00 - 07:00'
    };
  }

  return {
    id: 'night_blue',
    type: 'night',
    label: t('Natt (Blå)', 'Night (Blue)', 'ليل (أزرق)', 'Noche (Azul)'),
    color: 'bg-slate-800 text-blue-200 border-blue-900',
    time: '21:00 - 07:00'
  };
}
