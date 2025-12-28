import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import { STAFF } from "../../lib/demo-data";
import { cn, getShiftForDate } from "../../lib/utils";
import { toLocalYMD } from "../../lib/utils";

import { TaskStatus, Task } from "../../types";
import { useTasks } from "../../context/TaskContext";
import { translateTasks } from "../../lib/translations";
import { getWeekTasksForPersonAndDay } from "../admin/schedule/logic/selectors";

// Components
import { StaffHeader } from "./components/StaffHeader";
import { TimelineView } from "./components/TimelineView";
import { ReportView } from "./components/ReportView";
import { TaskSheet } from "./components/TaskSheet";

export default function PersonalPage() {
  // undvik undefined
  const currentUser = useMemo(
    () => STAFF.find((p) => p.id === "emma-andersson") ?? STAFF[0],
    []
  );

  const { tasks, updateTask, getTaskStatus } = useTasks();

  const [activeTab, setActiveTab] = useState<"today" | "report">("today");
  const [showVikarieMode, setShowVikarieMode] = useState(false);
  const [activeLang, setActiveLang] = useState("sv");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  //  en gång
  const dateKey = useMemo(() => toLocalYMD(currentDate), [currentDate]);

  // en gång (används både för label + off-check)
  const currentShift = useMemo(
    () => getShiftForDate(currentUser.id, currentDate, activeLang),
    [currentUser.id, currentDate, activeLang]
  );

  const offToday = currentShift.type === "off";

  // --- FILTER LOGIC (Matches Admin View) ---
  const dailyTasks = useMemo(() => {
    if (offToday) return [];

    // 1) Samma match-regler som admin/week
    const matched = getWeekTasksForPersonAndDay(
      tasks,
      currentUser,
      currentDate,
      dateKey,
      activeLang
    );

    // 2) samma unit-regel som prototypen:
    const inUnit = matched.filter((t) => !t.unitId || t.unitId === currentUser.unitId);

    // 3) Översätt
    const translated = translateTasks(inUnit, activeLang);

    // 4) injicera instans-status + dateKey
    const withInstance = translated.map((t) => ({
      ...t,
      status: getTaskStatus(t.id, dateKey),
      date: dateKey,
    }));

    // 5) Natt-smart sort (som prototyp)
    const normMinutes = (hhmm: string) => {
      const [h, m] = hhmm.split(":").map(Number);
      const H = h < 7 ? h + 24 : h; // 01:00 ska hamna efter 23:00
      return H * 60 + m;
    };

    return withInstance.slice().sort((a, b) => normMinutes(a.timeStart) - normMinutes(b.timeStart));
  }, [
    tasks,
    currentUser,
    currentUser.unitId,
    currentDate,
    dateKey,
    activeLang,
    getTaskStatus,
    offToday,
  ]);

  const handleNavigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const toggleTaskStatus = (taskId: string) => {
    const baseTask = tasks.find((t) => t.id === taskId);
    if (!baseTask) return;

    const currentStatus = getTaskStatus(taskId, dateKey);

    // Done -> Pending, annars -> Done/Signed
    let newStatus: TaskStatus;
    if (currentStatus === TaskStatus.COMPLETED || currentStatus === TaskStatus.SIGNED) {
      newStatus = TaskStatus.PENDING;
    } else {
      newStatus = baseTask.requiresSign ? TaskStatus.SIGNED : TaskStatus.COMPLETED;
    }

    updateTask(taskId, { status: newStatus }, dateKey);
    setSelectedTask(null);
  };

  const completedCount = dailyTasks.filter(
    (t) => t.status === TaskStatus.COMPLETED || t.status === TaskStatus.SIGNED
  ).length;
  const progress = dailyTasks.length > 0 ? Math.round((completedCount / dailyTasks.length) * 100) : 0;

  const t = {
    vikarieMode:
      activeLang === "sv"
        ? "Vikarieläge"
        : activeLang === "en"
          ? "Substitute Mode"
          : activeLang === "es"
            ? "Modo Suplente"
            : "وضع البديل",
    shift: activeLang === "sv" ? "Pass" : activeLang === "en" ? "Shift" : activeLang === "es" ? "Turno" : "وردية",
    noTasks:
      activeLang === "sv"
        ? "Inga uppgifter planerade för denna dag."
        : activeLang === "en"
          ? "No tasks planned for this day."
          : activeLang === "es"
            ? "No hay tareas planificadas para hoy."
            : "لا توجد مهام مخططة لهذا اليوم.",
    youAreOff:
      activeLang === "sv"
        ? "Du är ledig!"
        : activeLang === "en"
          ? "You are off!"
          : activeLang === "es"
            ? "¡Estás libre!"
            : "أنت في عطلة!",
    logout:
      activeLang === "sv"
        ? "Logga ut"
        : activeLang === "en"
          ? "Log out"
          : activeLang === "es"
            ? "Cerrar sesión"
            : "تسجيل الخروج",
  };

  return (
    <div
      className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto shadow-2xl overflow-hidden relative flex flex-col"
      dir={activeLang === "ar" ? "rtl" : "ltr"}
    >
      <StaffHeader
        user={currentUser}
        progress={progress}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeLang={activeLang}
        onLangChange={setActiveLang}
        currentDate={currentDate}
        onNavigateDate={handleNavigateDate}
      />

      <div className="px-6 py-3 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm z-0">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.vikarieMode}</span>
          <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
            {t.shift}:{" "}
            <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", currentShift.color)}>
              {currentShift.label}
            </span>
          </span>
        </div>

        <button
          onClick={() => setShowVikarieMode(!showVikarieMode)}
          className={cn(
            "w-10 h-6 rounded-full transition-colors flex items-center p-1 focus:outline-none",
            showVikarieMode ? "bg-municipal-600" : "bg-gray-300"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
              showVikarieMode ? "translate-x-4" : "translate-x-0"
            )}
          />
        </button>
      </div>

      <main className="px-4 py-4 space-y-4 flex-1 bg-[#f8fafc] overflow-y-auto">
        {activeTab === "today" ? (
          <TimelineView tasks={dailyTasks} showVikarieMode={showVikarieMode} activeLang={activeLang} onTaskClick={setSelectedTask} />
        ) : (
          <ReportView />
        )}

        {activeTab === "today" && dailyTasks.length === 0 && (
          <div className="text-center py-10 opacity-50 flex flex-col items-center gap-2">
            <p>{t.noTasks}</p>
            {offToday && (
              <span className="text-sm font-bold bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                {t.youAreOff}
              </span>
            )}
          </div>
        )}
      </main>

      <TaskSheet
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onToggleStatus={toggleTaskStatus}
        showVikarieMode={showVikarieMode}
        activeLang={activeLang}
      />


      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around max-w-md mx-auto z-50">
        <Link to="/" className="p-2 text-gray-400 hover:text-municipal-600 flex flex-col items-center">
          <ChevronLeft size={20} className={activeLang === "ar" ? "rotate-180" : ""} />
          <span className="text-[10px] font-medium">{t.logout}</span>
        </Link>
      </div>
    </div>
  );
}
