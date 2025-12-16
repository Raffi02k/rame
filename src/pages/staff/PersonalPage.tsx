import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { STAFF } from '../../lib/demo-data';
import { cn, getShiftForDate } from '../../lib/utils';
import { TaskStatus, Task } from '../../lib/types';
import { useTasks } from '../../context/TaskContext';
import { translateTasks } from '../../lib/translations';

// Components
import { StaffHeader } from './components/StaffHeader';
import { TimelineView } from './components/TimelineView';
import { ReportView } from './components/ReportView';
import { TaskSheet } from './components/TaskSheet';

export default function PersonalPage() {
  const currentUser = STAFF[0]; // Emma Andersson
  const { tasks, updateTask } = useTasks(); // Use global context

  const [activeTab, setActiveTab] = useState<'today' | 'report'>('today');
  const [showVikarieMode, setShowVikarieMode] = useState(false);
  const [activeLang, setActiveLang] = useState('sv'); // Changed from boolean to string
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- FILTER LOGIC (Matches Admin View) ---
  const dailyTasks = useMemo(() => {
    // 1. Get Shift Info (Automated Shift Role)
    const shift = getShiftForDate(currentUser.id, currentDate, activeLang);

    // If OFF, show nothing
    if (shift.type === 'off') return [];

    const filtered = tasks.filter((task) => {
      // AUTOMATED CONNECTION:
      if (task.shiftRole === shift.id) {
        return true;
      }
      // Fallback: If manually assigned
      if (task.assigneeId === currentUser.id && !task.shiftRole) {
        return true;
      }
      return false;
    });

    // Translate tasks based on activeLang
    return translateTasks(filtered, activeLang);
  }, [tasks, currentDate, currentUser.id, activeLang]);

  const handleNavigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const toggleTaskStatus = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    let newStatus = TaskStatus.PENDING;
    if (task.status === TaskStatus.PENDING || task.status === TaskStatus.MISSED) {
      newStatus = task.requiresSign ? TaskStatus.SIGNED : TaskStatus.COMPLETED;
    }

    // Update Global Context
    updateTask(taskId, { status: newStatus });
    setSelectedTask(null);
  };

  const handleLangChange = (lang: string) => {
    setActiveLang(lang);
  };

  const completedCount = dailyTasks.filter(t => t.status === TaskStatus.COMPLETED || t.status === TaskStatus.SIGNED).length;
  const progress = dailyTasks.length > 0 ? Math.round((completedCount / dailyTasks.length) * 100) : 0;

  const currentShift = getShiftForDate(currentUser.id, currentDate, activeLang);

  // Translations for UI text
  const t = {
    vikarieMode: activeLang === 'sv' ? 'Vikarieläge' : activeLang === 'en' ? 'Substitute Mode' : activeLang === 'es' ? 'Modo Suplente' : 'وضع البديل',
    shift: activeLang === 'sv' ? 'Pass' : activeLang === 'en' ? 'Shift' : activeLang === 'es' ? 'Turno' : 'وردية',
    noTasks: activeLang === 'sv' ? 'Inga uppgifter planerade för denna dag.' : activeLang === 'en' ? 'No tasks planned for this day.' : activeLang === 'es' ? 'No hay tareas planificadas para hoy.' : 'لا توجد مهام مخططة لهذا اليوم.',
    youAreOff: activeLang === 'sv' ? 'Du är ledig!' : activeLang === 'en' ? 'You are off!' : activeLang === 'es' ? '¡Estás libre!' : 'أنت في عطلة!',
    logout: activeLang === 'sv' ? 'Logga ut' : activeLang === 'en' ? 'Log out' : activeLang === 'es' ? 'Cerrar sesión' : 'تسجيل الخروج'
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto shadow-2xl overflow-hidden relative flex flex-col" dir={activeLang === 'ar' ? 'rtl' : 'ltr'}>

      <StaffHeader
        user={currentUser}
        progress={progress}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeLang={activeLang}
        onLangChange={handleLangChange}
        currentDate={currentDate}
        onNavigateDate={handleNavigateDate}
      />

      {/* Vikarie Mode Toggle */}
      <div className="px-6 py-3 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm z-0">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.vikarieMode}</span>
          <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
            {t.shift}: <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", currentShift.color)}>{currentShift.label}</span>
          </span>
        </div>
        <button
          onClick={() => setShowVikarieMode(!showVikarieMode)}
          className={cn("w-10 h-6 rounded-full transition-colors flex items-center p-1 focus:outline-none", showVikarieMode ? "bg-municipal-600" : "bg-gray-300")}
        >
          <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm transition-transform", showVikarieMode ? "translate-x-4" : "translate-x-0")}></div>
        </button>
      </div>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-4 flex-1 bg-[#f8fafc]">
        {activeTab === 'today' ? (
          <TimelineView
            tasks={dailyTasks}
            showVikarieMode={showVikarieMode}
            activeLang={activeLang}
            onTaskClick={setSelectedTask}
          />
        ) : (
          <ReportView />
        )}

        {activeTab === 'today' && dailyTasks.length === 0 && (
          <div className="text-center py-10 opacity-50 flex flex-col items-center gap-2">
            <p>{t.noTasks}</p>
            {currentShift.type === 'off' && <span className="text-sm font-bold bg-gray-200 px-3 py-1 rounded-full text-gray-600">{t.youAreOff}</span>}
          </div>
        )}
      </main>

      {/* Modals */}
      <TaskSheet
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onToggleStatus={toggleTaskStatus}
        showVikarieMode={showVikarieMode}
      />

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around max-w-md mx-auto z-50">
        <Link to="/" className="p-2 text-gray-400 hover:text-municipal-600 flex flex-col items-center">
          <ChevronLeft size={20} className={activeLang === 'ar' ? 'rotate-180' : ''} />
          <span className="text-[10px] font-medium">{t.logout}</span>
        </Link>
      </div>
    </div>
  );
}
