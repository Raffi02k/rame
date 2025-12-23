import { useEffect, useRef, useState } from "react";

/**
 * - containerRef kopplas till en div
 * - containerWidth uppdateras automatiskt när divens bredd ändras
 */
export function useContainerWidth<T extends HTMLElement = HTMLDivElement>() {
    const containerRef = useRef<T | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Direkt initial mätning
        setContainerWidth(el.getBoundingClientRect().width);

        // Observera storleksändringar
        const ro = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;
            setContainerWidth(entry.contentRect.width);
        });

        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return { containerRef, containerWidth };
}
