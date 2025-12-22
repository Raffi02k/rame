// --- WeekLayout ---
export const WEEK_GRID_TEMPLATE_COLUMNS = "220px repeat(7, minmax(110px, 1fr))";


// --- DayScheduleLayout ---
export type DayScheduleLayout = {
    viewStartHour: number;
    viewEndHour: number;
    totalHours: number;

    quarterWidthPx: number;
    hourWidthPx: number;
    staffColumnWidthPx: number;

    timelineWidthPx: number;
    gridTemplateColumns: string;
    hourHeaders: number[];
};

export function buildDayScheduleLayout(): DayScheduleLayout {
    const viewStartHour = 7;
    const viewEndHour = 21;
    const totalHours = viewEndHour - viewStartHour;

    const quarterWidthPx = 28; // 15 min
    const hourWidthPx = quarterWidthPx * 4;
    const staffColumnWidthPx = 220;

    const timelineWidthPx = totalHours * hourWidthPx;
    const gridTemplateColumns = `${staffColumnWidthPx}px repeat(${totalHours}, ${hourWidthPx}px)`;
    const hourHeaders = Array.from({ length: totalHours }, (_, index) => viewStartHour + index);

    return {
        viewStartHour,
        viewEndHour,
        totalHours,
        quarterWidthPx,
        hourWidthPx,
        staffColumnWidthPx,
        timelineWidthPx,
        gridTemplateColumns,
        hourHeaders,
    };
}
