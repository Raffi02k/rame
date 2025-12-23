import React from "react";
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

    return (
        <div
            className="fixed inset-0 z-[9999] isolation-isolate flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">
                    {task.id ? "Redigera uppgift" : "Ny uppgift"}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Titel
                        </label>
                        <input
                            className="w-full border rounded p-2"
                            value={task.title || ""}
                            onChange={(e) => onSave({ ...task, title: e.target.value })}
                            disabled
                            placeholder="Redigering ej implementerad i prototyp-placeholder"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    {task.id && (
                        <button
                            onClick={() => onDelete(task.id!)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm px-4 py-2"
                        >
                            Ta bort
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        Stäng
                    </button>
                    <button
                        onClick={() => onSave(task)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Spara
                    </button>
                </div>
            </div>
        </div>
    );
};
