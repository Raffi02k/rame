import React from "react";
import { createPortal } from "react-dom";
import { Task, Person } from "../../../types";

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Partial<Task> | null;
    staffList: Person[];
    users: Person[];
    onSave: (task: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    onClose,
    task,
    onSave,
    onDelete,
}) => {
    if (!isOpen || !task) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-scale-in">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h2 className="font-bold text-lg text-gray-900">
                        {task.id ? "Redigera uppgift" : "Ny uppgift"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 tracking-wide">
                            Titel
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-municipal-500 outline-none font-bold shadow-sm"
                            value={task.title || ""}
                            onChange={(e) => onSave({ ...task, title: e.target.value })}
                            disabled
                            placeholder="Redigering ej implementerad i prototyp-placeholder"
                        />
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        {task.id && (
                            <button
                                onClick={() => onDelete(task.id!)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Ta bort
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Stäng
                        </button>
                        <button
                            onClick={() => onSave(task)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Spara
                        </button>
                    </div>
                </div>

                <style>{`
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in {
            animation: scale-in 0.2s ease-out;
          }
        `}</style>
            </div>
        </div>,
        document.body
    );
};
