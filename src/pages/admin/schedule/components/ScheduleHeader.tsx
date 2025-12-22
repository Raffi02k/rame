import React from "react";

interface ScheduleHeaderProps {
    gridTemplateColumns: string;
    hourHeaders: number[];
    staffCount: number;
}

export function ScheduleHeader({
    gridTemplateColumns,
    hourHeaders,
    staffCount,
}: ScheduleHeaderProps) {
    return (
        <div
            className="sticky top-0 z-30 bg-gray-50 border-b border-gray-200 h-12 grid"
            style={{ gridTemplateColumns }}
        >
            <div className="sticky left-0 z-40 bg-gray-50 px-3 flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-gray-200 shadow-[4px_0_10px_rgba(0,0,0,0.05)]">
                Personal ({staffCount})
            </div>

            {hourHeaders.map((hour) => (
                <div
                    key={hour}
                    className="flex items-center justify-center text-[11px] font-bold text-gray-400 border-l border-gray-200 bg-gray-50"
                >
                    {String(hour).padStart(2, "0")}:00
                </div>
            ))}
        </div>
    );
}
