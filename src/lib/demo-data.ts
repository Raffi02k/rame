// src/lib/demo-data.ts
import {
  Unit,
  Person,
  Shift,
  Task,
  Assignment,
  TaskCategory,
} from "./types"



// Demo Units
export const units: Unit[] = [
  { id: "u1", name: "Daglig verksamhet Kronan", serviceType: "LSS" },
  { id: "u2", name: "SÄBO Källstorp", serviceType: "SÄBO" },
]

// Demo Staff
export const staff: Person[] = [
  {
    id: "s1",
    fullName: "Emma Andersson",
    initials: "EA",
    photo: "/professional-woman.png",
    roleType: "Staff",
    profession: "Undersköterska",
    unitId: "u1", // Huvudenhet LSS
  },
  {
    id: "s2",
    fullName: "Johan Berg",
    initials: "JB",
    photo: "/professional-man.png",
    roleType: "Staff",
    profession: "Vårdbiträde",
    unitId: "u1",
  },
  {
    id: "s3",
    fullName: "Maria Carlsson",
    initials: "MC",
    photo: "/woman-nurse.png",
    roleType: "Staff",
    profession: "Sjuksköterska",
    unitId: "u1",
  },
  {
    id: "s4",
    fullName: "Anders Danielsson",
    initials: "AD",
    photo: "/man-caregiver.jpg",
    roleType: "Staff",
    profession: "Undersköterska",
    unitId: "u1",
  },
  {
    id: "s5",
    fullName: "Lisa Eriksson",
    initials: "LE",
    photo: "/woman-caregiver.png",
    roleType: "Staff",
    profession: "Vårdbiträde",
    unitId: "u2",
  },
  {
    id: "s6",
    fullName: "Peter Forsberg",
    initials: "PF",
    photo: "/man-healthcare.jpg",
    roleType: "Staff",
    profession: "Undersköterska",
    unitId: "u2",
  },
  {
    id: "s1_u2",
    fullName: "Emma Andersson",
    initials: "EA",
    photo: "/professional-woman.png",
    roleType: "Staff",
    profession: "Undersköterska",
    unitId: "u2", // SÄBO enhet
  },
]

// Demo Service Users
export const serviceUsers: Person[] = [
  {
    id: "su1",
    fullName: "Anna Blomqvist",
    initials: "AB",
    photo: "/elderly-woman-smiling.png",
    roleType: "ServiceUser",
    unitId: "u1",
    roomNumber: "12",
    floorLabel: "Våning 1",
    wing: "Söder",
  },
  {
    id: "su2",
    fullName: "Bo Gunnarsson",
    initials: "BG",
    photo: "/elderly-man-happy.jpg",
    roleType: "ServiceUser",
    unitId: "u1",
  },
  {
    id: "su3",
    fullName: "Carina Holmström",
    initials: "CH",
    photo: "/woman-disability.jpg",
    roleType: "ServiceUser",
    unitId: "u1",
  },
  {
    id: "su4",
    fullName: "David Isaksson",
    initials: "DI",
    photo: "/man-elderly.jpg",
    roleType: "ServiceUser",
    unitId: "u2",
    roomNumber: "27",
    floorLabel: "Våning 3",
    wing: "Norr",
  },
]


// Demo Shifts for Today
const today = new Date().toISOString().split("T")[0]

