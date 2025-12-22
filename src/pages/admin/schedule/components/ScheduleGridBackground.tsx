import React from "react";

interface ScheduleGridBackgroundProps {
    gridTemplateColumns: string;
    hourHeaders: number[];
}

export function ScheduleGridBackground({
    gridTemplateColumns,
    hourHeaders,
}: ScheduleGridBackgroundProps) {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-0 grid"
            style={{ gridTemplateColumns }}
        >
            <div className="border-r border-gray-200" />
            {hourHeaders.map((hour) => (
                <div key={hour} className="border-l border-gray-100 h-full" />
            ))}
        </div>
    );
}
