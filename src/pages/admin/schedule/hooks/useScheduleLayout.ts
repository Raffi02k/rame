import { useMemo } from "react";
import { Task } from "../../../../types";
import {
    ViewPeriod,
    getTaskStyle as getTaskStyleFn,
    getShiftBarStyle as getShiftBarStyleFn,
    isTaskInView as isTaskInViewFn,
} from "../logic/taskPositioning";

type UseScheduleLayoutProps = {
    viewPeriod: ViewPeriod;
    containerWidth: number;
    isRTL: boolean;

    STAFF_WIDTH: number;
    MIN_HOUR_WIDTH: number;
};

/**
 * - växlar mellan dag (07–21) och natt (22–06)
 * - dynamisk hourWidth baserat på containerWidth
 * - återanvänder taskPositioning för style + in-view
 */
export function useScheduleLayout({
    viewPeriod,
    containerWidth,
    isRTL,
    STAFF_WIDTH,
    MIN_HOUR_WIDTH,
}: UseScheduleLayoutProps) {
    // ✅ Dag: 07–21 (visar 7..20 i headers) = 14 timmar
    // ✅ Natt: 22–06 (visar 22..05 i headers) = 8 timmar
    const { startHour, endHour } = useMemo(() => {
        if (viewPeriod === "day") return { startHour: 7, endHour: 22 };
        return { startHour: 22, endHour: 31 }; // 31 == 06 nästa dygn (24+6)
    }, [viewPeriod]);

    const totalHours = endHour - startHour;

    // Timrubriker i UI (wrap 24)
    const hours = useMemo(() => {
        return Array.from({ length: totalHours }, (_, i) => {
            const h = startHour + i;
            return h >= 24 ? h - 24 : h;
        });
    }, [startHour, totalHours]);

    // Dynamisk bredd per timme (så grid fyller ytan men aldrig blir för smal)
    const hourWidthPx = useMemo(() => {
        const available = Math.max(0, containerWidth - STAFF_WIDTH);
        const minNeeded = MIN_HOUR_WIDTH * totalHours;

        //Om det finns mer plats än min-needed -> fördela ut jämnt
        if (available > minNeeded) return available / totalHours;

        //annars kör minimum
        return MIN_HOUR_WIDTH;
    }, [containerWidth, STAFF_WIDTH, MIN_HOUR_WIDTH, totalHours]);

    const quarterWidthPx = hourWidthPx / 4;

    const timelineWidthPx = totalHours * hourWidthPx;
    const gridTemplateColumns = `${STAFF_WIDTH}px repeat(${totalHours}, ${hourWidthPx}px)`;

    // wrapper-funktioner som använder taskPositioning.ts
    const isTaskInView = (task: Task) =>
        isTaskInViewFn(task, { viewPeriod, startHour, endHour, quarterWidthPx, isRTL });

    const getTaskStyle = (task: Task) =>
        getTaskStyleFn(task, { viewPeriod, startHour, endHour, quarterWidthPx, isRTL });

    const getShiftBarStyle = (shiftTime: string) =>
        getShiftBarStyleFn(shiftTime, { viewPeriod, startHour, endHour, quarterWidthPx, isRTL });

    return {
        startHour,
        endHour,
        totalHours,
        hours,

        hourWidthPx,
        quarterWidthPx,

        timelineWidthPx,
        gridTemplateColumns,

        // används i StaffRow / selectors
        isTaskInView,
        getTaskStyle,
        getShiftBarStyle,
    };
}
