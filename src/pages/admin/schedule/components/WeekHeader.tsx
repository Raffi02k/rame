import React from "react";
import { CalendarDays, ListChecks } from "lucide-react";
import { WEEK_GRID_TEMPLATE_COLUMNS } from "../logic/layout";
import { cn } from "../../../../lib/utils";

interface WeekHeaderProps {
    isRTL: boolean;
    activeLang: string;
    staffCount: number;

    viewType: "shifts" | "tasks";
    setViewType: React.Dispatch<React.SetStateAction<"shifts" | "tasks">>;

    weekDays: Date[];
    dayNames: string[];
    onDayClick: (date: Date) => void;
}

export const WeekHeader: React.FC<WeekHeaderProps> = ({
    isRTL,
    activeLang,
    staffCount,
    viewType,
    setViewType,
    weekDays,
    dayNames,
    onDayClick,
}) => {
    const staffLabel = activeLang === "ar" ? "الموظفين" : activeLang === "en" ? "Staff" : "PERSONAL";
    const passLabel = activeLang === "ar" ? "ورديات" : "PASS";
    const tasksLabel = activeLang === "ar" ? "مهام" : "UPPG.";

    return (
        <div className="sticky top-0 z-30 bg-gray-50 border-b border-gray-200 shadow-sm">
            {/* ✅ Samma grid som rows */}
            <div
                className="grid"
                style={{
                    gridTemplateColumns: WEEK_GRID_TEMPLATE_COLUMNS,
                    direction: isRTL ? "rtl" : "ltr",
                }}
            >
                {/* Personal-kolumnen (toggle ligger här) */}
                <div
                    className={cn(
                        "p-3 bg-gray-50 flex flex-col justify-center gap-2 sticky z-40",
                        isRTL
                            ? "right-0 border-l border-l-gray-300"
                            : "left-0 border-r border-r-gray-300 shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
                    )}
                >
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {staffLabel} ({staffCount})
                    </div>

                    <div className="flex bg-gray-200 rounded p-0.5 w-fit shadow-inner">
                        <button
                            type="button"
                            onClick={() => setViewType("shifts")}
                            className={cn(
                                "p-1 rounded flex items-center gap-1.5 text-[10px] font-bold transition-all",
                                viewType === "shifts" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                            title="Visa arbetspass"
                        >
                            <CalendarDays size={12} /> {passLabel}
                        </button>

                        <button
                            type="button"
                            onClick={() => setViewType("tasks")}
                            className={cn(
                                "p-1 rounded flex items-center gap-1.5 text-[10px] font-bold transition-all",
                                viewType === "tasks" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                            )}
                            title="Visa uppgifter"
                        >
                            <ListChecks size={12} /> {tasksLabel}
                        </button>
                    </div>
                </div>

                {/* Dag-kolumner */}
                {weekDays.map((d, i) => {
                    const isToday = d.toDateString() === new Date().toDateString();

                    return (
                        <button
                            key={d.toISOString()}
                            type="button"
                            onClick={() => onDayClick(d)}
                            className={cn(
                                "group p-2 text-center hover:bg-white transition-colors cursor-pointer relative focus:outline-none flex flex-col justify-center items-center h-full",
                                // ✅ samma sida som rows: LTR -> border-r, RTL -> border-l
                                isRTL
                                    ? "border-l border-l-gray-200 last:border-l-0"
                                    : "border-r border-r-gray-200 last:border-r-0",
                                isToday
                                    ? "bg-blue-50 border-t-4 border-t-municipal-600 ring-inset ring-2 ring-municipal-500/20"
                                    : "border-t-4 border-t-transparent"
                            )}
                            title="Öppna dagvy"
                        >
                            {isToday && (
                                <span className="text-[9px] font-extrabold text-municipal-600 uppercase tracking-widest mb-0.5">
                                    {activeLang === "ar" ? "اليوم" : activeLang === "en" ? "Today" : "Idag"}
                                </span>
                            )}

                            <div className={cn("font-bold text-sm", isToday ? "text-municipal-800" : "text-gray-900")}>
                                {dayNames[i] ?? d.toLocaleDateString("sv-SE", { weekday: "short" })}
                            </div>
                            <div className={cn("text-xs", isToday ? "text-municipal-700 font-bold" : "text-gray-400")}>
                                {d.getDate()}/{d.getMonth() + 1}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
