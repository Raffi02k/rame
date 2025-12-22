import React from 'react';
import { Person } from '../../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StaffHeaderProps {
    user: Person;
    progress: number;
    activeTab: 'today' | 'report';
    onTabChange: (tab: 'today' | 'report') => void;
    activeLang: string;
    onLangChange: (lang: string) => void;
    currentDate: Date;
    onNavigateDate: (dir: 'prev' | 'next') => void;
}

export const StaffHeader: React.FC<StaffHeaderProps> = ({
    user,
    activeLang,
    onLangChange,
    currentDate,
    onNavigateDate
}) => {
    return (
        <div className="bg-white p-4 pb-2 border-b">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <img src={user.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow" alt={user.name} />
                    <div>
                        <h1 className="font-bold text-gray-900">{user.name}</h1>
                        <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                </div>

                <div className="flex gap-1">
                    {['sv', 'en', 'ar', 'es'].map(l => (
                        <button
                            key={l}
                            onClick={() => onLangChange(l)}
                            className={`text-[10px] w-6 h-6 rounded-full flex items-center justify-center uppercase font-bold transition-colors ${activeLang === l ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                <button onClick={() => onNavigateDate('prev')} className="p-1 hover:bg-gray-200 rounded"><ChevronLeft size={16} /></button>
                <span className="font-medium text-sm capitalize">{currentDate.toLocaleDateString(activeLang === 'sv' ? 'sv-SE' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                <button onClick={() => onNavigateDate('next')} className="p-1 hover:bg-gray-200 rounded"><ChevronRight size={16} /></button>
            </div>
        </div>
    );
};
