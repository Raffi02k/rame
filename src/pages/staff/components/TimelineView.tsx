import React from 'react';
import { Task } from '../../../lib/types';
import { getCategoryColor } from '../../../lib/utils';
import { getCategoryLabel } from '../../../lib/translations';

interface TimelineViewProps {
    tasks: Task[];
    showVikarieMode: boolean; // Maybe show extra details?
    activeLang: string;
    onTaskClick: (task: Task) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ tasks, activeLang, onTaskClick }) => {
    if (tasks.length === 0) return null; // Handled by parent

    return (
        <div className="space-y-3 relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

            {tasks.map(task => (
                <div
                    key={task.id}
                    onClick={() => onTaskClick(task)}
                    className="relative z-10 pl-12 cursor-pointer group"
                >
                    {/* Time bubble */}
                    <div className="absolute left-0 top-0 w-9 text-[10px] font-bold text-gray-500 bg-gray-50 border border-gray-200 rounded px-1 py-0.5 text-center z-20">
                        {task.timeStart}
                    </div>

                    <div className={`p-3 rounded-xl border shadow-sm transition-transform active:scale-[0.98] ${getCategoryColor(task.category)} bg-white border-gray-100`}>
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">
                                {getCategoryLabel(task.category, activeLang)}
                            </span>
                            {task.status === 'completed' && <span className="text-green-600 font-bold text-xs">✓</span>}
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{task.title}</h3>
                        {task.description && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>}

                        {task.recipientId && (
                            <div className="mt-2 text-xs font-medium bg-black/5 inline-block px-2 py-0.5 rounded-full text-black/70">
                                Boende
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
