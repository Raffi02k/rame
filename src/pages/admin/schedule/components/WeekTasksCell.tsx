import React, { useMemo } from "react";
import { cn, getCategoryColor, getShiftForDate, toLocalYMD } from "../../../../lib/utils";
import { Person, Task, TaskStatus } from "../../../../types";
import { useTasks } from "../../../../context/TaskContext";
import { getWeekTasksForPersonAndDay } from "../logic/selectors";

interface WeekTasksCellProps {
    person: Person;
    date: Date;
    tasks: Task[];
    activeLang: string;
    isRTL: boolean;
    isWeekend: boolean;
    isToday: boolean;
    onTaskClick: (task: Task) => void;
}

export const WeekTasksCell: React.FC<WeekTasksCellProps> = ({
    person,
    date,
    tasks,
    activeLang,
    isRTL,
    isWeekend,
    isToday,
    onTaskClick,
}) => {
    const { getTaskStatus } = useTasks();
    const shift = getShiftForDate(person.id, date, activeLang);

    const dateKey = toLocalYMD(date);

    const dailyTasks = useMemo(() => {
        if (shift.type === "off") return [];

        // Använd din befintliga selector (bättre än att duplicera filter)
        const base = getWeekTasksForPersonAndDay(tasks, person, date, dateKey, activeLang);

        return base.map((t) => ({
            ...t,
            status: getTaskStatus(t.id, dateKey),
            date: dateKey, // viktigt för modalen
        }));
    }, [shift.type, tasks, person, date, dateKey, activeLang, getTaskStatus]);

    return (
        <div
            className={cn(
                "p-2 relative flex flex-col gap-1.5",
                isRTL
                    ? "border-l border-l-gray-100 last:border-l-0"
                    : "border-r border-r-gray-100 last:border-r-0",
                isWeekend && "bg-gray-50/40",
                isToday && "bg-blue-50/30"
            )}
        >
            {dailyTasks.length > 0 ? (
                dailyTasks.slice(0, 4).map((task) => {
                    const isDone =
                        task.status === TaskStatus.COMPLETED || task.status === TaskStatus.SIGNED;
                    const isMissed = task.status === TaskStatus.MISSED;

                    const dotClass =
                        isDone
                            ? "bg-green-500"
                            : isMissed
                                ? "bg-red-500"
                                : task.category === "hsl"
                                    ? "bg-red-500"
                                    : task.category === "care"
                                        ? "bg-blue-500"
                                        : task.category === "service"
                                            ? "bg-orange-500"
                                            : task.category === "social"
                                                ? "bg-green-500"
                                                : "bg-gray-500";

                    return (
                        <div
                            key={task.id}
                            onClick={() => onTaskClick(task)}
                            className={cn(
                                "rounded px-2 py-1 text-[10px] border cursor-pointer",
                                "hover:shadow-sm hover:scale-[1.01] transition-all truncate font-bold flex items-center gap-2",
                                !isDone && !isMissed && getCategoryColor(task.category),
                                isDone && "bg-green-50 border-green-200 text-green-700 opacity-70 grayscale-[0.2]",
                                isMissed && "bg-red-50 border-red-300 text-red-700 ring-1 ring-red-200"
                            )}
                        >
                            <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotClass)} />
                            <span className={cn("truncate tracking-tight", isDone && "line-through")}>
                                {task.title}
                            </span>
                        </div>
                    );
                })
            ) : (
                <div className="flex-1 flex items-center justify-center text-[10px] text-gray-200 font-bold tracking-widest">
                    -
                </div>
            )}

            {dailyTasks.length > 4 && (
                <div className="text-center text-[9px] text-municipal-600 font-black uppercase tracking-tighter cursor-pointer hover:underline">
                    + {dailyTasks.length - 4} till
                </div>
            )}
        </div>
    );
};
