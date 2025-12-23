import React, { useMemo, useState } from "react";
import { Task, Person } from "../../../types";

import { toLocalYMD } from "../../../lib/utils";
import { getShiftForDate } from "../../../lib/utils";

import { ScheduleHeader } from "../schedule/components/ScheduleHeader";
import { ScheduleGridBackground } from "../schedule/components/ScheduleGridBackground";
import { StaffRow } from "../schedule/components/StaffRow";
import { UnassignedRow } from "../schedule/components/UnassignedRow";

import { useContainerWidth } from "../schedule/hooks/useContainerWidth";
import { useNowHour } from "../schedule/hooks/useNowHours";
import { useScheduleLayout } from "../schedule/hooks/useScheduleLayout";

// selectors i koden
import { getVisibleStaff, getVisibleTasks } from "../schedule/logic/selectors";

interface DayScheduleProps {
  currentDate: Date;
  staff: Person[];
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  activeLang: string;

  activeUnitId?: string;
}

const STAFF_WIDTH = 220;
const MIN_HOUR_WIDTH = 120;

export const DaySchedule: React.FC<DayScheduleProps> = ({
  currentDate,
  staff,
  tasks,
  onTaskClick,
  activeLang,
  activeUnitId,
}) => {
  const [viewPeriod, setViewPeriod] = useState<"day" | "night">("day");

  const isRTL = activeLang === "ar";
  const nowHour = useNowHour();
  const { containerRef, containerWidth } = useContainerWidth();

  const currentDateStr = toLocalYMD(currentDate);
  const isToday = new Date().toDateString() === currentDate.toDateString();

  // layout styrs av viewPeriod + containerWidth
  const layout = useScheduleLayout({
    viewPeriod,
    containerWidth,
    isRTL,
    STAFF_WIDTH,
    MIN_HOUR_WIDTH,
  });

  const visibleStaff = useMemo(() => getVisibleStaff(staff, activeUnitId), [staff, activeUnitId]);
  const visibleTasks = useMemo(
    () => getVisibleTasks(tasks, currentDateStr, activeUnitId),
    [tasks, currentDateStr, activeUnitId]
  );

  // filtrera working staff baserat på shift (så natt-vy kan visa nattpersonal)
  const workingStaff = useMemo(() => {
    return visibleStaff.filter((person) => {
      const shift = getShiftForDate(person.id, currentDate, activeLang);
      return shift.type !== "off";
    });
  }, [visibleStaff, currentDate, activeLang]);

  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-auto flex-1 relative bg-gray-50/5"
        style={{ overscrollBehaviorX: "contain" }}
      >
        <div style={{ width: `${STAFF_WIDTH + layout.timelineWidthPx}px` }} className="flex flex-col">
          {/* Header får dag/natt toggle + timmar från useScheduleLayout */}
          <ScheduleHeader
            gridTemplateColumns={layout.gridTemplateColumns}
            hourHeaders={layout.hours}
            staffCount={workingStaff.length}
            isRTL={isRTL}
            activeLang={activeLang}
            viewPeriod={viewPeriod}
            setViewPeriod={setViewPeriod}
            isToday={isToday}
            nowHour={nowHour}
            justNuLabel={activeLang === "sv" ? "Just nu" : "Now"}
          />


          <div className="relative bg-white">
            <ScheduleGridBackground
              gridTemplateColumns={layout.gridTemplateColumns}
              hourHeaders={layout.hours}
            />

            {workingStaff.map((person) => (
              <StaffRow
                key={`${person.id}-${currentDateStr}`}
                person={person}
                currentDate={currentDate}
                activeLang={activeLang}
                currentDateStr={currentDateStr}
                gridTemplateColumns={layout.gridTemplateColumns}
                totalHours={layout.totalHours}
                timelineWidthPx={layout.timelineWidthPx}
                visibleTasks={visibleTasks}
                isInDayView={layout.isTaskInView}
                getTaskStyle={layout.getTaskStyle}
                onTaskClick={onTaskClick}
              />
            ))}

            <UnassignedRow
              gridTemplateColumns={layout.gridTemplateColumns}
              totalHours={layout.totalHours}
              timelineWidthPx={layout.timelineWidthPx}
              visibleTasks={visibleTasks}
              isInDayView={layout.isTaskInView}
              getTaskStyle={layout.getTaskStyle}
              onTaskClick={onTaskClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
