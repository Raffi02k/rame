import React from "react";
import { TaskCard } from "./TaskCard";
import { Person, Task } from "../../../../types";
import { getShiftForDate } from "../../../../lib/utils";

interface StaffRowProps {
    person: Person;
    currentDate: Date;
    activeLang: string;
    currentDateStr: string;

    gridTemplateColumns: string;
    totalHours: number;
    timelineWidthPx: number;

    visibleTasks: Task[];
    isInDayView: (task: Task) => boolean;
    getTaskStyle: (task: Task) => React.CSSProperties;
    onTaskClick: (task: Task) => void;
}

export function StaffRow({
    person,
    currentDate,
    activeLang,
    currentDateStr,
    gridTemplateColumns,
    totalHours,
    timelineWidthPx,
    visibleTasks,
    isInDayView,
    getTaskStyle,
    onTaskClick,
}: StaffRowProps) {
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
                        <TaskCard
                            key={task.id}
                            task={task}
                            getTaskStyle={getTaskStyle}
                            onTaskClick={onTaskClick}
                            timelineWidthPx={timelineWidthPx}
                        />
                    ))}

            </div>
        </div>
    );
}
