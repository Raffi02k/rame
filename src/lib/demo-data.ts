import { Person, Task, TaskCategory, TaskStatus, Unit } from './types';

export const UNITS: Unit[] = [
  { id: 'u1', name: 'Daglig verksamhet Kronan', type: 'LSS' },
  { id: 'u2', name: 'SÄBO Källstorpsgården', type: 'SÄBO' },
];

export const STAFF: Person[] = [
  // Unit 1 Staff
  { id: 's1', name: 'Emma Andersson', role: 'Undersköterska', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', teamColor: 'red', unitId: 'u1' },
  { id: 's2', name: 'Johan Berg', role: 'Vårdbiträde', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Johan', teamColor: 'blue', unitId: 'u1' },
  { id: 's3', name: 'Maria Carlsson', role: 'Sjuksköterska', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', teamColor: 'purple', unitId: 'u1' },
  { id: 's4', name: 'Anders Danielsson', role: 'Undersköterska', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anders', teamColor: 'red', unitId: 'u1' },

  // Unit 2 Staff
  { id: 's5', name: 'Karim Al-Fayed', role: 'Vårdbiträde', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim', teamColor: 'blue', unitId: 'u2' },
  { id: 's6', name: 'Lena Svensson', role: 'Sjuksköterska', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lena', teamColor: 'purple', unitId: 'u2' },
  { id: 's7', name: 'Olof Palme', role: 'Undersköterska', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olof', teamColor: 'white', unitId: 'u2' },
];

export const USERS: Person[] = [
  { id: 'b1', name: 'Anna Blomqvist', role: 'Brukare', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
  { id: 'b2', name: 'Bo Ek', role: 'Brukare', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bo' },
  { id: 'b3', name: 'Greta Thunberg', role: 'Brukare', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Greta' },
  { id: 'b4', name: 'Karl XVI', role: 'Brukare', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karl' },
];

// Helper to create ID
const id = () => Math.random().toString(36).substr(2, 9);

export const TASKS: Task[] = [
  // =================================================================
  // DAG RÖD (Morning Red) - HSL & Tung Omsorg
  // =================================================================
  {
    id: 'mr1', unitId: 'u1', title: 'Morgonmedicin Delning', description: 'Dela morgonmedicin till alla inskrivna.',
    timeStart: '07:00', timeEnd: '08:00', category: TaskCategory.HSL, status: TaskStatus.PENDING,
    shiftRole: 'morning_red', requiresSign: true
  },
  {
    id: 'mr2', unitId: 'u1', title: 'Morgonhygien Anna', description: 'Hjälp med nedre toalett och påklädning.',
    timeStart: '08:00', timeEnd: '08:45', category: TaskCategory.CARE, status: TaskStatus.COMPLETED,
    recipientId: 'b1', shiftRole: 'morning_red'
  },
  {
    id: 'mr3', unitId: 'u1', title: 'Blodtryckskontroll', description: 'Kontrollera blodtryck på Bo innan frukost.',
    timeStart: '08:45', timeEnd: '09:00', category: TaskCategory.HSL, status: TaskStatus.PENDING,
    recipientId: 'b2', shiftRole: 'morning_red', requiresSign: true
  },
  {
    id: 'mr4', unitId: 'u1', title: 'Såromläggning', description: 'Omläggning sår vänster underben enl. instruktion.',
    timeStart: '10:00', timeEnd: '10:45', category: TaskCategory.HSL, status: TaskStatus.PENDING,
    recipientId: 'b1', shiftRole: 'morning_red', requiresSign: true
  },
  {
    id: 'mr5', unitId: 'u1', title: 'Lunchmediciner', description: 'Dela och signera lunchmediciner.',
    timeStart: '12:00', timeEnd: '12:30', category: TaskCategory.HSL, status: TaskStatus.PENDING,
    shiftRole: 'morning_red', requiresSign: true
  },

  // =================================================================
  // DAG BLÅ (Morning Blue) - Socialt, Service, Lättare omsorg
  // =================================================================
  {
    id: 'mb1', unitId: 'u1', title: 'Frukostförberedelser', description: 'Duka fram frukostbuffé i matsalen.',
    timeStart: '07:30', timeEnd: '08:30', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'morning_blue'
  },
  {
    id: 'mb2', unitId: 'u1', title: 'Morgonpromenad', description: 'Promenad med Bo och Greta om vädret tillåter.',
    timeStart: '10:00', timeEnd: '11:00', category: TaskCategory.SOCIAL, status: TaskStatus.PENDING,
    recipientId: 'b2', shiftRole: 'morning_blue'
  },
  {
    id: 'mb3', unitId: 'u1', title: 'Städning Allrum', description: 'Dammsugning och våttorkning av gemensamma ytor.',
    timeStart: '11:00', timeEnd: '12:00', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'morning_blue'
  },
  {
    id: 'mb4', unitId: 'u1', title: 'Lunchservering', description: 'Servera lunch och hjälp till vid matbordet.',
    timeStart: '12:00', timeEnd: '13:00', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'morning_blue'
  },
  {
    id: 'mb5', unitId: 'u1', title: 'Social Aktivitet', description: 'Sällskapsspel eller högläsning.',
    timeStart: '14:00', timeEnd: '15:00', category: TaskCategory.SOCIAL, status: TaskStatus.PENDING,
    shiftRole: 'morning_blue'
  },

  // =================================================================
  // KVÄLL RÖD (Evening Red) - HSL & Middagshjälp
  // =================================================================
  {
    id: 'er1', unitId: 'u1', title: 'Middagsmedicin', description: 'Dela och signera middagsmediciner.',
    timeStart: '16:30', timeEnd: '17:00', category: TaskCategory.HSL, status: TaskStatus.PENDING,
    shiftRole: 'evening_red', requiresSign: true
  },
  {
    id: 'er2', unitId: 'u1', title: 'Insulininjektion', description: 'Ge kvällsinsulin till Karl.',
    timeStart: '17:00', timeEnd: '17:15', category: TaskCategory.HSL, status: TaskStatus.PENDING,
    recipientId: 'b4', shiftRole: 'evening_red', requiresSign: true
  },
  {
    id: 'er3', unitId: 'u1', title: 'Dokumentation', description: 'Skriv daganteckningar i systemet.',
    timeStart: '19:00', timeEnd: '20:00', category: TaskCategory.ADMIN, status: TaskStatus.PENDING,
    shiftRole: 'evening_red'
  },
  {
    id: 'er4', unitId: 'u1', title: 'Läggning Anna', description: 'Hjälp med kvällshygien och nattkläder.',
    timeStart: '20:00', timeEnd: '20:45', category: TaskCategory.CARE, status: TaskStatus.PENDING,
    recipientId: 'b1', shiftRole: 'evening_red'
  },

  // =================================================================
  // KVÄLL BLÅ (Evening Blue) - Service & Kvällsfika
  // =================================================================
  {
    id: 'eb1', unitId: 'u1', title: 'Inköp', description: 'Kompletteringshandla mjölk och frukt.',
    timeStart: '14:00', timeEnd: '15:00', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'evening_blue'
  },
  {
    id: 'eb2', unitId: 'u1', title: 'Eftermiddagsfika', description: 'Förbered och servera kaffe/te.',
    timeStart: '15:00', timeEnd: '15:30', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'evening_blue'
  },
  {
    id: 'eb3', unitId: 'u1', title: 'Middagsförberedelse', description: 'Duka och värm middagsmaten.',
    timeStart: '16:30', timeEnd: '17:30', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'evening_blue'
  },
  {
    id: 'eb4', unitId: 'u1', title: 'Disken', description: 'Ta hand om disken efter middagen.',
    timeStart: '18:00', timeEnd: '18:45', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'evening_blue'
  },
  {
    id: 'eb5', unitId: 'u1', title: 'Soprutin', description: 'Töm sopsortering i miljörummet.',
    timeStart: '20:00', timeEnd: '20:30', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'evening_blue'
  },

  // =================================================================
  // NATT RÖD (Night Red) - Tillsyn & HSL
  // =================================================================
  {
    id: 'nr1', unitId: 'u1', title: 'Överlämning', description: 'Rapport från kvällspersonalen.',
    timeStart: '21:00', timeEnd: '21:30', category: TaskCategory.ADMIN, status: TaskStatus.PENDING,
    shiftRole: 'night_red'
  },
  {
    id: 'nr2', unitId: 'u1', title: 'Rond 1', description: 'Tillsynsrunda hos alla boende.',
    timeStart: '23:00', timeEnd: '23:30', category: TaskCategory.CARE, status: TaskStatus.PENDING,
    shiftRole: 'night_red'
  },
  {
    id: 'nr3', unitId: 'u1', title: 'Vändschema Anna', description: 'Vändläge enl schema (vänster sida).',
    timeStart: '02:00', timeEnd: '02:15', category: TaskCategory.HSL, status: TaskStatus.PENDING,
    recipientId: 'b1', shiftRole: 'night_red', requiresSign: true
  },
  {
    id: 'nr4', unitId: 'u1', title: 'Rond 2', description: 'Tillsynsrunda.',
    timeStart: '04:00', timeEnd: '04:30', category: TaskCategory.CARE, status: TaskStatus.PENDING,
    shiftRole: 'night_red'
  },

  // =================================================================
  // NATT BLÅ (Night Blue) - Städ & Tvätt
  // =================================================================
  {
    id: 'nb1', unitId: 'u1', title: 'Städning Kök', description: 'Grovrengöring av köksytor.',
    timeStart: '22:00', timeEnd: '23:00', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'night_blue'
  },
  {
    id: 'nb2', unitId: 'u1', title: 'Tvättstuga', description: 'Sätt igång nattens tvättmaskiner.',
    timeStart: '00:00', timeEnd: '00:30', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'night_blue'
  },
  {
    id: 'nb3', unitId: 'u1', title: 'Förbered frukost', description: 'Ta fram bröd och koka ägg inför morgonen.',
    timeStart: '05:30', timeEnd: '06:30', category: TaskCategory.SERVICE, status: TaskStatus.PENDING,
    shiftRole: 'night_blue'
  }
];
