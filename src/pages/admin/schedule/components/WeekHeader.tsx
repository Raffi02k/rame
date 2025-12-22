import React from "react";

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
    return (
        <div className="sticky top-0 z-30 bg-gray-50 border-b border-gray-200">
            {/* Första raden: title + toggle */}
            <div className="flex items-center justify-between px-4 py-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Personal ({staffCount})
                </div>

                {/* Toggle: shifts / tasks */}
                <div className="flex bg-white p-1 rounded-lg border border-gray-200">
                    <button
                        onClick={() => setViewType("shifts")}
                        className={
                            "px-3 py-1 text-xs font-bold rounded-md transition-all " +
                            (viewType === "shifts"
                                ? "bg-municipal-600 text-white shadow-sm"
                                : "text-gray-500 hover:bg-gray-100")
                        }
                    >
                        Pass
                    </button>
                    <button
                        onClick={() => setViewType("tasks")}
                        className={
                            "px-3 py-1 text-xs font-bold rounded-md transition-all " +
                            (viewType === "tasks"
                                ? "bg-municipal-600 text-white shadow-sm"
                                : "text-gray-500 hover:bg-gray-100")
                        }
                    >
                        Uppgifter
                    </button>
                </div>
            </div>

            {/* Andra raden: dag-kolumner (mån–sön) */}
            <div
                className="grid"
                style={{
                    // 220px staff-kolumn + 7 dag-kolumner
                    gridTemplateColumns: "220px repeat(7, minmax(110px, 1fr))",
                    direction: isRTL ? "rtl" : "ltr",
                }}
            >
                {/* Tom cell över staff-kolumnen */}
                <div className="border-r border-gray-200 bg-gray-50" />

                {weekDays.map((d, i) => (
                    <button
                        key={d.toISOString()}
                        onClick={() => onDayClick(d)}
                        className="h-12 border-l border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center"
                        title="Öppna dagvy"
                    >
                        <div className="text-[10px] font-bold text-gray-400 uppercase">
                            {dayNames[i] ?? d.toLocaleDateString("sv-SE", { weekday: "short" })}
                        </div>
                        <div className="text-sm font-bold text-gray-800">{d.getDate()}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
