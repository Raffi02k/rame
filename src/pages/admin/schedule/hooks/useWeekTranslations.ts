import { useMemo } from "react";

export function useWeekTranslations(activeLang: string) {
    return useMemo(() => {
        // Standard: svenska (mån–sön)
        const sv = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];
        const en = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const es = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
        const ar = ["الإث", "الث", "الأر", "الخ", "الج", "الس", "الأح"];

        const dayNames =
            activeLang === "en" ? en :
                activeLang === "es" ? es :
                    activeLang === "ar" ? ar :
                        sv;

        return { dayNames };
    }, [activeLang]);
}
