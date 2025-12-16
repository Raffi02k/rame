import React from 'react';
import { Task, Person } from '../../../lib/types';

interface DayScheduleProps {
  currentDate: Date;
  staff: Person[];
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  activeLang: string;
}

export const DaySchedule: React.FC<DayScheduleProps> = ({
  currentDate,
  staff,
  tasks,
  onTaskClick,
  activeLang
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-700">Dagsschema - {currentDate.toLocaleDateString()}</h3>
        <span className="text-xs text-gray-500">Visar {tasks.length} uppgifter</span>
      </div>

      <div className="divide-y divide-gray-100">
        {staff.map(person => {
          const personTasks = tasks.filter(t => t.assigneeId === person.id);
          // Also include unassigned tasks that match unit? No, AdminPage already filtered tasks. 
          // But AdminPage said "Komponenterna ansvarar för att matcha task -> person".

          return (
            <div key={person.id} className="flex min-h-[100px] hover:bg-gray-50 transition-colors">
              {/* Staff Info Column */}
              <div className={`w-48 p-4 border-r border-gray-100 bg-white sticky left-0 z-10 flex items-center gap-3`}>
                <img src={person.avatar} className="w-10 h-10 rounded-full bg-gray-200" alt={person.name} />
                <div>
                  <p className="font-bold text-sm text-gray-900">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.role}</p>
                </div>
              </div>

              {/* Timeline Column */}
              <div className="flex-1 p-2 relative">
                {/* Simple visualization of tasks as blocks */}
                <div className="flex gap-2 flex-wrap">
                  {personTasks.length > 0 ? personTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick(task)}
                      className={`p-2 rounded text-xs border cursor-pointer ${task.status === 'completed' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-blue-50 border-blue-200 text-blue-800'
                        }`}
                    >
                      <span className="font-bold block">{task.timeStart}</span>
                      <span className="truncate max-w-[100px] block">{task.title}</span>
                    </div>
                  )) : (
                    <span className="text-xs text-gray-300 italic self-center">Inga uppgifter</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Unassigned row */}
        <div className="flex min-h-[60px] bg-red-50/30">
          <div className="w-48 p-4 border-r border-gray-100 flex items-center gap-3 text-red-500">
            <span className="font-bold text-sm">Ej tilldelade</span>
          </div>
          <div className="flex-1 p-2 flex gap-2 flex-wrap">
            {tasks.filter(t => !t.assigneeId).map(task => (
              <div key={task.id} onClick={() => onTaskClick(task)} className="p-2 bg-white border border-red-200 text-red-800 rounded text-xs cursor-pointer shadow-sm">
                {task.timeStart} {task.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
