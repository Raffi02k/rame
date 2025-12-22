import React from "react";
import { cn } from "../../../../lib/utils";
import { WEEK_GRID_TEMPLATE_COLUMNS } from "../logic/layout";
import { Person, Task } from "../../../../types";
import { WeekShiftCell } from "./WeekShiftCell";
import { WeekTasksCell } from "./WeekTasksCell";

interface WeekStaffRowProps {
    person: Person;
    weekDays: Date[];
    viewType: "shifts" | "tasks";
    tasks: Task[];
    activeLang: string;
    isRTL: boolean;
    onTaskClick: (task: Task) => void;
}

export const WeekStaffRow: React.FC<WeekStaffRowProps> = ({
    person,
    weekDays,
    viewType,
    tasks,
    activeLang,
    isRTL,
    onTaskClick,
}) => {
    return (
        <div
            className="grid hover:bg-gray-50/30 transition-colors group min-h-[100px]"
            style={{
                gridTemplateColumns: WEEK_GRID_TEMPLATE_COLUMNS,
                direction: isRTL ? "rtl" : "ltr",
            }}
        >
            {/* Personal sticky-kolumn */}
            <div
                className={cn(
                    "p-4 bg-white group-hover:bg-gray-50/30 transition-colors sticky z-10 flex flex-col justify-center",
                    isRTL
                        ? "right-0 border-l border-l-gray-300"
                        : "left-0 border-r border-r-gray-300 shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
                )}
            >
                <div className="flex items-center gap-3">
                    <img
                        src={person.avatar}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                        alt={person.name}
                    />
                    <div className="min-w-0">
                        <div className="font-bold text-sm text-gray-900 truncate">{person.name}</div>
                        <div className="text-[10px] uppercase text-gray-400 font-black tracking-widest truncate leading-tight mt-0.5">
                            {person.role}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dag-celler */}
            {weekDays.map((date, dayIndex) => {
                const isWeekend = dayIndex === 5 || dayIndex === 6;
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                    <div
                        key={date.toISOString()}
                        className={cn(
                            "bg-white",
                            // ✅ samma sida som headern: LTR -> border-r, RTL -> border-l
                            isRTL
                                ? "border-l border-l-gray-100 last:border-l-0"
                                : "border-r border-r-gray-100 last:border-r-0",
                            isWeekend && "bg-gray-50/30",
                            isToday && "ring-1 ring-municipal-200"
                        )}
                    >
                        {viewType === "shifts" ? (
                            <WeekShiftCell personId={person.id} date={date} activeLang={activeLang} />
                        ) : (
                            <WeekTasksCell
                                person={person}
                                date={date}
                                tasks={tasks}
                                activeLang={activeLang}
                                onTaskClick={onTaskClick}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
