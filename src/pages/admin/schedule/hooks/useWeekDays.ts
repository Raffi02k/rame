import { useMemo } from "react";

// Returnerar [Mon..Sun] för veckan som currentDate ligger i.
export function useWeekDays(currentDate: Date) {
    return useMemo(() => {
        const base = new Date(currentDate);

        // JS: getDay() => 0=sön, 1=mån ... 6=lör
        // Vi vill ha måndag som start.
        const day = base.getDay() || 7; // sön => 7
        base.setHours(0, 0, 0, 0);
        base.setDate(base.getDate() - (day - 1)); // backa till måndag

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(base);
            d.setDate(base.getDate() + i);
            return d;
        });
    }, [currentDate]);
}
