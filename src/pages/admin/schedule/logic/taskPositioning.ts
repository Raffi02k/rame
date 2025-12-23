import type React from "react";
import { Task } from "../../../../types";

export type ViewPeriod = "day" | "night";

export type TaskStyleOpts = {
    viewPeriod: ViewPeriod;

    //Day: 7 -> 21 (endHour = 21)
    // Night: 22 -> 30 (endHour = 30, dvs 06:00 nästa dag)
    startHour: number;
    endHour: number;

    // ✅ 15 min = 1 "quarter"
    quarterWidthPx: number;

    // ✅ RTL stöd
    isRTL?: boolean;
};

/**
 * Normaliserar nattens timmar (00–06) till 24–30
 * så 01:00 hamnar "efter" 23:00 i layouten.
 */
export function normalizeHour(h: number, viewPeriod: ViewPeriod) {
    if (viewPeriod === "night" && h <= 6) return h + 24;
    return h;
}

/**
 * Hjälpfunktion för att avgöra om en task överlappar vyn.
 * Bra för filtrering (day/nigth toggle).
 */
export function isTaskInView(task: Task, opts: TaskStyleOpts) {
    const [sH0, sM] = task.timeStart.split(":").map(Number);
    const [eH0, eM] = task.timeEnd.split(":").map(Number);

    let sH = normalizeHour(sH0, opts.viewPeriod);
    let eH = normalizeHour(eH0, opts.viewPeriod);

    let startMin = sH * 60 + sM;
    let endMin = eH * 60 + eM;

    // Dygnsbryt (23:00 -> 01:00)
    if (endMin <= startMin) endMin += 24 * 60;

    const viewStartMin = opts.startHour * 60;
    const viewEndMin = opts.endHour * 60;

    return endMin > viewStartMin && startMin < viewEndMin;
}

/**
 * Din "getTaskStyle" men med:
 * - normalisering för natt
 * - clamp mot vyn (så left inte blir negativ)
 * - stöd för RTL
 */
export function getTaskStyle(task: Task, opts: TaskStyleOpts): React.CSSProperties {
    const [sH0, sM] = task.timeStart.split(":").map(Number);
    const [eH0, eM] = task.timeEnd.split(":").map(Number);

    let sH = normalizeHour(sH0, opts.viewPeriod);
    let eH = normalizeHour(eH0, opts.viewPeriod);

    // Dygnsbryt (23 -> 01)
    if (eH < sH) eH += 24;

    const startFloat = sH + sM / 60;
    const endFloat = eH + eM / 60;

    // Clamp till vyn (hindrar negativa px + överbredd)
    const clampedStart = Math.max(startFloat, opts.startHour);
    const clampedEnd = Math.min(endFloat, opts.endHour);

    // Helt utanför vyn
    if (clampedStart >= opts.endHour || clampedEnd <= opts.startHour) {
        return { display: "none" as const };
    }

    const startMinutesFromViewStart = (clampedStart - opts.startHour) * 60;
    const endMinutesFromViewStart = (clampedEnd - opts.startHour) * 60;

    const durationMinutes = Math.max(endMinutesFromViewStart - startMinutesFromViewStart, 15);

    // 15-min-grid (quarters)
    const posPx = (startMinutesFromViewStart / 15) * opts.quarterWidthPx + 1;
    const widthPx = (durationMinutes / 15) * opts.quarterWidthPx - 2;

    const style: React.CSSProperties = {
        position: "absolute",
        top: 8,
        bottom: 8,
        width: widthPx,
        zIndex: 10,
    };

    // RTL/LTR positionering
    if (opts.isRTL) style.right = posPx;
    else style.left = posPx;

    return style;
}

/**
 * Shift-bar (för "passet" som ligger bakom tasks)
 * återanvänder samma tidslogik.
 *
 * shiftTime format: "HH:MM - HH:MM"
 */
export function getShiftBarStyle(shiftTime: string, opts: TaskStyleOpts): React.CSSProperties {
    if (!shiftTime) return {};

    const [startStr, endStr] = shiftTime.split(" - ");
    const [sH0, sM] = startStr.split(":").map(Number);
    const [eH0, eM] = endStr.split(":").map(Number);

    let sH = normalizeHour(sH0, opts.viewPeriod);
    let eH = normalizeHour(eH0, opts.viewPeriod);
    if (eH < sH) eH += 24;

    const startFloat = sH + sM / 60;
    const endFloat = eH + eM / 60;

    const clampedStart = Math.max(startFloat, opts.startHour);
    const clampedEnd = Math.min(endFloat, opts.endHour);

    if (clampedStart >= opts.endHour || clampedEnd <= opts.startHour) {
        return { display: "none" as const };
    }

    const startMinutesFromViewStart = (clampedStart - opts.startHour) * 60;
    const endMinutesFromViewStart = (clampedEnd - opts.startHour) * 60;

    const durationMinutes = Math.max(endMinutesFromViewStart - startMinutesFromViewStart, 15);

    const posPx = (startMinutesFromViewStart / 15) * opts.quarterWidthPx;
    const widthPx = (durationMinutes / 15) * opts.quarterWidthPx;

    const style: React.CSSProperties = {
        width: widthPx,
    };

    if (opts.isRTL) style.right = posPx;
    else style.left = posPx;

    return style;
}
