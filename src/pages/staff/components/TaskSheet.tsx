import React from 'react';
import { Task } from '../../../types';
import { getCategoryColor } from '../../../lib/utils'; // Keep logic inside component or use helper
import { X } from 'lucide-react';

interface TaskSheetProps {
    task: Task | null;
    onClose: () => void;
    onToggleStatus: (id: string, dateKey?: string) => void;
    showVikarieMode: boolean;
}

export const TaskSheet: React.FC<TaskSheetProps> = ({ task, onClose, onToggleStatus }) => {
    if (!task) return null;

    const isCompleted = task.status === 'completed' || task.status === 'signed';

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

            {/* Sheet */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 animate-in slide-in-from-bottom duration-200 max-w-md mx-auto shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${getCategoryColor(task.category)} opacity-70`}>Category</span>
                        <h2 className="text-xl font-bold mt-2 text-gray-900">{task.title}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-bold">{task.timeStart} - {task.timeEnd}</span>
                        {task.recipientId && <span>• Hos boende</span>}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-800 leading-relaxed">{task.description}</p>
                    </div>
                </div>

                <button
                    onClick={() => onToggleStatus(task.id, task.date)}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 ${isCompleted
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                >
                    {isCompleted ? 'Utförd' : 'Signera / Klar'}
                </button>
            </div>
        </>
    );
};