export const shifts: Shift[] = [
  // Måndag (idag) – LSS (oförändrade)
  { id: "sh1", unitId: "u1", staffId: "s1", startTime: "07:00", endTime: "15:30", date: today },
  { id: "sh2", unitId: "u1", staffId: "s2", startTime: "08:00", endTime: "16:00", date: today },
  { id: "sh3", unitId: "u1", staffId: "s3", startTime: "07:00", endTime: "15:30", date: today },
  { id: "sh4", unitId: "u1", staffId: "s4", startTime: "14:00", endTime: "22:00", date: today },

  // SÄBO måndag – 👉 nu med färglag + Norr/Söder
  {
    id: "sh5",
    unitId: "u2",
    staffId: "s5",
    startTime: "07:00",
    endTime: "15:00",
    date: today,
    teamColor: "Röd",
    wing: "Norr",
  },
  {
    id: "sh6",
    unitId: "u2",
    staffId: "s6",
    startTime: "15:00",
    endTime: "23:00",
    date: today,
    teamColor: "Blå",
    wing: "Söder",
  },
  {
    id: "sh7",
    unitId: "u2",
    staffId: "s1_u2",
    startTime: "08:00",
    endTime: "16:00",
    date: today,
    teamColor: "Vit",
    wing: "Norr",
  },
]

