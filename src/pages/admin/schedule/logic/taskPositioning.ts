import React from "react";
import { Task } from "../../../../types";

export function getTaskStyle(
    task: Task,
    viewStartHour: number,
    quarterWidthPx: number
): React.CSSProperties {
    const [startHourStr, startMinuteStr] = task.timeStart.split(":");
    const [endHourStr, endMinuteStr] = task.timeEnd.split(":");

    const startHour = Number(startHourStr);
    const startMinute = Number(startMinuteStr);
    const endHour = Number(endHourStr);
    const endMinute = Number(endMinuteStr);

    const startMinutesFromViewStart = (startHour - viewStartHour) * 60 + startMinute;
    let endMinutesFromViewStart = (endHour - viewStartHour) * 60 + endMinute;

    // Om sluttiden ser “mindre ut” än start (t.ex. 23:00 -> 01:00), anta dygnsbryt
    if (endMinutesFromViewStart < startMinutesFromViewStart) {
        endMinutesFromViewStart += 24 * 60;
    }

    const leftPx = (startMinutesFromViewStart / 15) * quarterWidthPx + 1;

    const durationMinutes = Math.max(endMinutesFromViewStart - startMinutesFromViewStart, 15);
    const widthPx = (durationMinutes / 15) * quarterWidthPx - 2;
    return {
        position: "absolute",
        top: 8,
        bottom: 8,
        left: leftPx,
        width: widthPx,
    };
}