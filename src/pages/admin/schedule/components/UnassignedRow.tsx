import React from "react";
import { Task } from "../../../../types";

interface UnassignedRowProps {
    gridTemplateColumns: string;
    totalHours: number;
    timelineWidthPx: number;

    visibleTasks: Task[];
    isInDayView: (task: Task) => boolean;
    getTaskStyle: (task: Task) => React.CSSProperties;
    onTaskClick: (task: Task) => void;
}

export function UnassignedRow({
    gridTemplateColumns,
    totalHours,
    timelineWidthPx,
    visibleTasks,
    isInDayView,
    getTaskStyle,
    onTaskClick,
}: UnassignedRowProps) {
    return (
        <div className="grid min-h-[60px] bg-red-50/30" style={{ gridTemplateColumns }}>
            <div className="sticky left-0 z-20 bg-red-50/30 p-4 border-r border-gray-200 text-red-500 font-bold text-sm">
                Ej tilldelade
            </div>

            <div
                className="relative"
                style={{
                    gridColumn: `2 / span ${totalHours}`,
                    width: `${timelineWidthPx}px`,
                    minWidth: `${timelineWidthPx}px`,
                }}
            >
                {visibleTasks
                    .filter((task) => !task.assigneeId && !task.shiftRole)
                    .filter(isInDayView)
                    .map((task) => (
                        <div
                            key={task.id}
                            onClick={() => onTaskClick(task)}
                            className="absolute p-2 bg-white border border-red-200 text-red-800 rounded text-xs cursor-pointer shadow-sm"
                            style={getTaskStyle(task)}
                        >
                            <div className="font-mono font-bold text-[10px] opacity-70">
                                {task.timeStart}-{task.timeEnd}
                            </div>
                            <div className="font-bold text-[11px] truncate">{task.title}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