// Demo Tasks
export const tasks: Task[] = [
  // Brukarnära tasks - u1 (LSS)
  {
    id: "t1",
    unitId: "u1",
    title: "Morgonstöd Anna",
    description: "Hjälpa Anna med morgonrutiner, påklädning och frukost",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "07:30",
    endTime: "08:30",
    serviceUserId: "su1",
    isFixedTime: true,
    dayOfWeek: 0, // måndag
  },
  {
    id: "t2",
    unitId: "u1",
    title: "Aktivitet - Promenad",
    description: "Promenad i närområdet med Bo",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "10:00",
    endTime: "11:00",
    serviceUserId: "su2",
    isFixedTime: false,
    dayOfWeek: 0,
  },
  {
    id: "t3",
    unitId: "u1",
    title: "Lunch Carina",
    description: "Matning och stöd vid lunch",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "12:00",
    endTime: "12:45",
    serviceUserId: "su3",
    isFixedTime: true,
    dayOfWeek: 0,
  },
  {
    id: "t4",
    unitId: "u1",
    title: "Kreativ verkstad",
    description: "Facilitera målarverkstad",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "13:30",
    endTime: "15:00",
    isFixedTime: false,
    dayOfWeek: 0,
  },

  // Tisdag
  {
    id: "t15",
    unitId: "u1",
    title: "Morgonstöd Anna",
    description: "Hjälpa Anna med morgonrutiner",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "07:30",
    endTime: "08:30",
    serviceUserId: "su1",
    isFixedTime: true,
    dayOfWeek: 1,
  },
  {
    id: "t16",
    unitId: "u1",
    title: "Musik terapi",
    description: "Gruppaktivitet med musik",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "10:00",
    endTime: "11:00",
    isFixedTime: false,
    dayOfWeek: 1,
  },
  {
    id: "t17",
    unitId: "u1",
    title: "Lunch Bo",
    description: "Stöd vid lunch",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "12:00",
    endTime: "12:45",
    serviceUserId: "su2",
    isFixedTime: true,
    dayOfWeek: 1,
  },

  // Onsdag
  {
    id: "t18",
    unitId: "u1",
    title: "Simning",
    description: "Följ med till simhallen",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "09:00",
    endTime: "11:00",
    isFixedTime: true,
    dayOfWeek: 2,
  },
  {
    id: "t19",
    unitId: "u1",
    title: "Bakning",
    description: "Baka bullar tillsammans",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "13:00",
    endTime: "15:00",
    isFixedTime: false,
    dayOfWeek: 2,
  },

  // Torsdag
  {
    id: "t20",
    unitId: "u1",
    title: "Utflykt - Zoo",
    description: "Heldagsutflykt till Universeum",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "09:00",
    endTime: "15:00",
    isFixedTime: true,
    dayOfWeek: 3,
  },

  // Fredag
  {
    id: "t21",
    unitId: "u1",
    title: "Fredagsmys förberedelser",
    description: "Handla och förbereda fredagsmys",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "10:00",
    endTime: "12:00",
    isFixedTime: false,
    dayOfWeek: 4,
  },
  {
    id: "t22",
    unitId: "u1",
    title: "Film kväll",
    description: "Gemensam filmkväll",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "18:00",
    endTime: "20:00",
    isFixedTime: true,
    dayOfWeek: 4,
  },

  // HSL tasks - måndag
  {
    id: "t5",
    unitId: "u1",
    title: "Medicin Anna 08:00",
    description: "Ge morgonmedicin enligt signatur",
    category: "HSL",
    requiresSignature: true,
    startTime: "08:00",
    endTime: "08:15",
    serviceUserId: "su1",
    isFixedTime: true,
    dayOfWeek: 0,
  },
  {
    id: "t6",
    unitId: "u1",
    title: "Blodtryck Bo",
    description: "Kontrollera och dokumentera blodtryck",
    category: "HSL",
    requiresSignature: true,
    startTime: "09:00",
    endTime: "09:15",
    serviceUserId: "su2",
    isFixedTime: true,
    dayOfWeek: 0,
  },
  {
    id: "t7",
    unitId: "u1",
    title: "Medicin Carina 12:00",
    description: "Ge middagsmedicin enligt signatur",
    category: "HSL",
    requiresSignature: true,
    startTime: "12:00",
    endTime: "12:15",
    serviceUserId: "su3",
    isFixedTime: true,
    dayOfWeek: 0,
  },
  {
    id: "t8",
    unitId: "u1",
    title: "Såromläggning Anna",
    description: "Byta förband på vänster underben",
    category: "HSL",
    requiresSignature: true,
    startTime: "14:00",
    endTime: "14:30",
    serviceUserId: "su1",
    isFixedTime: true,
    dayOfWeek: 0,
  },

  // HSL tisdag
  {
    id: "t23",
    unitId: "u1",
    title: "Medicin Anna 08:00",
    description: "Morgonmedicin",
    category: "HSL",
    requiresSignature: true,
    startTime: "08:00",
    endTime: "08:15",
    serviceUserId: "su1",
    isFixedTime: true,
    dayOfWeek: 1,
  },
  {
    id: "t24",
    unitId: "u1",
    title: "Medicin Bo 08:00",
    description: "Morgonmedicin",
    category: "HSL",
    requiresSignature: true,
    startTime: "08:00",
    endTime: "08:15",
    serviceUserId: "su2",
    isFixedTime: true,
    dayOfWeek: 1,
  },

  // Praktiska tasks (måndag)
  {
    id: "t9",
    unitId: "u1",
    title: "Morgondisk",
    description: "Diska och torka efter frukost",
    category: "Praktisk",
    requiresSignature: false,
    startTime: "08:30",
    endTime: "09:00",
    isFixedTime: false,
    dayOfWeek: 0,
  },
  {
    id: "t10",
    unitId: "u1",
    title: "Tvätt",
    description: "Köra tvättmaskin och hantera ren tvätt",
    category: "Praktisk",
    requiresSignature: false,
    startTime: "09:30",
    endTime: "10:30",
    isFixedTime: false,
    dayOfWeek: 0,
  },
  {
    id: "t11",
    unitId: "u1",
    title: "Städa gemensamma utrymmen",
    description: "Dammsuga och torka matsal",
    category: "Praktisk",
    requiresSignature: false,
    startTime: "11:00",
    endTime: "11:30",
    isFixedTime: false,
    dayOfWeek: 0,
  },
  {
    id: "t12",
    unitId: "u1",
    title: "Förbereda fika",
    description: "Sätta på kaffe och duka fika",
    category: "Praktisk",
    requiresSignature: false,
    startTime: "14:00",
    endTime: "14:30",
    isFixedTime: false,
    dayOfWeek: 0,
  },

  // Praktisk tisdag
  {
    id: "t25",
    unitId: "u1",
    title: "Stortvättdag",
    description: "Bädda om alla sängar",
    category: "Praktisk",
    requiresSignature: false,
    startTime: "09:00",
    endTime: "11:00",
    isFixedTime: false,
    dayOfWeek: 1,
  },

  // Praktisk onsdag
  {
    id: "t26",
    unitId: "u1",
    title: "Matinköp",
    description: "Åka och handla till veckan",
    category: "Praktisk",
    requiresSignature: false,
    startTime: "13:00",
    endTime: "14:30",
    isFixedTime: false,
    dayOfWeek: 2,
  },

  // Administrativa tasks
  {
    id: "t13",
    unitId: "u1",
    title: "Dokumentation förmiddag",
    description: "Skriva anteckningar i VIVA",
    category: "Administrativ",
    requiresSignature: false,
    startTime: "11:30",
    endTime: "12:00",
    isFixedTime: false,
    dayOfWeek: 0,
  },
  {
    id: "t14",
    unitId: "u1",
    title: "Beställning hygienartiklar",
    description: "Inventera och beställa förbrukningsmaterial",
    category: "Administrativ",
    requiresSignature: false,
    startTime: "15:00",
    endTime: "15:30",
    isFixedTime: false,
    dayOfWeek: 0,
  },

  // Admin tisdag
  {
    id: "t27",
    unitId: "u1",
    title: "Teammöte",
    description: "Veckomöte med alla",
    category: "Administrativ",
    requiresSignature: false,
    startTime: "14:00",
    endTime: "15:00",
    isFixedTime: true,
    dayOfWeek: 1,
  },

// SÄBO uppgifter (måndag)
{
  id: "t28",
  unitId: "u2",
  title: "Morgon stöd David",
  description: "Morgonstöd och kontroll",
  category: "Brukarnära",
  requiresSignature: false,
  startTime: "08:00",
  endTime: "09:00",
  serviceUserId: "su4",
  isFixedTime: true,
  dayOfWeek: 0,
  requiresTwoStaff: true,
},
  {
    id: "t29",
    unitId: "u2",
    title: "Medicin runda 09:00",
    description: "Morgonmedicin för alla boende",
    category: "HSL",
    requiresSignature: true,
    startTime: "09:00",
    endTime: "10:00",
    isFixedTime: true,
    dayOfWeek: 0,
  },
  {
    id: "t30",
    unitId: "u2",
    title: "Lunch servering",
    description: "Servera och hjälpa vid lunch",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "12:00",
    endTime: "13:00",
    isFixedTime: true,
    dayOfWeek: 0,
  },
  {
    id: "t31",
    unitId: "u2",
    title: "Gymnastik grupp",
    description: "Leda sittgymnastik",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "14:00",
    endTime: "15:00",
    isFixedTime: false,
    dayOfWeek: 0,
  },
  {
    id: "t32",
    unitId: "u2",
    title: "Kvällsrond",
    description: "Kvällsmat och kvällsvård",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "17:00",
    endTime: "18:30",
    isFixedTime: true,
    dayOfWeek: 0,
  },

  // -------- Helg (ny data för att testa hela veckan) --------

  // Lördag LSS
  {
    id: "t33",
    unitId: "u1",
    title: "Lördagsfrukost Anna",
    description: "Lugn helgfrukost med extra tid",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "09:00",
    endTime: "10:00",
    serviceUserId: "su1",
    isFixedTime: true,
    dayOfWeek: 5,
  },
  {
    id: "t34",
    unitId: "u1",
    title: "Helgstädning gemensamma ytor",
    description: "Lätt städning av vardagsrum och kök",
    category: "Praktisk",
    requiresSignature: false,
    startTime: "11:00",
    endTime: "12:00",
    isFixedTime: false,
    dayOfWeek: 5,
  },
  {
    id: "t35",
    unitId: "u1",
    title: "Planering kommande vecka",
    description: "Gå igenom aktiviteter med personal och brukare",
    category: "Administrativ",
    requiresSignature: false,
    startTime: "14:00",
    endTime: "15:00",
    isFixedTime: false,
    dayOfWeek: 5,
  },

  // Söndag LSS
  {
    id: "t36",
    unitId: "u1",
    title: "Söndagspromenad",
    description: "Lugn promenad i närområdet",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "11:00",
    endTime: "12:30",
    serviceUserId: "su2",
    isFixedTime: false,
    dayOfWeek: 6,
  },

  // Lördag SÄBO
  {
    id: "t37",
    unitId: "u2",
    title: "Lördagsgympa",
    description: "Lätt sittgymnastik i samlingsrummet",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "10:00",
    endTime: "11:00",
    serviceUserId: "su4",
    isFixedTime: true,
    dayOfWeek: 5,
  },

  // Söndag SÄBO
  {
    id: "t38",
    unitId: "u2",
    title: "Söndagskaffe",
    description: "Kaffe och kaka med boende och anhöriga",
    category: "Praktisk",
    requiresSignature: false,
    startTime: "15:00",
    endTime: "16:00",
    isFixedTime: false,
    dayOfWeek: 6,
  },

  // Evening and night tasks for Monday
  {
    id: "t39",
    unitId: "u1",
    title: "Kvällsmat Anna",
    description: "Servera och hjälpa med kvällsmat",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "18:30",
    endTime: "19:15",
    serviceUserId: "su1",
    isFixedTime: true,
    dayOfWeek: 0,
  },
{
  id: "t40",
  unitId: "u1",
  title: "Kvällsvård Bo",
  description: "Hjälp med kvällsrutiner och sänggående",
  category: "Brukarnära",
  requiresSignature: false,
  startTime: "20:00",
  endTime: "20:45",
  serviceUserId: "su2",
  isFixedTime: true,
  dayOfWeek: 0,
  requiresTwoStaff: true, 
},
  {
    id: "t41",
    unitId: "u1",
    title: "Nattmedicin runda",
    description: "Ge kvällsmedicin enligt signatur",
    category: "HSL",
    requiresSignature: true,
    startTime: "21:00",
    endTime: "21:30",
    isFixedTime: true,
    dayOfWeek: 0,
  },
  {
    id: "t42",
    unitId: "u1",
    title: "Nattrond",
    description: "Kontrollera att alla brukare sover tryggt",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "23:00",
    endTime: "23:30",
    isFixedTime: false,
    dayOfWeek: 0,
  },
  {
    id: "t43",
    unitId: "u1",
    title: "Nattkontroll 03:00",
    description: "Nattlig runda",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "03:00",
    endTime: "03:20",
    isFixedTime: false,
    dayOfWeek: 0,
  },

  // More tasks for Maria Carlsson throughout the week
  {
    id: "t44",
    unitId: "u1",
    title: "Såromläggning Bo",
    description: "Byta förband",
    category: "HSL",
    requiresSignature: true,
    startTime: "09:30",
    endTime: "10:00",
    serviceUserId: "su2",
    isFixedTime: true,
    dayOfWeek: 1, // Tuesday
  },
  {
    id: "t45",
    unitId: "u1",
    title: "Medicin Carina 14:00",
    description: "Eftermiddagsmedicin",
    category: "HSL",
    requiresSignature: true,
    startTime: "14:00",
    endTime: "14:15",
    serviceUserId: "su3",
    isFixedTime: true,
    dayOfWeek: 1,
  },
  {
    id: "t46",
    unitId: "u1",
    title: "Blodprov Anna",
    description: "Ta blodprov för labbanalys",
    category: "HSL",
    requiresSignature: true,
    startTime: "08:30",
    endTime: "09:00",
    serviceUserId: "su1",
    isFixedTime: true,
    dayOfWeek: 2, // Wednesday
  },
  {
    id: "t47",
    unitId: "u1",
    title: "Journalföring",
    description: "Uppdatera medicinska journaler",
    category: "Administrativ",
    requiresSignature: false,
    startTime: "14:00",
    endTime: "15:00",
    isFixedTime: false,
    dayOfWeek: 2,
  },
  {
    id: "t48",
    unitId: "u1",
    title: "Medicin runda morgon",
    description: "Ge morgonmedicin till alla brukare",
    category: "HSL",
    requiresSignature: true,
    startTime: "08:00",
    endTime: "08:45",
    isFixedTime: true,
    dayOfWeek: 3, // Thursday
  },
  {
    id: "t49",
    unitId: "u1",
    title: "Hälsokontroll Carina",
    description: "Mäta blodtryck, puls och temperatur",
    category: "HSL",
    requiresSignature: true,
    startTime: "10:00",
    endTime: "10:30",
    serviceUserId: "su3",
    isFixedTime: true,
    dayOfWeek: 3,
  },
  {
    id: "t50",
    unitId: "u1",
    title: "Kontakt vårdcentral",
    description: "Ringa och boka läkartid för Bo",
    category: "Administrativ",
    requiresSignature: false,
    startTime: "13:00",
    endTime: "13:30",
    isFixedTime: false,
    dayOfWeek: 4, // Friday
  },
  {
    id: "t51",
    unitId: "u1",
    title: "Veckosammanfattning",
    description: "Sammanställa veckans händelser",
    category: "Administrativ",
    requiresSignature: false,
    startTime: "14:00",
    endTime: "15:00",
    isFixedTime: false,
    dayOfWeek: 4,
  },

  // More evening/night tasks for different days
  {
    id: "t52",
    unitId: "u1",
    title: "Kvällsaktivitet - Musik",
    description: "Lyssna på musik med brukare",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "19:00",
    endTime: "20:00",
    isFixedTime: false,
    dayOfWeek: 1,
  },
  {
    id: "t53",
    unitId: "u1",
    title: "Kvällsmedicin runda",
    description: "Ge kvällsmedicin",
    category: "HSL",
    requiresSignature: true,
    startTime: "21:00",
    endTime: "21:30",
    isFixedTime: true,
    dayOfWeek: 2,
  },
  {
    id: "t54",
    unitId: "u1",
    title: "Kvällspromenad",
    description: "Kvällspromenad i trädgården",
    category: "Brukarnära",
    requiresSignature: false,
    startTime: "19:30",
    endTime: "20:15",
    isFixedTime: false,
    dayOfWeek: 3,
  },
]

