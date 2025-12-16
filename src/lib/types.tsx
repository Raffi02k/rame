export type LanguageCode = 'sv' | 'en' | 'es' | 'ar';
export type ViewMode = 'day' | 'week';

export enum Role {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user',
}

export enum TaskCategory {
  HSL = 'hsl', // Health/Medical (Red usually)
  CARE = 'care', // Omsorg/Hygiene
  SERVICE = 'service', // Food, Cleaning
  SOCIAL = 'social', // Activity
  ADMIN = 'admin', // Documentation
}

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  MISSED = 'missed',
  SIGNED = 'signed',
}

// Nya specifika pass-roller inkl Natt Röd/Blå
export type ShiftRole = 'morning_red' | 'morning_blue' | 'evening_red' | 'evening_blue' | 'night_red' | 'night_blue' | 'admin_day' | 'off';

export interface Person {
  id: string;
  name: string;
  role: string;
  avatar: string;
  teamColor?: 'red' | 'blue' | 'purple' | 'white'; // Visual team indicator
  unitId?: string; // Belongs to specific unit
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  timeStart: string; // HH:mm
  timeEnd: string; // HH:mm
  category: TaskCategory;
  status: TaskStatus;
  assigneeId?: string;
  recipientId?: string; // Who receives the care
  requiresSign?: boolean;
  notes?: string;
  isTeamTask?: boolean; // Requires 2 people
  unitId?: string;
  date?: string; // YYYY-MM-DD for week view logic (simulated)
  shiftRole?: ShiftRole; // Kopplar uppgiften till ett specifikt pass (t.ex. Dag Röd)
}

export interface Unit {
  id: string;
  name: string;
  type: string;
}
