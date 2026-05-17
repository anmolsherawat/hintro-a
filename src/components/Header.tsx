import React from 'react';
import { useUser } from '../context/UserContext';
import { Play, User, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export const Header: React.FC = () => {
  const { userId, toggleUser } = useUser();

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 sticky top-0 z-30">
      <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleUser}
          className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Play size={16} className="text-gray-600" />
          <span>Watch Tutorial</span>
        </button>

        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <button 
            onClick={toggleUser}
            className={cn(
              "flex items-center gap-2 p-1 rounded-full transition-colors",
              userId === 'u2' ? "bg-green-100" : "bg-gray-100"
            )}
            title={`Currently logged in as ${userId}. Click to switch.`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <User size={20} className="text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">
              {userId === 'u1' ? 'New User' : 'Active User'}
            </span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
