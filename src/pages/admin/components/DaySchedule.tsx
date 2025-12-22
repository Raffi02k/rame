import React from "react";
import { Task, Person } from "../../../types";

import { ScheduleHeader } from "../schedule/components/ScheduleHeader";
import { ScheduleGridBackground } from "../schedule/components/ScheduleGridBackground";
import { StaffRow } from "../schedule/components/StaffRow";
import { UnassignedRow } from "../schedule/components/UnassignedRow";

import { toLocalYMD } from "../schedule/logic/date";
import { buildDayScheduleLayout } from "../schedule/logic/layout";
import { getVisibleStaff, getVisibleTasks, isInDayView as isInDayViewFn } from "../schedule/logic/selectors";
import { getTaskStyle as getTaskStyleFn } from "../schedule/logic/taskPositioning";

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
  const currentDateStr = toLocalYMD(currentDate);

  const layout = buildDayScheduleLayout();
  const {
    viewStartHour,
    viewEndHour,
    totalHours,
    quarterWidthPx,
    staffColumnWidthPx,
    timelineWidthPx,
    gridTemplateColumns,
    hourHeaders,
  } = layout;

  const visibleStaff = getVisibleStaff(staff, activeUnitId);
  const visibleTasks = getVisibleTasks(tasks, currentDateStr, activeUnitId);

  const isInDayView = (task: Task) => isInDayViewFn(task, viewStartHour, viewEndHour);
  const getTaskStyle = (task: Task) => getTaskStyleFn(task, viewStartHour, quarterWidthPx);

  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="overflow-auto flex-1 relative">
        <div style={{ width: `${staffColumnWidthPx + timelineWidthPx}px` }} className="flex flex-col">
          <ScheduleHeader
            gridTemplateColumns={gridTemplateColumns}
            hourHeaders={hourHeaders}
            staffCount={visibleStaff.length}
          />

          <div className="relative bg-white">
            <ScheduleGridBackground
              gridTemplateColumns={gridTemplateColumns}
              hourHeaders={hourHeaders}
            />

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