// Demo Assignments
export const assignments: Assignment[] = [
  // Måndag LSS
  { taskId: "t1", staffId: "s1", status: "done", completedAt: "08:25" },
  { taskId: "t2", staffId: "s2", status: "inProgress" },
  { taskId: "t3", staffId: "s1", status: "planned" },
  { taskId: "t4", staffId: "s2", status: "planned" },
  { taskId: "t5", staffId: "s3", status: "done", signedBy: "s3", completedAt: "08:10" },
  { taskId: "t6", staffId: "s3", status: "done", signedBy: "s3", completedAt: "09:12" },
  { taskId: "t7", staffId: "s3", status: "planned" },
  { taskId: "t8", staffId: "s3", status: "planned" },
  { taskId: "t9", staffId: "s2", status: "done", completedAt: "08:55" },
  { taskId: "t10", staffId: "s2", status: "done", completedAt: "10:25" },
  { taskId: "t11", staffId: "s1", status: "planned" },
  { taskId: "t12", staffId: "s2", status: "planned" },
  { taskId: "t13", staffId: "s1", status: "planned" },
  { taskId: "t14", staffId: "s1", status: "planned" },

  { taskId: "t39", staffId: "s4", status: "planned" },
  { taskId: "t40", staffId: "s4", status: "planned" },
  { taskId: "t41", staffId: "s3", status: "planned" },
  { taskId: "t42", staffId: "s4", status: "planned" },
  { taskId: "t43", staffId: "s4", status: "planned" },

  // Tisdag LSS
  { taskId: "t15", staffId: "s1", status: "planned" },
  { taskId: "t16", staffId: "s2", status: "planned" },
  { taskId: "t17", staffId: "s2", status: "planned" },
  { taskId: "t23", staffId: "s3", status: "planned" },
  { taskId: "t24", staffId: "s3", status: "planned" },
  { taskId: "t25", staffId: "s1", status: "planned" },
  { taskId: "t27", staffId: "s1", status: "planned" },

  { taskId: "t44", staffId: "s3", status: "planned" },
  { taskId: "t45", staffId: "s3", status: "planned" },
  { taskId: "t52", staffId: "s4", status: "planned" },

  // Onsdag LSS
  { taskId: "t18", staffId: "s1", status: "planned" },
  { taskId: "t19", staffId: "s2", status: "planned" },
  { taskId: "t26", staffId: "s1", status: "planned" },

  { taskId: "t46", staffId: "s3", status: "planned" },
  { taskId: "t47", staffId: "s3", status: "planned" },
  { taskId: "t53", staffId: "s4", status: "planned" },

  // Torsdag LSS
  { taskId: "t20", staffId: "s1", status: "planned" },

  { taskId: "t48", staffId: "s3", status: "planned" },
  { taskId: "t49", staffId: "s3", status: "planned" },
  { taskId: "t54", staffId: "s4", status: "planned" },

  // Fredag LSS
  { taskId: "t21", staffId: "s2", status: "planned" },
  { taskId: "t22", staffId: "s1", status: "planned" },

  { taskId: "t50", staffId: "s3", status: "planned" },
  { taskId: "t51", staffId: "s3", status: "planned" },

  // Lördag LSS
  { taskId: "t33", staffId: "s1", status: "planned" },
  { taskId: "t34", staffId: "s2", status: "planned" },
  { taskId: "t35", staffId: "s1", status: "planned" },

  // Söndag LSS
  { taskId: "t36", staffId: "s2", status: "planned" },

  // SÄBO måndag
  { taskId: "t28", staffId: "s5", status: "planned" },
  { taskId: "t29", staffId: "s1_u2", status: "planned" },
  { taskId: "t30", staffId: "s5", status: "planned" },
  { taskId: "t31", staffId: "s1_u2", status: "planned" },
  { taskId: "t32", staffId: "s6", status: "planned" },

  // SÄBO lördag/söndag
  { taskId: "t37", staffId: "s5", status: "planned" },
  { taskId: "t38", staffId: "s6", status: "planned" },
]

