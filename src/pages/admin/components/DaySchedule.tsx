import React from "react";
import { Task, Person } from "../../../types";
import { getShiftForDate } from "../../../lib/utils";

interface DayScheduleProps {
  currentDate: Date;
  staff: Person[];
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  activeLang: string;

  // Vald arbetsplats/enhet (om undefined -> visa allt)
  activeUnitId?: string;
}

export const DaySchedule: React.FC<DayScheduleProps> = ({
  currentDate,
  staff,
  tasks,
  onTaskClick,
  activeLang,
  activeUnitId,
}) => {
  // --- Datum (YYYY-MM-DD) i lokal tid (stabilt på Windows, undviker UTC-buggar) ---
  const toYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${dayOfMonth}`;
  };
  const currentDateStr = toYMD(currentDate);

  // --- Dagvy (som prototypen): 07:00–21:00 ---
  const VIEW_START_HOUR = 7;
  const VIEW_END_HOUR = 21;
  const totalHours = VIEW_END_HOUR - VIEW_START_HOUR;

  // --- Layoutmått (som prototypen) ---
  const QUARTER_WIDTH_PX = 28; // 15 min
  const HOUR_WIDTH_PX = QUARTER_WIDTH_PX * 4;
  const STAFF_COLUMN_WIDTH_PX = 220;

  const timelineWidthPx = totalHours * HOUR_WIDTH_PX;
  const gridTemplateColumns = `${STAFF_COLUMN_WIDTH_PX}px repeat(${totalHours}, ${HOUR_WIDTH_PX}px)`;

  // --- Timmar till headern (07, 08, 09...) ---
  const hourHeaders = Array.from({ length: totalHours }, (_, index) => VIEW_START_HOUR + index);

  // --- Filter: visa bara personal + tasks för vald arbetsplats och datum ---
  const visibleStaff = staff.filter((person) => !activeUnitId || person.unitId === activeUnitId);

  const visibleTasks = tasks.filter((task) => {
    const matchesUnit = !activeUnitId || task.unitId === activeUnitId;
    const matchesDate = !task.date || task.date === currentDateStr;
    return matchesUnit && matchesDate;
  });

  // --- Hjälp: döljer tasks utanför 07–21 (så 00:00/04:00 inte syns i dagvyn) ---
  const isInDayView = (task: Task) => {
    const startHour = Number(task.timeStart.split(":")[0]);
    return startHour >= VIEW_START_HOUR && startHour < VIEW_END_HOUR;
  };

  // --- Placering: räknar ut left + width (pixlar) för task-blocket på tidslinjen ---
  const getTaskStyle = (task: Task): React.CSSProperties => {
    const [startHourStr, startMinuteStr] = task.timeStart.split(":");
    const [endHourStr, endMinuteStr] = task.timeEnd.split(":");

    const startHour = Number(startHourStr);
    const startMinute = Number(startMinuteStr);
    const endHour = Number(endHourStr);
    const endMinute = Number(endMinuteStr);

    const startMinutesFromViewStart = (startHour - VIEW_START_HOUR) * 60 + startMinute;
    let endMinutesFromViewStart = (endHour - VIEW_START_HOUR) * 60 + endMinute;

    // Om sluttiden ser “mindre ut” än start (t.ex. 23:00 -> 01:00), anta dygnsbryt
    if (endMinutesFromViewStart < startMinutesFromViewStart) {
      endMinutesFromViewStart += 24 * 60;
    }

    const leftPx = (startMinutesFromViewStart / 15) * QUARTER_WIDTH_PX + 1;

    const durationMinutes = Math.max(endMinutesFromViewStart - startMinutesFromViewStart, 15);
    const widthPx = (durationMinutes / 15) * QUARTER_WIDTH_PX - 2;

    return {
      position: "absolute",
      top: 8,
      bottom: 8,
      left: leftPx,
      width: widthPx,
    };
  };

  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="overflow-auto flex-1 relative">
        <div style={{ width: `${STAFF_COLUMN_WIDTH_PX + timelineWidthPx}px` }} className="flex flex-col">
          {/* ===== HEADER: Staff + timmar ===== */}
          <div
            className="sticky top-0 z-30 bg-gray-50 border-b border-gray-200 h-12 grid"
            style={{ gridTemplateColumns }}
          >
            <div className="sticky left-0 z-40 bg-gray-50 px-3 flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-gray-200 shadow-[4px_0_10px_rgba(0,0,0,0.05)]">
              Personal ({visibleStaff.length})
            </div>

            {hourHeaders.map((hour) => (
              <div
                key={hour}
                className="flex items-center justify-center text-[11px] font-bold text-gray-400 border-l border-gray-200 bg-gray-50"
              >
                {String(hour).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          <div className="relative bg-white">
            {/* ===== Bakgrunds-grid: vertikala linjer per timme ===== */}
            <div className="absolute inset-0 pointer-events-none z-0 grid" style={{ gridTemplateColumns }}>
              <div className="border-r border-gray-200" />
              {hourHeaders.map((hour) => (
                <div key={hour} className="border-l border-gray-100 h-full" />
              ))}
            </div>

            {/* ===== Rader per person ===== */}
            {visibleStaff.map((person) => {
              const shift = getShiftForDate(person.id, currentDate, activeLang);

              // 1) shiftRole matchar dagens shift
              // 2) assigneeId matchar personen (och tasken har INTE shiftRole)
              const tasksForPerson = visibleTasks.filter((task) => {
                if (shift.type === "off") return false;
                if (task.date && task.date !== currentDateStr) return false;

                if (task.shiftRole && task.shiftRole === shift.id) return true;
                if (task.assigneeId && task.assigneeId === person.id && !task.shiftRole) return true;

                return false;
              });

              return (
                <div
                  key={person.id}
                  className={`grid border-b border-gray-100 min-h-[140px] hover:bg-gray-50/50 transition-colors relative z-10 ${shift.type === "off" ? "bg-gray-50/50 grayscale opacity-70" : ""
                    }`}
                  style={{ gridTemplateColumns }}
                >
                  {/* ===== Staff-kolumn (sticky) ===== */}
                  <div className="sticky left-0 z-20 bg-white p-4 flex items-center gap-3 border-r border-gray-200 shadow-[4px_0_10px_rgba(0,0,0,0.05)]">
                    <img
                      src={person.avatar}
                      className="w-10 h-10 rounded-full bg-gray-200 object-cover border-2 border-white shadow-sm"
                      alt={person.name}
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-gray-900 truncate">{person.name}</p>
                      <p className="text-xs text-gray-500 truncate">{person.role}</p>
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide truncate">
                        {shift.label}
                      </p>
                      <p className="text-[9px] text-gray-400 font-mono truncate">{shift.time || ""}</p>
                    </div>
                  </div>

                  {/* ===== Tidslinje-kolumn (tasks som block) ===== */}
                  <div
                    className="relative"
                    style={{
                      gridColumn: `2 / span ${totalHours}`,
                      width: `${timelineWidthPx}px`,
                      minWidth: `${timelineWidthPx}px`,
                    }}
                  >
                    {tasksForPerson
                      .filter(isInDayView)
                      .map((task) => (
                        <div
                          key={task.id}
                          onClick={() => onTaskClick(task)}
                          className={`
                            absolute rounded border border-l-[4px] shadow-sm cursor-pointer transition-all bg-white overflow-hidden
                            hover:shadow-lg hover:z-50 hover:scale-[1.01]
                            ${task.status === "completed" ? "opacity-80" : ""}
                          `}
                          style={getTaskStyle(task)}
                        >
                          <div className="p-2">
                            <div className="text-[10px] font-mono font-bold opacity-70">
                              {task.timeStart}-{task.timeEnd}
                            </div>
                            <div className="text-[11px] font-bold text-gray-900 truncate">{task.title}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}

            {/* ===== Ej tilldelade ===== */}
            <div className="grid min-h-[60px] bg-red-50/30" style={{ gridTemplateColumns }}>
              <div className="sticky left-0 z-20 bg-red-50/30 p-4 border-r border-gray-200 text-red-500 font-bold text-sm">
                Ej tilldelade
              </div>

              <div
                className="relative"
                style={{
                  gridColumn: `2 / span ${totalHours}`,
                  width: `${timelineWidthPx}px`,
                  minWidth: `${timelineWidthPx}px`,
                }}
              >
                {visibleTasks
                  .filter((task) => !task.assigneeId && !task.shiftRole)
                  .filter(isInDayView)
                  .map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick(task)}
                      className="absolute p-2 bg-white border border-red-200 text-red-800 rounded text-xs cursor-pointer shadow-sm"
                      style={getTaskStyle(task)}
                    >
                      <div className="font-mono font-bold text-[10px] opacity-70">
                        {task.timeStart}-{task.timeEnd}
                      </div>
                      <div className="font-bold text-[11px] truncate">{task.title}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
