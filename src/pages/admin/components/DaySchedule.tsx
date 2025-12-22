import React from "react";
import { Task, Person } from "../../../types";

import { ScheduleHeader } from "../schedule/components/ScheduleHeader";
import { ScheduleGridBackground } from "../schedule/components/ScheduleGridBackground";
import { StaffRow } from "../schedule/components/StaffRow";
import { UnassignedRow } from "../schedule/components/UnassignedRow";

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
          <ScheduleHeader
            gridTemplateColumns={gridTemplateColumns}
            hourHeaders={hourHeaders}
            staffCount={visibleStaff.length}
          />

          <div className="relative bg-white">
            {/* ===== Bakgrunds-grid: vertikala linjer per timme ===== */}
            <ScheduleGridBackground
              gridTemplateColumns={gridTemplateColumns}
              hourHeaders={hourHeaders}
            />

            {/* ===== Rader per person ===== */}
            {visibleStaff.map((person) => (
              <StaffRow
                key={person.id}
                person={person}
                currentDate={currentDate}
                activeLang={activeLang}
                currentDateStr={currentDateStr}
                gridTemplateColumns={gridTemplateColumns}
                totalHours={totalHours}
                timelineWidthPx={timelineWidthPx}
                visibleTasks={visibleTasks}
                isInDayView={isInDayView}
                getTaskStyle={getTaskStyle}
                onTaskClick={onTaskClick}
              />
            ))}

            {/* ===== Ej tilldelade ===== */}
            <UnassignedRow
              gridTemplateColumns={gridTemplateColumns}
              totalHours={totalHours}
              timelineWidthPx={timelineWidthPx}
              visibleTasks={visibleTasks}
              isInDayView={isInDayView}
              getTaskStyle={getTaskStyle}
              onTaskClick={onTaskClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