export function getStaffByUnit(unitId: string) {
  return staff.filter((s) => s.unitId === unitId)
}

export function getServiceUsersByUnit(unitId: string) {
  return serviceUsers.filter((su) => su.unitId === unitId)
}

export function getTasksByUnit(unitId: string) {
  return tasks.filter((t) => t.unitId === unitId)
}

export function getShiftsByUnit(unitId: string, date: string) {
  return shifts.filter((sh) => sh.unitId === unitId && sh.date === date)
}

export function getAssignmentsByStaff(staffId: string) {
  return assignments.filter((a) => a.staffId === staffId)
}

export function getTaskById(taskId: string) {
  return tasks.find((t) => t.id === taskId)
}

export function getStaffById(staffId: string) {
  return staff.find((s) => s.id === staffId)
}

export function getServiceUserById(userId: string) {
  return serviceUsers.find((su) => su.id === userId)
}

export const categoryColors = {
  Brukarnära: { bg: "bg-[#d1fae5]", text: "text-[#065f46]", border: "border-[#10b981]" },
  HSL: { bg: "bg-[#fee2e2]", text: "text-[#991b1b]", border: "border-[#ef4444]" },
  Praktisk: { bg: "bg-[#dbeafe]", text: "text-[#1e3a8a]", border: "border-[#3b82f6]" },
  Administrativ: { bg: "bg-[#ede9fe]", text: "text-[#5b21b6]", border: "border-[#8b5cf6]" },
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

export function getTaskDuration(task: Task): number {
  return timeToMinutes(task.endTime) - timeToMinutes(task.startTime)
}
