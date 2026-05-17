import React from 'react';
import { MoreVertical } from 'lucide-react';

interface CallItemProps {
  title: string;
  time: string;
  participantsCount: number;
}

export const CallItem: React.FC<CallItemProps> = ({ title, time, participantsCount }) => {
  return (
    <div className="flex items-center justify-between py-4 group hover:bg-gray-50/50 transition-colors px-4 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-[#9F3BFF] flex items-center justify-center text-white font-bold text-sm">
          K
        </div>
        <div className="space-y-1">
          <h4 className="text-[15px] font-bold text-gray-900">{title}</h4>
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5">
              {[...Array(Math.min(participantsCount, 3))].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full border border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <span className="text-sm font-medium text-gray-600">{time}</span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
          <MoreVertical size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
