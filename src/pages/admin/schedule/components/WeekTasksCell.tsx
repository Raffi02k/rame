import React, { useMemo } from "react";
import { Person, Task } from "../../../../types";
import { getShiftForDate } from "../../../../lib/utils";
import { toLocalYMD } from "../logic/date";

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

    // Shift för dagen (så vi kan matcha shiftRole)
    const shift = getShiftForDate(person.id, date, activeLang);

    const { visible, hiddenCount } = useMemo(() => {
        // Om personen är ledig: visa tom cell (samma “tänk” som prototyp)
        if (shift.type === "off") return { visible: [] as Task[], hiddenCount: 0 };

        const matchesDate = (t: Task) => !t.date || t.date === dateKey;

        const matchesPerson = (t: Task) => {
            // 1) shiftRole matchar dagens shift
            if (t.shiftRole && t.shiftRole === shift.id) return true;

            // 2) annars: assigneeId matchar person och task har INTE shiftRole
            if (t.assigneeId && t.assigneeId === person.id && !t.shiftRole) return true;

            return false;
        };

        const toMinutes = (hhmm: string) => {
            const [h, m] = hhmm.split(":").map(Number);
            return h * 60 + m;
        };

        const all = tasks
            .filter((t) => matchesDate(t) && matchesPerson(t))
            .sort((a, b) => toMinutes(a.timeStart) - toMinutes(b.timeStart));

        const MAX = 3;
        const visible = all.slice(0, MAX);
        const hiddenCount = Math.max(all.length - MAX, 0);

        return { visible, hiddenCount };
    }, [tasks, dateKey, person.id, shift.id, shift.type]);

    // Ledig → dimmad tom ruta (du kan justera klassen om du vill matcha exakt)
    if (shift.type === "off") {
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
                    <div className="text-xs font-bold text-gray-900 truncate">
                        {task.title}
                    </div>
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
