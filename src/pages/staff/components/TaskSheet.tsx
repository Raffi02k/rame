import React, { useEffect, useState } from "react";
import { Clock, CheckCircle2, FileText, Stethoscope, ExternalLink, Lock, RotateCcw, Key, } from "lucide-react";
import { cn, getCategoryColor } from "../../../lib/utils";
import { Task, TaskStatus } from "../../../types";
import { Button } from "../../../components/Button";
import { getUITranslations } from "../../../lib/translations";

interface TaskSheetProps {
    task: Task | null;
    onClose: () => void;
    onToggleStatus: (taskId: string, dateKey?: string) => void;
    showVikarieMode: boolean;
    activeLang?: string;
}

export const TaskSheet: React.FC<TaskSheetProps> = ({
    task,
    onClose,
    onToggleStatus,
    showVikarieMode,
    activeLang = "sv",
}) => {
    const [hasClickedMcss, setHasClickedMcss] = useState(false);

    useEffect(() => {
        setHasClickedMcss(false);
    }, [task?.id]);

    if (!task) return null;

    const t = getUITranslations?.(activeLang) ?? {
        sign: activeLang === "sv" ? "Signering" : "Sign",
        undo: activeLang === "sv" ? "Ångra" : "Undo",
        markDone: activeLang === "sv" ? "Markera klar" : "Mark done",
        cancel: activeLang === "sv" ? "Avbryt" : "Cancel",
        description: activeLang === "sv" ? "BESKRIVNING" : "DESCRIPTION",
        subTitle: activeLang === "sv" ? "VIKARIEINSTRUKTION" : "SUB INSTRUCTIONS",
        openMcss: activeLang === "sv" ? "Öppna MCSS (Signera här först)" : "Open MCSS (Sign first)",
        mcssWarning:
            activeLang === "sv"
                ? "Signering låst. Du måste först öppna MCSS och signera där."
                : "Signing locked. Open MCSS and sign there first.",
    };

    const isDone = task.status === TaskStatus.COMPLETED || task.status === TaskStatus.SIGNED;

    // Anpassa vid behov: om du har enum TaskCategory.HSL använd den istället.
    const isMedical = task.category === "hsl";
    const isLocked = !isDone && isMedical && !hasClickedMcss;

    const actionLabel = isDone
        ? t.undo
        : task.requiresSign
            ? t.sign
            : t.markDone;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            {/* Overlay: klick utanför stänger */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Panel */}
            <div
                className="relative bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // viktigt: klick i modal ska inte bubbla till overlay
            >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 sm:hidden" />

                {/* Vikarieinstruktion (om du vill ha den som prototypen) */}
                {showVikarieMode && task.substituteInstructions && !isDone && (
                    <div className="mb-6 bg-blue-600 rounded-2xl p-5 shadow-xl shadow-blue-200 border border-blue-500">
                        <div className="flex items-center gap-2 mb-3 text-white/80">
                            <Key size={18} />
                            <span className="text-[10px] font-black tracking-widest uppercase">{t.subTitle}</span>
                        </div>
                        <p className="text-white text-base font-black leading-tight tracking-tight">
                            {task.substituteInstructions}
                        </p>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="max-w-[72%]">
                        <h2 className="text-2xl font-black text-gray-900 leading-none mb-1 tracking-tight">
                            {task.title}
                        </h2>

                        <div className="flex items-center gap-2 text-gray-500 text-lg font-bold tracking-tight">
                            <Clock size={18} className="opacity-70" />
                            <span>
                                {task.timeStart} – {task.timeEnd}
                            </span>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "w-14 h-14 rounded-full flex items-center justify-center shadow-inner shrink-0",
                            isDone ? "bg-green-100 text-green-600" : getCategoryColor(task.category)
                        )}
                    >
                        {isDone ? <CheckCircle2 size={28} /> : <Clock size={28} />}
                    </div>
                </div>

                {/* Content */}
                <div className="my-6 space-y-4">
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 shadow-inner">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
                            {t.description}
                        </h4>
                        <p className="text-gray-800 leading-relaxed font-bold text-lg">
                            {task.description}
                        </p>
                    </div>

                    {/* Lås-varning för HSL/signering */}
                    {isMedical && !isDone && !hasClickedMcss && (
                        <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl flex items-center gap-4">
                            <Lock size={20} className="text-orange-500 shrink-0" />
                            <p className="text-sm text-orange-900 font-black">{t.mcssWarning}</p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="space-y-3 pb-2">
                    {isMedical && !isDone && (
                        <a
                            href="https://apps.apple.com/se/app/mcss/id1079010689"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setHasClickedMcss(true)}
                            className="w-full flex items-center justify-between gap-2 p-5 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all active:scale-[0.98] shadow-xl shadow-red-100 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Stethoscope size={22} />
                                </div>
                                <span className="text-lg">{t.openMcss}</span>
                            </div>
                            <ExternalLink size={20} className="opacity-70" />
                        </a>
                    )}

                    {/* KNAPPRAD (prototypen) */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 h-16 rounded-2xl font-black text-lg"
                            onClick={onClose}
                        >
                            {t.cancel}
                        </Button>

                        <Button
                            disabled={isLocked}
                            variant={isDone ? "secondary" : "primary"}
                            className={cn(
                                "flex-1 h-16 rounded-2xl gap-2 font-black text-lg transition-all justify-center",
                                isLocked
                                    ? "bg-gray-200 text-gray-400 border-gray-100"
                                    : isDone
                                        ? "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                                        : "shadow-xl shadow-municipal-900/20 bg-municipal-900 hover:bg-municipal-800"
                            )}
                            onClick={() => onToggleStatus(task.id, task.date)}
                        >
                            {isDone ? <RotateCcw size={24} /> : task.requiresSign ? <FileText size={24} /> : <CheckCircle2 size={24} />}
                            {actionLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
