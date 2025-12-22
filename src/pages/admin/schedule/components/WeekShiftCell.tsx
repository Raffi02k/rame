import React from "react";
import { getShiftForDate } from "../../../../lib/utils";

interface WeekShiftCellProps {
    personId: string;
    date: Date;
    activeLang: string;
}

export const WeekShiftCell: React.FC<WeekShiftCellProps> = ({ personId, date, activeLang }) => {
    // Shift-info kommer från demo-logic (samma som day view använder)
    const shift = getShiftForDate(personId, date, activeLang);

    const isOff = shift.type === "off";

    return (
        <div className={"h-full p-3 " + (isOff ? "bg-gray-50/60 opacity-70 grayscale" : "")}>
            <div className="text-xs font-bold text-gray-800 truncate">{shift.label}</div>
            <div className="text-[10px] text-gray-500 font-mono truncate">{shift.time || ""}</div>
        </div>
    );
};
