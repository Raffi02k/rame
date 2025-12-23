import { useEffect, useState } from "react";

/**
 * - För att kunna markera “nu”-timmen i headern (om du vill)
 * - Eller för logik i grid (valfritt)
 */
export function useNowHour(refreshMs: number = 30_000) {
    const [nowHour, setNowHour] = useState(() => new Date().getHours());

    useEffect(() => {
        const id = window.setInterval(() => {
            setNowHour(new Date().getHours());
        }, refreshMs);

        return () => window.clearInterval(id);
    }, [refreshMs]);

    return nowHour;
}
