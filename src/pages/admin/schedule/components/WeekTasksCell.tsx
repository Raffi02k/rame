import React, { useMemo } from "react";
import { Person, Task } from "../../../../types";
import { toLocalYMD } from "../../../../lib/utils";
import { getWeekTasksForPersonAndDay, isOffForPersonOnDate } from "../logic/selectors";
import { useTasks } from "../../../../context/TaskContext";

interface WeekTasksCellProps {
    person: Person;
    date: Date;
    tasks: Task[];
    activeLang: string;
    onTaskClick: (task: Task) => void;
}

export const WeekTasksCell: React.FC<WeekTasksCellProps> = ({
    person,
    date,
    tasks,
    activeLang,
    onTaskClick,
}) => {
    const dateKey = toLocalYMD(date);
    const { getTaskStatus } = useTasks();

    // Off ska avgöras av shift, inte av "0 tasks"
    const isOff = useMemo(
        () => isOffForPersonOnDate(person.id, date, activeLang),
        [person.id, date, activeLang]
    );

    const { visible, hiddenCount } = useMemo(() => {
        if (isOff) return { visible: [] as Task[], hiddenCount: 0 };

        const toMinutes = (hhmm: string) => {
            const [h, m] = hhmm.split(":").map(Number);
            return h * 60 + m;
        };

        const all = getWeekTasksForPersonAndDay(tasks, person, date, dateKey, activeLang)
            .map((t) => ({
                ...t,
                status: getTaskStatus(t.id, dateKey),
                date: dateKey,
            }))
            .sort((a, b) => toMinutes(a.timeStart) - toMinutes(b.timeStart));

        const MAX = 3;
        const visible = all.slice(0, MAX);
        const hiddenCount = Math.max(all.length - MAX, 0);

        return { visible, hiddenCount };
    }, [isOff, tasks, person, date, dateKey, activeLang, getTaskStatus]);

    if (isOff) {
        return <div className="h-full p-3 bg-gray-50/60 opacity-70 grayscale" />;
    }

    return (
        <div className="h-full p-2 flex flex-col gap-2">
            {visible.map((task) => (
                <button
                    key={task.id}
                    onClick={() => onTaskClick(task)}
                    className="text-left bg-white border border-gray-200 rounded-md p-2 shadow-sm hover:shadow transition"
                >
                    <div className="text-[11px] font-mono font-bold text-gray-500">
                        {task.timeStart}–{task.timeEnd}
                    </div>
                    <div className="text-xs font-bold text-gray-900 truncate">{task.title}</div>
                </button>
            ))}

            {hiddenCount > 0 && (
                <div className="text-[11px] font-bold text-gray-500 px-2">
                    +{hiddenCount} till
                </div>
            )}
        </div>
    );
};
