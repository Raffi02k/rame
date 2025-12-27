import React, { useMemo } from "react";
import { Clock, Check } from "lucide-react";
import { cn, getCategoryColor } from "../../../../lib/utils";
import { Task, TaskStatus } from "../../../../types";

interface TaskCardProps {
    task: Task;
    getTaskStyle: (task: Task) => React.CSSProperties;
    onTaskClick: (task: Task) => void;
    timelineWidthPx: number;
}

const TINY_MINUTES = 60;
const TINY_HOVER_WIDTH = 260;

function toMinutes(hhmm: string) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
}

function getDurationMinutes(task: Task) {
    const start = toMinutes(task.timeStart);
    let end = toMinutes(task.timeEnd);
    if (end <= start) end += 24 * 60; // över midnatt
    return Math.max(end - start, 0);
}


export const TaskCard: React.FC<TaskCardProps> = ({ task, getTaskStyle, onTaskClick, timelineWidthPx }) => {
    const duration = useMemo(() =>
        getDurationMinutes(task), [task.timeStart, task.timeEnd]);

    const isTiny = duration < TINY_MINUTES;

    const isSignedOrDone =
        task.status === TaskStatus.COMPLETED || task.status === TaskStatus.SIGNED;

    const isMissed = task.status === TaskStatus.MISSED;

    const baseStyle = getTaskStyle(task);

    // Tiny hover-expand: om den hamnar nära slutet, flytta åt vänster på hover så texten syns
    const leftPx =
        typeof baseStyle.left === "number"
            ? baseStyle.left
            : parseFloat(String(baseStyle.left ?? "0"));

    const widthPx =
        typeof baseStyle.width === "number"
            ? baseStyle.width
            : parseFloat(String(baseStyle.width ?? "0"));


    const extra = Math.max(TINY_HOVER_WIDTH - (Number.isFinite(widthPx) ? widthPx : 0), 0);
    const shouldFlipLeft =
        isTiny && Number.isFinite(leftPx) && leftPx + TINY_HOVER_WIDTH > timelineWidthPx - 8;

    const hoverShift = shouldFlipLeft ? `-${extra}px` : "0px";

    return (
        <button
            type="button"
            onClick={() => onTaskClick(task)}
            style={{ ...baseStyle, ["--hover-shift" as any]: hoverShift }}
            className={cn(
                "absolute text-left rounded border border-l-[4px] shadow-sm cursor-pointer transition-all bg-white overflow-hidden group/task",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-municipal-200",

                !isSignedOrDone && !isMissed && getCategoryColor(task.category),
                isSignedOrDone &&
                "bg-green-50/70 border-green-200 border-l-green-500 opacity-90 grayscale-[0.2]",
                isMissed && "ring-2 ring-red-500 bg-red-50 border-red-300 text-red-700",

                isTiny
                    ? "hover:!w-[260px] hover:!h-auto hover:!z-[200] hover:shadow-2xl hover:overflow-visible hover:translate-x-[var(--hover-shift)]"
                    : "hover:shadow-lg hover:z-[120] hover:scale-[1.01]"
            )}
        >
            {isSignedOrDone && (
                <>
                    <Check
                        className="absolute -right-2 -bottom-2 text-green-200/40 w-16 h-16 -rotate-12 pointer-events-none"
                        strokeWidth={4}
                    />
                    <div className="absolute right-1 top-1 bg-green-600 rounded-full p-0.5 shadow-sm">
                        <Check size={10} className="text-white" strokeWidth={4} />
                    </div>
                </>
            )}

            <div className={cn("flex flex-col h-full relative z-10", isTiny ? "p-1.5 group-hover/task:p-3" : "p-2")}>
                {/* Time row */}
                <div className="flex items-start mb-0.5 gap-2">
                    <div
                        className={cn(
                            "flex items-center gap-1 font-bold font-mono text-[9px] truncate",
                            isSignedOrDone ? "text-green-700/60" : "opacity-60"
                        )}
                    >
                        <Clock size={10} className="shrink-0" />
                        <span>
                            {task.timeStart}–{task.timeEnd}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <div
                    className={cn(
                        "font-bold leading-tight",
                        isSignedOrDone ? "text-gray-500 italic" : "text-gray-900",
                        isTiny
                            ? "text-[10px] truncate group-hover/task:text-sm group-hover/task:whitespace-normal"
                            : "text-[11px] truncate"
                    )}
                >
                    {task.title}
                </div>

                {/* Description */}
                {task.description && (
                    <div
                        className={cn(
                            "text-[10px] mt-0.5 leading-tight opacity-90 group-hover/task:opacity-100 transition-opacity",
                            isSignedOrDone ? "text-gray-400 line-through" : "text-gray-500",
                            isTiny ? "line-clamp-1 group-hover/task:line-clamp-none" : "line-clamp-2"
                        )}
                    >
                        {task.description}
                    </div>
                )}
            </div>
        </button>
    );
};