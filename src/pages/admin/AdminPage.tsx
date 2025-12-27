import React, { useState, useMemo } from 'react';
import { Filter, Plus, X, Users } from 'lucide-react';
import { Button } from '../../components/Button';
import { STAFF, UNITS, USERS } from '../../lib/demo-data';
import { cn, getCategoryColor } from '../../lib/utils';
import { getUITranslations, translateTasks, getCategoryLabel as getCatLabel } from '../../lib/translations';
import { Task, TaskStatus, TaskCategory } from '../../types'; // Moved types
import { LanguageCode } from '../../types';
import { useTasks } from '../../context/TaskContext';

// Sub-components
import { AdminHeader } from './components/AdminHeader';
import { MissedTaskAlert } from './components/MissedTaskAlert';
import { DaySchedule } from './components/DaySchedule';
import { WeekSchedule } from './components/WeekSchedule';
import { TaskModal } from './modals/TaskModal';

export default function AdminPage() {
  // State
  const [currentUnitId, setCurrentUnitId] = useState(UNITS[0].id);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  // Use Global Context instead of local state
  const { tasks: globalTasks, updateTask: globalUpdateTask, addTask: globalAddTask, deleteTask: globalDeleteTask } = useTasks();

  const [currentTask, setCurrentTask] = useState<Partial<Task> | null>(null);
  const [activeLang, setActiveLang] = useState<LanguageCode>('sv');

  // Filters
  const [activeFilters, setActiveFilters] = useState<TaskCategory[]>([]);
  const [activeStaffFilters, setActiveStaffFilters] = useState<string[]>([]);

  // Translations
  const t = getUITranslations(activeLang);

  // Derived Data
  const allUnitStaff = useMemo(() => STAFF.filter(s => s.unitId === currentUnitId), [currentUnitId]);

  // Här filtrerar vi VILKA RADER som ska visas i schemat
  const visibleStaff = useMemo(() => {
    if (activeStaffFilters.length === 0) return allUnitStaff;
    return allUnitStaff.filter(s => activeStaffFilters.includes(s.id));
  }, [allUnitStaff, activeStaffFilters]);

  const filteredTasks = useMemo(() => {
    // 1. Filter by Unit
    let tasks = globalTasks.filter(t => t.unitId === currentUnitId || !t.unitId);

    // 2. Filter by Category
    if (activeFilters.length > 0) {
      tasks = tasks.filter(t => activeFilters.includes(t.category));
    }

    // VIKTIGT: Vi filtrerar INTE bort tasks baserat på assigneeId/staff här längre.
    // Eftersom vi vill visa Autopilot-tasks (som saknar assigneeId) på de rader som är synliga,
    // måste vi skicka med alla tasks till komponenterna.
    // Komponenterna (DaySchedule/WeekSchedule) ansvarar för att matcha task -> person.
    // Eftersom vi filtrerar 'visibleStaff' ovan, kommer vi ändå bara se tasks för de valda personerna.

    // 4. Translate using Utility function
    return translateTasks(tasks, activeLang);

  }, [currentUnitId, activeFilters, globalTasks, activeLang]);

  // Handlers
  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setTaskModalOpen(true);
  };

  const handleNewTask = () => {
    setCurrentTask({
      unitId: currentUnitId,
      assigneeId: visibleStaff[0]?.id,
      timeStart: '08:00',
      timeEnd: '09:00',
      status: TaskStatus.PENDING,
      category: TaskCategory.CARE
    });
    setTaskModalOpen(true);
  };

  const saveTask = (taskData: Partial<Task>) => {
    if (taskData.id) {
      // Update via Context
      globalUpdateTask(taskData.id, taskData);
    } else {
      // Create via Context
      const newTask = {
        ...taskData,
        id: Math.random().toString(36).substr(2, 9),
        unitId: currentUnitId
      } as Task;
      globalAddTask(newTask);
    }
    setTaskModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    globalDeleteTask(id);
    setTaskModalOpen(false);
  };

  const toggleFilter = (cat: TaskCategory) => {
    setActiveFilters(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleStaffFilter = (staffId: string) => {
    setActiveStaffFilters(prev =>
      prev.includes(staffId) ? prev.filter(id => id !== staffId) : [...prev, staffId]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setActiveStaffFilters([]);
  };

  const navigateDate = (direction: 'prev' | 'next' | 'today') => {
    const newDate = new Date(currentDate);

    if (direction === 'today') {
      setCurrentDate(new Date());
      return;
    }
    const daysToAdd = viewMode === 'week' ? 7 : 1;
    const modifier = direction === 'next' ? 1 : -1;
    newDate.setDate(newDate.getDate() + (daysToAdd * modifier));
    setCurrentDate(newDate);
  };

  const renderMissedDescription = () => {
    if (activeLang === 'ar') return <span>لم يتم تسجيل مهام مهمة لـ <span className="font-semibold">Maria C</span> و <span className="font-semibold">Johan B</span>.</span>;
    if (activeLang === 'en') return <span>Important tasks for <span className="font-semibold">Maria C</span> and <span className="font-semibold">Johan B</span> were not registered.</span>;
    if (activeLang === 'es') return <span>No se registraron tareas importantes para <span className="font-semibold">Maria C</span> y <span className="font-semibold">Johan B</span>.</span>;
    return <span>Viktiga insatser för <span className="font-semibold">Maria C</span> och <span className="font-semibold">Johan B</span> registrerades ej.</span>;
  };

  const hasActiveFilters = activeFilters.length > 0 || activeStaffFilters.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-900" dir={activeLang === 'ar' ? 'rtl' : 'ltr'}>

      <AdminHeader
        units={UNITS}
        unitId={currentUnitId}
        onUnitChange={setCurrentUnitId}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeLang={activeLang}
        onLangChange={setActiveLang}
        currentDate={currentDate}
        onNavigate={navigateDate}
      />

      <main className="flex-1 min-w-0 overflow-x-visible flex flex-col max-w-[1800px] mx-auto w-full px-4 sm:px-6 py-6">

        {/* Toolbar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {viewMode === 'day'
                ? `${t.titleDay} - ${currentUnitId === 'u1' ? 'Kronan' : 'Källstorpsgården'}`
                : `${t.titleWeek} - ${currentUnitId === 'u1' ? 'Kronan' : 'Källstorpsgården'}`
              }
            </h1>
            {viewMode === 'day' && (
              <div className="text-gray-500 text-sm flex gap-4 mt-1">
                <span>{activeLang === 'ar' ? 'الليل' : 'Natt'} 23:00 - 05:59</span>
                <span className="w-px h-4 bg-gray-300"></span>
                <span>{activeLang === 'ar' ? 'الصباح' : 'Morgon'} 06:00 - 11:59</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Bar */}
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm overflow-x-auto max-w-full">
              <span className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">
                <Filter size={10} className={activeLang === 'ar' ? "ml-1" : "mr-1"} /> {t.filterLabel}
              </span>
              {Object.values(TaskCategory).map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleFilter(cat)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-md font-bold transition-all capitalize whitespace-nowrap border",
                    activeFilters.includes(cat)
                      ? getCategoryColor(cat) + " shadow-sm border-transparent transform scale-105"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
                  )}
                >
                  {getCatLabel(cat, activeLang)}
                </button>
              ))}
              <div className="w-px h-5 bg-gray-200 mx-1"></div>
              <span className="px-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">
                <Users size={12} className={activeLang === 'ar' ? "ml-1" : "mr-1"} />
              </span>
              <div className="flex -space-x-1.5 hover:space-x-1 transition-all">
                {allUnitStaff.map(person => {
                  const isActive = activeStaffFilters.includes(person.id);
                  const isDimmed = activeStaffFilters.length > 0 && !isActive;
                  return (
                    <button
                      key={person.id}
                      onClick={() => toggleStaffFilter(person.id)}
                      className={cn(
                        "relative rounded-full transition-all duration-200 focus:outline-none",
                        isActive ? "z-10 ring-2 ring-offset-1 ring-municipal-500 scale-110" : "hover:scale-110 hover:z-10",
                        isDimmed && "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                      )}
                      title={person.name}
                    >
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-7 h-7 rounded-full border border-white shadow-sm"
                      />
                    </button>
                  );
                })}
              </div>
              {hasActiveFilters && (
                <>
                  <div className="h-4 w-px bg-gray-200 mx-1"></div>
                  <button
                    onClick={clearAllFilters}
                    className="px-2 py-1 text-xs text-gray-500 font-medium hover:text-red-600 hover:bg-red-50 rounded flex items-center gap-1 transition-colors"
                  >
                    <X size={12} /> {t.clearFilters}
                  </button>
                </>
              )}
            </div>
            <Button onClick={handleNewTask} className="shadow-lg shadow-municipal-500/20 gap-2 text-sm">
              <Plus size={16} /> {t.newTask}
            </Button>
          </div>
        </div>

        <MissedTaskAlert
          title={t.missedTitle}
          description={renderMissedDescription()}
          buttonText={t.missedButton}
          onShowReport={() => setReportModalOpen(true)}
        />

        {viewMode === 'week' ? (
          <WeekSchedule
            currentDate={currentDate}
            staff={visibleStaff}
            tasks={filteredTasks}
            onTaskClick={handleEditTask}
            activeLang={activeLang}
            onDayClick={(date) => {
              setCurrentDate(date);
              setViewMode('day');
            }}
          />
        ) : (
          <DaySchedule
            currentDate={currentDate}
            staff={visibleStaff}
            tasks={filteredTasks}
            onTaskClick={handleEditTask}
            activeLang={activeLang}
          />
        )}
      </main>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        task={currentTask}
        staffList={visibleStaff.length > 0 ? visibleStaff : allUnitStaff}
        users={USERS}
        onSave={saveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
